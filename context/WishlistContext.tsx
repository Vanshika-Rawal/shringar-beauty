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
import { getWishlist, saveWishlist } from "@/lib/firebase/wishlist";
import { useAuth } from "./AuthContext";
import type { Product, WishlistItem } from "@/types";

const STORAGE_KEY = "shringar_wishlist";

interface WishlistContextValue {
  items: WishlistItem[];
  count: number;
  has: (productId: string) => boolean;
  toggle: (product: Product) => void;
  remove: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

function readLocal(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { firebaseUser } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const hydrated = useRef(false);

  useEffect(() => {
    setItems(readLocal());
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!firebaseUser) return;
    let active = true;
    (async () => {
      const remote = await getWishlist(firebaseUser.uid);
      if (!active) return;
      setItems((local) => {
        const map = new Map<string, WishlistItem>();
        for (const i of [...local, ...remote]) map.set(i.productId, i);
        return [...map.values()];
      });
    })();
    return () => {
      active = false;
    };
  }, [firebaseUser]);

  useEffect(() => {
    if (!hydrated.current) return;
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
    if (firebaseUser) void saveWishlist(firebaseUser.uid, items);
  }, [items, firebaseUser]);

  const has = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items]
  );

  const toggle = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.some((i) => i.productId === product.id)) {
        return prev.filter((i) => i.productId !== product.id);
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
        },
      ];
    });
  }, []);

  const remove = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const value = useMemo<WishlistContextValue>(
    () => ({ items, count: items.length, has, toggle, remove }),
    [items, has, toggle, remove]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within <WishlistProvider>");
  return ctx;
}
