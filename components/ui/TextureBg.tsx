import { cn } from "@/lib/utils/cn";

/* ============================================================
   TextureBg — subtle, self-contained SVG background textures used
   as faint watermarks behind dark sections across the site.
   Tone-on-tone & low-opacity so they enhance without competing
   with content. No image files required.
     • CheckerboardBg — wavy / warped checker (retro-luxe)
     • FloralBg       — embossed tone-on-tone floral (oxblood leather)
   Drop as the first child of a `relative overflow-hidden` container.
   ============================================================ */

/* ---------- wavy / warped checkerboard ---------- */
export function CheckerboardBg({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("anim-huedrift pointer-events-none absolute inset-0 h-full w-full", className)}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 400 320"
    >
      <defs>
        <filter id="cbg-wave" x="-25%" y="-25%" width="150%" height="150%">
          <feTurbulence type="fractalNoise" baseFrequency="0.006 0.011" numOctaves="2" seed="8" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="28" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <pattern id="cbg-checks" width="72" height="72" patternUnits="userSpaceOnUse">
          <rect width="36" height="36" fill="#FFF2E9" fillOpacity="0.06" />
          <rect x="36" y="36" width="36" height="36" fill="#FFF2E9" fillOpacity="0.06" />
        </pattern>
      </defs>
      {/* oversized so the wave never reveals empty edges */}
      <rect x="-60" y="-60" width="520" height="440" fill="url(#cbg-checks)" filter="url(#cbg-wave)" />
    </svg>
  );
}

/* ---------- embossed tone-on-tone floral ---------- */
export function FloralBg({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 400 320"
    >
      <defs>
        {/* one floral motif, reused for the shadow + highlight emboss passes */}
        <g id="fbg-flr" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M28 196 C 62 156 52 122 96 98" />
          <path d="M96 98 C 126 80 146 92 158 68" />
          <path d="M72 138 C 54 124 44 134 40 148 C 58 154 74 152 72 138 Z" />
          <path d="M112 96 C 100 76 110 62 126 58 C 130 78 124 94 112 96 Z" />
          <path d="M158 68 C 144 48 158 30 178 36 C 184 52 176 68 158 68 Z" />
          <path d="M158 68 C 180 58 200 70 198 90 C 180 94 160 86 158 68 Z" />
          <path d="M158 68 C 166 90 154 110 134 108 C 128 90 142 70 158 68 Z" />
          <path d="M158 68 C 136 62 124 44 134 26 C 152 32 164 50 158 68 Z" />
          <circle cx="158" cy="68" r="5.2" />
        </g>
        <pattern id="fbg-pat" width="200" height="200" patternUnits="userSpaceOnUse" patternTransform="rotate(4)">
          {/* shadow pass (pressed-in) */}
          <use href="#fbg-flr" x="1" y="1.2" stroke="#000000" opacity="0.16" />
          {/* highlight pass (raised edge) */}
          <use href="#fbg-flr" x="-1" y="-1.2" stroke="#FFF2E9" opacity="0.13" />
        </pattern>
      </defs>
      <rect width="400" height="320" fill="url(#fbg-pat)" />
    </svg>
  );
}
