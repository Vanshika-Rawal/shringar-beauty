"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { formatPrice } from "@/lib/utils/format";
import { createOrder } from "@/lib/firebase/orders";
import { clearCart } from "@/lib/firebase/cart";
import type { Address, OrderItem } from "@/types";

function CheckoutInner() {
  const router = useRouter();
  const { items, subtotal, clear } = useCart();
  const { firebaseUser, profile } = useAuth();
  const { notify } = useToast();
  const [placing, setPlacing] = useState(false);
  const [payment, setPayment] = useState<"cod" | "card" | "upi">("cod");

  const [address, setAddress] = useState<Omit<Address, "id" | "isDefault">>({
    name: profile?.displayName ?? "",
    line1: "",
    city: "",
    state: "",
    pincode: "",
    phone: profile?.phone ?? "",
  });

  const shipping = subtotal >= 1499 ? 0 : 99;
  const total = subtotal + shipping;

  const onPlaceOrder = async (e: FormEvent) => {
    e.preventDefault();
    if (!firebaseUser || items.length === 0) return;
    setPlacing(true);
    try {
      const orderItems: OrderItem[] = items.map((i) => ({
        productId: i.productId,
        name: i.name,
        brand: i.brand,
        image: i.image,
        price: i.price,
        qty: i.qty,
      }));

      await createOrder({
        userId: firebaseUser.uid,
        items: orderItems,
        subtotal,
        shipping,
        discount: 0,
        total,
        status: "pending",
        address: { ...address, id: "addr_1", isDefault: true },
        paymentMethod: payment,
      });

      await clearCart(firebaseUser.uid);
      clear();
      notify("Order placed successfully ✦");
      router.push("/profile/orders");
    } catch {
      notify("Could not place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-24 text-center">
        <h1 className="font-playfair text-[32px] text-brown">Your bag is empty</h1>
        <button onClick={() => router.push("/shop")} className="mt-6 rounded-full bg-brown px-8 py-3.5 text-[14px] font-semibold text-cream">
          Shop now
        </button>
      </div>
    );
  }

  const field = "w-full rounded-xl border border-copper/20 px-4 py-3 text-[14px] outline-none focus:border-copper";

  return (
    <div className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-10">
      <h1 className="mb-8 font-playfair text-[clamp(28px,4vw,44px)] font-bold text-brown">Checkout</h1>

      <form onSubmit={onPlaceOrder} className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-8">
          {/* address */}
          <section className="rounded-3xl border border-copper/15 bg-white p-6">
            <h2 className="mb-5 font-playfair text-[22px] font-semibold text-brown">Shipping Address</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input required placeholder="Full name" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} className={`${field} sm:col-span-2`} />
              <input required placeholder="Address line" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} className={`${field} sm:col-span-2`} />
              <input required placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className={field} />
              <input required placeholder="State" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} className={field} />
              <input required placeholder="Pincode" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} className={field} />
              <input required placeholder="Phone" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} className={field} />
            </div>
          </section>

          {/* payment */}
          <section className="rounded-3xl border border-copper/15 bg-white p-6">
            <h2 className="mb-5 font-playfair text-[22px] font-semibold text-brown">Payment Method</h2>
            <div className="flex flex-col gap-3">
              {[
                { key: "cod" as const, label: "Cash on Delivery" },
                { key: "upi" as const, label: "UPI" },
                { key: "card" as const, label: "Credit / Debit Card" },
              ].map((p) => (
                <label key={p.key} className="flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3.5 text-[14px] font-medium transition-colors" style={{ borderColor: payment === p.key ? "#C98F73" : "rgba(201,143,115,0.2)", background: payment === p.key ? "rgba(201,143,115,0.06)" : "transparent" }}>
                  <input type="radio" name="payment" checked={payment === p.key} onChange={() => setPayment(p.key)} className="accent-copper" />
                  {p.label}
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* summary */}
        <aside className="h-fit rounded-3xl border border-copper/15 bg-white p-6 lg:sticky lg:top-28">
          <h2 className="mb-5 font-playfair text-[22px] font-semibold text-brown">Your Order</h2>
          <div className="flex max-h-[300px] flex-col gap-3 overflow-auto">
            {items.map((c) => (
              <div key={c.productId} className="flex items-center gap-3">
                <ImageSlot src={c.image || undefined} placeholder={c.name} className="h-[54px] w-[48px] flex-none" radius={10} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium text-brown">{c.name}</div>
                  <div className="text-[11.5px] text-mid">Qty {c.qty}</div>
                </div>
                <div className="text-[13px] font-semibold text-brown">{formatPrice(c.price * c.qty)}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2.5 border-t border-black/5 py-4 text-[14px]">
            <div className="flex justify-between"><span className="text-muted">Subtotal</span><span className="font-medium text-brown">{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted">Shipping</span><span className="font-medium text-brown">{shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
          </div>
          <div className="flex items-baseline justify-between border-t border-black/5 pt-4">
            <span className="text-[15px] font-semibold text-brown">Total</span>
            <span className="font-playfair text-[26px] text-brown">{formatPrice(total)}</span>
          </div>
          <button
            type="submit"
            disabled={placing}
            className="mt-6 block w-full rounded-full py-4 text-center text-[14px] font-semibold text-cream transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
            style={{ background: "linear-gradient(135deg,#4A3528,#5B4638)" }}
          >
            {placing ? "Placing order…" : `Place Order · ${formatPrice(total)}`}
          </button>
        </aside>
      </form>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <AuthGuard redirectTo="/login?redirect=/checkout">
      <CheckoutInner />
    </AuthGuard>
  );
}
