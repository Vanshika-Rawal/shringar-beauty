import type { Category, Product } from "@/types";

/* ============================================================
   SHRINGAR catalog — seed data + fallback content.
   Values taken verbatim from the approved design so the site
   renders identically before Firestore is populated.
   ============================================================ */

export const BRAND_NAME = "SHRINGAR";
export const BRAND_TAGLINE = "Celebrate Your Beauty";

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/* ---------- 14 categories (name, icon key, gradient) ---------- */
const rawCategories: { name: string; icon: string; g: string }[] = [
  { name: "Skincare", icon: "drop", g: "linear-gradient(135deg,#D8B08C,#C98F73)" },
  { name: "Makeup", icon: "lip", g: "linear-gradient(135deg,#F3ECE4,#D8B08C)" },
  { name: "Hair Care", icon: "comb", g: "linear-gradient(135deg,#F2D9D3,#D8B08C)" },
  { name: "Body Care", icon: "lotion", g: "linear-gradient(135deg,#F2D9D3,#C98F73)" },
  { name: "Fragrance", icon: "perfume", g: "linear-gradient(135deg,#E8CBA0,#D8B08C)" },
  { name: "Bath & Shower", icon: "shower", g: "linear-gradient(135deg,#F3ECE4,#D8B08C)" },
  { name: "Lip Care", icon: "lip", g: "linear-gradient(135deg,#E3C6A8,#C98F73)" },
  { name: "Eye Care", icon: "eye", g: "linear-gradient(135deg,#D8B08C,#B0735A)" },
  { name: "Korean Beauty", icon: "spark", g: "linear-gradient(135deg,#F3ECE4,#D8B08C)" },
  { name: "Luxury Beauty", icon: "gem", g: "linear-gradient(135deg,#E8CBA0,#C98F73)" },
  { name: "Men's Grooming", icon: "razor", g: "linear-gradient(135deg,#9CA3C4,#5B6178)" },
  { name: "Gift Sets", icon: "gift", g: "linear-gradient(135deg,#E3C6A8,#D8B08C)" },
  { name: "Beauty Tools", icon: "brush", g: "linear-gradient(135deg,#D8B08C,#C98F73)" },
  { name: "Wellness", icon: "leaf", g: "linear-gradient(135deg,#F2D9D3,#C98F73)" },
];

export const categories: Category[] = rawCategories.map((c, i) => ({
  id: slugify(c.name),
  name: c.name,
  slug: slugify(c.name),
  chip: `background:${c.g}`,
  iconSvg: c.icon,
  order: i,
}));

/* ---------- discovery facets ---------- */
export const concerns = [
  { name: "Acne & Blemishes", sub: "48 products" },
  { name: "Pigmentation", sub: "36 products" },
  { name: "Anti-Ageing", sub: "52 products" },
  { name: "Dryness", sub: "41 products" },
  { name: "Dullness & Glow", sub: "63 products" },
  { name: "Sensitivity", sub: "29 products" },
];

export const skinTypes = [
  { name: "Oily", sub: "Balance & mattify", g: "linear-gradient(150deg,#F3ECE4,#E3C6A8)" },
  { name: "Dry", sub: "Deep nourishment", g: "linear-gradient(150deg,#FAF7F2,#F2D9D3)" },
  { name: "Combination", sub: "Targeted care", g: "linear-gradient(150deg,#F3ECE4,#D8B08C)" },
  { name: "Normal", sub: "Maintain & glow", g: "linear-gradient(150deg,#FAF7F2,#E3C6A8)" },
  { name: "Sensitive", sub: "Calm & soothe", g: "linear-gradient(150deg,#FAF7F2,#F2D9D3)" },
];

