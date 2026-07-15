"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils/format";
import { ImageSlot } from "@/components/ui/ImageSlot";

export function CartPreview() {
  const { items, count, subtotal, shipRemaining, shipPct } = useCart();

  const shipMsg =
    shipRemaining > 0
      ? `Add ${formatPrice(shipRemaining)} more for free luxury samples`
      : "You've unlocked free shipping & samples ✦";

  return (
    <div
      className="anim-fadeUp absolute right-0 top-[calc(100%+14px)] z-[60] hidden w-[330px] rounded-[18px] border border-copper/15 bg-white/95 p-[18px] backdrop-blur-xl md:block"
      style={{ boxShadow: "0 30px 60px -22px rgba(201,143,115,.45)" }}
    >
      <span className="absolute right-[18px] top-[-7px] h-[14px] w-[14px] rotate-45 border-l border-t border-copper/15 bg-white/95" />
      <div className="mb-1.5 font-playfair text-[18px] text-brown">
        Your Bag{" "}
        <span className="font-manrope text-xs text-mid">· {count} items</span>
      </div>

      <div className="my-2 mb-3.5">
        <div className="mb-1.5 text-[11px] text-muted">{shipMsg}</div>
        <div className="h-1.5 overflow-hidden rounded-md bg-copper/10">
          <div
            className="h-full rounded-md transition-[width] duration-500"
            style={{
              width: `${shipPct}%`,
              background: "linear-gradient(90deg,#C98F73,#D8B08C)",
            }}
          />
        </div>
      </div>

      {items.length === 0 ? (
        <p className="py-6 text-center text-sm text-muted">Your bag is empty.</p>
      ) : (
        <div className="noscroll mb-3.5 flex max-h-[220px] flex-col gap-3 overflow-auto">
          {items.slice(0, 5).map((c) => (
            <Link
              key={c.productId}
              href={`/shop/${c.productId}`}
              className="flex cursor-pointer items-center gap-[11px]"
            >
              <ImageSlot
                src={c.image || undefined}
                placeholder={c.name}
                className="h-[50px] w-[46px] flex-none"
                radius={10}
              />
              <div className="min-w-0 flex-1">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[12.5px] font-medium leading-tight text-brown">
                  {c.name}
                </div>
                <div className="mt-[3px] text-[11.5px] text-mid">
                  Qty {c.qty} · {formatPrice(c.price)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mb-3 flex items-baseline justify-between border-t border-black/[0.07] pt-3">
        <span className="text-[13px] text-muted">Subtotal</span>
        <span className="font-playfair text-[20px] text-brown">
          {formatPrice(subtotal)}
        </span>
      </div>
      <Link
        href="/checkout"
        className="block w-full rounded-full bg-copper py-3 text-center text-[12.5px] font-semibold text-white transition-colors hover:bg-copper-dark"
      >
        Checkout →
      </Link>
    </div>
  );
}
