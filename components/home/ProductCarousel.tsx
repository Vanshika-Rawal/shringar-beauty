import Link from "next/link";
import { ProductCard } from "@/components/shop/ProductCard";
import type { Product } from "@/types";

interface ProductCarouselProps {
  overline: string;
  title: string;
  products: Product[];
  overlineColor?: string;
  background?: "cream" | "warm";
  /** Where the "View all" link points. Defaults to the full shop. */
  viewAllHref?: string;
}

/** Horizontal scroll-snap carousel — used by Trending & New Launches. */
export function ProductCarousel({
  overline,
  title,
  products,
  overlineColor = "#C98F73",
  viewAllHref = "/shop",
}: ProductCarouselProps) {
  return (
    <section className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] pb-[clamp(20px,3vw,30px)] pt-[clamp(52px,6vw,88px)]">
      <div className="mb-[34px] flex items-end justify-between gap-4">
        <div>
          <div className="mb-[13px] text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: overlineColor }}>
            {overline}
          </div>
          <h2 className="m-0 font-playfair text-[clamp(30px,4.2vw,50px)] font-semibold tracking-[-0.01em] text-brown">
            {title}
          </h2>
        </div>
        <Link href={viewAllHref} className="flex items-center gap-1.5 whitespace-nowrap text-[13.5px] font-semibold text-copper transition-colors hover:text-copper-dark">
          View all <span>→</span>
        </Link>
      </div>
      <div className="noscroll flex gap-5 overflow-x-auto px-0.5 pb-4 pt-2" style={{ scrollSnapType: "x mandatory" }}>
        {products.map((p) => (
          <div key={p.id} className="flex-none basis-[270px]" style={{ scrollSnapAlign: "start" }}>
            <ProductCard product={p} variant="carousel" />
          </div>
        ))}
      </div>
    </section>
  );
}
