"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type KeyboardEvent } from "react";
import { categories } from "@/lib/data/catalog";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const router = useRouter();
  if (!open) return null;

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const onSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const q = (e.target as HTMLInputElement).value.trim();
      go(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[45] bg-brown/20 backdrop-blur-sm lg:hidden" onClick={onClose} />
      <div className="anim-fadeIn absolute left-0 right-0 z-[50] flex flex-col gap-0.5 border-t border-copper/10 bg-white/[0.98] px-6 pb-[22px] pt-2 lg:hidden">
        <div className="my-1.5 mb-3 flex items-center gap-2.5 rounded-xl bg-copper/[0.06] px-3.5 py-3 text-sm text-mid">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C98F73" strokeWidth="1.7" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" />
          </svg>
          <input
            onKeyDown={onSearchKey}
            placeholder="Search products & brands…"
            className="w-full border-none bg-transparent font-manrope text-sm text-brown outline-none"
          />
        </div>

        <MobileLink label="Home" onClick={() => go("/")} />
        <MobileLink label="Categories" onClick={() => go("/shop")} />
        <div className="flex flex-wrap gap-[7px] border-b border-black/5 px-0 pb-3.5 pt-1">
          {categories.map((c) => (
            <span
              key={c.id}
              onClick={() => go(`/shop?category=${c.slug}`)}
              className="cursor-pointer rounded-full bg-copper/[0.06] px-3 py-1.5 text-xs text-muted"
            >
              {c.name}
            </span>
          ))}
        </div>
        <MobileLink label="Brands" onClick={() => go("/brands")} />
        <MobileLink label="New Arrivals" onClick={() => go("/shop?sort=new")} />
        <MobileLink label="Best Sellers" onClick={() => go("/shop?sort=bestseller")} />
        <span
          onClick={() => go("/offers")}
          className="flex cursor-pointer items-center gap-2 border-b border-black/5 py-3 text-[15px] font-semibold text-copper-dark"
        >
          Offers{" "}
          <span
            className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-extrabold tracking-[0.08em] text-white"
            style={{ background: "linear-gradient(135deg,#E4674E,#D8B08C)", boxShadow: "0 4px 14px -3px rgba(228,103,78,0.7)" }}
          >
            <span className="anim-pulse inline-block h-[5px] w-[5px] rounded-full bg-white" />
            SALE
          </span>
        </span>
        <MobileLink label="Contact" onClick={() => go("/")} last />
      </div>
    </>
  );
}

function MobileLink({
  label,
  onClick,
  last = false,
}: {
  label: string;
  onClick: () => void;
  last?: boolean;
}) {
  return (
    <span
      onClick={onClick}
      className={`cursor-pointer py-3 text-[15px] font-medium ${last ? "" : "border-b border-black/5"}`}
    >
      {label}
    </span>
  );
}
