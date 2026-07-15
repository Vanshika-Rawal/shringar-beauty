"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { OfferCard } from "./OfferCard";
import { formatPrice, discountLabel, reviewsString } from "@/lib/utils/format";
import type { Product } from "@/types";

export function OffersClient({ products }: { products: Product[] }) {
  const [quick, setQuick] = useState<Product | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-x-3.5 gap-y-5 sm:gap-[clamp(16px,2vw,24px)] sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {products.map((p) => (
          <OfferCard key={p.id} product={p} onQuickView={setQuick} />
        ))}
      </div>

      {quick && <QuickView product={quick} onClose={() => setQuick(null)} />}
    </>
  );
}

function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addToCart } = useCart();
  const { notify } = useToast();
  const save = product.mrp - product.price;

  const onAdd = () => {
    addToCart(product, 1);
    notify(`${product.name} added to bag`);
    onClose();
  };

  return (
    <div
      className="anim-fadeIn fixed inset-0 z-[80] flex items-center justify-center bg-brown/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="anim-fadeUp relative grid w-full max-w-[760px] grid-cols-1 overflow-hidden rounded-[26px] bg-white shadow-[0_50px_90px_-30px_rgba(91,70,56,.6)] sm:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brown shadow transition-colors hover:bg-cream"
        >
          ✕
        </button>

        <div className="relative" style={{ background: "linear-gradient(160deg,#FAF7F2,#F3ECE4)" }}>
          <ImageSlot
            src={product.images[0] || undefined}
            placeholder={product.name}
            className="h-full min-h-[260px] w-full"
          />
          <span className="absolute left-3.5 top-3.5 rounded-[9px] bg-gradient-to-br from-[#B0735A] to-[#5B4638] px-3 py-1.5 text-[11px] font-extrabold text-white">
            {discountLabel(product.mrp, product.price)}
          </span>
        </div>

        <div className="flex flex-col p-7">
          <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-copper">
            {product.brand}
          </div>
          <h2 className="font-playfair text-[26px] font-semibold leading-[1.15] text-brown">
            {product.name}
          </h2>
          <div className="mt-2 flex items-center gap-1.5 text-[12px] text-muted">
            <span className="text-copper-light">★</span>
            <b className="font-semibold text-brown">{product.rating.toFixed(1)}</b>
            <span className="text-[#CDBBAA]">·</span>
            {reviewsString(product.reviewCount)} reviews
          </div>

          <p className="mt-3 line-clamp-3 text-[13px] leading-[1.65] text-muted">
            {product.description}
          </p>

          <div className="mt-4 flex items-baseline gap-2.5">
            <span className="text-[26px] font-bold text-brown">{formatPrice(product.price)}</span>
            <span className="text-[14px] text-[#CDBBAA] line-through">{formatPrice(product.mrp)}</span>
            {save > 0 && (
              <span className="rounded-md bg-gold/90 px-2 py-0.5 text-[11px] font-bold text-brown">
                Save {formatPrice(save)}
              </span>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={onAdd}
              className="flex-1 rounded-full bg-gradient-to-br from-brown to-[#7A5A48] py-3 text-[13.5px] font-semibold text-cream transition-all hover:-translate-y-0.5 hover:from-copper hover:to-copper-dark"
            >
              + Add to Bag
            </button>
            <Link
              href={`/shop/${product.id}`}
              className="flex items-center rounded-full border border-copper/30 px-5 text-[13px] font-semibold text-copper-dark transition-colors hover:bg-copper/10"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
