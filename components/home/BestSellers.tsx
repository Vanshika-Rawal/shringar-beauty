"use client";

import { useRef } from "react";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Product } from "@/types";

export function BestSellers({ products }: { products: Product[] }) {
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 660);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(155deg,#3A2C22 0%,#5B4638 46%,#7A5A48 100%)" }}
      />
      {/* fine cream grid wash so the dark stage reads as premium, not flat */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,247,242,.9) 1px,transparent 1px),linear-gradient(90deg,rgba(250,247,242,.9) 1px,transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />
      <span className="pointer-events-none absolute right-[-6%] top-[-10%] h-[440px] w-[440px] rounded-full opacity-45 anim-blob" style={{ background: "radial-gradient(circle,rgba(232,203,160,.5),transparent 70%)" }} />
      <span className="pointer-events-none absolute left-[-8%] bottom-[-12%] h-[380px] w-[380px] rounded-full opacity-40" style={{ background: "radial-gradient(circle,rgba(201,143,115,.5),transparent 70%)", animation: "blob 24s ease-in-out infinite reverse" }} />
      <div className="relative mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-[clamp(52px,6vw,88px)]">
        <SectionHeader
          overline="Loved by Thousands"
          title="Best Sellers"
          align="between"
          overlineColor="#E8CBA0"
          tone="dark"
          action={
            <div className="hidden items-center gap-2.5 sm:flex">
              <ArrowButton dir="left" onClick={() => scroll(-1)} />
              <ArrowButton dir="right" onClick={() => scroll(1)} />
            </div>
          }
        />
        <div
          ref={track}
          className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-2 pt-2"
        >
          {products.map((p) => (
            <div key={p.id} className="w-[270px] flex-none snap-start">
              <ProductCard product={p} variant="carousel" />
            </div>
          ))}
        </div>

        {/* mobile arrows */}
        <div className="mt-6 flex justify-center gap-3 sm:hidden">
          <ArrowButton dir="left" onClick={() => scroll(-1)} />
          <ArrowButton dir="right" onClick={() => scroll(1)} />
        </div>
      </div>
    </section>
  );
}

function ArrowButton({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous" : "Next"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-white/10 text-cream shadow-[0_10px_24px_-16px_rgba(0,0,0,0.6)] backdrop-blur transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold hover:text-brown"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
