/* ============================================================
   PetalFall — soft petals drifting down behind a hero.
   Purely decorative CSS (uses the `petalfall` keyframe), so it costs
   nothing at runtime and can't break. Drop it inside any
   `relative overflow-hidden` section.
   ============================================================ */

interface Petal {
  /** left offset (%) */
  l: string;
  /** width in px — height is derived */
  s: number;
  /** animation delay */
  d: string;
  /** animation duration */
  dur: string;
  /** petal tint */
  g: string;
  o: number;
}

const PETALS: Petal[] = [
  { l: "6%", s: 13, d: "0s", dur: "11s", g: "linear-gradient(135deg,#FFF4E8,#E8CBA0)", o: 0.85 },
  { l: "17%", s: 9, d: "2.6s", dur: "14s", g: "linear-gradient(135deg,#F2D9D3,#C98F73)", o: 0.7 },
  { l: "29%", s: 15, d: "1.1s", dur: "12s", g: "linear-gradient(135deg,#FFF4E8,#D8B08C)", o: 0.8 },
  { l: "41%", s: 10, d: "4.2s", dur: "15s", g: "linear-gradient(135deg,#F7E9DC,#B76E79)", o: 0.65 },
  { l: "53%", s: 12, d: "0.6s", dur: "13s", g: "linear-gradient(135deg,#FFF4E8,#E8CBA0)", o: 0.8 },
  { l: "64%", s: 8, d: "3.4s", dur: "16s", g: "linear-gradient(135deg,#F2D9D3,#D8B08C)", o: 0.6 },
  { l: "76%", s: 14, d: "1.9s", dur: "12.5s", g: "linear-gradient(135deg,#FFF4E8,#C98F73)", o: 0.85 },
  { l: "87%", s: 10, d: "5s", dur: "14.5s", g: "linear-gradient(135deg,#F7E9DC,#E8CBA0)", o: 0.7 },
  { l: "95%", s: 12, d: "2.2s", dur: "13.5s", g: "linear-gradient(135deg,#FFF4E8,#B0735A)", o: 0.75 },
];

export function PetalFall({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {PETALS.map((p, i) => (
        <span
          key={i}
          className="absolute top-[-10%] block"
          style={{
            left: p.l,
            width: p.s,
            height: Math.round(p.s * 1.3),
            background: p.g,
            /* a soft petal: rounded on two opposite corners */
            borderRadius: "100% 0 100% 0",
            opacity: p.o,
            boxShadow: "0 2px 10px rgba(232,203,160,0.35)",
            animation: `petalfall ${p.dur} linear ${p.d} infinite`,
          }}
        />
      ))}
    </div>
  );
}
