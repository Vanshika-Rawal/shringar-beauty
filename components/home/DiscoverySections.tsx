"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { concerns, skinTypes, ingredients, routines } from "@/lib/data/catalog";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { RailArrows } from "@/components/ui/RailArrows";
import { RoutineCard, type RoutineItem } from "@/components/home/RoutineCard";

/** Routine rail content — luxe gradient posters + optional ritual videos. */
const routineGradients = [
  "linear-gradient(160deg,#F3ECE4,#D8B08C)",
  "linear-gradient(160deg,#5B4638,#C98F73)",
  "linear-gradient(160deg,#E8CBA0,#C98F73)",
  "linear-gradient(160deg,#D8B08C,#B0735A)",
  "linear-gradient(160deg,#7A5A48,#E3C6A8)",
];

/** A different ritual clip per card (cycles once past the 4 available). */
const routineVideos = [
  "/videos/deal-morning.mp4",
  "/videos/deal-night.mp4",
  "/videos/deal-wedding.mp4",
  "/videos/deal-acne.mp4",
  "/videos/deal-dry.mp4",
];

const routineCards: RoutineItem[] = routines.map((r, i) => ({
  name: r.name,
  steps: r.steps,
  href: "/shop",
  gradient: routineGradients[i % routineGradients.length],
  video: routineVideos[i % routineVideos.length],
}));

/* ---------- Shop by Concern (premium editorial redesign) ---------- */
/** Real editorial imagery + a refined descriptor mapped to each concern. */
const concernMeta: Record<string, { image: string; desc: string }> = {
  "Acne & Blemishes": { image: "/products/product-18.jpg", desc: "Clarify & calm breakouts" },
  Pigmentation: { image: "/products/product-11.jpg", desc: "Fade spots, even tone" },
  "Anti-Ageing": { image: "/products/product-59.jpg", desc: "Firm, smooth & renew" },
  Dryness: { image: "/products/product-17.jpg", desc: "Deep, lasting hydration" },
  "Dullness & Glow": { image: "/products/product-4.jpg", desc: "Reveal a radiant glow" },
  Sensitivity: { image: "/products/product-54.jpg", desc: "Soothe & strengthen" },
};

