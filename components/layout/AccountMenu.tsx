"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/AuthContext";

/** Derive up-to-two-letter initials from a name or email. */
function initialsOf(name?: string | null, email?: string | null): string {
  const src = (name ?? "").trim();
  if (src) {
    const parts = src.split(/\s+/);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  }
  return (email?.[0] ?? "U").toUpperCase();
}

export function AccountMenu() {
  const { firebaseUser, profile, isAdmin, signOut } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Logged out — refined Sign In pill.
  if (!firebaseUser) {
    return (
      <Link
        href="/login"
        className="hidden items-center gap-1.5 rounded-full border border-copper/30 bg-white/60 px-4 py-[8px] text-[12.5px] font-semibold text-brown transition-all hover:border-copper hover:bg-white sm:flex"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8.5" r="3.6" />
          <path d="M5 20a7 7 0 0 1 14 0" />
        </svg>
        Sign In
      </Link>
    );
  }

  const name = profile?.displayName || firebaseUser.displayName || "";
  const email = profile?.email || firebaseUser.email || "";
  const initials = initialsOf(name, email);

  const handleSignOut = async () => {
    setOpen(false);
    await signOut();
    router.push("/");
  };

  const links = [
    { href: "/profile", label: "My Dashboard", icon: "M3 12l9-9 9 9M5 10v10h14V10" },
    { href: "/profile/orders", label: "My Orders", icon: "M6 2h12l1 4H5l1-4zM4 6h16v14H4z" },
    { href: "/wishlist", label: "Wishlist", icon: "M12 20s-7-4.55-7-10.2A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 2.8C19 15.45 12 20 12 20z" },
    { href: "/profile/settings", label: "Settings", icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" },
  ];

  return (
    <div ref={ref} className="relative flex">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Account menu"
        aria-expanded={open}
        className="flex h-[38px] w-[38px] items-center justify-center rounded-full font-manrope text-[13px] font-bold text-cream shadow-[0_8px_18px_-8px_rgba(91,70,56,0.55)] ring-1 ring-white/40 transition-transform duration-200 hover:scale-[1.06] max-md:h-[30px] max-md:w-[30px] max-md:text-[11px]"
        style={{ background: "linear-gradient(135deg,#5B4638,#C98F73)" }}
      >
        {initials}
      </button>

      {open && (
        <div
          className="anim-fadeUp absolute right-0 top-[calc(100%+12px)] z-[60] w-[248px] overflow-hidden rounded-[18px] border border-copper/15 bg-white"
          style={{ boxShadow: "0 30px 60px -28px rgba(91,70,56,.5)" }}
        >
          {/* identity header */}
          <div className="flex items-center gap-3 border-b border-copper/10 bg-cream/60 px-4 py-3.5">
            <span
              className="flex h-[40px] w-[40px] flex-none items-center justify-center rounded-full text-[14px] font-bold text-cream"
              style={{ background: "linear-gradient(135deg,#5B4638,#C98F73)" }}
            >
              {initials}
            </span>
            <div className="min-w-0">
              <div className="truncate font-playfair text-[15px] font-semibold text-brown">
                {name || "Beautiful"}
              </div>
              <div className="truncate text-[11.5px] text-muted">{email}</div>
            </div>
          </div>

          <nav className="flex flex-col py-1.5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-[13px] font-medium text-brown transition-colors hover:bg-copper/[0.08]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C98F73" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d={l.icon} />
                </svg>
                {l.label}
              </Link>
            ))}

            {isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="mx-2 my-1 flex items-center gap-3 rounded-xl bg-brown px-3 py-2.5 text-[13px] font-semibold text-cream transition-colors hover:bg-brown-dark"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z" />
                </svg>
                Admin Console
              </Link>
            )}
          </nav>

          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 border-t border-copper/10 px-4 py-3 text-left text-[13px] font-semibold text-copper-dark transition-colors hover:bg-copper/[0.08]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
            </svg>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
