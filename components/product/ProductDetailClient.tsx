"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useWishlistToggle } from "@/components/ui/useWishlistToggle";
import { CardPetalBurst } from "@/components/ui/CardPetalBurst";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { StarRating } from "@/components/ui/StarRating";
import { ProductCard } from "@/components/shop/ProductCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatPrice, discountLabel } from "@/lib/utils/format";
import type { Product } from "@/types";

const tabs = ["Description", "Ingredients", "How to Use"] as const;
type Tab = (typeof tabs)[number];

export function ProductDetailClient({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { notify } = useToast();
  const { wished, onWish, burst } = useWishlistToggle(product);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<Tab>("Description");
  const [activeImg, setActiveImg] = useState(0);
  const [pop, setPop] = useState(0);

  // Four gallery slots. Products currently ship a single shot, so the extra
  // slots reuse it — as soon as a product has real alternates they show instead.
  const gallery = Array.from(
    { length: 4 },
    (_, i) => product.images[i] || product.images[0]
  );

  /* ---------- mobile carousel ----------
     Only real photos become slides, so a single-image product shows one clean
     slide with no dots (rather than four identical ones). */
  const slides = product.images.filter(Boolean);
  const mobileSlides = slides.length ? slides : [undefined];
  const rail = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);

  const onRailScroll = () => {
    const el = rail.current;
    if (!el || !el.clientWidth) return;
    setSlide(Math.round(el.scrollLeft / el.clientWidth));
  };
  const goToSlide = (i: number) => {
    const el = rail.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  const onAdd = () => {
    addToCart(product, qty);
    setPop((k) => k + 1);
    notify(`${product.name} added to bag 🛍️`);
  };

  const saving = product.mrp - product.price;

  return (
    <div className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-8 max-md:px-4 max-md:pb-[128px] max-md:pt-3">
      {/* back — desktop pill (hidden on mobile; mobile uses the circular arrow
          overlaid on the product image below, so no space is reserved here) */}
      <button
        onClick={() => router.back()}
        aria-label="Go back"
        className="group mb-5 inline-flex items-center gap-2 rounded-full border border-copper/25 bg-white px-4 py-2 text-[12.5px] font-semibold text-brown shadow-[0_10px_24px_-16px_rgba(91,70,56,0.6)] transition-all duration-300 hover:-translate-x-0.5 hover:border-copper hover:bg-copper hover:text-cream max-md:hidden"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:-translate-x-0.5">
          <path d="M15 6l-6 6 6 6" />
        </svg>
        Back
      </button>

      {/* breadcrumb */}
      <nav className="mb-7 hidden items-center gap-2 text-[12px] text-muted md:flex">
        <Link href="/" className="hover:text-copper">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-copper">Shop</Link>
        <span>/</span>
        <span className="text-brown">{product.name}</span>
      </nav>

      {/* ============================================================
          MOBILE (< md) — premium beauty-app layout. Desktop is the grid below
          and is untouched.
          ============================================================ */}
      <div className="md:hidden">
        {/* swipeable image carousel */}
        <div
          className="relative overflow-hidden rounded-[26px] shadow-[0_26px_54px_-30px_rgba(201,143,115,0.55)]"
          style={{ background: "linear-gradient(160deg,#FAF7F2,#F3ECE4)" }}
        >
          {/* back arrow comes from the global MobileBackButton (layout), which
              overlays this image's top-left — so nothing is rendered here. */}
          <div
            ref={rail}
            onScroll={onRailScroll}
            className="noscroll flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
          >
            {mobileSlides.map((src, i) => (
              <div key={i} className="w-full flex-none snap-center">
                <ImageSlot
                  src={src || undefined}
                  placeholder={product.name}
                  className="aspect-square w-full"
                  fit="contain"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>

          {/* offer tag — top-right so it never collides with the back arrow */}
          {product.tags[0] && (
            <span
              className="absolute right-3.5 top-3.5 rounded-full px-3 py-1 text-[9.5px] font-bold uppercase tracking-[0.1em] text-white"
              style={{ background: product.tagBg ?? "#5B4638" }}
            >
              {product.tags[0]}
            </span>
          )}

          {/* pagination dots */}
          {mobileSlides.length > 1 && (
            <div className="absolute inset-x-0 bottom-3.5 flex justify-center gap-1.5">
              {mobileSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: slide === i ? 18 : 6,
                    background: slide === i ? "#5B4638" : "rgba(91,70,56,0.28)",
                  }}
                />
              ))}
            </div>
          )}

          <CardPetalBurst burstKey={burst} />
        </div>

        {/* title block */}
        <div className="mt-5">
          <div className="text-[10.5px] font-bold uppercase tracking-[0.2em] text-copper">
            {product.brand}
          </div>

          {/* single-line title, full width, truncated with an ellipsis when long */}
          <h1 className="m-0 mt-1.5 w-full truncate font-playfair text-[18px] font-semibold leading-tight text-brown">
            {product.name}
          </h1>

          {/* rating (left) + quantity selector (right) share one row */}
          <div className="mt-3 flex items-center justify-between gap-3">
            {/* rating pill */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-copper/20 bg-white px-3 py-1.5">
              <StarRating rating={product.rating} size={13} showValue />
              <span className="text-[#CDBBAA]">·</span>
              <span className="text-[11.5px] font-medium text-muted">
                {product.reviewCount} reviews
              </span>
            </div>

            {/* quantity selector — design & functionality unchanged */}
            <div className="flex flex-none items-center gap-1 rounded-full border border-copper/25 bg-white">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="flex h-9 w-9 items-center justify-center rounded-l-full text-[18px] text-brown active:bg-copper/10"
              >
                −
              </button>
              <span className="w-6 text-center text-[15px] font-semibold text-brown">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="flex h-9 w-9 items-center justify-center rounded-r-full text-[18px] text-brown active:bg-copper/10"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* price block */}
        <div className="mt-4 rounded-[20px] border border-copper/15 bg-white p-4">
          <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
            <span className="text-[27px] font-bold leading-none text-brown">
              {formatPrice(product.price)}
            </span>
            <span className="text-[14px] text-[#CDBBAA] line-through">
              {formatPrice(product.mrp)}
            </span>
            <span className="rounded-md bg-copper/[0.12] px-2 py-0.5 text-[11.5px] font-bold text-copper-dark">
              {discountLabel(product.mrp, product.price)}
            </span>
          </div>
          {saving > 0 && (
            <div className="mt-2 text-[12px] font-semibold text-[#5B7A48]">
              You save {formatPrice(saving)}
            </div>
          )}
          <div className="mt-2 text-[11.5px] text-muted">Inclusive of all taxes</div>
        </div>

        {/* benefits */}
        {product.benefits && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.benefits.map((b) => (
              <span
                key={b}
                className="flex items-center gap-1.5 rounded-full border border-copper/20 bg-white px-3 py-1.5 text-[11.5px] font-medium text-brown-soft"
              >
                <span className="text-copper">✓</span> {b}
              </span>
            ))}
          </div>
        )}

        {/* details tabs */}
        <div className="mt-6">
          <div className="flex gap-5 border-b border-copper/15">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="relative pb-2.5 text-[12.5px] font-semibold transition-colors"
                style={{ color: tab === t ? "#5B4638" : "#A88A78" }}
              >
                {t}
                {tab === t && (
                  <span className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-copper" />
                )}
              </button>
            ))}
          </div>
          <div className="pt-4 text-[13.5px] leading-[1.75] text-brown-soft">
            {tab === "Description" && <p>{product.description}</p>}
            {tab === "Ingredients" && (
              <p>{product.ingredients || "Rose, Hyaluronic Acid, Saffron, Vitamin E and a blend of botanical actives. Free from parabens, sulphates & mineral oil."}</p>
            )}
            {tab === "How to Use" && <p>{product.howToUse}</p>}
          </div>
        </div>
      </div>

      {/* ============================================================
          DESKTOP / TABLET (md+) — unchanged
          ============================================================ */}
      <div className="hidden gap-4 md:grid md:grid-cols-2 md:gap-[clamp(28px,4vw,56px)]">
        {/* gallery */}
        <div className="md:sticky md:top-28 md:self-start">
          <div
            className="relative overflow-hidden rounded-[28px] shadow-[0_30px_60px_-30px_rgba(201,143,115,0.5)]"
            style={{ background: "linear-gradient(160deg,#FAF7F2,#F3ECE4)" }}
          >
            <ImageSlot
              src={gallery[activeImg] || undefined}
              placeholder={product.name}
              className="h-[170px] w-full md:aspect-square md:h-auto"
              fit="contain"
              priority
            />
            {product.tags[0] && (
              <span
                className="absolute left-4 top-4 rounded-[9px] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-white"
                style={{ background: product.tagBg ?? "#5B4638" }}
              >
                {product.tags[0]}
              </span>
            )}
            <CardPetalBurst burstKey={burst} />
          </div>
          <div className="mt-4 hidden gap-3 md:flex">
            {gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                aria-label={`View image ${i + 1}`}
                className="h-20 w-20 overflow-hidden rounded-2xl border-2 transition-colors"
                style={{ borderColor: activeImg === i ? "#C98F73" : "transparent" }}
              >
                <ImageSlot src={src || undefined} placeholder={product.name} className="h-full w-full" />
              </button>
            ))}
          </div>
        </div>

        {/* info */}
        <div>
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-copper">
            {product.brand}
          </div>
          <h1 className="m-0 font-playfair text-[22px] font-semibold leading-[1.15] text-brown md:text-[clamp(28px,3.6vw,44px)] md:leading-[1.1]">
            {product.name}
          </h1>
          <div className="mt-2 flex items-center gap-2 text-[12.5px] text-muted md:mt-3 md:text-[13px]">
            <StarRating rating={product.rating} size={15} showValue />
            <span className="text-[#CDBBAA]">·</span>
            {product.reviewCount} reviews
          </div>

          <div className="my-3 flex items-baseline gap-3 md:my-6">
            <span className="text-[24px] font-bold text-brown md:text-[32px]">{formatPrice(product.price)}</span>
            <span className="text-[14px] text-[#CDBBAA] line-through md:text-[16px]">{formatPrice(product.mrp)}</span>
            <span className="rounded-lg bg-copper/[0.12] px-2.5 py-1 text-[11px] font-bold text-copper-dark md:text-[12px]">
              {discountLabel(product.mrp, product.price)}
            </span>
          </div>

          {/* Hidden on mobile — the same copy is already the "Description" tab
              below, and dropping the duplicate is what lets the image, price and
              Add to Bag all fit on one phone screen. */}
          <p className="mb-4 hidden max-w-[480px] text-[13px] leading-[1.6] text-brown-soft md:mb-6 md:block md:text-[15px] md:leading-[1.8]">
            {product.description}
          </p>

          {product.benefits && (
            <div className="mb-4 hidden flex-wrap gap-2.5 md:mb-7 md:flex">
              {product.benefits.map((b) => (
                <span key={b} className="flex items-center gap-1.5 rounded-full border border-copper/20 bg-white px-3.5 py-2 text-[12px] font-medium text-brown-soft">
                  <span className="text-copper">✓</span> {b}
                </span>
              ))}
            </div>
          )}

          {/* qty + actions */}
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <div className="flex items-center gap-1 rounded-full border border-copper/25 bg-white p-1">
              <QtyButton onClick={() => setQty((q) => Math.max(1, q - 1))}>−</QtyButton>
              <span className="w-9 text-center text-[15px] font-semibold text-brown">{qty}</span>
              <QtyButton onClick={() => setQty((q) => q + 1)}>+</QtyButton>
            </div>
            <button
              key={pop}
              onClick={onAdd}
              className={`flex-1 rounded-full px-8 py-4 text-[14px] font-semibold tracking-[0.04em] text-cream shadow-[0_18px_38px_-14px_rgba(91,70,56,0.5)] transition-transform duration-300 hover:-translate-y-0.5 active:scale-95 ${pop ? "anim-cartPop" : ""}`}
              style={{ background: "linear-gradient(135deg,#4A3528,#5B4638)" }}
            >
              Add to Bag · {formatPrice(product.price * qty)}
            </button>
            <button
              onClick={onWish}
              aria-label="Toggle wishlist"
              aria-pressed={wished}
              className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full border bg-white text-[20px] transition-all duration-300 hover:scale-105"
              style={{ color: wished ? "#C81E45" : "#5B4638", borderColor: wished ? "rgba(200,30,69,0.4)" : "rgba(201,143,115,0.25)" }}
            >
              <span key={burst} className={burst ? "anim-heartPop" : ""}>
                {wished ? "♥" : "♡"}
              </span>
            </button>
          </div>

          {/* tabs */}
          <div className="mt-6 md:mt-10">
            <div className="flex gap-6 border-b border-copper/15">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="relative pb-3 text-[13px] font-semibold transition-colors"
                  style={{ color: tab === t ? "#5B4638" : "#A88A78" }}
                >
                  {t}
                  {tab === t && <span className="absolute bottom-[-1px] left-0 h-[2px] w-full bg-copper" />}
                </button>
              ))}
            </div>
            <div className="pt-5 text-[14px] leading-[1.8] text-brown-soft">
              {tab === "Description" && <p>{product.description}</p>}
              {tab === "Ingredients" && (
                <p>{product.ingredients || "Rose, Hyaluronic Acid, Saffron, Vitamin E and a blend of botanical actives. Free from parabens, sulphates & mineral oil."}</p>
              )}
              {tab === "How to Use" && <p>{product.howToUse}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* related — normal scrollable content on every screen (never sticky) */}
      {related.length > 0 && (
        <div className="mt-20 max-md:mt-10">
          <SectionHeader overline="You may also love" title="More Products" />
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-5 sm:gap-[clamp(16px,2vw,24px)] sm:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} variant="grid" />
            ))}
          </div>
        </div>
      )}

      {/* ============================================================
          MOBILE — sticky action bar. Sits directly above MobileBottomNav
          (~59px + the iOS home indicator) so both stay reachable.
          ============================================================ */}
      <div
        className="fixed inset-x-0 z-40 border-t border-copper/15 bg-white/95 px-3 py-2.5 backdrop-blur-xl md:hidden"
        style={{
          bottom: "calc(54px + env(safe-area-inset-bottom))",
          boxShadow: "0 -12px 32px -20px rgba(91,70,56,0.5)",
        }}
      >
        <div className="mx-auto flex max-w-shell items-center gap-2.5">
          {/* Quantity selector intentionally omitted here — the bottom bar shows
              only Wishlist + Add to Bag. Quantity can be adjusted in the cart. */}

          {/* wishlist */}
          <button
            onClick={onWish}
            aria-label="Toggle wishlist"
            aria-pressed={wished}
            className="relative flex h-[44px] w-[44px] flex-none items-center justify-center rounded-full border bg-white text-[19px] transition-transform active:scale-95"
            style={{
              color: wished ? "#C81E45" : "#5B4638",
              borderColor: wished ? "rgba(200,30,69,0.4)" : "rgba(201,143,115,0.25)",
            }}
          >
            <span key={burst} className={burst ? "anim-heartPop" : ""}>
              {wished ? "♥" : "♡"}
            </span>
          </button>

          {/* add to bag */}
          <button
            key={pop}
            onClick={onAdd}
            className={`flex h-[46px] min-w-0 flex-1 items-center justify-center rounded-full text-[13.5px] font-semibold tracking-[0.03em] text-cream shadow-[0_14px_30px_-12px_rgba(91,70,56,0.65)] transition-transform active:scale-95 ${pop ? "anim-cartPop" : ""}`}
            style={{ background: "linear-gradient(135deg,#4A3528,#5B4638)" }}
          >
            Add to Bag · {formatPrice(product.price * qty)}
          </button>
        </div>
      </div>
    </div>
  );
}

function QtyButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full text-[18px] text-brown transition-colors hover:bg-copper/10"
    >
      {children}
    </button>
  );
}
