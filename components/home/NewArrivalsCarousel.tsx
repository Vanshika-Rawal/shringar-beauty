"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { WishlistHeart } from "@/components/ui/WishlistHeart";
import { CardPetalBurst } from "@/components/ui/CardPetalBurst";
import { useWishlistToggle } from "@/components/ui/useWishlistToggle";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatPrice, discountLabel } from "@/lib/utils/format";
import type { Product } from "@/types";

export function NewArrivalsCarousel({
  products,
  overline = "Just Landed",
  title = "New Arrivals",
}: {
  products: Product[];
  overline?: string;
  title?: string;
}) {
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 640);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="bg-warm">
      <div className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-[clamp(48px,6vw,84px)]">
        <SectionHeader
          overline={overline}
          title={title}
          align="between"
          overlineColor="#D8B08C"
          action={
            <div className="hidden items-center gap-2.5 sm:flex">
              <ArrowButton dir="left" onClick={() => scroll(-1)} />
              <ArrowButton dir="right" onClick={() => scroll(1)} />
            </div>
          }
        />

        <div
          ref={track}
          className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-[clamp(14px,1.6vw,22px)] overflow-x-auto scroll-smooth px-1 pb-2"
        >
          {products.map((p) => (
            <NewArrivalCard key={p.id} product={p} />
          ))}
        </div>

        {/* mobile arrows */}
        <div className="mt-5 flex justify-center gap-3 sm:hidden">
          <ArrowButton dir="left" onClick={() => scroll(-1)} />
          <ArrowButton dir="right" onClick={() => scroll(1)} />
        </div>
      </div>
    </section>
  );
}

function NewArrivalCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { notify } = useToast();
  const { wished, onWish, burst } = useWishlistToggle(product);
  const [pop, setPop] = useState(0);

  const onAdd = () => {
    addToCart(product, 1);
    setPop((k) => k + 1);
    notify(`${product.name} added to bag 🛍️`);
  };

  return (
    <div className="group relative w-[165px] flex-none snap-start rounded-[24px] border border-copper/[0.08] bg-white pt-5 shadow-[0_22px_50px_-30px_rgba(201,143,115,0.45)] transition-all duration-[450ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] hover:-translate-y-[9px] hover:border-copper/30 hover:shadow-[0_40px_74px_-26px_rgba(201,143,115,0.7)] sm:w-[260px] sm:pt-7">
      {/* luxury hover glow halo */}
      <span
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition-opacity duration-[450ms] group-hover:opacity-100"
        style={{ background: "radial-gradient(120% 80% at 50% 0%,rgba(232,203,160,0.22),transparent 60%)" }}
      />
      <div className="relative mx-2.5 h-[150px] rounded-[20px] sm:h-[220px]" style={{ background: "linear-gradient(160deg,#FAF7F2,#F3ECE4)" }}>
        <span className="pointer-events-none absolute bottom-3 left-1/2 h-[18px] w-[62%] -translate-x-1/2 rounded-[50%] bg-brown/15 blur-md transition-all duration-700 group-hover:w-[68%] group-hover:bg-brown/20" />

        <Link href={`/shop/${product.id}`} className="absolute inset-x-0 -top-[34px] bottom-0 flex items-end justify-center">
          <ImageSlot
            src={product.images[0] || undefined}
            placeholder={product.name}
            radius={18}
            className="h-[180px] w-[80%] -translate-y-2 drop-shadow-[0_24px_30px_rgba(91,70,56,0.28)] transition-transform duration-[800ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] group-hover:-translate-y-5 group-hover:rotate-[2deg] group-hover:scale-[1.08] sm:h-[248px]"
          />
        </Link>

        <span className="absolute right-2.5 top-2.5 z-[3] rounded-[7px] bg-gradient-to-br from-copper to-copper-dark px-2 py-[3px] text-[8px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_6px_14px_-8px_rgba(91,70,56,0.45)]">
          New
        </span>

        <WishlistHeart wished={wished} onToggle={onWish} className="absolute left-3 top-3 z-[4]" />

        {/* quick add — slides up on hover */}
        <button
          key={pop}
          onClick={onAdd}
          className={`absolute inset-x-3 bottom-3 z-[3] translate-y-[140%] rounded-full bg-gradient-to-br from-brown to-brown-dark py-2.5 text-[12px] font-semibold tracking-[0.04em] text-cream opacity-0 shadow-[0_12px_24px_-10px_rgba(91,70,56,0.55)] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] group-hover:translate-y-0 group-hover:opacity-100 active:scale-95 ${pop ? "anim-cartPop" : ""}`}
        >
          + Quick Add to Bag
        </button>
      </div>

      <div className="px-3 pb-3.5 pt-3 sm:px-[18px] sm:pb-[18px] sm:pt-[15px]">
        <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-copper">
          {product.brand}
        </div>
        <Link
          href={`/shop/${product.id}`}
          className="mb-2 block min-h-[38px] font-playfair text-[15px] font-semibold leading-[1.16] text-brown sm:min-h-[42px] sm:text-[18px]"
        >
          {product.name}
        </Link>
        <div className="mb-2.5 flex items-center gap-1 text-[11.5px] text-muted">
          <span className="text-copper-light">★</span>
          <b className="font-semibold text-brown">{product.rating.toFixed(1)}</b>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[15px] font-bold text-brown sm:text-[18px]">{formatPrice(product.price)}</span>
            <span className="hidden text-[11px] text-[#CDBBAA] line-through sm:inline">{formatPrice(product.mrp)}</span>
          </div>
          <span className="rounded-lg bg-copper/[0.12] px-2 py-1 text-[10px] font-bold text-copper-dark">
            {discountLabel(product.mrp, product.price)}
          </span>
        </div>
      </div>

      <CardPetalBurst burstKey={burst} />
    </div>
  );
}

function ArrowButton({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous" : "Next"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-copper/25 bg-white text-brown shadow-[0_10px_24px_-16px_rgba(91,70,56,0.6)] transition-all hover:-translate-y-0.5 hover:border-copper hover:bg-copper hover:text-white"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
