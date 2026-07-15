"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { saveAddresses } from "@/lib/firebase/users";
import type { Address } from "@/types";

export default function AddressesPage() {
  const { firebaseUser, profile, refreshProfile } = useAuth();
  const { notify } = useToast();
  const [addresses, setLocalAddresses] = useState<Address[]>(profile?.addresses ?? []);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState<Omit<Address, "id" | "isDefault">>({
    name: "", line1: "", city: "", state: "", pincode: "", phone: "",
  });

  const persist = async (next: Address[]) => {
    setLocalAddresses(next);
    if (firebaseUser) {
      await saveAddresses(firebaseUser.uid, next);
      await refreshProfile();
    }
  };

  const onAdd = async (e: FormEvent) => {
    e.preventDefault();
    const newAddr: Address = {
      ...form,
      id: `addr_${Date.now()}`,
      isDefault: addresses.length === 0,
    };
    await persist([...addresses, newAddr]);
    notify("Address saved");
    setForm({ name: "", line1: "", city: "", state: "", pincode: "", phone: "" });
    setAdding(false);
  };

  const onRemove = async (id: string) => {
    await persist(addresses.filter((a) => a.id !== id));
    notify("Address removed");
  };

  const field = "w-full rounded-xl border border-copper/20 px-4 py-3 text-[14px] outline-none focus:border-copper";

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-playfair text-[clamp(26px,3.4vw,38px)] font-bold text-brown">
          Saved Addresses
        </h1>
        <button
          onClick={() => setAdding((v) => !v)}
          className="rounded-full bg-copper px-5 py-2.5 text-[12.5px] font-semibold text-white hover:bg-copper-dark"
        >
          {adding ? "Cancel" : "+ Add Address"}
        </button>
      </div>

      {adding && (
        <form onSubmit={onAdd} className="mb-6 grid grid-cols-1 gap-4 rounded-3xl border border-copper/15 bg-white p-6 sm:grid-cols-2">
          <input required placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={`${field} sm:col-span-2`} />
          <input required placeholder="Address line" value={form.line1} onChange={(e) => setForm({ ...form, line1: e.target.value })} className={`${field} sm:col-span-2`} />
          <input required placeholder="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={field} />
          <input required placeholder="State" value={form.state} onChange={(e) => setForm({ ...form, state: e.target.value })} className={field} />
          <input required placeholder="Pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} className={field} />
          <input required placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={field} />
          <button type="submit" className="rounded-full bg-brown py-3 text-[13.5px] font-semibold text-cream sm:col-span-2">
            Save Address
          </button>
        </form>
      )}

      {addresses.length === 0 ? (
        <div className="rounded-3xl border border-copper/15 bg-white py-16 text-center text-muted">
          No saved addresses yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {addresses.map((a) => (
            <div key={a.id} className="relative rounded-2xl border border-copper/15 bg-white p-5">
              {a.isDefault && (
                <span className="absolute right-4 top-4 rounded-full bg-copper/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-copper">
                  Default
                </span>
              )}
              <div className="font-semibold text-brown">{a.name}</div>
              <div className="mt-1.5 text-[13px] leading-[1.6] text-muted">
                {a.line1}<br />
                {a.city}, {a.state} — {a.pincode}<br />
                {a.phone}
              </div>
              <button onClick={() => onRemove(a.id)} className="mt-3 text-[12.5px] font-medium text-copper-dark hover:underline">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
