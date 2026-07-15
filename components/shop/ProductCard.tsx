"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { WishlistHeart } from "@/components/ui/WishlistHeart";
import { CardPetalBurst } from "@/components/ui/CardPetalBurst";
import { useWishlistToggle } from "@/components/ui/useWishlistToggle";
import { formatPrice, discountLabel, reviewsString } from "@/lib/utils/format";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
  /** "carousel" shows the bottom-right floating Add button; "grid" shows an inline Add. */
  variant?: "carousel" | "grid";
}

export function ProductCard({ product, variant = "carousel" }: ProductCardProps) {
  const { addToCart } = useCart();
  const { notify } = useToast();
  const { wished, onWish, burst } = useWishlistToggle(product);
  const catLabel = product.category.replace(/-/g, " ");
  const [pop, setPop] = useState(0);

  const onAdd = () => {
    addToCart(product, 1);
    setPop((k) => k + 1);
    notify(`${product.name} added to bag 🛍️`);
  };

  return (
    <div className="group relative rounded-[24px] border border-copper/[0.07] bg-white pt-5 shadow-[0_22px_50px_-30px_rgba(201,143,115,0.45)] transition-all duration-[450ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] hover:-translate-y-[10px] hover:border-copper/30 hover:shadow-[0_44px_80px_-26px_rgba(201,143,115,0.7)] sm:pt-7">
      {/* luxury hover glow halo behind the card */}
      <span
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition-opacity duration-[450ms] group-hover:opacity-100"
        style={{ background: "radial-gradient(120% 80% at 50% 0%,rgba(232,203,160,0.22),transparent 60%)" }}
      />
      {/* image stage — product floats and partially overflows the top of the card */}
      <div
        className="relative mx-2.5 h-[128px] rounded-[20px] sm:h-[210px]"
        style={{ background: "linear-gradient(160deg,#FAF7F2,#F3ECE4)" }}
      >
        {/* sheen sweep on hover (clipped to the well) */}
        <span className="pointer-events-none absolute inset-0 z-[2] overflow-hidden rounded-[20px]">
          <span className="absolute -inset-y-6 -left-1/2 w-1/2 -skew-x-12 bg-white/40 opacity-0 transition-all duration-[850ms] group-hover:left-[130%] group-hover:opacity-100" />
        </span>
        {/* soft contact shadow under the floating product */}
        <span className="pointer-events-none absolute bottom-3 left-1/2 h-[18px] w-[62%] -translate-x-1/2 rounded-[50%] bg-brown/15 blur-md transition-all duration-700 group-hover:w-[68%] group-hover:bg-brown/20" />

        <Link
          href={`/shop/${product.id}`}
          className="absolute inset-x-0 -top-[34px] bottom-0 flex items-end justify-center"
        >
          <ImageSlot
            src={product.images[0] || undefined}
            placeholder={product.name}
            radius={18}
            className="h-[150px] w-[80%] -translate-y-2 drop-shadow-[0_24px_30px_rgba(91,70,56,0.28)] transition-transform duration-700 [transition-timing-function:cubic-bezier(.22,.61,.36,1)] group-hover:-translate-y-5 group-hover:rotate-[2deg] group-hover:scale-[1.07] sm:h-[238px]"
          />
        </Link>

        {product.tags[0] && (
          <div
            className="absolute right-2.5 top-2.5 z-[3] rounded-[7px] px-2 py-[3px] text-[8px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_6px_14px_-8px_rgba(91,70,56,0.45)]"
            style={{ background: product.tagBg ?? "linear-gradient(135deg,#5B4638,#7A5A48)" }}
          >
            {product.tags[0]}
          </div>
        )}

        <WishlistHeart wished={wished} onToggle={onWish} className="absolute left-3 top-3 z-[4]" />

        {variant === "carousel" && (
          <button
            key={pop}
            onClick={onAdd}
            className={`absolute bottom-3 right-3 z-[3] flex items-center gap-[7px] rounded-full border-none px-[18px] py-2.5 text-[11.5px] font-semibold tracking-[0.04em] text-cream shadow-[0_12px_24px_-10px_rgba(91,70,56,0.55)] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-0.5 hover:scale-[1.04] active:scale-95 ${pop ? "anim-cartPop" : ""}`}
            style={{ background: "linear-gradient(135deg,#5B4638,#3A2C22)" }}
          >
            + Add to Bag
          </button>
        )}
      </div>

      <div className="px-3 pb-3.5 pt-3 sm:px-[18px] sm:pb-[19px] sm:pt-[15px]">
        <div className="mb-[7px] text-[9.5px] font-bold uppercase tracking-[0.12em] text-copper">
          {catLabel}
        </div>
        <Link
          href={`/shop/${product.id}`}
          className="mb-[9px] block min-h-[40px] cursor-pointer font-playfair text-[15px] font-semibold leading-[1.16] text-brown transition-colors duration-300 group-hover:text-copper-dark sm:min-h-[44px] sm:text-[19px]"
        >
          {product.name}
        </Link>
        <div className="mb-[13px] flex items-center gap-[5px] text-[11.5px] text-muted">
          <span className="text-copper-light">★</span>
          <b className="font-semibold text-brown">{product.rating.toFixed(1)}</b>
          <span className="text-[#CDBBAA]">·</span>
          {reviewsString(product.reviewCount)} reviews
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-[7px]">
            <span className="text-[15px] font-bold text-brown sm:text-[19px]">{formatPrice(product.price)}</span>
            <span className="hidden text-xs text-[#CDBBAA] line-through sm:inline">{formatPrice(product.mrp)}</span>
          </div>
          {variant === "carousel" ? (
            <span className="rounded-lg bg-copper/[0.12] px-[9px] py-1 text-[10.5px] font-bold text-copper-dark">
              {discountLabel(product.mrp, product.price)}
            </span>
          ) : (
            <button
              key={pop}
              onClick={onAdd}
              className={`flex items-center gap-1.5 rounded-full border-none px-4 py-[9px] text-[11.5px] font-semibold text-cream shadow-[0_10px_22px_-10px_rgba(91,70,56,0.5)] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-0.5 hover:!bg-copper active:scale-95 ${pop ? "anim-cartPop" : ""}`}
              style={{ background: "linear-gradient(135deg,#5B4638,#7A5A48)" }}
            >
              Add
            </button>
          )}
        </div>
      </div>

      <CardPetalBurst burstKey={burst} />
    </div>
  );
}
