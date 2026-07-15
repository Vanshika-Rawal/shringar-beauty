import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopClient } from "@/components/shop/ShopClient";
import { FullScreenLoader } from "@/components/auth/AuthGuard";

export const metadata: Metadata = {
  title: "Shop All Beauty",
  description:
    "Browse 500+ premium beauty brands — skincare, makeup, fragrance & more. Filter by category, brand and price.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <ShopClient />
    </Suspense>
  );
}
