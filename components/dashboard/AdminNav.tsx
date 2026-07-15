"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const links = [
  { href: "/admin", label: "Overview", icon: "▦" },
  { href: "/admin/products", label: "Products", icon: "🧴" },
  { href: "/admin/categories", label: "Categories", icon: "🗂" },
  { href: "/admin/orders", label: "Orders", icon: "📦" },
  { href: "/admin/users", label: "Users", icon: "👥" },
];

export function AdminNav() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  return (
    <aside className="h-fit overflow-hidden rounded-3xl border border-copper/15 bg-white shadow-[0_24px_54px_-42px_rgba(201,143,115,0.6)] lg:sticky lg:top-28">
      <div className="px-5 py-6 text-cream" style={{ background: "linear-gradient(135deg,#5B4638,#7A5A48 70%,#C98F73)" }}>
        <div className="font-playfair text-[18px] font-semibold">Admin Console</div>
        <div className="text-[12px] text-cream/70">SHRINGAR management</div>
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
        <Link href="/" className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13.5px] font-medium text-muted hover:bg-copper/5">
          <span className="w-5 text-center text-[15px]">←</span> Back to store
        </Link>
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
