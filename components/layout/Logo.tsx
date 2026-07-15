import Link from "next/link";
import { BRAND_NAME, BRAND_TAGLINE } from "@/lib/data/catalog";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex flex-none cursor-pointer items-center transition-opacity hover:opacity-[0.72]"
    >
      {/* Desktop/tablet sizing is unchanged; `max-md:` only ever emits CSS
          inside @media (max-width:767px) to keep the mobile navbar compact. */}
      <span className="flex flex-col gap-[5px] leading-none max-md:gap-[3px]">
        <span className="font-playfair text-[clamp(18px,2.2vw,24px)] font-bold tracking-[0.42em] text-brown [padding-left:0.42em] max-md:text-[15px] max-md:tracking-[0.3em]">
          {BRAND_NAME}
        </span>
        <span className="flex items-center gap-[7px] max-md:hidden">
          <span
            className="h-[0.5px] max-w-[18px] flex-1"
            style={{ background: "linear-gradient(90deg,transparent,#C98F73)" }}
          />
          <span className="whitespace-nowrap text-[6.5px] uppercase tracking-[0.36em] text-[#A67C52]">
            {BRAND_TAGLINE}
          </span>
          <span
            className="h-[0.5px] max-w-[18px] flex-1"
            style={{ background: "linear-gradient(90deg,#C98F73,transparent)" }}
          />
        </span>
      </span>
    </Link>
  );
}
