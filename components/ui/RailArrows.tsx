"use client";

import type { RefObject } from "react";

interface RailArrowsProps {
  trackRef: RefObject<HTMLDivElement | null>;
  className?: string;
}

/**
 * Left/right navigation for a horizontal scroll rail. Scrolls the referenced
 * track by ~80% of its visible width with smooth behaviour.
 */
export function RailArrows({ trackRef, className = "" }: RailArrowsProps) {
  const scroll = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.8, 660);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Arrow dir="left" onClick={() => scroll(-1)} />
      <Arrow dir="right" onClick={() => scroll(1)} />
    </div>
  );
}

function Arrow({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "left" ? "Previous" : "Next"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-copper/25 bg-white text-brown shadow-[0_10px_24px_-16px_rgba(91,70,56,0.6)] transition-all hover:-translate-y-0.5 hover:border-copper hover:bg-copper hover:text-white"
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {dir === "left" ? <path d="M15 6l-6 6 6 6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
