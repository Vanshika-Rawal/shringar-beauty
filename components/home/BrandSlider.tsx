import Link from "next/link";

/* ============================================================
   BrandSlider — a compact, highlighted marquee of house names.
   Pure CSS (the track holds two copies and slides -50%), so there is no
   JS to break. Pauses on hover.
   ============================================================ */

const BRANDS = [
  "Nivea",
  "Plum",
  "Dove",
  "Lakmé",
  "Maybelline",
  "Minimalist",
  "Mamaearth",
  "Cetaphil",
];

/** Soft fade at both edges so names slip in and out instead of cutting off. */
const EDGE_FADE = {
  maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
  WebkitMaskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)",
} as const;

export function BrandSlider() {
  const loop = [...BRANDS, ...BRANDS];

  return (
    <section
      className="group relative w-full overflow-hidden py-[clamp(18px,2.4vw,28px)]"
      style={{ background: "linear-gradient(180deg,#F3ECE4,#FAF7F2 55%,#F3ECE4)" }}
    >
      {/* gold hairlines top & bottom */}
      <span
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,#E8CBA0,#C98F73,#E8CBA0,transparent)" }}
      />
      <span
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg,transparent,#E8CBA0,#C98F73,#E8CBA0,transparent)" }}
      />
      {/* warm centre glow */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(55% 130% at 50% 50%,rgba(232,203,160,.3),transparent 72%)" }}
      />

      <div className="relative flex" style={EDGE_FADE}>
        <div className="anim-marquee flex shrink-0 items-center gap-[clamp(22px,2.8vw,48px)] pr-[clamp(22px,2.8vw,48px)] group-hover:[animation-play-state:paused]">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex shrink-0 items-center gap-[clamp(22px,2.8vw,48px)]"
            >
              <Link href={`/shop?brand=${encodeURIComponent(name)}`} className="group/n block">
                <span className="relative inline-block whitespace-nowrap font-playfair text-[clamp(16px,1.7vw,22px)] font-semibold italic text-brown transition-colors duration-300 group-hover/n:text-copper-dark">
                  {name}
                  {/* hairline that draws itself in on hover */}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-copper/70 transition-transform duration-500 [transition-timing-function:cubic-bezier(.22,.61,.36,1)] group-hover/n:scale-x-100" />
                </span>
              </Link>
              <span className="select-none text-[10px] text-copper/60">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
