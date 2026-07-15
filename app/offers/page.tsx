import type { Metadata } from "next";
import { products } from "@/lib/data/catalog";
import { OffersClient } from "@/components/offers/OffersClient";
import { PetalFall } from "@/components/ui/PetalFall";

export const metadata: Metadata = {
  title: "Offers & Sale",
  description: "Limited-time offers on premium beauty. Up to 30% off bestsellers.",
};

export default function OffersPage() {
  // biggest discounts first
  const onSale = [...products]
    .map((p) => ({ p, pct: (p.mrp - p.price) / p.mrp }))
    .sort((a, b) => b.pct - a.pct)
    .map((x) => x.p);

  return (
    <div className="bg-cream">
      <section
        className="relative overflow-hidden"
        style={{ background: "linear-gradient(135deg,#3A2C22 0%,#5B4638 36%,#7A5A48 64%,#C98F73 100%)" }}
      >
        {/* soft ambient glows — no lines, just light */}
        <span className="pointer-events-none absolute right-[4%] top-[-120px] h-[380px] w-[380px] rounded-full anim-blob" style={{ background: "radial-gradient(circle,rgba(232,203,160,.4),transparent 70%)" }} />
        <span className="pointer-events-none absolute bottom-[-140px] left-[-8%] h-[340px] w-[340px] rounded-full opacity-70" style={{ background: "radial-gradient(circle,rgba(183,110,121,.35),transparent 70%)", animation: "blob 24s ease-in-out infinite reverse" }} />

        {/* subtle diagonal sheen */}
        <span
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{ background: "linear-gradient(115deg,transparent 30%,rgba(255,255,255,.06) 50%,transparent 70%)" }}
        />

        {/* petals drifting behind the title */}
        <PetalFall />

        <div className="relative mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-[clamp(28px,4vw,52px)] text-center">
          {/* highlighted limited-time badge */}
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-brown shadow-[0_12px_28px_-10px_rgba(232,203,160,0.85)]"
            style={{ background: "linear-gradient(135deg,#FFF2E9,#E8CBA0 55%,#D8B08C)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-copper-dark anim-pulse" />
            Limited Time
          </div>
          <h1 className="m-0 font-playfair text-[clamp(26px,3.8vw,44px)] font-semibold leading-[1.08] text-white [text-shadow:0_4px_30px_rgba(0,0,0,0.35)]">
            The{" "}
            <span
              className="font-semibold italic"
              style={{
                background: "linear-gradient(115deg,#FFF2E9,#E8CBA0 50%,#D8B08C)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Festive
            </span>{" "}
            Sale
          </h1>
          <p className="mx-auto mt-3 max-w-[430px] text-[13.5px] leading-[1.65] text-white/70">
            Up to 30% off cult-favourite rituals. Use code{" "}
            <b className="text-gold">SHRINGAR10</b> for an extra 10% off.
          </p>
        </div>

        {/* gold hairline */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px" style={{ background: "linear-gradient(90deg,transparent,#E8CBA0,transparent)" }} />
      </section>

      <div className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-12">
        <OffersClient products={onSale} />
      </div>
    </div>
  );
}
