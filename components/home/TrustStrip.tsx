const items = [
  { icon: "🐰", label: "Cruelty Free" },
  { icon: "🌿", label: "100% Organic" },
  { icon: "✓", label: "Dermatologist Approved" },
  { icon: "⚡", label: "Fast Delivery" },
  { icon: "✦", label: "Premium Ingredients" },
];

/**
 * Trust badges. Desktop/tablet keep the original spread-out row. On mobile
 * (max-md) it becomes a compact, swipeable single row of premium pills at
 * roughly half the vertical height — all via max-md: so md+ is untouched.
 */
export function TrustStrip() {
  return (
    <section className="border-b border-copper/10 bg-white">
      <div className="noscroll mx-auto flex max-w-shell flex-wrap justify-between gap-4 px-[clamp(16px,4vw,40px)] py-[18px] max-md:flex-nowrap max-md:justify-start max-md:gap-1.5 max-md:overflow-x-auto max-md:py-1.5 max-md:pl-4">
        {items.map((i) => (
          <div
            key={i.label}
            className="flex items-center gap-2.5 text-[13px] font-medium text-brown max-md:flex-none max-md:gap-1 max-md:rounded-full max-md:border max-md:border-copper/15 max-md:bg-gradient-to-b max-md:from-copper/[0.07] max-md:to-transparent max-md:px-2 max-md:py-[3px] max-md:text-[10.5px] max-md:font-semibold max-md:whitespace-nowrap"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-copper/10 text-[17px] max-md:h-[18px] max-md:w-[18px] max-md:text-[11px]">
              {i.icon}
            </span>
            {i.label}
          </div>
        ))}
      </div>
    </section>
  );
}
