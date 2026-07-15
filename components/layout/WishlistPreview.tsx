"use client";

import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils/format";
import { ImageSlot } from "@/components/ui/ImageSlot";

export function WishlistPreview() {
  const { items, count } = useWishlist();

  return (
    <div
      className="anim-fadeUp absolute right-0 top-[calc(100%+14px)] z-[60] hidden w-[300px] rounded-[18px] border border-copper/15 bg-white/95 p-[18px] backdrop-blur-xl md:block"
      style={{ boxShadow: "0 30px 60px -22px rgba(201,143,115,.45)" }}
    >
      <span className="absolute right-[18px] top-[-7px] h-[14px] w-[14px] rotate-45 border-l border-t border-copper/15 bg-white/95" />
      <div className="mb-3.5 font-playfair text-[18px] text-brown">
        Your Wishlist{" "}
        <span className="font-manrope text-xs text-mid">· {count} saved</span>
      </div>

      {items.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted">No saved items yet.</p>
      ) : (
        <div className="mb-3.5 flex flex-col gap-3">
          {items.slice(0, 4).map((w) => (
            <Link
              key={w.productId}
              href={`/shop/${w.productId}`}
              className="flex cursor-pointer items-center gap-[11px]"
            >
              <ImageSlot
                src={w.image || undefined}
                placeholder={w.name}
                className="h-[50px] w-[46px] flex-none"
                radius={10}
              />
              <div className="min-w-0 flex-1">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[12.5px] font-medium leading-tight text-brown">
                  {w.name}
                </div>
                <div className="mt-[3px] text-[13px] font-bold text-copper">
                  {formatPrice(w.price)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Link
        href="/wishlist"
        className="block w-full rounded-full bg-copper-light/10 py-[11px] text-center text-[12.5px] font-semibold text-copper transition-colors hover:bg-copper-light/20"
      >
        View Wishlist →
      </Link>
    </div>
  );
}
