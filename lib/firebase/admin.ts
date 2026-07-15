import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./config";
import type { Category, Product } from "@/types";

/* ---------- products ---------- */
export async function addProduct(
  product: Omit<Product, "id" | "createdAt">
): Promise<string> {
  const refDoc = await addDoc(collection(db, "products"), {
    ...product,
    createdAt: serverTimestamp(),
  });
  return refDoc.id;
}

export async function updateProduct(
  id: string,
  data: Partial<Product>
): Promise<void> {
  await updateDoc(doc(db, "products", id), data);
}

export async function deleteProduct(id: string): Promise<void> {
  await deleteDoc(doc(db, "products", id));
}

/* ---------- categories ---------- */
export async function upsertCategory(category: Category): Promise<void> {
  await setDoc(doc(db, "categories", category.id), category, { merge: true });
}

export async function deleteCategory(id: string): Promise<void> {
  await deleteDoc(doc(db, "categories", id));
}

/* ---------- storage ---------- */
/** Upload a product image and return its public download URL. */
export async function uploadProductImage(
  file: File,
  productId: string
): Promise<string> {
  const path = `products/${productId}/${Date.now()}-${file.name}`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
}