export const ingredients = [
  { name: "Rose", benefit: "Hydrates & soothes" },
  { name: "Saffron", benefit: "Brightens & evens" },
  { name: "Vitamin C", benefit: "Glow & radiance" },
  { name: "Retinol", benefit: "Firms & renews" },
  { name: "Niacinamide", benefit: "Refines pores" },
  { name: "Hyaluronic", benefit: "Deep moisture" },
  { name: "Salicylic Acid", benefit: "Clears breakouts" },
  { name: "Squalane", benefit: "Seals in softness" },
  { name: "Bakuchiol", benefit: "Gentle retinol" },
  { name: "Ceramides", benefit: "Repairs barrier" },
  { name: "Green Tea", benefit: "Calms & protects" },
  { name: "Collagen", benefit: "Plumps & lifts" },
  { name: "Aloe Vera", benefit: "Cools & heals" },
  { name: "Turmeric", benefit: "Evens tone" },
  { name: "Caffeine", benefit: "De-puffs eyes" },
  { name: "Peptides", benefit: "Smooths lines" },
  { name: "Argan Oil", benefit: "Nourishes deeply" },
  { name: "Shea Butter", benefit: "Rich moisture" },
  { name: "Jojoba", benefit: "Balances oil" },
  { name: "Glycolic Acid", benefit: "Resurfaces skin" },
  { name: "Vitamin E", benefit: "Protects & repairs" },
  { name: "Centella", benefit: "Soothes redness" },
  { name: "Charcoal", benefit: "Detoxifies pores" },
  { name: "Honey", benefit: "Softens & glows" },
];

export const routines = [
  { name: "Morning Routine", steps: "4 steps" },
  { name: "Night Routine", steps: "5 steps" },
  { name: "Wedding Glow", steps: "6 steps" },
  { name: "Acne Care", steps: "4 steps" },
  { name: "Dry Skin Rescue", steps: "5 steps" },
];

/* ---------- products ---------- */
const tagBgFor = (tag: string): string => {
  switch (tag) {
    case "Bestseller": return "linear-gradient(135deg,#5B4638,#7A5A48)";
    case "New": return "linear-gradient(135deg,#C98F73,#D8B08C)";
    case "Limited": return "linear-gradient(135deg,#B0735A,#8B5E3C)";
    default: return "linear-gradient(135deg,#5B4638,#7A5A48)";
  }
};

const descs: Record<number, string> = {
  1: "A weightless rosehip & hyaluronic serum that floods skin with moisture and leaves a soft, lit-from-within glow.",
  2: "A rich saffron-infused night cream that firms, repairs and renews while you sleep — wake to visibly brighter skin.",
  3: "A creamy, transfer-resistant matte that wears like a balm, in a timeless Indian rosewood shade.",
  4: "A fast-absorbing facial oil with 24K gold flakes & Kashmiri saffron for an instant, radiant finish.",
  5: "A breathable, skin-like foundation with skincare benefits and a luminous, second-skin dewy finish.",
  6: "An opulent oud & rose eau de parfum that unfolds from warm spice into a soft, lingering trail.",
  7: "A gentle cream cleanser that melts away makeup and impurities without stripping the skin barrier.",
  8: "A fast-absorbing silk body lotion with shea & almond for 48-hour cushioned softness.",
  9: "A weightless mineral sunscreen with SPF 50 that leaves no white cast and doubles as a primer.",
  10: "A warm amla & bhringraj hair oil that strengthens roots, tames frizz and deepens shine.",
  11: "A stable 10% vitamin C serum that brightens dull skin and visibly fades pigmentation over time.",
  12: "A buildable lip & cheek tint in a creamy cocoa rose, for an effortless flushed glow.",
  13: "A long-wear royal oudh attar, hand-blended for a rich, ceremonial Indian fragrance.",
  14: "An intensive marula repair mask that revives dry, damaged lengths in a single use.",
  15: "A whipped caramel body butter with cocoa & mango for deeply nourished, scented skin.",
  16: "A finely-milled loose setting powder that blurs pores and locks makeup for all-day wear.",
};

