"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const ICON = "h-[19px] w-[19px]";
const icons = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON}>
      <path d="M4 11l8-7 8 7M6 10v9h12v-9" />
    </svg>
  ),
  shop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON}>
      <path d="M5 8h14l-1 11.5a1 1 0 0 1-1 .9H7a1 1 0 0 1-1-.9L5 8zM8 8a4 4 0 0 1 8 0" />
    </svg>
  ),
  offers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON}>
      <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0l-7.2-7.2a2 2 0 0 1-.6-1.4V4.5A1.5 1.5 0 0 1 4.3 3h7.5a2 2 0 0 1 1.4.6l7.4 7.4a2 2 0 0 1 0 2.4z" />
      <circle cx="7.5" cy="7.5" r="1.4" />
    </svg>
  ),
  orders: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON}>
      <path d="M5 4h14l-.7 15a1.5 1.5 0 0 1-1.5 1.4H7.2A1.5 1.5 0 0 1 5.7 19L5 4z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </svg>
  ),
  account: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={ICON}>
      <circle cx="12" cy="8.5" r="3.6" /><path d="M5 20a7 7 0 0 1 14 0" />
    </svg>
  ),
};

export function MobileBottomNav() {
  const pathname = usePathname();
  const { firebaseUser } = useAuth();

  const items = [
    { href: "/", label: "Home", icon: icons.home },
    { href: "/shop", label: "Shop", icon: icons.shop },
    { href: "/offers", label: "Offers", icon: icons.offers },
    // My Orders lives under the auth-guarded profile area; sign-in is prompted
    // there if needed, so guests still land somewhere sensible.
    { href: firebaseUser ? "/profile/orders" : "/login?redirect=/profile/orders", label: "My Orders", icon: icons.orders },
    { href: firebaseUser ? "/profile" : "/login", label: "Account", icon: icons.account },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-stretch justify-around border-t border-copper/[0.12] bg-white/95 px-1 pt-1 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: "calc(6px + env(safe-area-inset-bottom))" }}
    >
      {items.map((b) => {
        // Exact-path match (ignoring any query) so nested routes like
        // /profile/orders don't also light up the /profile (Account) tab.
        const active = pathname === b.href.split("?")[0];
        return (
          <Link
            key={b.label}
            href={b.href}
            className="relative flex min-h-[44px] flex-1 flex-col items-center justify-center gap-[3px] rounded-xl py-0.5 text-[9px] font-semibold transition-colors active:bg-copper/[0.06]"
            style={{ color: active ? "#C98F73" : "#6B5645" }}
          >
            <span className="relative">{b.icon}</span>
            <span className="whitespace-nowrap tracking-[0.01em]">{b.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
