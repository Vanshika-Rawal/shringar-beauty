import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./config";
import type { WishlistItem } from "@/types";

const wishlistRef = (uid: string) => doc(db, "wishlist", uid);

export async function getWishlist(uid: string): Promise<WishlistItem[]> {
  const snap = await getDoc(wishlistRef(uid));
  if (!snap.exists()) return [];
  return (snap.data().items ?? []) as WishlistItem[];
}

export async function saveWishlist(
  uid: string,
  items: WishlistItem[]
): Promise<void> {
  await setDoc(
    wishlistRef(uid),
    { userId: uid, items, updatedAt: serverTimestamp() },
    { merge: true }
  );
}
