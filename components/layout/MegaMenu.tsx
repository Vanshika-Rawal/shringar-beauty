"use client";

import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/data/catalog";
import { ImageSlot } from "@/components/ui/ImageSlot";

interface MegaMenuProps {
  onEnter: () => void;
  onLeave: () => void;
}

/** A representative product photo for each category, in catalogue order. */
const categoryImages = [
  "/products/product-1.jpg",  // Skincare
  "/products/product-3.jpg",  // Makeup
  "/products/product-10.jpg", // Hair Care
  "/products/product-8.jpg",  // Body Care
  "/products/product-6.jpg",  // Fragrance
  "/products/product-34.jpg", // Bath & Shower
  "/products/product-40.jpg", // Lip Care
  "/products/product-46.jpg", // Eye Care
  "/products/product-52.jpg", // Korean Beauty
  "/products/product-58.jpg", // Luxury Beauty
  "/products/product-64.jpg", // Men's Grooming
  "/products/product-70.jpg", // Gift Sets
  "/products/product-76.jpg", // Beauty Tools
  "/products/product-82.jpg", // Wellness
];

export function MegaMenu({ onEnter, onLeave }: MegaMenuProps) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="anim-fadeUp absolute left-0 right-0 top-full z-[55] border-t border-copper/15"
      style={{
        background: "linear-gradient(180deg,rgba(250,247,242,.99),rgba(243,236,228,.97))",
        boxShadow: "0 40px 70px -28px rgba(91,70,56,.4)",
        backdropFilter: "blur(24px) saturate(1.6)",
      }}
    >
      <div className="mx-auto grid max-w-shell grid-cols-[240px_1fr_300px] gap-10 px-[clamp(16px,4vw,40px)] pb-10 pt-9">
        {/* intro panel */}
        <div
          className="relative flex flex-col justify-between overflow-hidden rounded-[20px] p-6 text-cream"
          style={{ background: "linear-gradient(150deg,#5B4638,#7A5A48 60%,#C98F73)" }}
        >
          <span
            className="pointer-events-none absolute right-[-30px] top-[-30px] h-[130px] w-[130px] rounded-full opacity-70"
            style={{ background: "radial-gradient(circle,rgba(232,203,160,.45),transparent 70%)" }}
          />
          <div className="relative">
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-gold">
              ✦ The Collection
            </div>
            <h3 className="font-playfair text-[26px] font-semibold leading-[1.12]">
              Discover your
              <br /> beauty ritual
            </h3>
            <p className="mt-3 text-[12.5px] leading-[1.6] text-cream/75">
              14 curated worlds across skincare, makeup, fragrance &amp; wellness.
            </p>
          </div>
          <Link
            href="/shop"
            className="relative mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[12px] font-bold text-brown transition-all hover:gap-3 hover:bg-gold"
          >
            Shop all
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        {/* category grid */}
        <div>
          <div className="mb-5 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#A67C52]">
            <span className="h-px w-[22px]" style={{ background: "linear-gradient(90deg,#C98F73,transparent)" }} />
            Browse Categories
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {categories.map((c, i) => (
              <Link
                key={c.id}
                href={`/shop?category=${c.slug}`}
                className="group/cat flex items-center gap-[11px] rounded-[14px] border border-transparent px-3 py-[10px] transition-all hover:border-copper/20 hover:bg-white hover:shadow-[0_10px_26px_-16px_rgba(201,143,115,0.6)]"
              >
                <span className="relative h-[36px] w-[36px] flex-none overflow-hidden rounded-xl transition-transform duration-300 group-hover/cat:scale-110" style={{ boxShadow: "0 6px 14px -8px rgba(91,70,56,.4)" }}>
                  <Image
                    src={categoryImages[i]}
                    alt={c.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                  />
                </span>
                <span className="text-[12.5px] font-medium leading-tight text-brown">
                  {c.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* editorial featured cards */}
        <div className="flex flex-col gap-3">
          <div className="mb-1 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#A67C52]">
            <span className="h-px w-[22px]" style={{ background: "linear-gradient(90deg,#C98F73,transparent)" }} />
            Featured
          </div>
          {[
            { label: "✦ Trending Now", title: "Korean Beauty", slug: "korean-beauty", image: "/products/product-99.jpg" },
            { label: "✦ Editor's Pick", title: "Luxury Beauty", slug: "luxury-beauty", image: "/products/product-100.jpg" },
          ].map((f) => (
            <Link
              key={f.slug}
              href={`/shop?category=${f.slug}`}
              className="group relative aspect-[16/9] cursor-pointer overflow-hidden rounded-[18px] transition-transform duration-300 hover:-translate-y-1"
              style={{ boxShadow: "0 18px 40px -22px rgba(91,70,56,.45)" }}
            >
              <ImageSlot src={f.image} alt={f.title} fill placeholder={f.title} className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-110" radius={18} />
              <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(160deg,rgba(91,70,56,.72) 0%,transparent 65%)" }} />
              <div className="pointer-events-none absolute bottom-0 left-0 p-[18px]">
                <div className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.18em] text-gold">
                  {f.label}
                </div>
                <div className="font-playfair text-[18px] font-semibold leading-[1.1] text-white">
                  {f.title}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
