"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const links = [
  { href: "/profile", label: "Dashboard", icon: "▦" },
  { href: "/profile/orders", label: "Order History", icon: "📦" },
  { href: "/profile/addresses", label: "Saved Addresses", icon: "📍" },
  { href: "/wishlist", label: "Wishlist", icon: "♥" },
  { href: "/profile/settings", label: "Account Settings", icon: "⚙" },
];

export function DashboardNav() {
  const pathname = usePathname();
  const { signOut, profile, isAdmin } = useAuth();

  return (
    <aside className="h-fit overflow-hidden rounded-3xl border border-copper/15 bg-white shadow-[0_24px_54px_-42px_rgba(201,143,115,0.6)] lg:sticky lg:top-28">
      <div className="flex items-center gap-3 px-5 py-6" style={{ background: "linear-gradient(135deg,#FAF7F2,#F3ECE4)" }}>
        <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full font-playfair text-[20px] text-cream shadow-[0_10px_22px_-10px_rgba(91,70,56,0.6)]" style={{ background: "linear-gradient(135deg,#5B4638,#C98F73)" }}>
          {(profile?.displayName?.[0] ?? "S").toUpperCase()}
        </span>
        <div className="min-w-0">
          <div className="truncate font-playfair text-[16px] font-semibold text-brown">
            {profile?.displayName ?? "My Account"}
          </div>
          <div className="truncate text-[12px] text-muted">{profile?.email}</div>
        </div>
      </div>

      <nav className="flex flex-col gap-1 p-4">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className="relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13.5px] font-medium transition-all"
              style={{
                background: active ? "rgba(201,143,115,0.12)" : "transparent",
                color: active ? "#B0735A" : "#5B4638",
              }}
            >
              {active && <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-copper" />}
              <span className="w-5 text-center text-[15px] opacity-80">{l.icon}</span>
              {l.label}
            </Link>
          );
        })}
        {isAdmin && (
          <Link href="/admin" className="mt-1 flex items-center gap-3 rounded-xl border border-copper/20 px-4 py-2.5 text-[13.5px] font-semibold text-copper-dark transition-colors hover:bg-copper/10">
            <span className="w-5 text-center text-[15px]">⌘</span> Admin Dashboard →
          </Link>
        )}
        <button
          onClick={() => signOut()}
          className="mt-2 flex items-center gap-3 rounded-xl border border-copper/20 px-4 py-2.5 text-left text-[13.5px] font-medium text-muted transition-colors hover:bg-copper/5 hover:text-brown"
        >
          <span className="w-5 text-center text-[15px]">⏻</span> Sign Out
        </button>
      </nav>
    </aside>
  );
}
