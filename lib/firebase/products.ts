import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit as fbLimit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./config";
import type { Product } from "@/types";

const productsCol = collection(db, "products");

function mapProduct(id: string, data: Record<string, unknown>): Product {
  return { id, ...(data as Omit<Product, "id">) };
}

export async function getAllProducts(): Promise<Product[]> {
  const snap = await getDocs(query(productsCol, orderBy("createdAt", "desc")));
  return snap.docs.map((d) => mapProduct(d.id, d.data()));
}

export async function getProduct(id: string): Promise<Product | null> {
  const snap = await getDoc(doc(db, "products", id));
  if (!snap.exists()) return null;
  return mapProduct(snap.id, snap.data());
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const snap = await getDocs(query(productsCol, where("category", "==", category)));
  return snap.docs.map((d) => mapProduct(d.id, d.data()));
}

export async function getFeaturedProducts(max = 8): Promise<Product[]> {
  const snap = await getDocs(
    query(productsCol, where("featured", "==", true), fbLimit(max))
  );
  return snap.docs.map((d) => mapProduct(d.id, d.data()));
}

export async function getBestsellers(max = 8): Promise<Product[]> {
  const snap = await getDocs(
    query(productsCol, where("bestseller", "==", true), fbLimit(max))
  );
  return snap.docs.map((d) => mapProduct(d.id, d.data()));
}

export async function getNewArrivals(max = 8): Promise<Product[]> {
  const snap = await getDocs(
    query(productsCol, where("newArrival", "==", true), fbLimit(max))
  );
  return snap.docs.map((d) => mapProduct(d.id, d.data()));
}

export async function getRelatedProducts(
  product: Product,
  max = 4
): Promise<Product[]> {
  const snap = await getDocs(
    query(productsCol, where("category", "==", product.category), fbLimit(max + 1))
  );
  return snap.docs
    .map((d) => mapProduct(d.id, d.data()))
    .filter((p) => p.id !== product.id)
    .slice(0, max);
}
