"use client";

import { useEffect, useState } from "react";
import { getAllUsers } from "@/lib/firebase/users";
import type { AppUser } from "@/types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="mb-8 font-playfair text-[clamp(26px,3.4vw,38px)] font-bold text-brown">Users</h1>

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : users.length === 0 ? (
        <div className="rounded-3xl border border-copper/15 bg-white py-16 text-center text-muted">
          No users found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-copper/15 bg-white">
          <table className="w-full min-w-[560px] text-left text-[13.5px]">
            <thead className="border-b border-black/5 bg-cream/60 text-[12px] uppercase tracking-[0.06em] text-muted">
              <tr>
                <th className="px-5 py-3.5">Name</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Role</th>
                <th className="px-5 py-3.5">Addresses</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.uid} className="border-b border-black/5 last:border-0">
                  <td className="px-5 py-3.5 font-medium text-brown">{u.displayName || "—"}</td>
                  <td className="px-5 py-3.5 text-muted">{u.email}</td>
                  <td className="px-5 py-3.5">
                    <span className="rounded-full bg-copper/10 px-3 py-1 text-[11px] font-semibold capitalize text-copper-dark">
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-muted">{u.addresses?.length ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
