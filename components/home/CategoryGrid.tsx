import Link from "next/link";
import { categories } from "@/lib/data/catalog";
import { categoryIcons } from "@/lib/data/icons";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CategoryCard } from "@/components/home/CategoryCard";

/** A representative product photo for each category, in catalogue order. */
const categoryImages = [
  "/products/product-91.jpg",  // Skincare
  "/products/product-92.jpg",  // Makeup
  "/products/product-95.jpg", // Hair Care
  "/products/product-93.jpg",  // Body Care
  "/products/product-94.jpg",  // Fragrance
  "/products/product-96.jpg", // Bath & Shower
  "/products/product-97.jpg", // Lip Care
  "/products/product-98.jpg", // Eye Care
  "/products/product-99.jpg", // Korean Beauty
  "/products/product-100.jpg", // Luxury Beauty
  "/products/product-101.jpg", // Men's Grooming
  "/products/product-70.jpg", // Gift Sets
  "/products/product-102.jpg", // Beauty Tools
  "/products/product-103.jpg", // Wellness
];

export function CategoryGrid() {
  return (
    <section className="relative overflow-hidden">
      {/* unique layered background — warm cream wash + rose-gold auras */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(165deg,#FFFDFB 0%,#F7F0E8 45%,#FFF2E9 100%)" }}
      />
      <span className="pointer-events-none absolute left-[-6%] top-[8%] h-[360px] w-[360px] rounded-full opacity-60 anim-blob" style={{ background: "radial-gradient(circle,rgba(216,176,140,.34),transparent 70%)" }} />
      <span className="pointer-events-none absolute right-[-8%] bottom-[6%] h-[420px] w-[420px] rounded-full opacity-50" style={{ background: "radial-gradient(circle,rgba(232,203,160,.32),transparent 70%)", animation: "blob 22s ease-in-out infinite reverse" }} />
      {/* faint sparkle dust */}
      {[
        { t: "14%", l: "18%", d: "0s" },
        { t: "26%", l: "82%", d: "1s" },
        { t: "70%", l: "12%", d: "1.6s" },
        { t: "78%", l: "88%", d: "0.6s" },
        { t: "44%", l: "50%", d: "2.2s" },
      ].map((s, i) => (
        <span key={i} className="anim-twinkle pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-gold" style={{ top: s.t, left: s.l, boxShadow: "0 0 8px 2px rgba(232,203,160,.6)", animationDelay: s.d }} />
      ))}

      <div className="relative mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-[clamp(54px,6.5vw,92px)]">
        <SectionHeader
          overline="Find your ritual"
          title="Shop by Category"
          subtitle="Fourteen worlds of beauty, each curated to perfection"
          align="between"
          action={
            <Link
              href="/shop"
              className="hidden items-center gap-1.5 whitespace-nowrap rounded-full border border-copper/30 bg-white/70 px-5 py-2.5 text-[13px] font-semibold text-brown backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-copper hover:bg-copper hover:text-cream sm:inline-flex"
            >
              View all <span>→</span>
            </Link>
          }
        />
        <div className="grid grid-cols-2 gap-[clamp(12px,1.6vw,22px)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
          {categories.map((c, i) => (
            <CategoryCard
              key={c.id}
              category={c}
              iconSvg={categoryIcons[c.iconSvg] ?? ""}
              image={categoryImages[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
