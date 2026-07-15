"use client";

/**
 * Large flower-petal BURST that blooms across the entire card when an item is
 * saved to the wishlist. Petals explode outward from the centre with spin and
 * fade, over a soft rosy glow flash. Drop it inside any `position: relative`
 * card and bump `burstKey` (from useWishlistToggle) to replay it.
 */

// Each petal: outward target (bx/by, px), spin, colour, size.
const PETALS = [
  { bx: "-120px", by: "-70px", r: "-200deg", c: "#C81E45", w: 16, h: 20 },
  { bx: "120px", by: "-78px", r: "220deg", c: "#D8B08C", w: 15, h: 19 },
  { bx: "-150px", by: "10px", r: "-260deg", c: "#E8CBA0", w: 17, h: 21 },
  { bx: "150px", by: "0px", r: "260deg", c: "#C98F73", w: 16, h: 20 },
  { bx: "-95px", by: "85px", r: "-180deg", c: "#D8B08C", w: 14, h: 18 },
  { bx: "100px", by: "92px", r: "200deg", c: "#E0A98C", w: 15, h: 19 },
  { bx: "0px", by: "-115px", r: "160deg", c: "#C81E45", w: 14, h: 18 },
  { bx: "10px", by: "115px", r: "-160deg", c: "#C98F73", w: 16, h: 20 },
  { bx: "-60px", by: "-40px", r: "-300deg", c: "#E8CBA0", w: 12, h: 16 },
  { bx: "62px", by: "-46px", r: "300deg", c: "#D8B08C", w: 12, h: 16 },
  { bx: "-70px", by: "55px", r: "-240deg", c: "#E0A98C", w: 13, h: 17 },
  { bx: "72px", by: "60px", r: "240deg", c: "#C81E45", w: 13, h: 17 },
];

export function CardPetalBurst({ burstKey }: { burstKey: number }) {
  if (!burstKey) return null;
  return (
    <span
      key={burstKey}
      className="pointer-events-none absolute inset-0 z-[8] overflow-hidden rounded-[inherit]"
    >
      {/* rosy glow flash blooming from the centre */}
      <span
        className="anim-cardBurstGlow absolute left-1/2 top-1/2 h-[150%] w-[150%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(circle,rgba(200,30,69,.20),rgba(232,203,160,.16) 45%,transparent 72%)",
        }}
      />
      {/* expanding gold ring */}
      <span
        className="anim-cardRing absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold/70"
      />
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="anim-cardBurst absolute left-1/2 top-1/2 block"
          style={
            {
              width: p.w,
              height: p.h,
              background: `linear-gradient(135deg,#fff,${p.c})`,
              borderRadius: "72% 0 72% 0",
              boxShadow: "0 5px 12px -5px rgba(91,70,56,.45)",
              animationDelay: `${i * 22}ms`,
              ["--bx" as string]: p.bx,
              ["--by" as string]: p.by,
              ["--r" as string]: p.r,
            } as React.CSSProperties
          }
        />
      ))}
    </span>
  );
}
