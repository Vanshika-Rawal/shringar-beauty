import { customerStories } from "@/lib/data/catalog";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { StarRating } from "@/components/ui/StarRating";

const storyAvatars = [
  "/products/product-139.jpg",
  "/products/product-140.jpg",
  "/products/product-141.jpg",
];

export function CustomerStories() {
  return (
    <section className="mx-auto max-w-shell px-[clamp(16px,4vw,40px)] py-[clamp(52px,6vw,88px)]">
      <SectionHeader
        overline="Real Glow, Real People"
        title="Customer Stories"
        subtitle="50,000+ happy customers and counting"
      />
      <div className="grid grid-cols-1 gap-[clamp(16px,2vw,26px)] sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        {customerStories.map((s, i) => (
          <div
            key={s.handle}
            className="flex flex-col rounded-[24px] border border-copper/[0.08] bg-white p-6 shadow-[0_22px_50px_-32px_rgba(201,143,115,0.45)]"
          >
            <StarRating rating={s.rating} size={14} />
            <p className="my-4 flex-1 text-[14.5px] leading-[1.7] text-brown-soft">
              &ldquo;{s.text}&rdquo;
            </p>
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.1em] text-copper">
              {s.product}
            </div>
            <div className="flex items-center gap-3 border-t border-black/5 pt-4">
              <ImageSlot src={storyAvatars[i]} placeholder={s.name} shape="circle" className="h-11 w-11" />
              <div className="leading-tight">
                <div className="text-[13px] font-semibold text-brown">{s.name}</div>
                <div className="text-[11.5px] text-mid">{s.handle} · {s.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
