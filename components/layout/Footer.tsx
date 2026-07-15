import Link from "next/link";
import { BRAND_NAME } from "@/lib/data/catalog";

const shopLinks = ["Skincare", "Makeup", "Fragrance", "Hair Care", "Gift Sets"];
const companyLinks = ["Our Story", "Ingredients", "Sustainability", "The Journal"];
const helpLinks = [
  { label: "Track Order", href: "/profile/orders" },
  { label: "Shipping & Returns", href: "#" },
  { label: "FAQs", href: "#" },
  { label: "Contact", href: "#" },
];

export function Footer() {
  return (
    <footer className="bg-brown text-white/65">
      <div className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] pt-[clamp(44px,6vw,72px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[34px] pb-[44px]">
          <div className="col-span-full max-w-[300px]">
            <div className="mb-3.5 font-playfair text-[26px] font-bold tracking-[0.28em] text-white [padding-left:0.28em]">
              {BRAND_NAME}
            </div>
            <p className="m-0 mb-5 text-[13.5px] leading-[1.7]">
              Clean, conscious luxury beauty crafted in India. Timeless rituals for
              the modern woman.
            </p>
            <div className="flex gap-2.5">
              {[
                <svg key="ig" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" /></svg>,
                <span key="fb" className="font-bold text-white">f</span>,
                <span key="yt" className="text-xs font-semibold text-white">YT</span>,
              ].map((icon, i) => (
                <span
                  key={i}
                  className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[13px] bg-white/[0.07] transition-all duration-300 hover:bg-copper"
                >
                  {icon}
                </span>
              ))}
            </div>
          </div>

          <FooterColumn title="Shop">
            {shopLinks.map((l) => (
              <Link key={l} href="/shop" className="footer-link">
                {l}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {companyLinks.map((l) => (
              <span key={l} className="footer-link cursor-pointer">
                {l}
              </span>
            ))}
          </FooterColumn>

          <FooterColumn title="Help">
            {helpLinks.map((l) => (
              <Link key={l.label} href={l.href} className="footer-link">
                {l.label}
              </Link>
            ))}
          </FooterColumn>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-white/10 py-[22px] text-xs text-white/45">
          <span>© 2026 SHRINGAR Beauty · Crafted with love in India</span>
          <span className="flex gap-[18px]">
            <span className="cursor-pointer">Privacy</span>
            <span className="cursor-pointer">Terms</span>
            <span className="cursor-pointer">Cookies</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-[18px] text-[11px] font-semibold uppercase tracking-[0.14em] text-copper-light">
        {title}
      </div>
      <div className="flex flex-col gap-[11px] text-[13.5px]">{children}</div>
    </div>
  );
}
