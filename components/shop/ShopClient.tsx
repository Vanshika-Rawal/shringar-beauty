"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "./ProductCard";
import { categories as allCategories, products as allProducts } from "@/lib/data/catalog";
import { formatPrice } from "@/lib/utils/format";
import type { Product } from "@/types";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating" | "new";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
  { key: "new", label: "New Arrivals" },
];

export function ShopClient({ products = allProducts }: { products?: Product[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const categoryParam = params.get("category") ?? "";
  const brandParam = params.get("brand") ?? "";
  const query = params.get("q")?.toLowerCase() ?? "";
  const initialSort = (params.get("sort") as SortKey) || "featured";

  // Derive the brand filter list from the actual catalogue so every option
  // always matches at least one product (the static list used to mismatch).
  const brandList = useMemo(
    () => [...new Set(products.map((p) => p.brand))].sort((a, b) => a.localeCompare(b)),
    [products]
  );

  const [selectedCats, setSelectedCats] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>(
    brandParam ? [brandParam] : []
  );
  const [maxPrice, setMaxPrice] = useState(5500);
  const [sort, setSort] = useState<SortKey>(initialSort);
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);

  // Keep the filters in sync with the URL. Without this, clicking a category in
  // the navbar while already on /shop changes the query string but not the
  // selection, so nothing re-filters.
  useEffect(() => {
    setSelectedCats(categoryParam ? [categoryParam] : []);
  }, [categoryParam]);

  useEffect(() => {
    setSelectedBrands(brandParam ? [brandParam] : []);
  }, [brandParam]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (query && !(`${p.name} ${p.brand}`.toLowerCase().includes(query))) return false;
      if (selectedCats.length && !selectedCats.includes(p.category)) return false;
      if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
      if (p.price > maxPrice) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "price-asc": return a.price - b.price;
        case "price-desc": return b.price - a.price;
        case "rating": return b.rating - a.rating;
        case "new": return Number(b.newArrival) - Number(a.newArrival);
        default: return Number(b.featured) - Number(a.featured);
      }
    });
    return list;
  }, [products, query, selectedCats, selectedBrands, maxPrice, sort]);

  const toggle = (
    value: string,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const clearAll = () => {
    setSelectedCats([]);
    setSelectedBrands([]);
    setMaxPrice(5500);
  };

  const Sidebar = (
    <aside className="flex flex-col gap-7">
      <FilterGroup title="Category">
        {allCategories.map((c) => (
          <Checkbox
            key={c.id}
            label={c.name}
            checked={selectedCats.includes(c.slug)}
            onChange={() => toggle(c.slug, selectedCats, setSelectedCats)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Brand">
        {brandList.map((b) => (
          <Checkbox
            key={b}
            label={b}
            checked={selectedBrands.includes(b)}
            onChange={() => toggle(b, selectedBrands, setSelectedBrands)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Price">
        <input
          type="range"
          min={500}
          max={5500}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-copper"
        />
        <div className="mt-1 flex justify-between text-[12px] text-muted">
          <span>{formatPrice(500)}</span>
          <span className="font-semibold text-brown">Up to {formatPrice(maxPrice)}</span>
        </div>
      </FilterGroup>

      <button
        onClick={clearAll}
        className="rounded-full border border-copper/30 py-2.5 text-[12.5px] font-semibold text-copper-dark transition-colors hover:bg-copper/10"
      >
        Clear all filters
      </button>
    </aside>
  );

  return (
    <div className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-10">
      {/* desktop "Back" pill — mobile uses the global floating arrow instead */}
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-2 rounded-full border border-copper/30 bg-white px-5 py-2.5 text-[13px] font-semibold text-brown shadow-[0_10px_24px_-18px_rgba(91,70,56,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:border-copper hover:bg-copper hover:text-cream max-md:hidden"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 6l-6 6 6 6" />
        </svg>
        Back
      </button>
      <div className="mb-8">
        <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-copper">
          {query ? `Results for "${query}"` : "The Collection"}
        </div>
        <h1 className="m-0 font-playfair text-[clamp(30px,4.2vw,48px)] font-bold text-brown">
          Shop All Beauty
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[230px_1fr]">
        <div className="hidden md:block">{Sidebar}</div>

        <div>
          <div className="mb-6 flex items-center justify-between gap-3">
            <button
              onClick={() => setMobileFilters((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full border border-copper/30 bg-white px-4 py-2.5 text-[12.5px] font-semibold text-brown transition-colors hover:border-copper hover:text-copper-dark md:hidden"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M3 6h18M7 12h10M11 18h2" />
              </svg>
              Filters
            </button>
            <span className="hidden text-[13px] text-muted md:inline">
              {filtered.length} products
            </span>

            {/* ===== sort — a proper dropdown, not a bare <select> ===== */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={sortOpen}
                className="block rounded-full p-[1.5px] shadow-[0_12px_26px_-18px_rgba(183,110,121,0.6)] transition-shadow duration-300 hover:shadow-[0_18px_34px_-16px_rgba(183,110,121,0.75)]"
                style={{ background: "linear-gradient(140deg,#F7E9DC,#E8CBA0 38%,#D8B08C 68%,#B76E79)" }}
              >
                <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
                    Sort
                  </span>
                  <span className="text-[12.5px] font-semibold text-brown">
                    {sortOptions.find((o) => o.key === sort)?.label}
                  </span>
                  <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C98F73"
                    strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"
                    className={`transition-transform duration-300 ${sortOpen ? "rotate-180" : ""}`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </button>

              {sortOpen && (
                <>
                  {/* click-away */}
                  <div className="fixed inset-0 z-30" onClick={() => setSortOpen(false)} />
                  <div className="anim-fadeUp absolute right-0 z-40 mt-2.5 w-[212px] overflow-hidden rounded-2xl border border-copper/15 bg-white/95 p-1.5 shadow-[0_30px_60px_-24px_rgba(91,70,56,0.45)] backdrop-blur-md">
                    {sortOptions.map((o) => {
                      const active = o.key === sort;
                      return (
                        <button
                          key={o.key}
                          role="option"
                          aria-selected={active}
                          onClick={() => {
                            setSort(o.key);
                            setSortOpen(false);
                          }}
                          className={`flex w-full items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-left text-[12.5px] transition-colors duration-200 ${
                            active
                              ? "bg-copper/10 font-semibold text-copper-dark"
                              : "font-medium text-brown hover:bg-warm"
                          }`}
                        >
                          {o.label}
                          {active && (
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12l5 5L20 7" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {mobileFilters && (
            <div className="mb-6 rounded-2xl border border-copper/15 bg-white p-5 md:hidden">
              {Sidebar}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-copper/15 bg-white py-20 text-center">
              <p className="font-playfair text-[22px] text-brown">No products found</p>
              <p className="mt-2 text-sm text-muted">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-3.5 gap-y-5 sm:gap-[clamp(16px,2vw,24px)] sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} variant="grid" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brown">
        {title}
      </div>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[13px] text-muted transition-colors hover:text-brown">
      <span
        className="flex h-4 w-4 items-center justify-center rounded-[5px] border transition-colors"
        style={{
          borderColor: checked ? "#C98F73" : "rgba(201,143,115,0.4)",
          background: checked ? "#C98F73" : "transparent",
        }}
      >
        {checked && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
        )}
      </span>
      <input type="checkbox" checked={checked} onChange={onChange} className="hidden" />
      {label}
    </label>
  );
}
