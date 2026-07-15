import type { Metadata } from "next";
import { BrandsExplorer } from "@/components/brands/BrandsExplorer";
import { brandLogoMap, spotlightImageMap } from "@/lib/data/brandLogos";
import { products } from "@/lib/data/catalog";
import { brandSlug } from "@/lib/utils/brandSlug";

export const metadata: Metadata = {
  title: "Brands",
  description: "The beauty houses on SHRINGAR — luxury, makeup, skincare, K-beauty, haircare and fragrance.",
};

/** Houses given the spotlight. */
const SPOTLIGHT = ["Vaseline", "Dove", "Dot & Key", "CeraVe", "Plum", "Dior"];

/**
 * The hero shot for each spotlight house — every one checked so the photo
 * genuinely pictures that brand's products, not someone else's.
 * A file dropped in /public/spotlight always wins over these.
 */
const HERO: Record<string, string> = {
  Vaseline: "/products/product-15.jpg", // Vaseline Cocoa Radiant Body Oil
  Dove: "/products/product-153.jpg", // Dove body wash, lotion, bar & polish
  "Dot & Key": "/products/product-154.jpg", // Dot & Key skincare line-up
  CeraVe: "/products/product-150.jpg", // CeraVe lotion, cream & ointment
  Plum: "/products/product-151.jpg", // Plum Goodness niacinamide range
  Dior: "/products/product-152.jpg", // Dior makeup — Backstage, Addict, blush
};

/** On-palette gradient, only used if a house has no image at all. */
const FALLBACK_GRADIENTS = [
  "linear-gradient(150deg,#3A2C22,#5B4638 55%,#7A5A48)",
  "linear-gradient(150deg,#5B4638,#7A5A48 55%,#C98F73)",
  "linear-gradient(150deg,#7A5A48,#B0735A 55%,#D8B08C)",
  "linear-gradient(150deg,#3A2C22,#7A5A48 55%,#B76E79)",
  "linear-gradient(150deg,#5B4638,#B76E79 55%,#D8B08C)",
  "linear-gradient(150deg,#4A3528,#8B5E3C 55%,#E8CBA0)",
];

export default function BrandsPage() {
  const spots = spotlightImageMap();

  const featured = SPOTLIGHT.map((name, i) => {
    const items = products.filter((p) => p.brand === name);
    return {
      name,
      // A file dropped in /public/spotlight wins over the built-in hero shot.
      image: spots[brandSlug(name)] ?? HERO[name],
      gradient: FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length],
      count: items.length,
    };
  });

  // Logo availability resolved on the server — the client never probes for
  // files that don't exist (which would flood the console with 404s).
  return <BrandsExplorer logos={brandLogoMap()} featured={featured} />;
}
