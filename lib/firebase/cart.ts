import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./config";
import type { CartItem } from "@/types";

const cartRef = (uid: string) => doc(db, "cart", uid);

export async function getCart(uid: string): Promise<CartItem[]> {
  const snap = await getDoc(cartRef(uid));
  if (!snap.exists()) return [];
  return (snap.data().items ?? []) as CartItem[];
}

/** Persist the whole cart for a user (called after every local mutation). */
export async function saveCart(
  uid: string,
  items: CartItem[],
  couponCode?: string
): Promise<void> {
  await setDoc(
    cartRef(uid),
    { userId: uid, items, couponCode: couponCode ?? null, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

export async function clearCart(uid: string): Promise<void> {
  await setDoc(cartRef(uid), { userId: uid, items: [], updatedAt: serverTimestamp() });
}
