"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { brandSlug } from "@/lib/utils/brandSlug";
import { PetalFall } from "@/components/ui/PetalFall";

/* ============================================================
   BrandsExplorer — the houses, designed.

   A dark editorial masthead carries the search, six houses take the
   spotlight with a real product from their shelf, and the full directory
   sits below as rose-gold glass chips that filter live.
   ============================================================ */

type Tab =
  | "All"
  | "Luxury"
  | "Makeup"
  | "Skincare"
  | "Korean Beauty"
  | "Haircare"
  | "Fragrance";

const TABS: Tab[] = [
  "All",
  "Luxury",
  "Makeup",
  "Skincare",
  "Korean Beauty",
  "Haircare",
  "Fragrance",
];

interface BrandItem {
  name: string;
  tags: Exclude<Tab, "All">[];
}

export interface FeaturedHouse {
  name: string;
  /** Hero shot from /public/spotlight — undefined until one is added. */
  image?: string;
  /** Shown in place of the hero shot while there isn't one. */
  gradient: string;
  count: number;
}

const BRANDS: BrandItem[] = [
  { name: "L'Oréal Paris", tags: ["Makeup", "Skincare", "Haircare"] },
  { name: "Maybelline", tags: ["Makeup"] },
  { name: "Lakmé", tags: ["Makeup"] },
  { name: "MAC", tags: ["Luxury", "Makeup"] },
  { name: "Huda Beauty", tags: ["Luxury", "Makeup"] },
  { name: "The Ordinary", tags: ["Skincare"] },
  { name: "Cetaphil", tags: ["Skincare"] },
  { name: "CeraVe", tags: ["Skincare"] },
  { name: "Minimalist", tags: ["Skincare"] },
  { name: "Dot & Key", tags: ["Skincare"] },
  { name: "Plum", tags: ["Skincare"] },
  { name: "Mamaearth", tags: ["Skincare", "Haircare"] },
  { name: "Pilgrim", tags: ["Skincare"] },
  { name: "Neutrogena", tags: ["Skincare"] },
  { name: "Bioderma", tags: ["Skincare"] },
  { name: "COSRX", tags: ["Korean Beauty", "Skincare"] },
  { name: "Innisfree", tags: ["Korean Beauty", "Skincare"] },
  { name: "Laneige", tags: ["Korean Beauty", "Skincare"] },
  { name: "Beauty of Joseon", tags: ["Korean Beauty", "Skincare"] },
  { name: "Some By Mi", tags: ["Korean Beauty", "Skincare"] },
  { name: "Klairs", tags: ["Korean Beauty", "Skincare"] },
  { name: "Missha", tags: ["Korean Beauty", "Skincare"] },
  { name: "Etude", tags: ["Korean Beauty", "Makeup"] },
  { name: "Dr. Jart+", tags: ["Korean Beauty", "Skincare"] },
  { name: "Sulwhasoo", tags: ["Luxury", "Korean Beauty", "Skincare"] },
  { name: "Charlotte Tilbury", tags: ["Luxury", "Makeup"] },
  { name: "Estée Lauder", tags: ["Luxury", "Skincare", "Makeup"] },
  { name: "Dior", tags: ["Luxury", "Makeup", "Fragrance"] },
  { name: "Chanel", tags: ["Luxury", "Fragrance", "Makeup"] },
  { name: "Lancôme", tags: ["Luxury", "Skincare", "Makeup"] },
  { name: "Clinique", tags: ["Luxury", "Skincare"] },
  { name: "Bobbi Brown", tags: ["Luxury", "Makeup"] },
  { name: "NARS", tags: ["Luxury", "Makeup"] },
  { name: "Fenty Beauty", tags: ["Luxury", "Makeup"] },
  { name: "Kiehl's", tags: ["Luxury", "Skincare"] },
  { name: "Sugar Cosmetics", tags: ["Makeup"] },
  { name: "Colorbar", tags: ["Makeup"] },
  { name: "Faces Canada", tags: ["Makeup"] },
  { name: "Nykaa Cosmetics", tags: ["Makeup"] },
  { name: "Wet n Wild", tags: ["Makeup"] },
  { name: "Milani", tags: ["Makeup"] },
  { name: "La Roche-Posay", tags: ["Skincare"] },
  { name: "Olay", tags: ["Skincare"] },
  { name: "Pond's", tags: ["Skincare"] },
  { name: "Nivea", tags: ["Skincare", "Haircare"] },
  { name: "Garnier", tags: ["Skincare", "Haircare"] },
  { name: "Aveeno", tags: ["Skincare"] },
  { name: "Simple", tags: ["Skincare"] },
  { name: "Forest Essentials", tags: ["Luxury", "Skincare"] },
  { name: "Kama Ayurveda", tags: ["Luxury", "Skincare"] },
  { name: "Biotique", tags: ["Skincare"] },
  { name: "TRESemmé", tags: ["Haircare"] },
  { name: "Dove", tags: ["Haircare", "Skincare"] },
  { name: "Head & Shoulders", tags: ["Haircare"] },
  { name: "WOW Skin Science", tags: ["Haircare", "Skincare"] },
  { name: "Pantene", tags: ["Haircare"] },
  { name: "Schwarzkopf", tags: ["Haircare"] },
  { name: "Streax", tags: ["Haircare"] },
  { name: "BBlunt", tags: ["Haircare"] },
  { name: "Gucci", tags: ["Luxury", "Fragrance"] },
  { name: "Versace", tags: ["Luxury", "Fragrance"] },
  { name: "Calvin Klein", tags: ["Fragrance"] },
  { name: "Davidoff", tags: ["Fragrance"] },
  { name: "Skinn by Titan", tags: ["Fragrance"] },
  { name: "Bella Vita", tags: ["Fragrance"] },
  { name: "Fogg", tags: ["Fragrance"] },
  { name: "Engage", tags: ["Fragrance"] },
  { name: "e.l.f.", tags: ["Makeup"] },
  { name: "Kay Beauty", tags: ["Makeup"] },
  { name: "Swiss Beauty", tags: ["Makeup"] },
  { name: "Insight Cosmetics", tags: ["Makeup"] },
  { name: "Renee", tags: ["Makeup"] },
  { name: "The Derma Co.", tags: ["Skincare"] },
  { name: "Foxtale", tags: ["Skincare"] },
  { name: "Aqualogica", tags: ["Skincare"] },
  { name: "Vaseline", tags: ["Skincare"] },
  { name: "WishCare", tags: ["Haircare", "Skincare"] },
  { name: "Fixderma", tags: ["Skincare"] },
];