const rawProducts: {
  id: number; name: string; cat: string; brand: string; type: string;
  price: number; image?: string;  mrp: number; rating: number; reviews: number; tag: string;
}[] = [
  { id: 1, name: "Velvet Rose Radiance Serum",  image: "/products/product-1.jpg" ,cat: "Skincare", brand: "L'Oréal Paris", type: "Serum", price: 2499, mrp: 3200, rating: 4.8, reviews: 412, tag: "Bestseller" },
  { id: 2, name: "Saffron Glow Night Cream", image: "/products/product-2.jpg" ,cat: "Skincare", brand: "Pilgrim", type: "Night Cream", price: 3299, mrp: 3999, rating: 4.9, reviews: 289, tag: "New" },
  { id: 3, name: "Silk Petal Matte Lipstick", image: "/products/product-3.jpg" ,cat: "Makeup", brand: "Lakmé", type: "Lipstick", price: 899, mrp: 1200, rating: 4.7, reviews: 1024, tag: "Bestseller" },
  { id: 4, name: "24K Gold Elixir Face Oil", image: "/products/product-4.jpg" ,cat: "Skincare", brand: "L'Oréal Paris", type: "Face Oil", price: 1899, mrp: 2400, rating: 4.8, reviews: 176, tag: "New" },
  { id: 5, name: "Dewy Veil Serum Foundation",image: "/products/product-5.jpg" , cat: "Makeup", brand: "Maybelline", type: "Foundation", price: 1599, mrp: 2100, rating: 4.6, reviews: 531, tag: "Bestseller" },
  { id: 6, name: "Midnight Oud Eau de Parfum",image: "/products/product-6.jpg" , cat: "Fragrance", brand: "Bella Vita", type: "Perfume", price: 3899, mrp: 4600, rating: 4.9, reviews: 203, tag: "Limited" },
  { id: 7, name: "Gentle Bloom Cream Face Wash", image: "/products/product-7.jpg" ,cat: "Skincare", brand: "Dot & Key", type: "Face Wash", price: 699, mrp: 899, rating: 4.7, reviews: 803, tag: "" },
  { id: 8, name: "Silk Hydra Body Lotion", image: "/products/product-8.jpg" ,cat: "Body Care", brand: "Plum", type: "Body Lotion", price: 1099, mrp: 1400, rating: 4.7, reviews: 142, tag: "" },
  { id: 9, name: "Aqua Shield Sunscreen SPF 50", image: "/products/product-9.jpg" ,cat: "Skincare", brand: "The Derma Co.", type: "Sunscreen", price: 999, mrp: 1300, rating: 4.8, reviews: 367, tag: "Bestseller" },
  { id: 10, name: "Amla Bhringraj Hair Oil", image: "/products/product-10.jpg" ,cat: "Hair Care", brand: "Mamaearth", type: "Hair Oil", price: 849, mrp: 1100, rating: 4.6, reviews: 255, tag: "New" },
  { id: 11, name: "Pearl Bright Vitamin C Serum", image: "/products/product-11.jpg" ,cat: "Skincare", brand: "Minimalist", type: "Serum", price: 1799, mrp: 2300, rating: 4.8, reviews: 612, tag: "Bestseller" },
  { id: 12, name: "Cocoa Silk Lip & Cheek Tint", image: "/products/product-12.jpg" ,cat: "Makeup", brand: "Nivea", type: "Lip Tint", price: 749, mrp: 950, rating: 4.7, reviews: 489, tag: "New" },
  { id: 13, name: "Royal Oudh Attar Perfume", image: "/products/product-13.jpg" ,cat: "Fragrance", brand: "Bella Vita", type: "Perfume", price: 4299, mrp: 5200, rating: 4.9, reviews: 158, tag: "Limited" },
  { id: 14, name: "Marula Repair Hair Mask", image: "/products/product-14.jpg" ,cat: "Hair Care", brand: "Innisfree", type: "Hair Mask", price: 1299, mrp: 1700, rating: 4.7, reviews: 211, tag: "" },
  { id: 15, name: "Caramel Glow Body Butter",image: "/products/product-15.jpg" , cat: "Body Care", brand: "Plum", type: "Body Butter", price: 1199, mrp: 1500, rating: 4.8, reviews: 304, tag: "Bestseller" },
  { id: 16, name: "Silk Veil Loose Setting Powder", image: "/products/product-16.jpg" ,cat: "Makeup", brand: "Maybelline", type: "Setting Powder", price: 1399, mrp: 1800, rating: 4.6, reviews: 276, tag: "New" },

  /* ---- Skincare ---- */
  { id: 17, name: "Hydra Bloom Gel Moisturiser", image: "/products/product-17.jpg" , cat: "Skincare", brand: "Plum", type: "Moisturiser", price: 1299, mrp: 1700, rating: 4.6, reviews: 188, tag: "" },
  { id: 18, name: "Clarifying Niacinamide Serum", image: "/products/product-18.jpg" ,cat: "Skincare", brand: "The Derma Co.", type: "Serum", price: 1099, mrp: 1400, rating: 4.7, reviews: 256, tag: "New" },

  /* ---- Makeup ---- */
  { id: 19, name: "Luminous Silk Concealer",image: "/products/product-19.jpg" , cat: "Makeup", brand: "Lakmé", type: "Concealer", price: 999, mrp: 1300, rating: 4.6, reviews: 342, tag: "" },
  { id: 20, name: "Rose Quartz Cream Blush",image: "/products/product-20.jpg" , cat: "Makeup", brand: "Sugar Cosmetics", type: "Blush", price: 1199, mrp: 1500, rating: 4.7, reviews: 219, tag: "New" },
  { id: 21, name: "Bold Wing Liquid Liner",image: "/products/product-21.jpg" , cat: "Makeup", brand: "Maybelline", type: "Eyeliner", price: 699, mrp: 900, rating: 4.5, reviews: 410, tag: "" },

  /* ---- Hair Care ---- */
  { id: 22, name: "Argan Repair Shampoo",image: "/products/product-22.jpg" , cat: "Hair Care", brand: "Innisfree", type: "Shampoo", price: 799, mrp: 1000, rating: 4.6, reviews: 301, tag: "" },
  { id: 23, name: "Silk Bond Conditioner", image: "/products/product-23.jpg" ,cat: "Hair Care", brand: "Innisfree", type: "Conditioner", price: 849, mrp: 1100, rating: 4.6, reviews: 254, tag: "" },
  { id: 24, name: "Rosemary Scalp Serum", image: "/products/product-24.jpg" ,cat: "Hair Care", brand: "WishCare", type: "Hair Serum", price: 999, mrp: 1300, rating: 4.7, reviews: 167, tag: "New" },
  { id: 25, name: "Keratin Shine Hair Mist", image: "/products/product-25.jpg" , cat: "Hair Care", brand: "Swiss Beauty", type: "Hair Mist", price: 749, mrp: 950, rating: 4.5, reviews: 132, tag: "" },

  /* ---- Body Care ---- */
  { id: 26, name: "Vanilla Bloom Body Wash",image: "/products/product-26.jpg" , cat: "Body Care", brand: "Plum", type: "Body Wash", price: 699, mrp: 900, rating: 4.6, reviews: 211, tag: "" },
  { id: 27, name: "Coffee Glow Body Scrub",image: "/products/product-27.jpg" , cat: "Body Care", brand: "Dot & Key", type: "Body Scrub", price: 799, mrp: 1050, rating: 4.7, reviews: 289, tag: "Bestseller" },
  { id: 28, name: "Shea Comfort Hand Cream", image: "/products/product-28.jpg" , cat: "Body Care", brand: "Plum", type: "Hand Cream", price: 499, mrp: 650, rating: 4.6, reviews: 176, tag: "" },
  { id: 29, name: "Rose Milk Body Lotion", image: "/products/product-29.jpg" , cat: "Body Care", brand: "Nivea", type: "Body Lotion", price: 899, mrp: 1150, rating: 4.5, reviews: 143, tag: "New" },

  /* ---- Fragrance ---- */
  { id: 30, name: "Amber Saffron Eau de Parfum", image: "/products/product-30.jpg" , cat: "Fragrance", brand: "Engage", type: "Perfume", price: 3499, mrp: 4200, rating: 4.8, reviews: 187, tag: "Limited" },
  { id: 31, name: "Jasmine Nuit Eau de Parfum", image: "/products/product-31.jpg" , cat: "Fragrance", brand: "Bella Vita", type: "Perfume", price: 2999, mrp: 3600, rating: 4.7, reviews: 156, tag: "" },
  { id: 32, name: "Citrus Bloom Body Mist", image: "/products/product-32.jpg" , cat: "Fragrance", brand: "Dove", type: "Body Mist", price: 999, mrp: 1300, rating: 4.5, reviews: 234, tag: "New" },
  { id: 33, name: "Velvet Rose Attar", image: "/products/product-33.jpg" , cat: "Fragrance", brand: "Pilgrim", type: "Attar", price: 2499, mrp: 3100, rating: 4.8, reviews: 121, tag: "" },

  /* ---- Bath & Shower ---- */
  { id: 34, name: "Lavender Calm Bath Salts",image: "/products/product-34.jpg" , cat: "Bath & Shower", brand: "Dot & Key", type: "Bath Salts", price: 799, mrp: 1000, rating: 4.6, reviews: 142, tag: "New" },
  { id: 35, name: "Rose Petal Shower Gel", image: "/products/product-35.jpg" ,cat: "Bath & Shower", brand: "Nivea", type: "Shower Gel", price: 599, mrp: 800, rating: 4.5, reviews: 198, tag: "" },
  { id: 36, name: "Honey Oat Body Bar", image: "/products/product-36.jpg" , cat: "Bath & Shower", brand: "Plum", type: "Soap Bar", price: 399, mrp: 550, rating: 4.6, reviews: 167, tag: "" },
  { id: 37, name: "Eucalyptus Mint Body Wash", image: "/products/product-37.jpg" , cat: "Bath & Shower", brand: "WishCare", type: "Body Wash", price: 649, mrp: 850, rating: 4.5, reviews: 121, tag: "" },
  { id: 38, name: "Saffron Glow Bath Oil", image: "/products/product-38.jpg" , cat: "Bath & Shower", brand: "Pilgrim", type: "Bath Oil", price: 1099, mrp: 1400, rating: 4.7, reviews: 98, tag: "Limited" },
  { id: 39, name: "Citrus Burst Shower Foam", image: "/products/product-39.jpg" , cat: "Bath & Shower", brand: "Dove", type: "Shower Foam", price: 549, mrp: 750, rating: 4.4, reviews: 156, tag: "" },

  /* ---- Lip Care ---- */
  { id: 40, name: "Rose Tint Lip Balm", image: "/products/product-40.jpg" ,cat: "Lip Care", brand: "Nivea", type: "Lip Balm", price: 399, mrp: 550, rating: 4.7, reviews: 423, tag: "Bestseller" },
  { id: 41, name: "Overnight Lip Sleeping Mask", image: "/products/product-41.jpg" , cat: "Lip Care", brand: "Laneige", type: "Lip Mask", price: 599, mrp: 800, rating: 4.8, reviews: 312, tag: "New" },
  { id: 42, name: "Shea Lip Butter", image: "/products/product-42.jpg" , cat: "Lip Care", brand: "Plum", type: "Lip Butter", price: 349, mrp: 450, rating: 4.6, reviews: 198, tag: "" },
  { id: 43, name: "Berry Sugar Lip Scrub", image: "/products/product-43.jpg" , cat: "Lip Care", brand: "Dot & Key", type: "Lip Scrub", price: 449, mrp: 600, rating: 4.5, reviews: 167, tag: "" },
  { id: 44, name: "Tinted Lip Oil Gloss", image: "/products/product-44.jpg" , cat: "Lip Care", brand: "Sugar Cosmetics", type: "Lip Oil", price: 749, mrp: 950, rating: 4.7, reviews: 256, tag: "New" },
  { id: 45, name: "SPF Lip Shield Balm", image: "/products/product-45.jpg" , cat: "Lip Care", brand: "The Derma Co.", type: "Lip Care", price: 399, mrp: 550, rating: 4.5, reviews: 134, tag: "" },

  /* ---- Eye Care ---- */
  { id: 46, name: "Caffeine Eye Roll-On", image: "/products/product-46.jpg" ,cat: "Eye Care", brand: "The Derma Co.", type: "Eye Serum", price: 899, mrp: 1200, rating: 4.6, reviews: 287, tag: "Bestseller" },
  { id: 47, name: "Gold Hydrogel Eye Patches", image: "/products/product-47.jpg" , cat: "Eye Care", brand: "Laneige", type: "Eye Patches", price: 1099, mrp: 1400, rating: 4.8, reviews: 234, tag: "New" },
  { id: 48, name: "Retinol Renewal Eye Cream", image: "/products/product-48.jpg" , cat: "Eye Care", brand: "Minimalist", type: "Eye Cream", price: 1299, mrp: 1700, rating: 4.7, reviews: 176, tag: "" },
  { id: 49, name: "Brightening Under-Eye Serum", image: "/products/product-49.jpg" , cat: "Eye Care", brand: "L'Oréal Paris", type: "Eye Serum", price: 1499, mrp: 1900, rating: 4.7, reviews: 143, tag: "" },
  { id: 50, name: "Cucumber Cooling Eye Gel", image: "/products/product-50.jpg" , cat: "Eye Care", brand: "Dot & Key", type: "Eye Gel", price: 699, mrp: 900, rating: 4.5, reviews: 121, tag: "" },
  { id: 51, name: "Peptide Eye Firming Balm", image: "/products/product-51.jpg" , cat: "Eye Care", brand: "The Derma Co.", type: "Eye Balm", price: 1199, mrp: 1550, rating: 4.6, reviews: 98, tag: "New" },

  /* ---- Korean Beauty ---- */
  { id: 52, name: "Snail Mucin Glow Essence", image: "/products/product-52.jpg" ,cat: "Korean Beauty", brand: "Laneige", type: "Essence", price: 1199, mrp: 1500, rating: 4.8, reviews: 512, tag: "Bestseller" },
  { id: 53, name: "Rice Water Brightening Toner", image: "/products/product-53.jpg" , cat: "Korean Beauty", brand: "Innisfree", type: "Toner", price: 899, mrp: 1150, rating: 4.7, reviews: 389, tag: "New" },
  { id: 54, name: "Centella Soothing Ampoule", image: "/products/product-54.jpg" , cat: "Korean Beauty", brand: "Laneige", type: "Ampoule", price: 1099, mrp: 1400, rating: 4.7, reviews: 267, tag: "" },
  { id: 55, name: "Glass Skin Sleeping Mask", image: "/products/product-55.jpg" , cat: "Korean Beauty", brand: "Innisfree", type: "Sleeping Mask", price: 1299, mrp: 1650, rating: 4.8, reviews: 198, tag: "New" },
  { id: 56, name: "Green Tea Cleansing Oil", image: "/products/product-56.jpg" , cat: "Korean Beauty", brand: "Laneige", type: "Cleansing Oil", price: 999, mrp: 1300, rating: 4.6, reviews: 176, tag: "" },
  { id: 57, name: "Cica Calming Sheet Mask", image: "/products/product-57.jpg" , cat: "Korean Beauty", brand: "Innisfree", type: "Sheet Mask", price: 299, mrp: 400, rating: 4.6, reviews: 423, tag: "Bestseller" },

  /* ---- Luxury Beauty ---- */
  { id: 58, name: "24K Gold Firming Face Mask",image: "/products/product-58.jpg" , cat: "Luxury Beauty", brand: "L'Oréal Paris", type: "Face Mask", price: 4499, mrp: 5400, rating: 4.9, reviews: 142, tag: "Limited" },
  { id: 59, name: "Diamond Radiance Cream",image: "/products/product-59.jpg" , cat: "Luxury Beauty", brand: "L'Oréal Paris", type: "Face Cream", price: 4999, mrp: 5400, rating: 4.9, reviews: 98, tag: "Limited" },
  { id: 60, name: "Caviar Lift Serum", image: "/products/product-60.jpg" , cat: "Luxury Beauty", brand: "Engage", type: "Serum", price: 5299, mrp: 5499, rating: 4.8, reviews: 76, tag: "Limited" },
  { id: 61, name: "Rose Gold Elixir Oil", image: "/products/product-61.jpg" , cat: "Luxury Beauty", brand: "Nivea", type: "Face Oil", price: 3999, mrp: 4800, rating: 4.8, reviews: 121, tag: "" },
  { id: 62, name: "Pearl Luminous Highlighter", image: "/products/product-62.jpg" , cat: "Luxury Beauty", brand: "Lakmé", type: "Highlighter", price: 2499, mrp: 3100, rating: 4.7, reviews: 167, tag: "New" },
  { id: 63, name: "Saffron Royale Night Balm", image: "/products/product-63.jpg" , cat: "Luxury Beauty", brand: "Pilgrim", type: "Night Balm", price: 4299, mrp: 5100, rating: 4.8, reviews: 89, tag: "Limited" },

  /* ---- Men's Grooming ---- */
  { id: 64, name: "Sandalwood Beard Oil", image: "/products/product-64.jpg" ,cat: "Men's Grooming", brand: "WishCare", type: "Beard Oil", price: 699, mrp: 900, rating: 4.7, reviews: 312, tag: "Bestseller" },
  { id: 65, name: "Charcoal Face Wash for Men",image: "/products/product-65.jpg" , cat: "Men's Grooming", brand: "The Derma Co.", type: "Face Wash", price: 499, mrp: 650, rating: 4.6, reviews: 287, tag: "" },
  { id: 66, name: "Cooling Aftershave Balm", image: "/products/product-66.jpg" , cat: "Men's Grooming", brand: "WishCare", type: "Aftershave", price: 599, mrp: 800, rating: 4.5, reviews: 198, tag: "" },
  { id: 67, name: "Matte Finish Hair Clay", image: "/products/product-67.jpg" , cat: "Men's Grooming", brand: "Minimalist", type: "Hair Clay", price: 649, mrp: 850, rating: 4.6, reviews: 234, tag: "New" },
  { id: 68, name: "Energising Face Moisturiser", image: "/products/product-68.jpg" , cat: "Men's Grooming", brand: "The Derma Co.", type: "Moisturiser", price: 799, mrp: 1050, rating: 4.6, reviews: 156, tag: "" },
  { id: 69, name: "Cedar & Musk Eau de Toilette", image: "/products/product-69.jpg" , cat: "Men's Grooming", brand: "Engage", type: "Perfume", price: 2299, mrp: 2800, rating: 4.7, reviews: 143, tag: "New" },

  /* ---- Gift Sets ---- */
  { id: 70, name: "Glow Ritual Gift Box",image: "/products/product-70.jpg" , cat: "Gift Sets", brand: "L'Oréal Paris", type: "Gift Set", price: 3499, mrp: 4500, rating: 4.8, reviews: 198, tag: "Bestseller" },
  { id: 71, name: "Bridal Radiance Hamper", image: "/products/product-71.jpg" ,cat: "Gift Sets", brand: "Pilgrim", type: "Gift Set", price: 4999, mrp: 5499, rating: 4.9, reviews: 121, tag: "Limited" },
  { id: 72, name: "Fragrance Discovery Set", image: "/products/product-72.jpg" , cat: "Gift Sets", brand: "Bella Vita", type: "Gift Set", price: 2999, mrp: 3800, rating: 4.7, reviews: 156, tag: "New" },
  { id: 73, name: "Self-Care Sunday Kit", image: "/products/product-73.jpg" , cat: "Gift Sets", brand: "Dot & Key", type: "Gift Set", price: 1999, mrp: 2600, rating: 4.6, reviews: 234, tag: "" },
  { id: 74, name: "K-Beauty Starter Set", image: "/products/product-74.jpg" , cat: "Gift Sets", brand: "Laneige", type: "Gift Set", price: 2499, mrp: 3200, rating: 4.7, reviews: 187, tag: "New" },
  { id: 75, name: "Men's Grooming Travel Kit", image: "/products/product-75.jpg" , cat: "Gift Sets", brand: "WishCare", type: "Gift Set", price: 1799, mrp: 2300, rating: 4.6, reviews: 143, tag: "" },

  /* ---- Beauty Tools ---- */
  { id: 76, name: "Rose Quartz Facial Roller",image: "/products/product-76.jpg" , cat: "Beauty Tools", brand: "Swiss Beauty", type: "Facial Roller", price: 999, mrp: 1300, rating: 4.7, reviews: 312, tag: "Bestseller" },
  { id: 77, name: "Gua Sha Sculpting Stone", image: "/products/product-77.jpg" ,cat: "Beauty Tools", brand: "Swiss Beauty", type: "Gua Sha", price: 799, mrp: 1050, rating: 4.6, reviews: 267, tag: "" },
  { id: 78, name: "Pro Blending Sponge Set", image: "/products/product-78.jpg" , cat: "Beauty Tools", brand: "Maybelline", type: "Makeup Sponge", price: 499, mrp: 650, rating: 4.5, reviews: 198, tag: "" },
  { id: 79, name: "Luxe 12-Piece Makeup Brush Set", image: "/products/product-79.jpg" , cat: "Beauty Tools", brand: "Lakmé", type: "Brush Set", price: 1999, mrp: 2600, rating: 4.8, reviews: 156, tag: "New" },
  { id: 80, name: "Silicone Cleansing Brush", image: "/products/product-80.jpg" , cat: "Beauty Tools", brand: "Innisfree", type: "Cleansing Brush", price: 899, mrp: 1150, rating: 4.5, reviews: 143, tag: "" },
  { id: 81, name: "Heatless Curl Styling Kit", image: "/products/product-81.jpg" , cat: "Beauty Tools", brand: "Swiss Beauty", type: "Styling Tool", price: 699, mrp: 900, rating: 4.6, reviews: 121, tag: "New" },

  /* ---- Wellness ---- */
  { id: 82, name: "Glow Skin Collagen Powder", image: "/products/product-82.jpg" ,cat: "Wellness", brand: "WishCare", type: "Supplement", price: 1499, mrp: 1900, rating: 4.7, reviews: 287, tag: "Bestseller" },
  { id: 83, name: "Biotin Hair & Nail Gummies", image: "/products/product-83.jpg" ,cat: "Wellness", brand: "Mamaearth", type: "Supplement", price: 999, mrp: 1300, rating: 4.6, reviews: 234, tag: "New" },
  { id: 84, name: "Calm Mind Ashwagandha Drops", image: "/products/product-84.jpg" , cat: "Wellness", brand: "WishCare", type: "Wellness Drops", price: 899, mrp: 1150, rating: 4.6, reviews: 167, tag: "" },
  { id: 85, name: "Beauty Sleep Herbal Tea", image: "/products/product-85.jpg" , cat: "Wellness", brand: "Plum", type: "Herbal Tea", price: 599, mrp: 800, rating: 4.5, reviews: 143, tag: "" },
  { id: 86, name: "Aromatherapy Pillow Mist", image: "/products/product-86.jpg" , cat: "Wellness", brand: "Dot & Key", type: "Pillow Mist", price: 749, mrp: 950, rating: 4.6, reviews: 121, tag: "New" },
  { id: 87, name: "Detox Glow Green Powder", image: "/products/product-87.jpg" , cat: "Wellness", brand: "Mamaearth", type: "Supplement", price: 1199, mrp: 1550, rating: 4.5, reviews: 98, tag: "" },
];

