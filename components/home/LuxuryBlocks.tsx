import Link from "next/link";
import Image from "next/image";

/* ---------- Editorial "Art of Ritual" banner ---------- */
export function EditorialBanner() {
  return (
    <section className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-[clamp(40px,5vw,72px)]">
      <div
        className="relative overflow-hidden rounded-[32px] shadow-[0_40px_80px_-40px_rgba(91,70,56,0.6)]"
        style={{ background: "linear-gradient(125deg,#3A2C22 0%,#5B4638 48%,#8B5E3C 100%)" }}
      >
        {/* auras */}
        <span className="pointer-events-none absolute right-[-6%] top-[-30%] h-[420px] w-[420px] rounded-full opacity-70 anim-blob" style={{ background: "radial-gradient(circle,rgba(232,203,160,.34),transparent 68%)" }} />
        <span className="pointer-events-none absolute bottom-[-40%] left-[-8%] h-[360px] w-[360px] rounded-full opacity-60" style={{ background: "radial-gradient(circle,rgba(216,176,140,.3),transparent 70%)" }} />

        {/* falling petals */}
        {[
          { l: "22%", d: "0s", dur: "11s" },
          { l: "52%", d: "2s", dur: "13s" },
          { l: "78%", d: "1s", dur: "10s" },
        ].map((p, i) => (
          <span
            key={i}
            className="pointer-events-none absolute top-[-6%] h-[15px] w-[11px]"
            style={{ left: p.l, background: "linear-gradient(135deg,rgba(255,255,255,.85),#E8CBA0)", borderRadius: "80% 0 80% 0", animation: `petalfall ${p.dur} linear ${p.d} infinite` }}
          />
        ))}

        <div className="relative grid items-center gap-[clamp(24px,4vw,56px)] px-[clamp(24px,5vw,64px)] py-[clamp(40px,6vw,80px)] md:grid-cols-[1.1fr,0.9fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-cream backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-gold anim-pulse" /> The SHRINGAR Philosophy
            </div>
            <h2 className="m-0 font-playfair text-[clamp(30px,4.4vw,54px)] font-medium leading-[1.06] text-cream">
              Beauty is a{" "}
              <span className="font-semibold italic" style={{ background: "linear-gradient(115deg,#FFF2E9,#E8CBA0 50%,#D8B08C)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                daily ritual
              </span>
              , not a destination.
            </h2>
            <p className="mt-5 max-w-[460px] text-[clamp(14px,1.4vw,16px)] leading-[1.8] text-cream/80">
              Every product on SHRINGAR is chosen by our beauty editors for one
              reason — it earns its place on your shelf. Authentic, cruelty-free
              and impossibly luxurious.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link href="/shop" className="rounded-full bg-cream px-8 py-[15px] text-[13.5px] font-bold text-brown transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold">
                Begin Your Ritual →
              </Link>
              <Link href="/brands" className="rounded-full border-[1.5px] border-cream/50 px-7 py-[15px] text-[13.5px] font-semibold text-cream transition-all duration-300 hover:border-cream hover:bg-cream/10">
                Meet the Brands
              </Link>
            </div>
          </div>

          {/* stat trio */}
          <div className="grid grid-cols-3 gap-3 md:grid-cols-1 md:gap-4">
            {[
              { n: "500+", l: "Luxury brands" },
              { n: "100%", l: "Authentic & sealed" },
              { n: "4.9★", l: "50,000+ reviews" },
            ].map((s) => (
              <div key={s.l} className="rounded-[20px] border border-white/15 bg-white/10 px-5 py-5 text-center backdrop-blur md:flex md:items-center md:gap-4 md:text-left">
                <div className="font-playfair text-[clamp(24px,3vw,38px)] font-semibold text-gold">{s.n}</div>
                <div className="mt-1 text-[11.5px] font-medium uppercase tracking-[0.1em] text-cream/75 md:mt-0">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Twin promo banners (Gifting + App) ---------- */
export function PromoBanners() {
  return (
    <section className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-[clamp(20px,3vw,40px)]">
      <div className="grid gap-[clamp(14px,2vw,22px)] md:grid-cols-2">
        {/* Gifting */}
        <Link
          href="/shop?category=gift-sets"
          className="group relative flex min-h-[220px] items-center overflow-hidden rounded-[26px] p-[clamp(22px,3vw,38px)] shadow-[0_28px_60px_-34px_rgba(91,70,56,0.6)] transition-all duration-500 hover:-translate-y-1.5"
          style={{ background: "#C98F73" }}
        >
          <Image src="/products/product-107.jpg" alt="" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(105deg,rgba(91,70,56,.86),rgba(91,70,56,.42) 52%,rgba(201,143,115,.12))" }} />
          <span className="pointer-events-none absolute right-[-30px] top-[-30px] h-[180px] w-[180px] rounded-full opacity-60 transition-transform duration-700 group-hover:scale-125" style={{ background: "radial-gradient(circle,rgba(255,255,255,.3),transparent 70%)" }} />
          <div className="relative z-[2] max-w-[62%]">
            <div className="mb-2 inline-flex rounded-full bg-white/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">Gifting Suite</div>
            <h3 className="font-playfair text-[clamp(22px,2.6vw,34px)] font-semibold leading-[1.08] text-white">Wrapped in Rose Gold</h3>
            <p className="mt-2 text-[12.5px] leading-[1.5] text-white/85">Ready-to-gift luxury sets for everyone you love.</p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[12px] font-bold text-brown transition-all group-hover:gap-3 group-hover:bg-brown group-hover:text-cream">Shop Gifts →</span>
          </div>
        </Link>

        {/* Membership / Offers */}
        <Link
          href="/offers"
          className="group relative flex min-h-[220px] items-center overflow-hidden rounded-[26px] p-[clamp(22px,3vw,38px)] shadow-[0_28px_60px_-34px_rgba(91,70,56,0.6)] transition-all duration-500 hover:-translate-y-1.5"
          style={{ background: "#5B4638" }}
        >
          <Image src="/products/product-108.png" alt="" fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          <span className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(105deg,rgba(43,30,22,.9),rgba(43,30,22,.5) 52%,rgba(91,70,56,.18))" }} />
          <span className="pointer-events-none absolute left-[-30px] bottom-[-30px] h-[180px] w-[180px] rounded-full opacity-60 transition-transform duration-700 group-hover:scale-125" style={{ background: "radial-gradient(circle,rgba(232,203,160,.4),transparent 70%)" }} />
          {/* sparkles */}
          {[
            { t: "18%", l: "70%", s: 6, d: "0s" },
            { t: "32%", l: "84%", s: 4, d: "0.8s" },
            { t: "60%", l: "76%", s: 5, d: "1.4s" },
          ].map((sp, i) => (
            <span key={i} className="anim-twinkle pointer-events-none absolute rounded-full bg-gold" style={{ top: sp.t, left: sp.l, height: sp.s, width: sp.s, boxShadow: "0 0 10px 2px rgba(232,203,160,.7)", animationDelay: sp.d }} />
          ))}
          <div className="relative z-[2] max-w-[68%]">
            <div className="mb-2 inline-flex rounded-full bg-gold/25 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-gold backdrop-blur">SHRINGAR Privé</div>
            <h3 className="font-playfair text-[clamp(22px,2.6vw,34px)] font-semibold leading-[1.08] text-cream">Up to 50% off the Edit</h3>
            <p className="mt-2 text-[12.5px] leading-[1.5] text-cream/80">Limited-time luxury offers, refreshed every week.</p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[12px] font-bold text-brown transition-all group-hover:gap-3 group-hover:bg-cream">View All Offers →</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
