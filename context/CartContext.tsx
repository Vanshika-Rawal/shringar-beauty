"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getCart, saveCart } from "@/lib/firebase/cart";
import { useAuth } from "./AuthContext";
import type { CartItem, Product } from "@/types";

const STORAGE_KEY = "shringar_cart";
const FREE_SHIP_THRESHOLD = 1499;

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  couponCode: string;
  shipRemaining: number;
  shipPct: number;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  setCouponCode: (code: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function readLocal(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const { firebaseUser } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [couponCode, setCouponCode] = useState("");
  const hydrated = useRef(false);

  // Hydrate from localStorage (guest) on mount.
  useEffect(() => {
    setItems(readLocal());
    hydrated.current = true;
  }, []);

  // When a user logs in, merge their Firestore cart with the guest cart.
  useEffect(() => {
    if (!firebaseUser) return;
    let active = true;
    (async () => {
      const remote = await getCart(firebaseUser.uid);
      if (!active) return;
      setItems((local) => mergeCarts(local, remote));
    })();
    return () => {
      active = false;
    };
  }, [firebaseUser]);

  // Persist on every change — localStorage always, Firestore when logged in.
  useEffect(() => {
    if (!hydrated.current) return;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
    if (firebaseUser) {
      void saveCart(firebaseUser.uid, items, couponCode);
    }
  }, [items, couponCode, firebaseUser]);

  const addToCart = useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product.id);
      if (existing) {
        return prev.map((i) =>
          i.productId === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          brand: product.brand,
          image: product.images[0] ?? "",
          price: product.price,
          mrp: product.mrp,
          qty,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.productId !== productId)
        : prev.map((i) => (i.productId === productId ? { ...i, qty } : i))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items]
  );
  // Number of distinct products in the bag (matches the "{items.length} items"
  // label on the cart page, so the header badge never disagrees with it).
  const count = useMemo(() => items.length, [items]);
  const shipRemaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
  const shipPct = Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      subtotal,
      couponCode,
      shipRemaining,
      shipPct,
      addToCart,
      removeFromCart,
      updateQty,
      setCouponCode,
      clear,
    }),
    [items, count, subtotal, couponCode, shipRemaining, shipPct, addToCart, removeFromCart, updateQty, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

function mergeCarts(a: CartItem[], b: CartItem[]): CartItem[] {
  const map = new Map<string, CartItem>();
  for (const item of [...a, ...b]) {
    const existing = map.get(item.productId);
    map.set(
      item.productId,
      existing ? { ...existing, qty: Math.max(existing.qty, item.qty) } : item
    );
  }
  return [...map.values()];
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