export function ConcernSection() {
  return (
    <section className="relative overflow-hidden bg-warm">
      {/* soft ambient glows */}
      <span className="pointer-events-none absolute left-[-6%] top-[8%] h-[320px] w-[320px] rounded-full opacity-50 anim-blob" style={{ background: "radial-gradient(circle,rgba(216,176,140,.28),transparent 70%)" }} />
      <span className="pointer-events-none absolute bottom-[4%] right-[-6%] h-[300px] w-[300px] rounded-full opacity-40" style={{ background: "radial-gradient(circle,rgba(183,110,121,.18),transparent 70%)" }} />

      <div className="relative mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-[clamp(56px,6.5vw,96px)]">
        <SectionHeader
          overline="Targeted Care"
          title="Shop by Concern"
          subtitle="Editorial rituals, curated for exactly what your skin needs most"
        />

        <div className="grid grid-cols-2 gap-[clamp(14px,1.8vw,26px)] sm:grid-cols-3 lg:grid-cols-6">
          {concerns.map((c) => {
            const meta = concernMeta[c.name] ?? { image: "/products/placeholder.jpg", desc: "Discover the edit" };
            return (
              <Link
                key={c.name}
                href={`/shop?concern=${encodeURIComponent(c.name)}`}
                className="group relative block transition-transform duration-[550ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] hover:-translate-y-2.5"
              >
                {/* rose-gold gradient border */}
                <div
                  className="rounded-[26px] p-[1.5px] shadow-[0_22px_46px_-28px_rgba(183,110,121,0.5)] transition-shadow duration-[550ms] group-hover:shadow-[0_40px_66px_-24px_rgba(183,110,121,0.65)]"
                  style={{ background: "linear-gradient(140deg,#F7E9DC,#E8CBA0 30%,#D8B08C 56%,#B76E79)" }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[25px] bg-cream">
                    <Image
                      src={meta.image}
                      alt={c.name}
                      fill
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 16vw"
                      className="object-cover transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.12]"
                    />

                    {/* light, only-at-bottom overlay so the image stays clearly visible */}
                    <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(transparent 44%,rgba(58,44,34,.28) 66%,rgba(58,44,34,.68))" }} />

                    {/* rose-gold glow that blooms on hover */}
                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[550ms] group-hover:opacity-100" style={{ background: "radial-gradient(120% 62% at 50% 112%,rgba(232,203,160,.4),transparent 68%)" }} />

                    {/* inner light ring for a glass edge */}
                    <span className="pointer-events-none absolute inset-0 rounded-[25px] ring-1 ring-inset ring-white/15" />

                    {/* frosted-glass label */}
                    <div className="absolute inset-x-2.5 bottom-2.5">
                      <div className="rounded-[18px] border border-white/25 bg-white/[0.14] px-3.5 py-3 backdrop-blur-md">
                        <div className="font-playfair text-[clamp(15px,1.3vw,19px)] font-semibold leading-[1.15] text-white [text-shadow:0_1px_10px_rgba(0,0,0,.35)]">
                          {c.name}
                        </div>
                        <div className="mt-0.5 text-[11px] leading-snug text-white/80">{meta.desc}</div>
                        <span className="mt-2 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-gold">
                          Explore
                          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Shop by Ingredient ---------- */
/** Editorial image mapped to each ingredient (in catalogue order). */
const ingredientImage: Record<string, string> = {
  Rose: "/products/product-114.jpg",
  Saffron: "/products/product-115.jpg",
  "Vitamin C": "/products/product-116.jpg",
  Retinol: "/products/product-117.jpg",
  Niacinamide: "/products/product-118.jpg",
  Hyaluronic: "/products/product-119.jpg",
  "Salicylic Acid": "/products/product-120.jpg",
  Squalane: "/products/product-121.jpg",
  Bakuchiol: "/products/product-122.jpg",
  Ceramides: "/products/product-123.jpg",
  "Green Tea": "/products/product-124.webp",
  Collagen: "/products/product-125.jpg",
  "Aloe Vera": "/products/product-126.jpg",
  Turmeric: "/products/product-127.jpg",
  Caffeine: "/products/product-128.jpg",
  Peptides: "/products/product-129.jpg",
  "Argan Oil": "/products/product-130.jpg",
  "Shea Butter": "/products/product-131.jpg",
  Jojoba: "/products/product-132.jpg",
  "Glycolic Acid": "/products/product-133.jpg",
  "Vitamin E": "/products/product-134.jpg",
  Centella: "/products/product-135.jpg",
  Charcoal: "/products/product-136.jpg",
  Honey: "/products/product-137.jpg",
};

export function IngredientSection() {
  const track = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLElement>(null);
  const pausedRef = useRef(false);
  const manualUntil = useRef(0);

  // Gentle auto-scroll that loops back to the start. Notes on the two bugs this
  // used to have:
  //  - the track had `scroll-smooth`, so every per-frame scrollLeft write kicked
  //    off a fresh smooth animation and the rail stuttered/stalled;
  //  - `scrollLeft += 0.5` re-reads a value the browser may round, so the
  //    half-pixel could be dropped every frame and the rail never moved.
  // We now keep our own fractional position and write it to a non-smooth track.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host: HTMLElement = wrap.current ?? el;

    let raf = 0;
    let pos = el.scrollLeft;

    // Mouse hover pauses; touch/drag pauses and then hands back after a beat, so
    // swiping on a phone never leaves the rail permanently frozen.
    const pause = () => (pausedRef.current = true);
    const resume = () => (pausedRef.current = false);
    const hold = () => {
      manualUntil.current = performance.now() + 2000;
    };

    host.addEventListener("mouseenter", pause);
    host.addEventListener("mouseleave", resume);
    el.addEventListener("pointerdown", hold);
    el.addEventListener("touchstart", hold, { passive: true });
    el.addEventListener("wheel", hold, { passive: true });

    const tick = () => {
      const max = el.scrollWidth - el.clientWidth;
      const active = !pausedRef.current && performance.now() > manualUntil.current;

      if (active && max > 0) {
        pos += 0.4;
        if (pos >= max) pos = 0; // loop back to the start
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft; // stay in sync while paused / hand-scrolled
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("mouseenter", pause);
      host.removeEventListener("mouseleave", resume);
      el.removeEventListener("pointerdown", hold);
      el.removeEventListener("touchstart", hold);
      el.removeEventListener("wheel", hold);
    };
  }, []);

  return (
    <section ref={wrap} className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-[clamp(44px,5vw,76px)]">
      <SectionHeader
        overline="Powered by Nature"
        title="Shop by Ingredient"
        align="between"
        action={<RailArrows trackRef={track} className="hidden sm:flex" />}
      />
      <div
        ref={track}
        className="noscroll flex gap-[clamp(12px,1.6vw,18px)] overflow-x-auto overscroll-x-contain pb-3 pt-1"
        style={{ scrollSnapType: "x proximity" }}
      >
        {ingredients.map((ing) => (
          <Link
            key={ing.name}
            href={`/shop?q=${encodeURIComponent(ing.name)}`}
            className="group relative w-[clamp(148px,42vw,172px)] flex-none snap-start transition-transform duration-[450ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] hover:-translate-y-2"
          >
            {/* rose-gold gradient border */}
            <div
              className="rounded-[22px] p-[1.5px] shadow-[0_18px_40px_-26px_rgba(183,110,121,0.5)] transition-shadow duration-500 group-hover:shadow-[0_30px_54px_-22px_rgba(183,110,121,0.62)]"
              style={{ background: "linear-gradient(140deg,#F7E9DC,#E8CBA0 45%,#D8B08C 72%,#B76E79)" }}
            >
              <div
                className="relative flex flex-col items-center overflow-hidden rounded-[21px] p-5 text-center"
                style={{ background: "linear-gradient(158deg,#7A5A48,#4A3528 60%,#3A2A20)" }}
              >
                {/* soft glow behind the image */}
                <span className="pointer-events-none absolute left-1/2 top-4 h-[96px] w-[96px] -translate-x-1/2 rounded-full opacity-80 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle,rgba(232,203,160,.45),transparent 70%)" }} />
                {/* shimmer sweep */}
                <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[21px]">
                  <span className="absolute -inset-y-8 -left-1/3 w-1/3 -skew-x-12 bg-white/35 opacity-0 blur-[2px] transition-all duration-[850ms] group-hover:left-[135%] group-hover:opacity-100" />
                </span>

                <span
                  className="relative mb-3.5 rounded-full p-[2px] shadow-[0_12px_26px_-14px_rgba(0,0,0,0.55)]"
                  style={{ background: "linear-gradient(140deg,#F7E9DC,#E8CBA0 40%,#D8B08C 70%,#B76E79)" }}
                >
                  <ImageSlot
                    src={ingredientImage[ing.name]}
                    placeholder={ing.name}
                    shape="circle"
                    className="h-[76px] w-[76px] border-2 border-white/85 transition-transform duration-500 group-hover:scale-[1.07]"
                  />
                </span>
                <div className="relative font-playfair text-[16px] font-semibold text-cream">{ing.name}</div>
                <div className="relative mt-1 text-[11.5px] text-cream/70">{ing.benefit}</div>
                <span className="relative mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-gold transition-colors duration-300 group-hover:text-white">
                  Explore
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* mobile arrows — the header pair is desktop-only */}
      <div className="mt-4 flex justify-center sm:hidden">
        <RailArrows trackRef={track} />
      </div>
    </section>
  );
}

/* ---------- Shop by Skin Type (premium redesign) ---------- */
/** Skin types marketed as bestsellers (shows a badge). */
const skinBestSellers = new Set(["Oily", "Combination", "Normal"]);

/** Editorial image mapped to each skin type card. */
const skinImage: Record<string, string> = {
  Oily: "/products/product-109.jpg",
  Dry: "/products/product-110.jpg",
  Combination: "/products/product-111.jpg",
  Normal: "/products/product-112.jpg",
  Sensitive: "/products/product-113.jpg",
};

export function SkinTypeSection() {
  return (
    <section className="relative overflow-hidden bg-warm">
      {/* ambient glows */}
      <span className="pointer-events-none absolute right-[-6%] top-[6%] h-[340px] w-[340px] rounded-full opacity-50 anim-blob" style={{ background: "radial-gradient(circle,rgba(216,176,140,.3),transparent 70%)" }} />
      <span className="pointer-events-none absolute bottom-[6%] left-[-5%] h-[300px] w-[300px] rounded-full opacity-40" style={{ background: "radial-gradient(circle,rgba(183,110,121,.16),transparent 70%)" }} />

      {/* faint leaf silhouettes */}
      <svg aria-hidden className="pointer-events-none absolute left-[3%] top-[16%] h-[120px] w-[120px] rotate-[18deg] opacity-[0.06]" viewBox="0 0 48 48" fill="none" stroke="#5B4638" strokeWidth="1.4">
        <path d="M10 38C10 20 30 10 42 10C42 26 28 40 12 40Z" />
        <path d="M14 36C24 28 34 18 40 11" />
      </svg>
      <svg aria-hidden className="pointer-events-none absolute right-[4%] bottom-[12%] h-[140px] w-[140px] -rotate-[24deg] opacity-[0.05]" viewBox="0 0 48 48" fill="none" stroke="#5B4638" strokeWidth="1.4">
        <path d="M10 38C10 20 30 10 42 10C42 26 28 40 12 40Z" />
        <path d="M14 36C24 28 34 18 40 11" />
      </svg>

      {/* drifting petals */}
      {[
        { l: "16%", d: "0s", dur: "12s", s: 13 },
        { l: "38%", d: "3s", dur: "14s", s: 10 },
        { l: "62%", d: "1.5s", dur: "11s", s: 12 },
        { l: "84%", d: "4s", dur: "13s", s: 11 },
      ].map((pt, i) => (
        <span
          key={i}
          className="pointer-events-none absolute top-[-3%]"
          style={{
            left: pt.l,
            width: pt.s,
            height: pt.s,
            background: "linear-gradient(135deg,#F2D9D3,#D8B08C)",
            borderRadius: "100% 0 100% 0",
            opacity: 0.5,
            animation: `petalfall ${pt.dur} linear ${pt.d} infinite`,
          }}
        />
      ))}

      <div className="relative mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-[clamp(56px,6.5vw,96px)]">
        <SectionHeader
          overline="Know Your Skin"
          title="Shop by Skin Type"
          subtitle="A luxurious ritual, perfectly matched to your skin"
        />
        <div className="grid grid-cols-2 gap-[clamp(14px,2vw,26px)] sm:grid-cols-3 lg:grid-cols-5">
          {skinTypes.map((s) => (
            <Link
              key={s.name}
              href={`/shop?skinType=${encodeURIComponent(s.name)}`}
              className="group relative block transition-transform duration-[550ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] hover:-translate-y-2.5"
            >
              {/* rose-gold gradient border */}
              <div
                className="rounded-[26px] p-[1.5px] shadow-[0_22px_46px_-28px_rgba(183,110,121,0.5)] transition-shadow duration-[550ms] group-hover:shadow-[0_40px_66px_-24px_rgba(183,110,121,0.65)]"
                style={{ background: "linear-gradient(140deg,#F7E9DC,#E8CBA0 30%,#D8B08C 56%,#B76E79)" }}
              >
                {/* editorial image card */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-[25px] bg-cream">
                  <Image
                    src={skinImage[s.name] ?? "/products/placeholder.jpg"}
                    alt={s.name}
                    fill
                    sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
                    className="object-cover transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.12]"
                  />

                  {/* light, only-at-bottom overlay so the image stays clearly visible */}
                  <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(transparent 42%,rgba(58,44,34,.3) 64%,rgba(58,44,34,.7))" }} />
                  {/* rose-gold glow on hover */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[550ms] group-hover:opacity-100" style={{ background: "radial-gradient(120% 62% at 50% 112%,rgba(183,110,121,.32),transparent 66%)" }} />
                  {/* glass edge ring */}
                  <span className="pointer-events-none absolute inset-0 rounded-[25px] ring-1 ring-inset ring-white/15" />
                  {/* shimmer sweep */}
                  <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[25px]">
                    <span className="absolute -inset-y-8 -left-1/3 w-1/3 -skew-x-12 bg-white/45 opacity-0 blur-[2px] transition-all duration-[900ms] group-hover:left-[135%] group-hover:opacity-100" />
                  </span>

                  {/* top row — badge + small icon */}
                  <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
                    {skinBestSellers.has(s.name) ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-brown/85 px-2.5 py-1 text-[8.5px] font-bold uppercase tracking-[0.08em] text-gold shadow-sm backdrop-blur">
                        <span>★</span> Bestseller
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="anim-twinkle text-[12px] text-white/80 drop-shadow">✦</span>
                  </div>

                  {/* frosted-glass label */}
                  <div className="absolute inset-x-2.5 bottom-2.5">
                    <div className="rounded-[18px] border border-white/25 bg-white/[0.14] px-3.5 py-3 text-left backdrop-blur-md">
                      <div className="font-playfair text-[clamp(16px,1.5vw,20px)] font-semibold leading-[1.15] text-white [text-shadow:0_1px_10px_rgba(0,0,0,.35)]">{s.name}</div>
                      <div className="mt-0.5 text-[11px] text-white/80">{s.sub}</div>
                      <span className="mt-2 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-gold">
                        Explore
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Build Your Routine ---------- */
export function RoutineSection() {
  const track = useRef<HTMLDivElement>(null);

  return (
    <section className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-[clamp(52px,6vw,88px)]">
      <SectionHeader
        overline="Curated Rituals"
        title="Build Your Routine"
        align="between"
        action={
          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-copper/30 bg-white px-5 py-2.5 text-[13px] font-semibold text-brown transition-all duration-300 hover:-translate-y-0.5 hover:border-copper hover:bg-copper hover:text-cream sm:inline-flex"
            >
              See All <span>→</span>
            </Link>
            <RailArrows trackRef={track} className="hidden sm:flex" />
          </div>
        }
      />
      <div
        ref={track}
        className="noscroll flex gap-5 overflow-x-auto scroll-smooth px-0.5 pb-4 pt-2"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {routineCards.map((r) => (
          <RoutineCard key={r.name} routine={r} />
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-3 sm:hidden">
        <Link href="/shop" className="rounded-full border border-copper/30 bg-white px-5 py-2.5 text-[13px] font-semibold text-brown">
          See All →
        </Link>
        <RailArrows trackRef={track} />
      </div>
    </section>
  );
}
