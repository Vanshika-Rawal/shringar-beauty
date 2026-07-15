import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "./config";
import type { Review } from "@/types";

const reviewsCol = collection(db, "reviews");

export async function getProductReviews(productId: string): Promise<Review[]> {
  const snap = await getDocs(
    query(
      reviewsCol,
      where("productId", "==", productId),
      orderBy("createdAt", "desc")
    )
  );
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Review, "id">) }));
}

export async function addReview(
  review: Omit<Review, "id" | "createdAt">
): Promise<string> {
  const ref = await addDoc(reviewsCol, { ...review, createdAt: serverTimestamp() });
  return ref.id;
}
