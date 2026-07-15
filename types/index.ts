import type { Timestamp } from "firebase/firestore";

/* ============================================================
   SHRINGAR — Firestore collection schemas & shared types
   Collections: users, products, categories, orders, wishlist,
   reviews, cart, coupons
   ============================================================ */

export type Role = "user" | "admin";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "cancelled";

/* ---------- products ---------- */
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string; // category slug
  /** Selling price in INR (rupees). */
  price: number;
  /** Maximum retail price in INR (rupees). */
  mrp: number;
  rating: number; // 0..5
  reviewCount: number;
  images: string[]; // Firebase Storage download URLs
  /** Promotional tags shown on the card, e.g. "Bestseller", "New". */
  tags: string[];
  /** Background CSS for the tag chip (matches design colors). */
  tagBg?: string;
  stock: number;
  description: string;
  ingredients?: string;
  benefits?: string[];
  howToUse?: string;
  /** Discovery facets used by the shop filters. */
  concerns?: string[];
  skinTypes?: string[];
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  createdAt?: Timestamp;
}

/* ---------- categories ---------- */
export interface Category {
  id: string;
  name: string;
  slug: string;
  /** Inline gradient CSS string, e.g. "background:linear-gradient(...)". */
  chip: string;
  /** Raw inline SVG markup for the category icon (from the design). */
  iconSvg: string;
  order?: number;
}

/* ---------- addresses ---------- */
export interface Address {
  id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  isDefault: boolean;
}

/* ---------- users ---------- */
export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: Role;
  addresses: Address[];
  phone?: string;
  createdAt?: Timestamp;
}

/* ---------- cart ---------- */
export interface CartItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  /** Unit price snapshot taken at add-to-cart time. */
  price: number;
  mrp: number;
  qty: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  couponCode?: string;
  updatedAt?: Timestamp;
}

/* ---------- wishlist ---------- */
export interface WishlistItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  mrp: number;
  addedAt?: Timestamp;
}

export interface Wishlist {
  userId: string;
  items: WishlistItem[];
}

/* ---------- orders ---------- */
export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  qty: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  address: Address;
  couponCode?: string;
  paymentMethod: "cod" | "card" | "upi";
  createdAt?: Timestamp;
}

/* ---------- reviews ---------- */
export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number; // 1..5
  title?: string;
  text: string;
  verified: boolean;
  createdAt?: Timestamp;
}

/* ---------- coupons ---------- */
export interface Coupon {
  code: string;
  type: "percent" | "flat";
  value: number;
  minSubtotal: number;
  active: boolean;
  expiresAt?: Timestamp;
}
