import Link from "next/link";
import { ImageSlot } from "@/components/ui/ImageSlot";

/** Hero — luxury editorial stage. Faithful port of the approved design. */
export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(135deg,#FAF7F2 0%,#F3ECE4 42%,#FFF2E9 100%)" }}
    >
      {/* slow-moving gradient auras */}
      <div className="pointer-events-none absolute right-[4%] top-[-180px] h-[520px] w-[520px] rounded-full" style={{ background: "radial-gradient(circle,rgba(216,176,140,.55),transparent 68%)", animation: "blob 18s ease-in-out infinite,huedrift 12s ease-in-out infinite" }} />
      <div className="pointer-events-none absolute bottom-[-160px] left-[-80px] h-[420px] w-[420px] rounded-full" style={{ background: "radial-gradient(circle,rgba(216,176,140,.45),transparent 70%)", animation: "blob 23s ease-in-out infinite reverse" }} />
      <div className="pointer-events-none absolute left-[38%] top-[30%] h-[300px] w-[300px] rounded-full" style={{ background: "radial-gradient(circle,rgba(230,199,122,.28),transparent 70%)", animation: "blob 26s ease-in-out infinite" }} />

      {/* Original desktop/tablet classes are untouched. Every mobile tweak is a
          `max-md:` variant, which only ever emits CSS inside
          @media (max-width: 767px) — it cannot affect md+ layouts. */}
      <div className="relative mx-auto grid max-w-shell grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[clamp(24px,3vw,48px)] px-[clamp(16px,4vw,40px)] py-[clamp(30px,4.5vw,64px)] pb-[clamp(36px,5vw,68px)] max-md:grid-cols-1 max-md:gap-2 max-md:py-5 max-md:pb-6">
        {/* LEFT: editorial copy */}
        <div className="anim-fadeUp relative z-[2]">
          <div className="mb-[26px] inline-flex items-center gap-[9px] rounded-full border border-copper-light/35 bg-white/70 px-4 py-[7px] text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9c7b3f] backdrop-blur max-md:mb-3.5 max-md:px-3 max-md:py-[5px] max-md:text-[9.5px]">
            <span className="anim-pulse h-1.5 w-1.5 rounded-full bg-copper-light" />
            The Festive Gold Edit · 2026
          </div>
          <h1 className="m-0 mb-6 font-playfair text-[clamp(46px,6.8vw,90px)] font-medium leading-[1.0] tracking-[-0.018em] text-brown max-md:mb-2.5 max-md:text-[27px] max-md:leading-[1.08]">
            Adorn yourself
            <br />
            in{" "}
            <span
              className="font-semibold italic"
              style={{
                background: "linear-gradient(115deg,#C98F73 0%,#D8B08C 40%,#D8B08C 80%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Radiance
            </span>
            .
          </h1>
          <p className="m-0 mb-8 max-w-[450px] text-[clamp(14px,1.4vw,16.5px)] font-normal leading-[1.8] text-muted max-md:mb-3.5 max-md:line-clamp-2 max-md:text-[12.5px] max-md:leading-[1.55]">
            One luxurious destination for{" "}
            <b className="font-semibold text-brown">500+ beauty brands</b> —
            Maybelline, MAC, Lakmé, Minimalist, Huda Beauty &amp; more. Skincare,
            makeup, fragrance &amp; everything you love.
          </p>
          <div className="mb-[30px] flex flex-wrap gap-3.5 max-md:mb-3.5 max-md:gap-2.5">
            <Link
              href="/shop"
              className="relative overflow-hidden rounded-full border border-copper-light/55 px-[38px] py-[17px] text-[13.5px] font-semibold tracking-[0.04em] text-cream shadow-[0_18px_38px_-14px_rgba(91,70,56,0.55)] transition-all duration-[400ms] [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-[3px] hover:scale-[1.02] max-md:px-6 max-md:py-3 max-md:text-[12.5px]"
              style={{ background: "linear-gradient(135deg,#4A3528,#5B4638)" }}
            >
              <span
                className="pointer-events-none absolute left-0 top-0 h-full w-[35%]"
                style={{ background: "linear-gradient(90deg,transparent,rgba(216,176,140,.4),transparent)", animation: "sheen 6s ease-in-out 1.5s infinite" }}
              />
              Shop Now →
            </Link>
            <Link
              href="/brands"
              className="rounded-full border-[1.5px] border-copper/50 bg-[#F8F4EF]/50 px-8 py-4 text-[13.5px] font-semibold tracking-[0.04em] text-brown-soft backdrop-blur transition-all duration-[400ms] [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-[3px] hover:border-copper hover:bg-copper hover:text-cream max-md:px-5 max-md:py-3 max-md:text-[12.5px]"
            >
              Explore Brands
            </Link>
          </div>
          {/* trust row — hidden on mobile; a compact version is rendered below
              the hero image instead (see the max-md:flex block after the stage) */}
          <div className="flex flex-wrap items-center gap-x-[22px] gap-y-3.5 max-md:hidden">
            <div className="flex items-center">
              <span className="-mr-[11px] h-[34px] w-[34px] rounded-full border-2 border-white shadow-[0_4px_10px_-3px_rgba(0,0,0,0.25)]" style={{ background: "linear-gradient(135deg,#D8B08C,#C98F73)" }} />
              <span className="-mr-[11px] h-[34px] w-[34px] rounded-full border-2 border-white shadow-[0_4px_10px_-3px_rgba(0,0,0,0.25)]" style={{ background: "linear-gradient(135deg,#F3ECE4,#D8B08C)" }} />
              <span className="mr-3 h-[34px] w-[34px] rounded-full border-2 border-white shadow-[0_4px_10px_-3px_rgba(0,0,0,0.25)]" style={{ background: "linear-gradient(135deg,#F2D9D3,#D8B08C)" }} />
              <div className="text-xs leading-[1.3]">
                <div className="font-bold text-brown">50,000+ glowing</div>
                <div className="text-muted">happy customers</div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-copper-light/30 bg-white/60 px-3.5 py-2 backdrop-blur">
              <span className="text-[13px] tracking-[0.06em] text-copper-light">★★★★★</span>
              <span className="text-xs font-semibold text-brown">4.9/5</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-copper/40 bg-white/60 px-3.5 py-2 text-xs font-medium text-[#6B5345] backdrop-blur">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#B0735A" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" /><circle cx="7" cy="17" r="1.6" /><circle cx="17.5" cy="17" r="1.6" /></svg>
              Free 2-day delivery
            </div>
            <div className="flex items-center gap-[7px] rounded-full border border-copper/25 bg-white/60 px-3.5 py-2 text-xs font-medium text-[#6B5345] backdrop-blur">
              <span className="text-copper">✓</span>100% Authentic
            </div>
          </div>
        </div>

        {/* RIGHT: luxury editorial stage.
            The arches/podiums use clamp() floors (260px+) that can't shrink on a
            phone, so the whole stage is scaled down — but ONLY under max-md.
            The wrapper is `absolute inset-0`, which at md+ is exactly coincident
            with the stage's padding box, so every absolutely-positioned child
            resolves against the identical geometry it always did. (The previous
            attempt used md:h-full against an auto-height parent — percentage
            heights collapsed to 0 and stacked everything on top of each other.) */}
        <div className="anim-fadeIn relative min-h-[clamp(380px,46vw,520px)] max-md:min-h-[190px]">
          <div className="absolute inset-0 max-md:bottom-auto max-md:h-[345px] max-md:origin-top max-md:scale-[0.55]">
          {/* rotating luxury light halo */}
          <div
            className="anim-auraspin pointer-events-none absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "conic-gradient(from 0deg,rgba(255,255,255,0),rgba(230,199,122,.22),rgba(255,255,255,0),rgba(216,176,140,.22),rgba(255,255,255,0))" }}
          />
          {/* silk fabric drape */}
          <div
            className="pointer-events-none absolute bottom-[14%] left-[8%] right-[6%] top-[16%]"
            style={{ background: "linear-gradient(150deg,rgba(216,176,140,.5),rgba(216,176,140,.4) 55%,rgba(255,232,214,.45))", borderRadius: "48% 52% 46% 54%/58% 50% 50% 42%", filter: "blur(22px)", animation: "blob 19s ease-in-out infinite" }}
          />

          {/* frosted glass arch (center) */}
          <div className="pointer-events-none absolute left-1/2 top-[9%] h-[clamp(260px,33vw,400px)] w-[clamp(190px,25vw,300px)] -translate-x-1/2 overflow-hidden border border-white/60" style={{ borderRadius: "999px 999px 18px 18px", background: "linear-gradient(160deg,rgba(255,255,255,.42),rgba(255,255,255,.12))", backdropFilter: "blur(6px)", boxShadow: "inset 0 2px 0 rgba(255,255,255,.8),0 30px 50px -34px rgba(91,70,56,.4)" }}>
            <div className="absolute left-0 top-0 h-full w-[38%]" style={{ background: "linear-gradient(90deg,rgba(255,255,255,.6),transparent)", animation: "sheen 9s ease-in-out 1.5s infinite" }} />
          </div>
          {/* side arches */}
          <div className="pointer-events-none absolute left-[17%] top-[24%] h-[clamp(150px,19vw,230px)] w-[clamp(86px,11vw,128px)] overflow-hidden border border-white/50" style={{ borderRadius: "999px 999px 14px 14px", background: "linear-gradient(160deg,rgba(255,255,255,.34),rgba(255,255,255,.08))", backdropFilter: "blur(5px)" }}>
            <div className="absolute left-0 top-0 h-full w-[40%]" style={{ background: "linear-gradient(90deg,rgba(255,255,255,.55),transparent)", animation: "sheen 11s ease-in-out 2.5s infinite" }} />
          </div>
          <div className="pointer-events-none absolute right-[16%] top-[30%] h-[clamp(128px,16vw,196px)] w-[clamp(80px,10vw,118px)] overflow-hidden border border-white/50" style={{ borderRadius: "999px 999px 14px 14px", background: "linear-gradient(160deg,rgba(255,255,255,.34),rgba(255,255,255,.08))", backdropFilter: "blur(5px)" }}>
            <div className="absolute left-0 top-0 h-full w-[40%]" style={{ background: "linear-gradient(90deg,rgba(255,255,255,.55),transparent)", animation: "sheen 10s ease-in-out 3.5s infinite" }} />
          </div>

          {/* marble platform */}
          <div className="pointer-events-none absolute bottom-[9%] left-[8%] right-[8%] h-[clamp(74px,9vw,104px)] overflow-hidden rounded-[50%]" style={{ background: "linear-gradient(180deg,#FFFFFF,#F3ECE4 38%,#EFE3D6 78%,#E4D2BF)", boxShadow: "0 44px 64px -32px rgba(91,70,56,.55),inset 0 3px 8px rgba(255,255,255,.9)" }}>
            <div className="absolute inset-0" style={{ background: "radial-gradient(60% 80% at 35% 30%,rgba(255,255,255,.7),transparent 60%),linear-gradient(115deg,transparent 38%,rgba(216,176,140,.18) 42%,transparent 46%),linear-gradient(75deg,transparent 60%,rgba(201,143,115,.12) 64%,transparent 68%)" }} />
            <div className="absolute left-0 top-0 h-full w-[40%]" style={{ background: "linear-gradient(90deg,rgba(255,255,255,.85),transparent)", animation: "sheen 7s ease-in-out infinite" }} />
          </div>

          {/* acrylic podiums */}
          <div className="pointer-events-none absolute bottom-[16%] left-[11%] h-[clamp(70px,9vw,100px)] w-[clamp(62px,8vw,86px)] overflow-hidden border border-white/65" style={{ borderRadius: "14px 14px 9px 9px", background: "linear-gradient(180deg,rgba(255,255,255,.6),rgba(216,176,140,.16))", backdropFilter: "blur(5px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.95),0 22px 32px -18px rgba(91,70,56,.5)" }} />
          <ImageSlot src="/products/product-88.jpg" alt="proude" fill radius={0} className="anim-floaty absolute bottom-[24%] left-[8%] h-[clamp(116px,15vw,170px)] w-[clamp(74px,9.5vw,104px)]" />
          <div className="pointer-events-none absolute bottom-[18%] right-[11%] h-[clamp(92px,12vw,134px)] w-[clamp(66px,8.5vw,92px)] overflow-hidden border border-white/65" style={{ borderRadius: "14px 14px 9px 9px", background: "linear-gradient(180deg,rgba(255,255,255,.6),rgba(216,176,140,.16))", backdropFilter: "blur(5px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,.95),0 22px 32px -18px rgba(91,70,56,.5)" }} />

          {/* center hero product */}
          <ImageSlot src="/products/product-89.jpg" alt="Serum" fill priority radius={0} className="anim-floaty absolute bottom-[20%] left-1/2 z-[3] h-[clamp(220px,28vw,340px)] w-[clamp(132px,17vw,200px)] -translate-x-1/2" />

          {/* falling petals */}
          <span className="pointer-events-none absolute left-[30%] top-[8%] h-[18px] w-[14px]" style={{ background: "linear-gradient(135deg,rgba(255,255,255,.8),#D8B08C)", borderRadius: "80% 0 80% 0", animation: "petalfall 9s linear infinite" }} />
          <span className="pointer-events-none absolute left-[62%] top-[4%] h-[15px] w-[11px]" style={{ background: "linear-gradient(135deg,rgba(255,255,255,.8),#E3C6A8)", borderRadius: "80% 0 80% 0", animation: "petalfall 11s linear 1.5s infinite" }} />
          <span className="pointer-events-none absolute left-[48%] top-0 h-[17px] w-[13px]" style={{ background: "linear-gradient(135deg,rgba(255,255,255,.8),#D8B08C)", borderRadius: "80% 0 80% 0", animation: "petalfall 10s linear 3s infinite" }} />

          {/* rising particles */}
          <span className="pointer-events-none absolute bottom-[34%] left-[22%] h-1.5 w-1.5 rounded-full bg-gold" style={{ boxShadow: "0 0 8px 2px rgba(230,199,122,.7)", animation: "rise 6s ease-in infinite" }} />
          <span className="pointer-events-none absolute bottom-[30%] left-[70%] h-[5px] w-[5px] rounded-full bg-copper-light" style={{ boxShadow: "0 0 8px 2px rgba(216,176,140,.7)", animation: "rise 7s ease-in 1s infinite" }} />
          <span className="pointer-events-none absolute bottom-[38%] left-[54%] h-1 w-1 rounded-full bg-sand" style={{ boxShadow: "0 0 7px 2px rgba(216,176,140,.7)", animation: "rise 8s ease-in 2.4s infinite" }} />

          {/* floating glass card — bestseller */}
          <div className="anim-floaty2 absolute left-[-3%] top-[4%] z-[4] rounded-[18px] border border-white/85 bg-white/70 px-[17px] py-[13px] backdrop-blur-xl max-md:hidden" style={{ boxShadow: "0 22px 42px -18px rgba(201,143,115,.45)" }}>
            <div className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-[#9c7b3f]">★ Bestseller</div>
            <div className="font-playfair text-[17px] leading-[1.1] text-brown">Velvet Rose<br />Serum</div>
          </div>
          {/* floating glass card — review */}
          <div className="anim-floaty absolute bottom-[8%] left-[-6%] z-[4] flex items-center gap-[11px] rounded-[18px] border border-white/85 bg-white/70 px-[15px] py-3 backdrop-blur-xl max-md:hidden" style={{ boxShadow: "0 22px 42px -18px rgba(201,143,115,.45)" }}>
            <ImageSlot src="/products/product-90.jpg" alt="Ananya" fill shape="circle" className="h-10 w-10" />
            <div className="leading-[1.3]">
              <div className="text-[11px] tracking-[0.05em] text-copper-light">★★★★★</div>
              <div className="mt-0.5 text-[11.5px] font-semibold text-brown">&quot;My skin glows!&quot;</div>
              <div className="text-[10px] text-mid">— Ananya, verified</div>
            </div>
          </div>
          {/* floating pill — free shipping */}
          <div className="anim-floaty absolute right-[-2%] top-[13%] z-[4] flex items-center gap-2 rounded-full border border-copper-light/40 px-[17px] py-[11px] text-[11.5px] font-semibold text-white backdrop-blur-xl max-md:hidden" style={{ background: "rgba(91,70,56,.88)", boxShadow: "0 18px 36px -16px rgba(91,70,56,.6)" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E8CBA0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" /><circle cx="7" cy="17" r="1.6" /><circle cx="17.5" cy="17" r="1.6" /></svg>
            Free Shipping
          </div>
          </div>
        </div>

        {/* MOBILE ONLY — compact customer stats, placed below the hero image.
            `hidden` everywhere, promoted to flex only under max-md, so it is a
            zero-impact (display:none) grid child on tablet/desktop. */}
        <div className="hidden items-center justify-center gap-2.5 pt-1 max-md:flex">
          <div className="flex items-center">
            <span className="-mr-[9px] h-[26px] w-[26px] rounded-full border-2 border-white shadow-[0_4px_10px_-3px_rgba(0,0,0,0.25)]" style={{ background: "linear-gradient(135deg,#D8B08C,#C98F73)" }} />
            <span className="-mr-[9px] h-[26px] w-[26px] rounded-full border-2 border-white shadow-[0_4px_10px_-3px_rgba(0,0,0,0.25)]" style={{ background: "linear-gradient(135deg,#F3ECE4,#D8B08C)" }} />
            <span className="mr-2 h-[26px] w-[26px] rounded-full border-2 border-white shadow-[0_4px_10px_-3px_rgba(0,0,0,0.25)]" style={{ background: "linear-gradient(135deg,#F2D9D3,#D8B08C)" }} />
          </div>
          <div className="text-[11px] leading-[1.25]">
            <span className="font-bold text-brown">50,000+ glowing</span>
            <span className="text-muted"> · happy customers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
