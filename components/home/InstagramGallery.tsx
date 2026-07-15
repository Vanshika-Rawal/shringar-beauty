"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { RailArrows } from "@/components/ui/RailArrows";

const IG_URL = "https://instagram.com";

interface Post {
  img: string;
  likes: string;
  comments: number;
}

const POSTS: Post[] = [
  { img: "/products/product-142.jpg", likes: "3.2k", comments: 214 },
  { img: "/products/product-143.jpg", likes: "1.8k", comments: 96 },
  { img: "/products/product-144.jpg", likes: "4.6k", comments: 302 },
  { img: "/products/product-145.jpg", likes: "2.1k", comments: 143 },
  { img: "/products/product-146.jpg", likes: "5.9k", comments: 418 },
  { img: "/products/product-147.jpg", likes: "1.2k", comments: 74 },
  { img: "/products/product-148.webp", likes: "3.7k", comments: 256 },
  { img: "/products/product-149.webp", likes: "2.9k", comments: 187 },
];

function IgGlyph({ size = 16, stroke = "currentColor" }: { size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.7">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  );
}

export function InstagramGallery() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  // Smooth auto-slider — loops back to the start, pauses while the pointer is
  // anywhere in the section so manual swipe / arrows stay in control.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host: HTMLElement = wrap.current ?? el;

    let raf = 0;
    let paused = false;
    let manualUntil = 0;
    let pos = el.scrollLeft;

    // mouseenter (not pointerenter) so a tap on mobile can't leave the rail
    // permanently paused — touch is handled by the `hold` grace period instead.
    const pause = () => (paused = true);
    const resume = () => (paused = false);
    const hold = () => (manualUntil = performance.now() + 2200);
    host.addEventListener("mouseenter", pause);
    host.addEventListener("mouseleave", resume);
    el.addEventListener("pointerdown", hold);
    el.addEventListener("touchstart", hold, { passive: true });
    el.addEventListener("wheel", hold, { passive: true });

    const tick = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (!paused && performance.now() > manualUntil && max > 0) {
        // Keep our own fractional position: re-reading scrollLeft lets the
        // browser round the half-pixel away and the rail never advances.
        pos += 0.45;
        if (pos >= max) pos = 0;
        el.scrollLeft = pos;
      } else {
        pos = el.scrollLeft;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("mouseenter", pause);
      host.removeEventListener("mouseleave", resume);
      el.removeEventListener("pointerdown", hold);
      el.removeEventListener("touchstart", hold);
      el.removeEventListener("wheel", hold);
    };
  }, []);

  return (
    <section ref={wrap} className="relative overflow-hidden bg-cream">
      {/* soft ambience */}
      <span className="pointer-events-none absolute right-[-5%] top-[8%] h-[320px] w-[320px] rounded-full opacity-50 anim-blob" style={{ background: "radial-gradient(circle,rgba(216,176,140,.26),transparent 70%)" }} />
      <span className="pointer-events-none absolute bottom-[6%] left-[-6%] h-[300px] w-[300px] rounded-full opacity-40" style={{ background: "radial-gradient(circle,rgba(183,110,121,.16),transparent 70%)" }} />

      <div className="relative mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-[clamp(52px,6vw,88px)]">
        <SectionHeader
          overline="@shringar.beauty"
          title="Join the Ritual"
          align="between"
          action={
            <div className="flex items-center gap-3">
              <a
                href={IG_URL}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-[12.5px] font-bold text-white shadow-[0_16px_32px_-16px_rgba(183,110,121,0.8)] transition-all duration-300 hover:-translate-y-0.5 sm:inline-flex"
                style={{ background: "linear-gradient(135deg,#B76E79,#C98F73 55%,#E8CBA0)" }}
              >
                <IgGlyph size={15} stroke="#fff" />
                Follow @ShringarBeauty
              </a>
              <RailArrows trackRef={track} className="hidden sm:flex" />
            </div>
          }
        />

        {/* hashtag chip */}
        <div className="mb-6 -mt-2 flex flex-wrap items-center gap-2 text-[12.5px] text-muted">
          <span className="inline-flex items-center rounded-full border border-copper/25 bg-white px-3 py-1 font-bold text-copper-dark">
            #ShringarGlow
          </span>
          <span>Tag us to be featured on our wall of glow ✦</span>
        </div>

        <div
          ref={track}
          className="noscroll flex gap-[clamp(12px,1.6vw,18px)] overflow-x-auto overscroll-x-contain px-0.5 pb-3 pt-1"
          style={{ scrollSnapType: "x proximity" }}
        >
          {POSTS.map((post, i) => (
            <a
              key={i}
              href={IG_URL}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square w-[clamp(168px,42vw,236px)] flex-none snap-start overflow-hidden rounded-[22px] border border-copper/10 shadow-[0_20px_44px_-28px_rgba(201,143,115,0.5)] transition-all duration-[450ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] hover:-translate-y-2 hover:shadow-[0_38px_66px_-26px_rgba(183,110,121,0.6)]"
            >
              <Image
                src={post.img}
                alt="SHRINGAR community post"
                fill
                sizes="(max-width:640px) 60vw, (max-width:1024px) 33vw, 22vw"
                className="object-cover transition-transform duration-[800ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] group-hover:scale-[1.12]"
              />

              {/* dark overlay + engagement on hover */}
              <div
                className="pointer-events-none absolute inset-0 flex flex-col justify-between p-3.5 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100"
                style={{ background: "linear-gradient(to top,rgba(58,44,34,.82),rgba(58,44,34,.15) 52%,rgba(58,44,34,.4))" }}
              >
                {/* handle */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-white/90">@shringar.beauty</span>
                  <IgGlyph size={16} stroke="rgba(255,255,255,.9)" />
                </div>

                {/* view post */}
                <div className="flex justify-center">
                  <span className="inline-flex translate-y-2 items-center gap-1.5 rounded-full bg-white/92 px-4 py-2 text-[11.5px] font-bold text-brown shadow-lg backdrop-blur transition-transform duration-[400ms] group-hover:translate-y-0">
                    View Post
                    <span>→</span>
                  </span>
                </div>

                {/* likes + comments */}
                <div className="flex items-center gap-4 text-[12.5px] font-semibold text-white">
                  <span className="inline-flex items-center gap-1.5">❤️ {post.likes}</span>
                  <span className="inline-flex items-center gap-1.5">💬 {post.comments}</span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* mobile follow + arrows */}
        <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
          <a
            href={IG_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[12.5px] font-bold text-white shadow-[0_16px_32px_-16px_rgba(183,110,121,0.8)]"
            style={{ background: "linear-gradient(135deg,#B76E79,#C98F73 55%,#E8CBA0)" }}
          >
            <IgGlyph size={15} stroke="#fff" />
            Follow
          </a>
          <RailArrows trackRef={track} />
        </div>
      </div>
    </section>
  );
}
