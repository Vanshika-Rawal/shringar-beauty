"use client";

import { useRouter, usePathname } from "next/navigation";

/**
 * Floating back arrow for mobile (<768px) only. Rendered once inside <main>
 * (which is position:relative), it overlays the top-left of the page/image as an
 * absolute element, so it reserves no space and never pushes the layout down.
 * Hidden on the home page (nothing to go back to) and on md+ where each page
 * keeps its own inline "Back" control.
 */
export function MobileBackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <button
      onClick={() => router.back()}
      aria-label="Go back"
      className="absolute left-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-copper/15 bg-white/85 text-brown shadow-[0_6px_16px_-6px_rgba(91,70,56,0.5)] backdrop-blur transition-transform active:scale-95 md:hidden"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 6l-6 6 6 6" />
      </svg>
    </button>
  );
}
