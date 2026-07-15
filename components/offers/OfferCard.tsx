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

export function OfferCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView: (p: Product) => void;
}) {
  const { addToCart } = useCart();
  const { notify } = useToast();
  const { wished, onWish, burst } = useWishlistToggle(product);
  const save = product.mrp - product.price;
  const [pop, setPop] = useState(0);

  const onAdd = () => {
    addToCart(product, 1);
    setPop((k) => k + 1);
    notify("Added to Cart 🛍️");
  };

  return (
    <div className="group relative flex flex-col rounded-[24px] border border-copper/[0.08] bg-white pt-7 shadow-[0_22px_50px_-30px_rgba(201,143,115,0.45)] transition-all duration-[450ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] hover:-translate-y-[9px] hover:border-copper/30 hover:shadow-[0_40px_74px_-26px_rgba(201,143,115,0.7)]">
      {/* luxury hover glow halo */}
      <span
        className="pointer-events-none absolute -inset-px rounded-[24px] opacity-0 transition-opacity duration-[450ms] group-hover:opacity-100"
        style={{ background: "radial-gradient(120% 80% at 50% 0%,rgba(232,203,160,0.22),transparent 60%)" }}
      />
      <div className="relative mx-2.5 h-[150px] rounded-[20px] sm:h-[210px]" style={{ background: "linear-gradient(160deg,#FAF7F2,#F3ECE4)" }}>
        <span className="pointer-events-none absolute bottom-3 left-1/2 h-[18px] w-[62%] -translate-x-1/2 rounded-[50%] bg-brown/15 blur-md transition-all duration-700 group-hover:w-[68%] group-hover:bg-brown/20" />

        <Link href={`/shop/${product.id}`} className="absolute inset-x-0 -top-[34px] bottom-0 flex items-end justify-center">
          <ImageSlot
            src={product.images[0] || undefined}
            placeholder={product.name}
            radius={18}
            className="h-[175px] w-[80%] -translate-y-2 drop-shadow-[0_24px_30px_rgba(91,70,56,0.28)] transition-transform duration-[800ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] group-hover:-translate-y-5 group-hover:rotate-[2deg] group-hover:scale-[1.08] sm:h-[238px]"
          />
        </Link>

        {/* % OFF badge */}
        <div className="absolute right-2.5 top-2.5 z-[3] flex flex-col items-end gap-1">
          <span className="rounded-[7px] bg-gradient-to-br from-[#B0735A] to-[#5B4638] px-2 py-[3px] text-[8.5px] font-bold tracking-[0.02em] text-white shadow-[0_6px_14px_-8px_rgba(91,70,56,0.5)]">
            {discountLabel(product.mrp, product.price)}
          </span>
          {/* Save ₹ badge */}
          {save > 0 && (
            <span className="w-fit rounded-[7px] bg-gold/95 px-2 py-[2px] text-[8px] font-bold text-brown shadow-[0_6px_14px_-10px_rgba(91,70,56,0.5)]">
              Save {formatPrice(save)}
            </span>
          )}
        </div>

        <WishlistHeart wished={wished} onToggle={onWish} className="absolute left-3 top-3 z-[4]" />

        {/* quick view — appears on hover */}
        <button
          onClick={() => onQuickView(product)}
          className="absolute inset-x-3 bottom-3 z-[3] translate-y-[140%] rounded-full bg-gradient-to-br from-brown to-[#7A5A48] py-2.5 text-[12px] font-semibold tracking-[0.04em] text-cream opacity-0 shadow-[0_12px_24px_-10px_rgba(91,70,56,0.55)] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] hover:from-copper hover:to-copper-dark group-hover:translate-y-0 group-hover:opacity-100"
        >
          ⌕ Quick View
        </button>
      </div>

      <div className="flex flex-1 flex-col px-3 pb-3.5 pt-3 sm:px-[18px] sm:pb-[18px] sm:pt-[15px]">
        <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-copper">
          {product.brand}
        </div>
        <Link
          href={`/shop/${product.id}`}
          className="mb-2 block min-h-[38px] font-playfair text-[15px] font-semibold leading-[1.16] text-brown sm:min-h-[42px] sm:text-[18px]"
        >
          {product.name}
        </Link>
        <div className="mb-3 flex items-center gap-1.5 text-[11.5px] text-muted">
          <span className="text-copper-light">★</span>
          <b className="font-semibold text-brown">{product.rating.toFixed(1)}</b>
          <span className="hidden text-[#CDBBAA] sm:inline">·</span>
          <span className="hidden sm:inline">{reviewsString(product.reviewCount)} reviews</span>
        </div>

        <div className="mt-auto flex min-w-0 items-center justify-between gap-1.5 sm:gap-2">
          <div className="flex min-w-0 items-baseline gap-1.5">
            <span className="text-[15px] font-bold text-brown sm:text-[19px]">{formatPrice(product.price)}</span>
            <span className="hidden text-[11px] text-[#CDBBAA] line-through sm:inline">{formatPrice(product.mrp)}</span>
          </div>
          <button
            key={pop}
            onClick={onAdd}
            className={`flex flex-none items-center gap-1.5 rounded-full bg-gradient-to-br from-brown to-[#7A5A48] px-2.5 py-2 text-[10.5px] font-semibold text-cream shadow-[0_10px_22px_-10px_rgba(91,70,56,0.5)] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-0.5 hover:from-copper hover:to-copper-dark active:scale-95 sm:px-4 sm:py-[9px] sm:text-[11.5px] ${pop ? "anim-cartPop" : ""}`}
          >
            + Add
          </button>
        </div>
      </div>

      <CardPetalBurst burstKey={burst} />
    </div>
  );
}
