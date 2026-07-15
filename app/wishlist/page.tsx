"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { formatPrice } from "@/lib/utils/format";
import { getProductById } from "@/lib/data/catalog";

export default function WishlistPage() {
  const { items, remove } = useWishlist();
  const { addToCart } = useCart();
  const { notify } = useToast();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-24 text-center">
        <h1 className="font-playfair text-[clamp(28px,4vw,44px)] font-semibold text-brown">
          Your wishlist is empty
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Tap the heart on any product to save it here for later.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full px-9 py-4 text-[14px] font-semibold text-cream"
          style={{ background: "linear-gradient(135deg,#4A3528,#5B4638)" }}
        >
          Explore Products →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-10">
      <div className="mb-8">
        <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-copper">
          Saved for later
        </div>
        <h1 className="m-0 font-playfair text-[clamp(28px,4vw,44px)] font-bold text-brown">
          Your Wishlist <span className="text-[18px] font-normal text-mid">· {items.length} items</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-x-3.5 gap-y-5 sm:gap-[clamp(16px,2vw,24px)] sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {items.map((w) => (
          <div key={w.productId} className="overflow-hidden rounded-[24px] border border-copper/[0.07] bg-white shadow-[0_22px_50px_-32px_rgba(201,143,115,0.45)]">
            <div className="relative">
              <Link href={`/shop/${w.productId}`}>
                <ImageSlot src={w.image || undefined} placeholder={w.name} className="h-[140px] w-full sm:h-[230px]" />
              </Link>
              <button
                onClick={() => { remove(w.productId); notify("Removed from Wishlist 💔"); }}
                aria-label="Remove"
                className="absolute right-2.5 top-2.5 flex h-[32px] w-[32px] items-center justify-center rounded-full bg-white/85 text-[15px] text-copper shadow-[0_8px_18px_-8px_rgba(91,70,56,0.35)] backdrop-blur transition-transform hover:scale-110 sm:right-3 sm:top-3 sm:h-[38px] sm:w-[38px] sm:text-[17px]"
              >
                ♥
              </button>
            </div>
            <div className="px-3 pb-3.5 pt-3 sm:px-[18px] sm:pb-[18px] sm:pt-4">
              <div className="mb-1.5 text-[9.5px] font-bold uppercase tracking-[0.12em] text-copper">{w.brand}</div>
              <Link href={`/shop/${w.productId}`} className="block min-h-[38px] font-playfair text-[15px] font-semibold leading-tight text-brown sm:min-h-[44px] sm:text-[18px]">
                {w.name}
              </Link>
              <div className="mb-3 mt-2 flex items-baseline gap-2 sm:mb-4">
                <span className="text-[15px] font-bold text-brown sm:text-[18px]">{formatPrice(w.price)}</span>
                <span className="hidden text-xs text-[#CDBBAA] line-through sm:inline">{formatPrice(w.mrp)}</span>
              </div>
              <button
                onClick={() => {
                  const product = getProductById(w.productId);
                  if (product) {
                    addToCart(product, 1);
                    remove(w.productId);
                    notify(`${product.name} added to bag 🛍️`);
                  }
                }}
                className="w-full rounded-full py-2.5 text-[11.5px] font-semibold text-cream transition-transform hover:-translate-y-0.5 sm:py-3 sm:text-[12.5px]"
                style={{ background: "linear-gradient(135deg,#5B4638,#7A5A48)" }}
              >
                + Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
