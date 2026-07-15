"use client";

import { useEffect, useState } from "react";
import { getAllOrders } from "@/lib/firebase/orders";
import { getAllUsers } from "@/lib/firebase/users";
import { getAllProducts } from "@/lib/firebase/products";
import { products as seedProducts } from "@/lib/data/catalog";
import { formatPrice, paymentLabel } from "@/lib/utils/format";
import type { Order } from "@/types";

const STATUS_COLOR: Record<string, string> = {
  pending: "#B0735A",
  confirmed: "#C98F73",
  shipped: "#7A5A48",
  delivered: "#5B7A48",
  cancelled: "#B05A5A",
};

export default function AdminOverviewPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(seedProducts.length);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([getAllOrders(), getAllUsers(), getAllProducts()])
      .then(([o, u, p]) => {
        if (o.status === "fulfilled") setOrders(o.value);
        if (u.status === "fulfilled") setUserCount(u.value.length);
        if (p.status === "fulfilled" && p.value.length) setProductCount(p.value.length);
      })
      .finally(() => setLoading(false));
  }, []);

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === "pending").length;

  return (
    <div>
      <h1 className="mb-8 font-playfair text-[clamp(26px,3.4vw,38px)] font-bold text-brown">
        Dashboard Overview
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Revenue" value={loading ? "—" : formatPrice(revenue)} icon="✦" tint="#7A5A48" />
        <Stat label="Orders" value={loading ? "—" : String(orders.length)} icon="📦" tint="#C98F73" />
        <Stat label="Pending" value={loading ? "—" : String(pending)} icon="⏳" tint="#B0735A" />
        <Stat label="Products" value={String(productCount)} icon="🧴" tint="#5B7A48" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Stat label="Customers" value={loading ? "—" : String(userCount)} icon="👥" tint="#B05A6B" />
        <Stat label="Avg. Order Value" value={orders.length ? formatPrice(revenue / orders.length) : "—"} icon="📈" tint="#8B6F47" />
      </div>

      <section className="mt-8 rounded-3xl border border-copper/15 bg-white p-6 shadow-[0_22px_50px_-42px_rgba(201,143,115,0.6)]">
        <h2 className="mb-5 font-playfair text-[22px] font-semibold text-brown">Latest Orders</h2>
        {loading ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : orders.length === 0 ? (
          <p className="text-sm text-muted">No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-black/5 bg-cream/60 px-5 py-3.5 transition-colors hover:bg-cream">
                <div className="flex min-w-0 flex-col">
                  <span className="text-[13px] font-semibold text-brown">#{o.id.slice(0, 8).toUpperCase()}</span>
                  <span className="text-[11.5px] text-muted">{o.items.length} items · {paymentLabel(o.paymentMethod)}</span>
                </div>
                <span
                  className="rounded-full px-3 py-1 text-[11px] font-semibold capitalize"
                  style={{ background: `${STATUS_COLOR[o.status] ?? "#B0735A"}1a`, color: STATUS_COLOR[o.status] ?? "#B0735A" }}
                >
                  {o.status}
                </span>
                <span className="font-playfair text-[16px] text-brown">{formatPrice(o.total)}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ label, value, icon, tint }: { label: string; value: string; icon: string; tint: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-copper/15 bg-white p-5 shadow-[0_22px_50px_-42px_rgba(201,143,115,0.6)]">
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
      <div className="mt-1 font-playfair text-[26px] font-semibold text-brown">{value}</div>
    </div>
  );
}
