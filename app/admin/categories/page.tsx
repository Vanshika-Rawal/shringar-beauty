"use client";

import { useEffect, useState, type FormEvent } from "react";
import { getAllCategories } from "@/lib/firebase/categories";
import { deleteCategory, upsertCategory } from "@/lib/firebase/admin";
import { categories as seedCategories } from "@/lib/data/catalog";
import { categoryIcons } from "@/lib/data/icons";
import { useToast } from "@/context/ToastContext";
import type { Category } from "@/types";

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const iconKeys = Object.keys(categoryIcons);

type Draft = { name: string; slug: string; icon: string; chip: string };

const emptyDraft: Draft = {
  name: "",
  slug: "",
  icon: iconKeys[0] ?? "drop",
  chip: "linear-gradient(135deg,#D8B08C,#C98F73)",
};

export default function AdminCategoriesPage() {
  const { notify } = useToast();
  const [list, setList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Category | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    getAllCategories()
      .then((c) => setList(c.length ? c : seedCategories))
      .catch(() => setList(seedCategories))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => {
    setEditing(null);
    setDraft(emptyDraft);
    setShowForm(true);
  };

  const openEdit = (c: Category) => {
    setEditing(c);
    setDraft({
      name: c.name,
      slug: c.slug,
      icon: c.iconSvg,
      chip: c.chip.replace(/^background:/, ""),
    });
    setShowForm(true);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const slug = draft.slug ? slugify(draft.slug) : slugify(draft.name);
    const payload: Category = {
      id: editing?.id ?? slug,
      name: draft.name,
      slug,
      chip: draft.chip.startsWith("background") ? draft.chip : `background:${draft.chip}`,
      iconSvg: draft.icon,
      order: editing?.order ?? list.length,
    };
    try {
      await upsertCategory(payload);
      notify(editing ? "Category updated" : "Category added");
      setShowForm(false);
      load();
    } catch {
      notify("Save failed — check Firebase config & admin role");
    }
  };

  const onDelete = async (c: Category) => {
    try {
      await deleteCategory(c.id);
      notify("Category deleted");
      setList((prev) => prev.filter((x) => x.id !== c.id));
    } catch {
      notify("Delete failed");
    }
  };

  const field =
    "w-full rounded-xl border border-copper/20 px-4 py-2.5 text-[14px] outline-none focus:border-copper";

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-playfair text-[clamp(26px,3.4vw,38px)] font-bold text-brown">Categories</h1>
        <button onClick={openAdd} className="rounded-full bg-copper px-5 py-2.5 text-[12.5px] font-semibold text-white hover:bg-copper-dark">
          + Add Category
        </button>
      </div>

      {showForm && (
        <form onSubmit={onSubmit} className="mb-8 grid grid-cols-1 gap-4 rounded-3xl border border-copper/15 bg-white p-6 sm:grid-cols-2">
          <h2 className="font-playfair text-[20px] font-semibold text-brown sm:col-span-2">
            {editing ? "Edit Category" : "New Category"}
          </h2>
          <input
            required
            placeholder="Name"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            className={field}
          />
          <input
            placeholder="Slug (auto from name)"
            value={draft.slug}
            onChange={(e) => setDraft({ ...draft, slug: e.target.value })}
            className={field}
          />
          <label className="flex flex-col gap-1.5 text-[12px] font-medium text-muted">
            Icon
            <select value={draft.icon} onChange={(e) => setDraft({ ...draft, icon: e.target.value })} className={field}>
              {iconKeys.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-[12px] font-medium text-muted">
            Gradient (CSS)
            <input
              placeholder="linear-gradient(135deg,#D8B08C,#C98F73)"
              value={draft.chip}
              onChange={(e) => setDraft({ ...draft, chip: e.target.value })}
              className={field}
            />
          </label>

          {/* Live preview chip — matches the storefront category tile */}
          <div className="flex items-center gap-3 sm:col-span-2">
            <span className="text-[12px] font-medium text-muted">Preview:</span>
            <span
              className="grid h-12 w-12 place-items-center rounded-2xl text-white [&_svg]:h-6 [&_svg]:w-6"
              style={{ background: draft.chip }}
              dangerouslySetInnerHTML={{ __html: categoryIcons[draft.icon] ?? "" }}
            />
            <span className="font-playfair text-[16px] text-brown">{draft.name || "Category name"}</span>
          </div>

          <div className="flex gap-3 sm:col-span-2">
            <button type="submit" className="rounded-full bg-brown px-7 py-3 text-[13.5px] font-semibold text-cream">Save</button>
            <button type="button" onClick={() => setShowForm(false)} className="rounded-full border border-copper/25 px-7 py-3 text-[13.5px] font-semibold text-muted">Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-copper/15 bg-white">
          <table className="w-full min-w-[560px] text-left text-[13.5px]">
            <thead className="border-b border-black/5 bg-cream/60 text-[12px] uppercase tracking-[0.06em] text-muted">
              <tr>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Slug</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id} className="border-b border-black/5 last:border-0">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <span
                        className="grid h-9 w-9 place-items-center rounded-xl text-white [&_svg]:h-[18px] [&_svg]:w-[18px]"
                        style={{ background: c.chip.replace(/^background:/, "") }}
                        dangerouslySetInnerHTML={{ __html: categoryIcons[c.iconSvg] ?? "" }}
                      />
                      <span className="font-medium text-brown">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted">{c.slug}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(c)} className="rounded-full border border-copper/25 px-3.5 py-1.5 text-[12px] font-semibold text-copper-dark hover:bg-copper/10">Edit</button>
                      <button onClick={() => onDelete(c)} className="rounded-full border border-red-200 px-3.5 py-1.5 text-[12px] font-semibold text-red-500 hover:bg-red-50">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
