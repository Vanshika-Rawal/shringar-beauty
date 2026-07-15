import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./config";
import type { Category } from "@/types";

/** Public read of the category list (ordered). Empty if not yet seeded. */
export async function getAllCategories(): Promise<Category[]> {
  try {
    const snap = await getDocs(query(collection(db, "categories"), orderBy("order", "asc")));
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Category, "id">) }));
  } catch {
    // `order` may be missing on some docs — fall back to an unordered read.
    const snap = await getDocs(collection(db, "categories"));
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Category, "id">) }));
  }
}
