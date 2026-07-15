import Image from "next/image";
import Link from "next/link";

interface AuthShellProps {
  children: React.ReactNode;
  /**
   * Optional hero image for the showcase panel. Drop a file in `/public` and
   * pass its path. If absent, an elegant branded gradient + monogram is shown,
   * so the page always looks complete.
   */
  image?: string;
  /** Editorial headline shown over the showcase panel. */
  title?: React.ReactNode;
  /** Supporting line under the editorial headline. */
  subtitle?: string;
}

/** Refined editorial split layout used by login / signup / forgot-password. */
export function AuthShell({
  children,
  image,
  title = (
    <>
      Beauty rituals,
      <br />
      beautifully curated.
    </>
  ),
  subtitle = "Discover 500+ premium brands, save your favourites and track every order — all in one place.",
}: AuthShellProps) {
  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-[1180px] px-[clamp(16px,4vw,40px)] py-[clamp(28px,5vw,72px)]">
        <div className="anim-fadeUp grid overflow-hidden rounded-[28px] bg-white shadow-[0_46px_110px_-54px_rgba(91,70,56,0.55)] ring-1 ring-brown/[0.06] lg:grid-cols-[1.05fr_1fr]">
          {/* ===== showcase / image side ===== */}
          <div className="relative min-h-[240px] overflow-hidden lg:min-h-[660px]">
            {image ? (
              <Image
                src={image}
                alt="SHRINGAR beauty collection"
                fill
                priority
                sizes="(max-width:1024px) 100vw, 55vw"
                className="anim-kenburns object-cover"
              />
            ) : (
              <div className="absolute inset-0" style={{ background: "linear-gradient(150deg,#3A2C22,#5B4638 48%,#C98F73)" }}>
                <HeroArt />
              </div>
            )}

            {/* refined gradient: dark only where text sits (top + bottom),
                leaving the beautiful middle of the photo clear. */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top,rgba(43,32,25,.84),rgba(43,32,25,.04) 40%,rgba(43,32,25,0) 60%,rgba(43,32,25,.30))",
              }}
            />

            {/* brand lockup (top) */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-[clamp(22px,3vw,40px)]">
              <Link href="/" className="font-playfair text-[22px] font-bold tracking-[0.28em] text-white [padding-left:0.28em]">
                SHRINGAR
              </Link>
              <span className="hidden text-[9px] uppercase tracking-[0.34em] text-white/70 sm:block">
                Celebrate Your Beauty
              </span>
            </div>

            {/* editorial caption (bottom) — desktop only, keeps mobile banner clean */}
            <div className="absolute inset-x-0 bottom-0 hidden p-[clamp(28px,3vw,48px)] lg:block">
              <h2 className="m-0 max-w-[400px] font-playfair text-[clamp(28px,2.6vw,38px)] font-medium leading-[1.16] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.4)]">
                {title}
              </h2>
              <p className="mt-3.5 max-w-[360px] text-[13.5px] leading-[1.7] text-white/80">
                {subtitle}
              </p>
              <div className="mt-5 flex items-center gap-2.5 text-[12.5px] text-white/85">
                <span className="tracking-[0.1em] text-gold">★★★★★</span>
                <span className="h-3 w-px bg-white/30" />
                Loved by 50,000+ customers
              </div>
            </div>
          </div>

          {/* ===== form side ===== */}
          <div className="flex flex-col justify-center bg-white p-[clamp(28px,4vw,56px)]">
            <div className="mx-auto w-full max-w-[380px]">{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Elegant branded monogram shown on the showcase panel when no hero photo is
 * supplied (e.g. the forgot-password screen).
 */
function HeroArt() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div className="anim-floaty relative grid h-[200px] w-[200px] place-items-center">
        <span
          className="anim-auraspin absolute inset-0 rounded-full opacity-70"
          style={{
            background:
              "conic-gradient(from 0deg,transparent,rgba(232,203,160,.55),transparent 55%,rgba(216,176,140,.4),transparent)",
            maskImage: "radial-gradient(closest-side,transparent 64%,#000 66%,#000 99%,transparent)",
            WebkitMaskImage: "radial-gradient(closest-side,transparent 64%,#000 66%,#000 99%,transparent)",
          }}
        />
        <span
          className="absolute h-[140px] w-[140px] rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle,rgba(232,203,160,.45),transparent 70%)" }}
        />
        <span className="relative font-playfair text-[80px] font-bold italic text-gold/90">S</span>
        <span className="anim-twinkle absolute left-[24px] top-[40px] text-[14px] text-gold">✦</span>
        <span className="anim-twinkle absolute right-[26px] top-[64px] text-[11px] text-white/80" style={{ animationDelay: "1s" }}>✦</span>
        <span className="anim-twinkle absolute bottom-[34px] left-[46px] text-[9px] text-gold" style={{ animationDelay: "1.8s" }}>✦</span>
      </div>
    </div>
  );
}
