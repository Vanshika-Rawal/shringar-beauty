import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Manrope, Playfair_Display } from "next/font/google";
// @ts-ignore: CSS import handled by Next.js app router
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { MobileBackButton } from "@/components/layout/MobileBackButton";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://shringar.example.com";

function getSafeMetadataBase(url: string): URL {
  try {
    return new URL(url);
  } catch {
    return new URL("https://shringar.example.com");
  }
}

export const metadata: Metadata = {
  metadataBase: getSafeMetadataBase(rawSiteUrl),
  title: {
    default: "SHRINGAR — Celebrate Your Beauty | Premium Indian Beauty Marketplace",
    template: "%s | SHRINGAR",
  },
  description:
    "SHRINGAR is a premium Indian beauty marketplace — 500+ brands across skincare, makeup, fragrance & wellness. 100% authentic, cruelty-free, free 2-day delivery.",
  keywords: [
    "beauty marketplace",
    "Indian beauty",
    "skincare",
    "makeup",
    "fragrance",
    "luxury beauty",
    "SHRINGAR",
    "cruelty free",
    "premium cosmetics",
  ],
  openGraph: {
    title: "SHRINGAR — Celebrate Your Beauty",
    description:
      "One luxurious destination for 500+ beauty brands. Skincare, makeup, fragrance & everything you love.",
    type: "website",
    locale: "en_IN",
    siteName: "SHRINGAR",
  },
  twitter: { card: "summary_large_image", title: "SHRINGAR — Celebrate Your Beauty" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="bg-warm font-manrope text-brown antialiased">
        <Providers>
          {/* pb clears the fixed MobileBottomNav (+ the iOS home indicator) so it
              can never sit on top of page content. Removed at md, where the bar
              is hidden and the desktop layout is untouched. */}
          <div className="min-h-screen w-full max-w-full pb-[calc(70px+env(safe-area-inset-bottom))] md:pb-0">
            <Header />
            <main className="relative w-full max-w-full">
              <MobileBackButton />
              {children}
            </main>
            <Footer />
            <MobileBottomNav />
          </div>
        </Providers>
      </body>
    </html>
  );
}