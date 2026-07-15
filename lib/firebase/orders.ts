import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./config";
import type { Order, OrderStatus } from "@/types";

const ordersCol = collection(db, "orders");

/** Newest first. Sorted in memory so we don't need a Firestore composite index. */
function byNewest(a: Order, b: Order): number {
  const ta = a.createdAt?.toMillis?.() ?? 0;
  const tb = b.createdAt?.toMillis?.() ?? 0;
  return tb - ta;
}

export async function createOrder(
  order: Omit<Order, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(ordersCol, { ...order, createdAt: serverTimestamp() });
  return ref.id;
}

export async function getUserOrders(uid: string): Promise<Order[]> {
  // Filter by user only; sorting by createdAt here would require a composite
  // index (userId + createdAt). We sort client-side instead so it always works.
  const snap = await getDocs(query(ordersCol, where("userId", "==", uid)));
  return snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as Omit<Order, "id">) }))
    .sort(byNewest);
}

export async function getAllOrders(): Promise<Order[]> {
  const snap = await getDocs(ordersCol);
  return snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as Omit<Order, "id">) }))
    .sort(byNewest);
}

export async function getOrder(id: string): Promise<Order | null> {
  const snap = await getDoc(doc(db, "orders", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...(snap.data() as Omit<Order, "id">) };
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus
): Promise<void> {
  await updateDoc(doc(db, "orders", id), { status });
}
