import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  overline: string;
  title: string;
  subtitle?: string;
  align?: "center" | "between";
  overlineColor?: string;
  /** "dark" inverts the heading/subtitle for use on deep brown backgrounds. */
  tone?: "light" | "dark";
  action?: React.ReactNode;
}

/** The recurring "overline + Playfair heading" pattern from the design. */
export function SectionHeader({
  overline,
  title,
  subtitle,
  align = "center",
  overlineColor = "#C98F73",
  tone = "light",
  action,
}: SectionHeaderProps) {
  const titleColor = tone === "dark" ? "text-cream" : "text-brown";
  const subtitleColor = tone === "dark" ? "text-cream/70" : "text-muted";

  if (align === "between") {
    return (
      <div className="mb-[34px] flex items-end justify-between gap-4">
        <div>
          <div
            className="mb-[13px] text-[11px] font-semibold uppercase tracking-[0.26em]"
            style={{ color: overlineColor }}
          >
            {overline}
          </div>
          <h2 className={cn("m-0 font-playfair text-[clamp(30px,4.2vw,50px)] font-semibold tracking-[-0.01em]", titleColor)}>
            {title}
          </h2>
        </div>
        {action}
      </div>
    );
  }

  return (
    <div className={cn("mb-11 text-center")}>
      <div
        className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em]"
        style={{ color: overlineColor }}
      >
        {overline}
      </div>
      <h2 className={cn("m-0 font-playfair text-[clamp(30px,4.2vw,50px)] font-bold tracking-[-0.01em]", titleColor)}>
        {title}
      </h2>
      {subtitle ? (
        <p className={cn("mx-0 mb-0 mt-3.5 text-sm", subtitleColor)}>{subtitle}</p>
      ) : null}
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}
