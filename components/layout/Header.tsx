"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { CartPreview } from "./CartPreview";
import { WishlistPreview } from "./WishlistPreview";
import { MobileNav } from "./MobileNav";
import { AccountMenu } from "./AccountMenu";

export function Header() {
  const router = useRouter();
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  void useAuth(); // ensure header re-renders on auth changes

  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [previewCart, setPreviewCart] = useState(false);
  const [previewWish, setPreviewWish] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const catEnter = () => {
    if (megaTimer.current) clearTimeout(megaTimer.current);
    setMegaOpen(true);
  };
  const catLeave = () => {
    megaTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  const onSearchKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const q = (e.target as HTMLInputElement).value.trim();
      router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop");
    }
  };

  return (
    <header
      className="sticky top-0 z-40 transition-[background,box-shadow,border-color] duration-[400ms]"
      style={{
        backdropFilter: "blur(20px) saturate(1.5)",
        WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        background: scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0)",
        borderBottom: scrolled
          ? "1px solid rgba(201,143,115,.14)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 10px 30px -24px rgba(91,70,56,.5)" : "none",
      }}
    >
      {/* announcement bar (desktop) */}
      <div
        className="hidden p-2 text-center text-[11.5px] font-medium tracking-[0.12em] text-white md:block"
        style={{
          background:
            "linear-gradient(90deg,#5B4638,#7A5A48,#C98F73,#7A5A48,#5B4638)",
          backgroundSize: "300% 100%",
          animation: "shimmer 16s linear infinite",
        }}
      >
        <span className="text-gold">✦</span> FREE luxury samples over ₹1,499 ·
        code <b className="tracking-[0.04em]">SHRINGAR10</b> for 10% off your first
        ritual <span className="text-gold">✦</span>
      </div>

      <div className="mx-auto flex h-[74px] max-w-shell items-center gap-[clamp(14px,2.5vw,40px)] px-[clamp(16px,4vw,40px)] max-md:h-[58px] max-md:gap-2 max-md:px-3">
        {/* hamburger — up to lg, because the full nav + search can't fit below 1024 */}
        <button
          onClick={() => setNavOpen(true)}
          aria-label="Open menu"
          className="flex flex-none p-1.5 text-brown lg:hidden"
        >
          <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>

        <Logo />

        {/* desktop nav */}
        <nav className="ml-[clamp(8px,1.6vw,22px)] hidden min-w-0 flex-1 items-center gap-[clamp(14px,1.5vw,24px)] text-[12.5px] font-medium tracking-[0.02em] text-brown lg:flex">
          <NavLink href="/">Home</NavLink>
          <span
            onMouseEnter={catEnter}
            onMouseLeave={catLeave}
            className="nav-underline inline-flex cursor-pointer items-center gap-[5px]"
            onClick={() => router.push("/shop")}
          >
            Categories <span className="text-[8px] opacity-60">▼</span>
          </span>
          <NavLink href="/brands">Brands</NavLink>
          <Link
            href="/offers"
            className="nav-underline inline-flex items-center gap-[7px] font-semibold text-copper-dark"
          >
            Offers{" "}
            <span
              className="relative inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[8.5px] font-extrabold tracking-[0.1em] text-white"
              style={{ background: "linear-gradient(135deg,#E4674E,#D8B08C)", boxShadow: "0 4px 14px -3px rgba(228,103,78,0.7)" }}
            >
              <span className="anim-pulse inline-block h-[5px] w-[5px] rounded-full bg-white" />
              SALE
            </span>
          </Link>
        </nav>

        {/* actions */}
        <div className="ml-auto flex flex-none items-center gap-[clamp(8px,1.4vw,14px)] max-md:gap-1.5">
          {/* search — xl only; at 1024–1279 the nav + actions already fill the bar */}
          <div className="group hidden items-center gap-2 overflow-hidden rounded-full border border-copper/20 bg-white/60 px-[15px] py-[9px] transition-all hover:border-copper hover:bg-white/90 xl:flex">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C98F73" strokeWidth="1.7" strokeLinecap="round" className="flex-none">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" />
            </svg>
            <input
              onKeyDown={onSearchKey}
              placeholder="Search rituals…"
              className="w-[124px] border-none bg-transparent font-manrope text-[13px] text-brown outline-none transition-[width] duration-[450ms] focus:w-[230px]"
            />
          </div>

          {/* account — initials avatar + dropdown (or Sign In) */}
          <AccountMenu />

          {/* wishlist */}
          <div
            className="relative flex"
            onMouseEnter={() => setPreviewWish(true)}
            onMouseLeave={() => setPreviewWish(false)}
          >
            <Link
              href="/wishlist"
              title="Wishlist"
              className="relative flex rounded-full p-[7px] text-brown transition-colors hover:bg-copper-light/10 hover:text-copper-light max-md:p-1"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[21px] w-[21px] max-md:h-[18px] max-md:w-[18px]">
                <path d="M12 20s-7-4.55-7-10.2A3.8 3.8 0 0 1 12 7a3.8 3.8 0 0 1 7 2.8C19 15.45 12 20 12 20z" />
              </svg>
              {wishCount > 0 && (
                <span className="absolute right-[-2px] top-[-1px] flex h-[17px] min-w-[17px] items-center justify-center rounded-[9px] bg-copper-light px-1 text-[10px] font-semibold text-white">
                  {wishCount}
                </span>
              )}
            </Link>
            {previewWish && <WishlistPreview />}
          </div>

          {/* cart */}
          <div
            className="relative flex"
            onMouseEnter={() => setPreviewCart(true)}
            onMouseLeave={() => setPreviewCart(false)}
          >
            <Link
              href="/cart"
              title="Cart"
              className="relative flex items-center gap-2 rounded-full border border-copper-light/50 bg-brown px-4 py-[9px] pl-[13px] font-manrope text-[12.5px] font-semibold tracking-[0.02em] text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-brown-dark max-md:gap-0 max-md:px-2 max-md:py-1.5 max-md:pl-2"
              style={{ transitionTimingFunction: "cubic-bezier(.34,1.56,.64,1)" }}
            >
              {/* premium structured shopping bag */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-[19px] w-[19px] max-md:h-[17px] max-md:w-[17px]">
                <path d="M5.4 8.2h13.2l-.9 11a2 2 0 0 1-2 1.85H8.3a2 2 0 0 1-2-1.85l-.9-11z" />
                <path d="M8.5 8.2V6.6a3.5 3.5 0 0 1 7 0v1.6" />
                <path d="M9.2 11.6c0 1.7 1.25 2.9 2.8 2.9s2.8-1.2 2.8-2.9" opacity=".7" />
              </svg>
              <span className="cart-label">Cart</span>

              {/* desktop/tablet: count sits inline inside the pill (original) */}
              <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-[9px] bg-copper-light px-[5px] text-[10px] font-bold text-brown max-md:hidden">
                {cartCount}
              </span>

              {/* mobile only: count floats at the top-right corner of the icon */}
              {cartCount > 0 && (
                <span className="absolute -right-1.5 -top-1.5 hidden h-[17px] min-w-[17px] items-center justify-center rounded-full border-2 border-white bg-copper-light px-1 text-[9.5px] font-bold leading-none text-brown shadow-[0_2px_6px_-1px_rgba(91,70,56,0.5)] max-md:flex">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
            {previewCart && <CartPreview />}
          </div>
        </div>
      </div>

      {/* search bar — mobile & tablet, where the xl inline search isn't shown */}
      <div className="mx-auto max-w-shell px-3 pb-2.5 sm:px-[clamp(16px,4vw,40px)] xl:hidden">
        <div className="flex items-center gap-2.5 rounded-full border border-copper/20 bg-white/80 px-4 py-2.5 shadow-[0_8px_22px_-16px_rgba(91,70,56,0.6)] backdrop-blur transition-colors focus-within:border-copper focus-within:bg-white">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C98F73" strokeWidth="1.8" strokeLinecap="round" className="flex-none">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.2-3.2" />
          </svg>
          <input
            onKeyDown={onSearchKey}
            placeholder="Search products & brands…"
            aria-label="Search products and brands"
            className="w-full min-w-0 border-none bg-transparent font-manrope text-[13.5px] text-brown outline-none placeholder:text-mid"
          />
        </div>
      </div>

      {megaOpen && <MegaMenu onEnter={catEnter} onLeave={catLeave} />}

      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} />
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="nav-underline cursor-pointer">
      {children}
    </Link>
  );
}
