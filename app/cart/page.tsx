"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { formatPrice } from "@/lib/utils/format";

const COUPONS: Record<string, number> = { SHRINGAR10: 0.1, GLOW15: 0.15 };

export default function CartPage() {
  const { items, subtotal, updateQty, removeFromCart, shipRemaining, shipPct } = useCart();
  const { notify } = useToast();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const applyCoupon = () => {
    const pct = COUPONS[code.trim().toUpperCase()];
    if (pct) {
      setDiscount(pct);
      notify(`Coupon applied — ${pct * 100}% off`);
    } else {
      setDiscount(0);
      notify("Invalid coupon code");
    }
  };

  const shipping = subtotal >= 1499 || subtotal === 0 ? 0 : 99;
  const discountAmt = subtotal * discount;
  const total = subtotal - discountAmt + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-24 text-center">
        <h1 className="font-playfair text-[clamp(28px,4vw,44px)] font-semibold text-brown">
          Your bag is empty
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Discover rituals loved by 50,000+ customers and start your glow.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-full px-9 py-4 text-[14px] font-semibold text-cream"
          style={{ background: "linear-gradient(135deg,#4A3528,#5B4638)" }}
        >
          Start Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-10">
      <h1 className="mb-8 font-playfair text-[clamp(28px,4vw,44px)] font-bold text-brown">
        Your Bag <span className="text-[18px] font-normal text-mid">· {items.length} items</span>
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        {/* items */}
        <div className="flex flex-col gap-4">
          {/* free shipping progress */}
          <div className="rounded-2xl border border-copper/15 bg-white p-5">
            <div className="mb-2 text-[12.5px] text-muted">
              {shipRemaining > 0
                ? `Add ${formatPrice(shipRemaining)} more for FREE shipping & luxury samples`
                : "You've unlocked free shipping & samples ✦"}
            </div>
            <div className="h-1.5 overflow-hidden rounded-md bg-copper/10">
              <div className="h-full rounded-md transition-[width] duration-500" style={{ width: `${shipPct}%`, background: "linear-gradient(90deg,#C98F73,#D8B08C)" }} />
            </div>
          </div>

          {items.map((c) => (
            <div key={c.productId} className="flex gap-4 rounded-2xl border border-copper/[0.08] bg-white p-4">
              <Link href={`/shop/${c.productId}`}>
                <ImageSlot src={c.image || undefined} placeholder={c.name} className="h-[110px] w-[90px] flex-none" radius={16} />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-copper">{c.brand}</div>
                    <Link href={`/shop/${c.productId}`} className="font-playfair text-[18px] font-semibold leading-tight text-brown">
                      {c.name}
                    </Link>
                  </div>
                  <button onClick={() => { removeFromCart(c.productId); notify("Removed from Cart 🗑️"); }} aria-label="Remove" className="text-mid transition-colors hover:text-copper-dark">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  </button>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center gap-1 rounded-full border border-copper/25 p-1">
                    <button onClick={() => updateQty(c.productId, c.qty - 1)} className="flex h-7 w-7 items-center justify-center rounded-full text-[16px] text-brown hover:bg-copper/10">−</button>
                    <span className="w-7 text-center text-[14px] font-semibold">{c.qty}</span>
                    <button onClick={() => updateQty(c.productId, c.qty + 1)} className="flex h-7 w-7 items-center justify-center rounded-full text-[16px] text-brown hover:bg-copper/10">+</button>
                  </div>
                  <div className="text-[18px] font-bold text-brown">{formatPrice(c.price * c.qty)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* summary */}
        <aside className="h-fit rounded-3xl border border-copper/15 bg-white p-6 lg:sticky lg:top-28">
          <h2 className="mb-5 font-playfair text-[22px] font-semibold text-brown">Order Summary</h2>

          <div className="mb-4 flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 rounded-full border border-copper/25 px-4 py-2.5 text-[13px] outline-none focus:border-copper"
            />
            <button onClick={applyCoupon} className="rounded-full bg-copper px-5 py-2.5 text-[12.5px] font-semibold text-white transition-colors hover:bg-copper-dark">
              Apply
            </button>
          </div>

          <div className="flex flex-col gap-3 border-t border-black/5 py-4 text-[14px]">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            {discount > 0 && <Row label={`Discount (${discount * 100}%)`} value={`− ${formatPrice(discountAmt)}`} accent />}
            <Row label="Shipping" value={shipping === 0 ? "FREE" : formatPrice(shipping)} />
          </div>
          <div className="flex items-baseline justify-between border-t border-black/5 pt-4">
            <span className="text-[15px] font-semibold text-brown">Total</span>
            <span className="font-playfair text-[26px] text-brown">{formatPrice(total)}</span>
          </div>

          <Link
            href="/checkout"
            className="mt-6 block w-full rounded-full py-4 text-center text-[14px] font-semibold text-cream transition-transform duration-300 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg,#4A3528,#5B4638)" }}
          >
            Proceed to Checkout →
          </Link>
          <Link href="/shop" className="mt-3 block text-center text-[13px] font-medium text-copper hover:text-copper-dark">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted">{label}</span>
      <span className={accent ? "font-semibold text-copper-dark" : "font-medium text-brown"}>{value}</span>
    </div>
  );
}
