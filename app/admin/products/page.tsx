"use client";

import { useEffect, useState, type FormEvent } from "react";
import { getAllProducts } from "@/lib/firebase/products";
import { addProduct, deleteProduct, updateProduct } from "@/lib/firebase/admin";
import { products as seedProducts, categories } from "@/lib/data/catalog";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/lib/utils/format";
import type { Product } from "@/types";

type Draft = {
  name: string; brand: string; category: string;
  price: string; mrp: string; stock: string; description: string;
};

const emptyDraft: Draft = {
  name: "", brand: "", category: categories[0]?.slug ?? "",
  price: "", mrp: "", stock: "", description: "",
};

export default function AdminProductsPage() {
  const { notify } = useToast();
  const [list, setList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    getAllProducts()
      .then((p) => setList(p.length ? p : seedProducts))
      .catch(() => setList(seedProducts))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openAdd = () => {
    setEditing(null);
    setDraft(emptyDraft);
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setDraft({
      name: p.name, brand: p.brand, category: p.category,
      price: String(p.price), mrp: String(p.mrp),
      stock: String(p.stock), description: p.description,
    });
    setShowForm(true);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = {
      name: draft.name,
      brand: draft.brand,
      category: draft.category,
      price: Number(draft.price),
      mrp: Number(draft.mrp),
      stock: Number(draft.stock),
      description: draft.description,
      rating: editing?.rating ?? 4.7,
      reviewCount: editing?.reviewCount ?? 0,
      images: editing?.images ?? [],
      tags: editing?.tags ?? [],
    };
    try {
      if (editing) {
        await updateProduct(editing.id, payload);
        notify("Product updated");
      } else {
        await addProduct(payload as Omit<Product, "id" | "createdAt">);
        notify("Product added");
      }
      setShowForm(false);
      load();
    } catch {
      notify("Save failed — check Firebase config & admin role");
    }
  };

  const onDelete = async (p: Product) => {
    try {
      await deleteProduct(p.id);
      notify("Product deleted");
      setList((prev) => prev.filter((x) => x.id !== p.id));
    } catch {
      notify("Delete failed");
    }
  };

  const field = "w-full rounded-xl border border-copper/20 px-4 py-2.5 text-[14px] outline-none focus:border-copper";

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-playfair text-[clamp(26px,3.4vw,38px)] font-bold text-brown">Products</h1>
        <button onClick={openAdd} className="rounded-full bg-copper px-5 py-2.5 text-[12.5px] font-semibold text-white hover:bg-copper-dark">
          + Add Product
        </button>
      </div>

      {showForm && (
        <form onSubmit={onSubmit} className="mb-8 grid grid-cols-1 gap-4 rounded-3xl border border-copper/15 bg-white p-6 sm:grid-cols-2">
          <h2 className="font-playfair text-[20px] font-semibold text-brown sm:col-span-2">
            {editing ? "Edit Product" : "New Product"}
          </h2>
          <input required placeholder="Name" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} className={`${field} sm:col-span-2`} />
          <input required placeholder="Brand" value={draft.brand} onChange={(e) => setDraft({ ...draft, brand: e.target.value })} className={field} />
          <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} className={field}>
            {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
          </select>
          <input required type="number" placeholder="Price (₹)" value={draft.price} onChange={(e) => setDraft({ ...draft, price: e.target.value })} className={field} />
          <input required type="number" placeholder="MRP (₹)" value={draft.mrp} onChange={(e) => setDraft({ ...draft, mrp: e.target.value })} className={field} />
          <input required type="number" placeholder="Stock" value={draft.stock} onChange={(e) => setDraft({ ...draft, stock: e.target.value })} className={`${field} sm:col-span-2`} />
          <textarea placeholder="Description" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} className={`${field} sm:col-span-2`} rows={3} />
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
                <th className="px-5 py-3.5">Product</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Stock</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id} className="border-b border-black/5 last:border-0">
                  <td className="px-5 py-3.5 font-medium text-brown">{p.name}<div className="text-[11.5px] font-normal text-muted">{p.brand}</div></td>
                  <td className="px-5 py-3.5 capitalize text-muted">{p.category.replace(/-/g, " ")}</td>
                  <td className="px-5 py-3.5 text-brown">{formatPrice(p.price)}</td>
                  <td className="px-5 py-3.5 text-muted">{p.stock}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => openEdit(p)} className="rounded-full border border-copper/25 px-3.5 py-1.5 text-[12px] font-semibold text-copper-dark hover:bg-copper/10">Edit</button>
                      <button onClick={() => onDelete(p)} className="rounded-full border border-red-200 px-3.5 py-1.5 text-[12px] font-semibold text-red-500 hover:bg-red-50">Delete</button>
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