const ROSE_GOLD = "linear-gradient(140deg,#F7E9DC,#E8CBA0 38%,#D8B08C 68%,#B76E79)";

export function BrandsExplorer({
  logos = {},
  featured = [],
}: {
  logos?: Record<string, string>;
  featured?: FeaturedHouse[];
}) {
  const [tab, setTab] = useState<Tab>("All");
  const [search, setSearch] = useState("");

  const q = search.trim().toLowerCase();

  const filtered = useMemo(() => {
    return BRANDS.filter((b) => {
      if (q) return b.name.toLowerCase().includes(q);
      return tab === "All" || b.tags.includes(tab as Exclude<Tab, "All">);
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [q, tab]);

  return (
    <div className="bg-cream">
      {/* ===================== dark editorial masthead ===================== */}
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#3A2C22 0%,#5B4638 40%,#7A5A48 70%,#C98F73 100%)" }}
      >
        {/* soft ambient glows — no lines, just light (same as the Offers hero) */}
        <span
          className="pointer-events-none absolute right-[4%] top-[-120px] h-[380px] w-[380px] rounded-full anim-blob"
          style={{ background: "radial-gradient(circle,rgba(232,203,160,.4),transparent 70%)" }}
        />
        <span
          className="pointer-events-none absolute bottom-[-140px] left-[-8%] h-[340px] w-[340px] rounded-full opacity-70"
          style={{ background: "radial-gradient(circle,rgba(183,110,121,.35),transparent 70%)", animation: "blob 24s ease-in-out infinite reverse" }}
        />

        {/* subtle diagonal sheen */}
        <span
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: "linear-gradient(115deg,transparent 30%,rgba(255,255,255,.06) 50%,transparent 70%)" }}
        />

        {/* petals drifting behind the title */}
        <PetalFall />

        <div className="relative mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-[clamp(28px,4vw,52px)] text-center">
          <div className="mb-2.5 inline-flex items-center gap-2 text-[9.5px] font-bold uppercase tracking-[0.28em] text-gold">
            <span className="h-1 w-1 rounded-full bg-gold anim-pulse" />
            {BRANDS.length} Houses
          </div>
          <h1 className="m-0 font-playfair text-[clamp(26px,3.8vw,44px)] font-semibold leading-[1.08] text-cream">
            The Beauty{" "}
            <span
              className="italic"
              style={{
                background: "linear-gradient(115deg,#FFF2E9,#E8CBA0 50%,#D8B08C)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Houses
            </span>
          </h1>

          {/* search — rose-gold rimmed glass, glows on focus */}
          <div className="group/s relative mx-auto mt-6 max-w-[460px]">
            <div
              className="rounded-full p-[1.5px] shadow-[0_16px_34px_-20px_rgba(0,0,0,0.8)] transition-shadow duration-300 focus-within:shadow-[0_0_0_5px_rgba(232,203,160,0.16),0_18px_38px_-18px_rgba(232,203,160,0.6)]"
              style={{ background: ROSE_GOLD }}
            >
              <div className="relative flex items-center rounded-full bg-brown-darker/70 backdrop-blur-md">
                <svg
                  className="pointer-events-none absolute left-4 text-gold/70 transition-colors duration-300 group-focus-within/s:text-gold"
                  width="17" height="17" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search a house…"
                  className="w-full rounded-full bg-transparent py-3 pl-12 pr-11 text-[14px] text-cream outline-none placeholder:text-cream/40"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-2.5 grid h-7 w-7 place-items-center rounded-full text-cream/60 transition-colors hover:bg-white/10 hover:text-cream"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* gold hairline */}
        <span
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{ background: "linear-gradient(90deg,transparent,#E8CBA0,transparent)" }}
        />
      </section>

      {/* ===================== spotlight — real shelves ===================== */}
      {featured.length > 0 && !q && (
        <section className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-[clamp(40px,5vw,72px)]">
          <div className="mb-7 text-center">
            <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.3em] text-copper">
              In the Spotlight
            </div>
            <h2 className="m-0 font-playfair text-[clamp(22px,3vw,34px)] font-semibold text-brown">
              Houses we&apos;re loving
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-[clamp(12px,1.8vw,22px)] md:grid-cols-3 lg:grid-cols-6">
            {featured.map((h) => (
              <Link
                key={h.name}
                href={`/shop?brand=${encodeURIComponent(h.name)}`}
                className="group relative block transition-transform duration-[500ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] hover:-translate-y-2"
              >
                {/* rose-gold rim */}
                <div
                  className="rounded-[22px] p-[1.5px] shadow-[0_20px_44px_-28px_rgba(183,110,121,0.55)] transition-shadow duration-500 group-hover:shadow-[0_36px_62px_-24px_rgba(183,110,121,0.7)]"
                  style={{ background: ROSE_GOLD }}
                >
                  <div
                    className="relative aspect-[3/4] overflow-hidden rounded-[21px]"
                    style={{ background: h.gradient }}
                  >
                    {h.image ? (
                      <Image
                        src={h.image}
                        alt={h.name}
                        fill
                        sizes="(max-width:768px) 50vw, 17vw"
                        className="object-cover transition-transform duration-[900ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.1]"
                      />
                    ) : (
                      // No hero shot yet — a lit gradient carries the house instead.
                      <>
                        <span
                          className="pointer-events-none absolute right-[-20%] top-[-16%] h-[150px] w-[150px] rounded-full opacity-70 anim-blob"
                          style={{ background: "radial-gradient(circle,rgba(232,203,160,.5),transparent 70%)" }}
                        />
                        <span className="anim-twinkle pointer-events-none absolute left-4 top-5 text-[11px] text-gold/80">✦</span>
                      </>
                    )}

                    {/* legibility veil */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{ background: "linear-gradient(transparent 40%,rgba(58,44,34,.3) 62%,rgba(58,44,34,.82))" }}
                    />
                    {/* glow on hover */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ background: "radial-gradient(120% 62% at 50% 112%,rgba(232,203,160,.4),transparent 68%)" }}
                    />

                    <div className="absolute inset-x-0 bottom-0 p-3.5 text-center">
                      <div className="font-playfair text-[clamp(13px,1.3vw,17px)] font-semibold leading-tight text-white [text-shadow:0_1px_10px_rgba(0,0,0,.4)]">
                        {h.name}
                      </div>
                      {h.count > 0 && (
                        <div className="mt-0.5 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-gold">
                          {h.count} products
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===================== the directory ===================== */}
      <section className="relative overflow-hidden bg-warm py-[clamp(44px,5.5vw,80px)]">
        <span
          className="pointer-events-none absolute left-[-5%] top-[10%] h-[300px] w-[300px] rounded-full opacity-50 anim-blob"
          style={{ background: "radial-gradient(circle,rgba(216,176,140,.3),transparent 70%)" }}
        />

        <div className="relative mx-auto max-w-shell px-[clamp(16px,4vw,40px)]">
          <div className="mb-8 text-center">
            <div className="mb-2 text-[10.5px] font-semibold uppercase tracking-[0.3em] text-copper">
              The Directory
            </div>
            <h2 className="m-0 font-playfair text-[clamp(22px,3vw,34px)] font-semibold text-brown">
              Every house, A to Z
            </h2>
          </div>

          {/* category tabs */}
          <div className="noscroll mb-8 flex justify-start gap-2 overflow-x-auto pb-1 sm:justify-center">
            {TABS.map((t) => {
              const active = !q && tab === t;
              return (
                <button
                  key={t}
                  onClick={() => {
                    setTab(t);
                    setSearch("");
                  }}
                  className={`whitespace-nowrap rounded-full border px-[clamp(14px,1.6vw,22px)] py-2.5 text-[12.5px] font-semibold transition-all duration-300 ${
                    active
                      ? "border-transparent bg-brown text-cream shadow-[0_14px_28px_-14px_rgba(91,70,56,0.8)]"
                      : "border-copper/25 bg-white/70 text-brown backdrop-blur hover:-translate-y-0.5 hover:border-copper hover:text-copper-dark"
                  }`}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* count */}
          <div className="mb-6 text-center text-[12.5px] text-muted">
            {q ? (
              <>
                Results for <span className="font-semibold text-brown">“{search}”</span> ·{" "}
              </>
            ) : null}
            <span className="font-semibold text-copper">
              {filtered.length} {filtered.length === 1 ? "house" : "houses"}
            </span>
          </div>

          {/* glass chips */}
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="font-playfair text-[24px] text-brown">Nothing under that name</p>
              <p className="mt-2 text-sm text-muted">Try another search or category.</p>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-[clamp(9px,1.1vw,14px)]">
              {filtered.map((b) => {
                const logo = logos[brandSlug(b.name)];
                return (
                  <Link
                    key={b.name}
                    href={`/shop?brand=${encodeURIComponent(b.name)}`}
                    className="group/chip"
                  >
                    {/* rose-gold rim */}
                    <span
                      className="block rounded-full p-[1.5px] shadow-[0_12px_26px_-18px_rgba(183,110,121,0.55)] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] group-hover/chip:-translate-y-1 group-hover/chip:shadow-[0_22px_40px_-16px_rgba(183,110,121,0.75)]"
                      style={{ background: ROSE_GOLD }}
                    >
                      {/* glass body */}
                      <span className="relative flex h-[clamp(42px,4.4vw,54px)] items-center justify-center overflow-hidden rounded-full bg-white/75 px-[clamp(16px,1.8vw,26px)] backdrop-blur-md">
                        <span
                          className="pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-[400ms] group-hover/chip:opacity-100"
                          style={{ background: "radial-gradient(130% 130% at 50% 0%,rgba(232,203,160,.55),transparent 62%)" }}
                        />
                        {logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={logo}
                            alt={b.name}
                            loading="lazy"
                            className="relative max-h-[clamp(18px,2vw,26px)] w-auto max-w-[140px] object-contain"
                          />
                        ) : (
                          <span className="relative whitespace-nowrap font-playfair text-[clamp(13px,1.35vw,17px)] font-semibold text-brown transition-colors duration-300 group-hover/chip:text-copper-dark">
                            {b.name}
                          </span>
                        )}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
