import Link from "next/link";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface Deal {
  title: string;
  offer: string;
  blurb: string;
  href: string;
  gradient: string;
  /** layout span on large screens */
  wide?: boolean;
  /** rose-gold accent for the offer chip text */
  chip?: string;
  /** product image shown in the floating visual */
  image?: string;
  /** looping clip shown instead of the image (drop the file in /public/videos) */
  video?: string;
}

const deals: Deal[] = [
  {
    title: "Luxury Skincare Edit",
    offer: "Up to 50% Off",
    blurb: "Serums, essences & creams from the world's finest skincare houses.",
    href: "/shop?category=skincare",
    gradient: "linear-gradient(135deg,#5B4638 0%,#7A5A48 55%,#C98F73 100%)",
    wide: true,
    video: "/videos/deal-skincare.mp4",
  },
  {
    title: "Lips That Speak",
    offer: "Flat 40% Off",
    blurb: "Velvet mattes & glossy tints.",
    href: "/shop?category=makeup",
    gradient: "linear-gradient(150deg,#C98F73,#E0A98C)",
    video: "/videos/deal-lips.mp4",
  },
  {
    title: "Fragrance Vault",
    offer: "From ₹799",
    blurb: "Signature scents, sealed in gold.",
    href: "/shop?category=fragrance",
    gradient: "linear-gradient(150deg,#E8CBA0,#D8B08C)",
    video: "/videos/deal-fragrance.mp4",
  },
  {
    title: "Hair Spa Rituals",
    offer: "Up to 35% Off",
    blurb: "Salon-grade repair for crowning glory, at home.",
    href: "/shop?category=hair-care",
    gradient: "linear-gradient(135deg,#7A5A48,#C98F73)",
    wide: true,
     video: "/videos/deal-hair.mp4",
  },
];

export function BiggestDeals() {
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* faint aura */}
      <span
        className="pointer-events-none absolute left-[-6%] top-[12%] h-[360px] w-[360px] rounded-full opacity-60"
        style={{ background: "radial-gradient(circle,rgba(216,176,140,.3),transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-[clamp(52px,6vw,88px)]">
        <SectionHeader
          overline="Steal The Spotlight"
          title="Biggest Deals on Beauty's Best"
          subtitle="Editor-curated offers on the houses everyone's obsessing over"
          align="between"
          action={
            <Link
              href="/offers"
              className="hidden items-center gap-1.5 whitespace-nowrap text-[13.5px] font-semibold text-copper transition-colors hover:text-copper-dark sm:flex"
            >
              See all deals <span>→</span>
            </Link>
          }
        />

        <div className="grid grid-cols-1 gap-[clamp(14px,1.8vw,22px)] sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((d) => (
            <Link
              key={d.title}
              href={d.href}
              className={`group relative flex min-h-[230px] flex-col justify-between overflow-hidden rounded-[26px] p-[clamp(20px,2.2vw,30px)] shadow-[0_24px_54px_-30px_rgba(91,70,56,0.6)] transition-all duration-[450ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] hover:-translate-y-2 hover:shadow-[0_40px_76px_-28px_rgba(91,70,56,0.72)] lg:min-h-[260px] ${
                d.wide ? "lg:col-span-2" : ""
              }`}
              style={{ background: d.gradient }}
            >
              {/* full-bleed background media (image or looping video) */}
              {d.video ? (
                <video
                  src={d.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="absolute inset-0 z-0 h-full w-full object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(.22,.61,.36,1)] group-hover:scale-105"
                />
              ) : d.image ? (
                <Image
                  src={d.image}
                  alt={d.title}
                  fill
                  sizes="(max-width:1024px) 100vw, 66vw"
                  className="absolute inset-0 z-0 object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(.22,.61,.36,1)] group-hover:scale-105"
                />
              ) : null}
              {/* dark scrim so the copy stays readable over the media */}
              <span
                className="pointer-events-none absolute inset-0 z-[1]"
                style={{ background: "linear-gradient(120deg,rgba(58,44,34,.85) 0%,rgba(58,44,34,.55) 45%,rgba(58,44,34,.15) 100%)" }}
              />
              {/* sheen sweep */}
              <span className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
                <span className="absolute -inset-y-6 -left-1/2 w-1/2 -skew-x-12 bg-white/20 opacity-0 transition-all duration-[850ms] group-hover:left-[130%] group-hover:opacity-100" />
              </span>

              <div className="relative z-[2]">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/22 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
                  ✦ {d.offer}
                </div>
                <h3 className="mb-2 max-w-[88%] font-playfair text-[clamp(21px,2.4vw,30px)] font-semibold leading-[1.08] text-white">
                  {d.title}
                </h3>
                <p className="max-w-[80%] text-[12px] leading-[1.55] text-white/85">{d.blurb}</p>
              </div>

              <div className="relative z-[2] mt-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[12.5px] font-bold tracking-[0.02em] text-brown transition-all duration-300 group-hover:gap-3 group-hover:bg-gold">
                  Shop Now
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