export const products: Product[] = rawProducts.map((p) => ({
  id: String(p.id),
  name: p.name,
  brand: p.brand,
  category: slugify(p.cat),
  price: p.price,
  mrp: p.mrp,
  rating: p.rating,
  reviewCount: p.reviews,
  // No image → empty list, so ImageSlot falls back to its gradient placeholder.
  // (Pointing at /products/placeholder.jpg would 404 — that file doesn't exist.)
  images: p.image ? [p.image] : [],
  tags: p.tag ? [p.tag] : [],
  tagBg: p.tag ? tagBgFor(p.tag) : undefined,
  stock: 50,
  description:
    descs[p.id] ??
    `A premium ${p.type.toLowerCase()} from ${p.brand}, crafted for an indulgent SHRINGAR beauty ritual.`,
  benefits: ["Dermatologist tested", "Cruelty free", "Paraben free"],
  howToUse: `Apply ${p.type.toLowerCase()} to clean skin as part of your daily ritual.`,
  featured: p.tag === "Bestseller" || p.id <= 6,
  bestseller: p.tag === "Bestseller",
  newArrival: p.tag === "New",
}));

export const getProductById = (id: string) => products.find((p) => p.id === id);

/* ---------- customer stories ---------- */
export const customerStories = [
  { name: "Ananya Rao", handle: "@ananya.glows", rating: 5, date: "2 weeks ago", text: "My skin has never looked this radiant. The serum absorbs instantly and the glow is unreal. Repurchasing forever!", product: "Velvet Rose Radiance Serum" },
  { name: "Meera Kapoor", handle: "@meerak", rating: 5, date: "1 month ago", text: "Genuinely luxurious without the harsh chemicals. The night cream transformed my dry winter skin completely.", product: "Saffron Glow Night Cream" },
  { name: "Priya Sharma", handle: "@priyas.beauty", rating: 5, date: "3 weeks ago", text: "The packaging feels like unwrapping a gift and the foundation is the most skin-like I have ever worn. Obsessed.", product: "Dewy Veil Serum Foundation" },
];
