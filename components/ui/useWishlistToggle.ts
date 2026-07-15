"use client";

import { useCallback, useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import type { Product } from "@/types";

/**
 * Single source of truth for the card wishlist interaction:
 *  - toggles the item
 *  - fires the "Added to Wishlist" toast on every save (and a removal toast)
 *  - bumps `burst` so the card can play the large flower-petal animation
 *
 * Reused by every product card so the behaviour stays identical everywhere.
 */
export function useWishlistToggle(product: Product) {
  const { has, toggle } = useWishlist();
  const { notify } = useToast();
  const wished = has(product.id);
  const [burst, setBurst] = useState(0);

  const onWish = useCallback(() => {
    const adding = !has(product.id);
    toggle(product);
    if (adding) {
      setBurst((k) => k + 1);
      notify("Added to Wishlist ❤️");
    } else {
      notify("Removed from Wishlist 💔");
    }
  }, [has, toggle, product, notify]);

  return { wished, onWish, burst };
}
