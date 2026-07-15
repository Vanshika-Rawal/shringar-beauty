"use client";

import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "@/lib/firebase/orders";
import { useToast } from "@/context/ToastContext";
import { formatPrice, paymentLabel } from "@/lib/utils/format";
import type { Order, OrderStatus } from "@/types";

const statuses: OrderStatus[] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function AdminOrdersPage() {
  const { notify } = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllOrders()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const onChange = async (order: Order, status: OrderStatus) => {
    try {
      await updateOrderStatus(order.id, status);
      setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status } : o)));
      notify(`Order marked ${status}`);
    } catch {
      notify("Update failed");
    }
  };

  return (
    <div>
      <h1 className="mb-8 font-playfair text-[clamp(26px,3.4vw,38px)] font-bold text-brown">Orders</h1>

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : orders.length === 0 ? (
        <div className="rounded-3xl border border-copper/15 bg-white py-16 text-center text-muted">
          No orders yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-copper/15 bg-white">
          <table className="w-full min-w-[560px] text-left text-[13.5px]">
            <thead className="border-b border-black/5 bg-cream/60 text-[12px] uppercase tracking-[0.06em] text-muted">
              <tr>
                <th className="px-5 py-3.5">Order</th>
                <th className="px-5 py-3.5">Items</th>
                <th className="px-5 py-3.5">Payment</th>
                <th className="px-5 py-3.5">Total</th>
                <th className="px-5 py-3.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-black/5 last:border-0">
                  <td className="px-5 py-3.5 font-medium text-brown">#{o.id.slice(0, 8).toUpperCase()}</td>
                  <td className="px-5 py-3.5 text-muted">{o.items.length}</td>
                  <td className="px-5 py-3.5 text-muted">{paymentLabel(o.paymentMethod)}</td>
                  <td className="px-5 py-3.5 text-brown">{formatPrice(o.total)}</td>
                  <td className="px-5 py-3.5">
                    <select
                      value={o.status}
                      onChange={(e) => onChange(o, e.target.value as OrderStatus)}
                      className="rounded-full border border-copper/25 bg-white px-3.5 py-1.5 text-[12.5px] font-medium capitalize text-brown outline-none"
                    >
                      {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
