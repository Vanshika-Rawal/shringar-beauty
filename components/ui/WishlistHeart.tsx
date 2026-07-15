"use client";

import { useState } from "react";

interface WishlistHeartProps {
  wished: boolean;
  onToggle: () => void;
  /** Visual size of the round button in px. */
  size?: number;
  className?: string;
}

// Petals fired outward around the heart when it's activated. Larger spread and
// bigger petals so the burst is clearly visible around the button.
const PETALS = [
  { tx: "-44px", ty: "-38px", r: "-40deg", c: "#C81E45", w: 13, h: 17 },
  { tx: "42px", ty: "-44px", r: "35deg", c: "#D8B08C", w: 12, h: 16 },
  { tx: "-52px", ty: "4px", r: "-70deg", c: "#E8CBA0", w: 14, h: 18 },
  { tx: "52px", ty: "0px", r: "60deg", c: "#C98F73", w: 13, h: 17 },
  { tx: "-34px", ty: "42px", r: "-20deg", c: "#D8B08C", w: 12, h: 16 },
  { tx: "36px", ty: "44px", r: "25deg", c: "#E0A98C", w: 14, h: 18 },
  { tx: "0px", ty: "-52px", r: "0deg", c: "#C81E45", w: 12, h: 16 },
  { tx: "4px", ty: "50px", r: "10deg", c: "#C98F73", w: 13, h: 17 },
  { tx: "-58px", ty: "-12px", r: "-55deg", c: "#E8CBA0", w: 11, h: 15 },
  { tx: "58px", ty: "-10px", r: "50deg", c: "#D8B08C", w: 11, h: 15 },
];

/**
 * Wishlist toggle button with a flower-petal burst when saving an item.
 * Reused by the product card, new-arrivals carousel and offers cards.
 */
export function WishlistHeart({
  wished,
  onToggle,
  size = 38,
  className = "",
}: WishlistHeartProps) {
  const [burstKey, setBurstKey] = useState(0);

  const handle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only burst petals when ADDING to the wishlist, not on removal.
    if (!wished) setBurstKey((k) => k + 1);
    onToggle();
  };

  return (
    <button
      onClick={handle}
      aria-label="Toggle wishlist"
      aria-pressed={wished}
      className={`relative flex items-center justify-center rounded-full border-none bg-white/90 shadow-[0_8px_18px_-8px_rgba(91,70,56,0.35)] backdrop-blur transition-all duration-200 hover:scale-[1.16] ${className}`}
      style={{
        height: size,
        width: size,
        color: wished ? "#C81E45" : "#5B4638",
        boxShadow: wished
          ? "0 8px 20px -8px rgba(200,30,69,0.5)"
          : "0 8px 18px -8px rgba(91,70,56,0.35)",
      }}
    >
      <span
        key={burstKey}
        className={burstKey ? "anim-heartPop" : ""}
        style={{ fontSize: size * 0.46, lineHeight: 1 }}
      >
        {wished ? "♥" : "♡"}
      </span>

      {/* petal burst — remounts on burstKey change. z-[20] + visible overflow so
          the wider, larger petals show clearly around the heart button. */}
      {burstKey > 0 && (
        <span key={`b-${burstKey}`} className="pointer-events-none absolute inset-0 z-[20]">
          {PETALS.map((p, i) => (
            <span
              key={i}
              className="anim-petal absolute left-1/2 top-1/2 block"
              style={
                {
                  width: p.w,
                  height: p.h,
                  background: `linear-gradient(135deg,#fff,${p.c})`,
                  borderRadius: "70% 0 70% 0",
                  boxShadow: "0 4px 10px -4px rgba(91,70,56,.45)",
                  animationDelay: `${i * 18}ms`,
                  ["--tx" as string]: p.tx,
                  ["--ty" as string]: p.ty,
                  ["--r" as string]: p.r,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      )}
    </button>
  );
}
