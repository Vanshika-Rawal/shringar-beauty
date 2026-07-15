import Image from "next/image";
import { cn } from "@/lib/utils/cn";

interface ImageSlotProps {
  src?: string;
  alt?: string;
  /** Placeholder caption shown when no image is supplied (matches design). */
  placeholder?: string;
  shape?: "rect" | "rounded" | "circle";
  radius?: number;
  className?: string;
  /** Fill the parent (parent must be position:relative). */
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  /**
   * "cover" crops to fill the box (default, right for tiles/thumbnails).
   * "contain" shows the whole image without cropping — use it wherever the
   * product itself must stay fully visible, e.g. the detail-page gallery.
   */
  fit?: "cover" | "contain";
}

/**
 * Faithful port of the design's <image-slot>. When a real image URL is present
 * it renders an optimized next/image; otherwise it shows the same warm gradient
 * placeholder block used throughout the approved SHRINGAR design.
 */
export function ImageSlot({
  src,
  alt = "",
  placeholder,
  shape = "rounded",
  radius = 0,
  className,
  fill = false,
  width = 400,
  height = 400,
  priority = false,
  fit = "cover",
}: ImageSlotProps) {
  const radiusStyle =
    shape === "circle"
      ? { borderRadius: "9999px" }
      : { borderRadius: `${radius}px` };

  const objectFit = fit === "contain" ? "object-contain" : "object-cover";

  if (src) {
    return (
      <div
        className={cn("relative overflow-hidden", className)}
        style={radiusStyle}
      >
        {fill ? (
          <Image src={src} alt={alt} fill priority={priority} className={objectFit} />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className={cn("h-full w-full", objectFit)}
          />
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        className
      )}
      style={{
        ...radiusStyle,
        background: "linear-gradient(160deg,#FAF7F2,#F3ECE4)",
      }}
      aria-label={placeholder || alt}
    >
      {/* soft sheen so the placeholder still feels luxe */}
      <span
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 80% at 35% 30%,rgba(255,255,255,.6),transparent 60%)",
        }}
      />
      {placeholder ? (
        <span className="relative px-3 text-center font-manrope text-[10px] uppercase tracking-[0.18em] text-copper/70">
          {placeholder}
        </span>
      ) : null}
    </div>
  );
}
