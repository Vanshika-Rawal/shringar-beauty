"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import type { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
  iconSvg: string;
  /** Optional hover clip — drop /public/videos/category-N.mp4 to enable. */
  video?: string;
  /** Category cover image shown above the gradient base. */
  image?: string;
}

/**
 * Premium Shop-by-Category tile. Animated gradient base, glass icon chip, a
 * hover-played ritual video, sheen sweep and an "Explore" reveal.
 */
export function CategoryCard({ category, iconSvg, video, image }: CategoryCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const onEnter = () => videoRef.current?.play().catch(() => {});
  const onLeave = () => {
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  return (
    <Link
      href={`/shop?category=${category.slug}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative aspect-[1/1.2] cursor-pointer overflow-hidden rounded-[22px] border border-white/40 shadow-[0_20px_44px_-26px_rgba(91,70,56,0.5)] transition-all duration-[450ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] hover:-translate-y-[9px] hover:shadow-[0_36px_64px_-22px_rgba(201,143,115,0.6)]"
    >
      {/* animated gradient base */}
      <span
        className="absolute inset-0 transition-transform duration-[1200ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.12]"
        style={{ background: category.chip.replace(/^background:/, "") }}
      />
      {/* category cover image */}
      {image && (
        <Image
          src={image}
          alt={category.name}
          fill
          sizes="(max-width:768px) 50vw, 18vw"
          className="absolute inset-0 object-cover transition-transform duration-[1200ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.12]"
        />
      )}
      {/* soft inner light */}
      <span
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ background: "radial-gradient(75% 55% at 50% 18%,rgba(255,255,255,.6),transparent 60%)" }}
      />

      {/* hover video */}
      {video && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          muted
          loop
          playsInline
          preload="none"
        >
          <source src={video} type="video/mp4" />
        </video>
      )}

      {/* sheen sweep */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -inset-y-6 -left-1/2 w-1/2 -skew-x-12 bg-white/30 opacity-0 transition-all duration-[850ms] group-hover:left-[130%] group-hover:opacity-100" />
      </span>

      {/* glass icon chip */}
      <span className="absolute left-1/2 top-[15px] z-[2] flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-[15px] border border-white/60 bg-white/85 text-brown shadow-[0_8px_18px_-8px_rgba(91,70,56,0.4)] backdrop-blur transition-all duration-[450ms] [transition-timing-function:cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-0.5 group-hover:scale-110">
        <span dangerouslySetInnerHTML={{ __html: iconSvg }} />
      </span>

      {/* bottom scrim + label */}
      <span className="pointer-events-none absolute inset-0 z-[1]" style={{ background: "linear-gradient(transparent 44%,rgba(58,44,34,.86))" }} />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] px-3 pb-[15px] pt-3 text-center">
        <span className="block font-playfair text-[clamp(15px,1.6vw,18px)] font-semibold leading-[1.1] text-white">
          {category.name}
        </span>
        <span className="mt-1.5 inline-flex items-center gap-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-gold opacity-0 transition-all duration-[400ms] group-hover:opacity-100">
          Explore
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </span>
    </Link>
  );
}
