"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { getUserOrders } from "@/lib/firebase/orders";
import { formatPrice, paymentLabel, formatDate } from "@/lib/utils/format";
import type { Order } from "@/types";

export default function DashboardPage() {
  const { profile, firebaseUser } = useAuth();
  const { count: wishCount } = useWishlist();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebaseUser) return;
    getUserOrders(firebaseUser.uid)
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [firebaseUser]);

  const totalSpent = orders.reduce((s, o) => s + o.total, 0);

  return (
    <div>
      <h1 className="mb-1 font-playfair text-[clamp(26px,3.4vw,38px)] font-bold text-brown">
        Welcome back, {profile?.displayName?.split(" ")[0] ?? "Beautiful"} ✦
      </h1>
      <p className="mb-8 text-[14px] text-muted">Here&apos;s a look at your beauty journey.</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Orders" value={loading ? "—" : String(orders.length)} icon="📦" tint="#C98F73" />
        <StatCard label="Wishlist Items" value={String(wishCount)} icon="♥" tint="#B05A6B" />
        <StatCard label="Total Spent" value={loading ? "—" : formatPrice(totalSpent)} icon="✦" tint="#7A5A48" />
      </div>

      <section className="mt-8 rounded-3xl border border-copper/15 bg-white p-6">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-playfair text-[22px] font-semibold text-brown">Recent Orders</h2>
          <Link href="/profile/orders" className="text-[13px] font-semibold text-copper hover:text-copper-dark">
            View all →
          </Link>
        </div>
        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : orders.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-muted">No orders yet.</p>
            <Link href="/shop" className="mt-4 inline-block rounded-full bg-brown px-7 py-3 text-[13.5px] font-semibold text-cream">
              Start shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.slice(0, 3).map((o) => (
              <OrderRow key={o.id} order={o} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({ label, value, icon, tint }: { label: string; value: string; icon: string; tint: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-copper/15 bg-white p-5 shadow-[0_22px_50px_-40px_rgba(201,143,115,0.6)]">
      <span
        className="pointer-events-none absolute right-[-20px] top-[-20px] h-[90px] w-[90px] rounded-full opacity-50"
        style={{ background: `radial-gradient(circle,${tint}33,transparent 70%)` }}
      />
      <span
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-[18px]"
        style={{ background: `${tint}1a`, color: tint }}
      >
        {icon}
      </span>
      <div className="text-[12px] font-medium uppercase tracking-[0.1em] text-muted">{label}</div>
      <div className="mt-1 font-playfair text-[28px] font-semibold text-brown">{value}</div>
    </div>
  );
}

function OrderRow({ order }: { order: Order }) {
  const statusColor: Record<string, string> = {
    pending: "#B0735A",
    confirmed: "#C98F73",
    shipped: "#7A5A48",
    delivered: "#5B7A48",
    cancelled: "#B05A5A",
  };
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/5 bg-cream/60 px-5 py-4 transition-colors hover:bg-cream">
      <div>
        <div className="text-[13px] font-semibold text-brown">
          Order #{order.id.slice(0, 8).toUpperCase()}
        </div>
        <div className="text-[12px] text-muted">
          {order.items.length} items · {paymentLabel(order.paymentMethod)}
          {order.createdAt ? ` · ${formatDate(order.createdAt)}` : ""}
        </div>
      </div>
      <span
        className="rounded-full px-3 py-1 text-[11px] font-semibold capitalize"
        style={{ background: `${statusColor[order.status]}1a`, color: statusColor[order.status] }}
      >
        {order.status}
      </span>
      <div className="font-playfair text-[18px] text-brown">{formatPrice(order.total)}</div>
    </div>
  );
}
