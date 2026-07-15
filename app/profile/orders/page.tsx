"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserOrders } from "@/lib/firebase/orders";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { formatPrice, paymentLabel, formatDate } from "@/lib/utils/format";
import type { Order } from "@/types";

const STATUS_COLOR: Record<string, string> = {
  pending: "#B0735A",
  confirmed: "#C98F73",
  shipped: "#7A5A48",
  delivered: "#5B7A48",
  cancelled: "#B05A5A",
};

export default function OrderHistoryPage() {
  const { firebaseUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseUser) return;
    getUserOrders(firebaseUser.uid)
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [firebaseUser]);

  return (
    <div>
      <h1 className="mb-8 font-playfair text-[clamp(26px,3.4vw,38px)] font-bold text-brown">
        Order History
      </h1>

      {loading ? (
        <p className="text-sm text-muted">Loading your orders…</p>
      ) : orders.length === 0 ? (
        <div className="rounded-3xl border border-copper/15 bg-white py-16 text-center">
          <p className="text-muted">You haven&apos;t placed any orders yet.</p>
          <Link href="/shop" className="mt-5 inline-block rounded-full bg-brown px-7 py-3 text-[13.5px] font-semibold text-cream">
            Start shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {orders.map((o) => (
            <div key={o.id} className="overflow-hidden rounded-3xl border border-copper/15 bg-white shadow-[0_22px_50px_-38px_rgba(201,143,115,0.5)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 bg-cream/40 px-6 py-4">
                <div>
                  <div className="text-[14px] font-semibold text-brown">
                    Order #{o.id.slice(0, 8).toUpperCase()}
                  </div>
                  {o.createdAt && (
                    <div className="text-[12px] text-muted">Placed on {formatDate(o.createdAt)}</div>
                  )}
                </div>
                <span
                  className="rounded-full px-3.5 py-1.5 text-[11.5px] font-semibold capitalize"
                  style={{ background: `${STATUS_COLOR[o.status] ?? "#B0735A"}1a`, color: STATUS_COLOR[o.status] ?? "#B0735A" }}
                >
                  ● {o.status}
                </span>
              </div>

              <div className="flex flex-col gap-3 px-6 py-5">
                {o.items.map((it) => (
                  <div key={it.productId} className="flex items-center gap-3">
                    <ImageSlot src={it.image || undefined} placeholder={it.name} className="h-[54px] w-[48px] flex-none" radius={10} />
                    <div className="flex-1">
                      <div className="text-[13.5px] font-medium text-brown">{it.name}</div>
                      <div className="text-[12px] text-muted">Qty {it.qty} · {formatPrice(it.price)}</div>
                    </div>
                    <div className="text-[13.5px] font-semibold text-brown">{formatPrice(it.price * it.qty)}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-black/5 px-6 py-4">
                <div className="flex items-center gap-2 text-[12.5px] text-muted">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-copper/10 text-copper">💳</span>
                  Paid via <span className="font-semibold text-brown">{paymentLabel(o.paymentMethod)}</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-[12.5px] text-muted">Total</span>
                  <span className="font-playfair text-[22px] text-brown">{formatPrice(o.total)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
