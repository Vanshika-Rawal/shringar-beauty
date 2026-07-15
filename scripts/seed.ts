/**
 * Seed Firestore with the SHRINGAR catalog (categories + products).
 *
 * Usage:
 *   1. Fill in .env.local with your Firebase config.
 *   2. Temporarily relax Firestore write rules OR run while signed in as admin.
 *   3. npm run seed
 *
 * This uses the Firebase Web SDK so no service-account key is required.
 */
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc, serverTimestamp } from "firebase/firestore";
import { categories, products } from "../lib/data/catalog";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

async function main() {
  if (!firebaseConfig.projectId) {
    throw new Error("Missing Firebase env vars. Load .env.local before seeding.");
  }
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log(`Seeding ${categories.length} categories…`);
  for (const c of categories) {
    await setDoc(doc(db, "categories", c.id), c);
  }

  console.log(`Seeding ${products.length} products…`);
  for (const p of products) {
    await setDoc(doc(db, "products", p.id), { ...p, createdAt: serverTimestamp() });
  }

  console.log("✓ Seed complete.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
