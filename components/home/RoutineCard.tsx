"use client";

import Link from "next/link";
import { ImageSlot } from "@/components/ui/ImageSlot";

export interface RoutineItem {
  name: string;
  steps: string;
  href: string;
  gradient: string;
  /** Looping ritual clip (mp4 under /public/videos). Auto-plays over the
   *  animated gradient poster; the gradient stays visible as a fallback. */
  video?: string;
}

/**
 * Build-Your-Routine card. A short ritual video auto-plays (muted, looping)
 * over a luxe gradient poster that shows through while the clip loads.
 */
export function RoutineCard({ routine }: { routine: RoutineItem }) {
  return (
    <Link
      href={routine.href}
      className="group relative flex-none basis-[240px] cursor-pointer overflow-hidden rounded-[22px] shadow-[0_18px_44px_-26px_rgba(201,143,115,0.45)] transition-transform duration-[450ms] [transition-timing-function:cubic-bezier(.22,.61,.36,1)] hover:-translate-y-1.5"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden" style={{ background: routine.gradient }}>
        {/* animated poster (fallback while the clip loads) */}
        <span className="absolute inset-0 anim-kenburns" style={{ background: routine.gradient }} />
        <ImageSlot placeholder={routine.name} radius={0} className="absolute inset-0 h-full w-full opacity-0" />

        {/* auto-playing ritual video */}
        {routine.video && (
          <video
            key={routine.video}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={routine.video} type="video/mp4" />
          </video>
        )}

      </div>

      <div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: "linear-gradient(transparent 42%,rgba(58,44,34,.82))" }} />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[2] p-[18px]">
        <div className="font-playfair text-[19px] font-semibold text-white">{routine.name}</div>
        <div className="mt-1 text-[11.5px] text-gold">{routine.steps}</div>
      </div>
    </Link>
  );
}
