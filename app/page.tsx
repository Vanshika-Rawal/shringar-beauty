import { products } from "@/lib/data/catalog";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustStrip } from "@/components/home/TrustStrip";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { BiggestDeals } from "@/components/home/BiggestDeals";
import { NewArrivalsCarousel } from "@/components/home/NewArrivalsCarousel";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { BestSellers } from "@/components/home/BestSellers";
import { EditorialBanner, PromoBanners } from "@/components/home/LuxuryBlocks";
import { BrandSlider } from "@/components/home/BrandSlider";
import {
  ConcernSection,
  IngredientSection,
  SkinTypeSection,
  RoutineSection,
} from "@/components/home/DiscoverySections";
import { CustomerStories } from "@/components/home/CustomerStories";
import { InstagramGallery } from "@/components/home/InstagramGallery";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  const trending = products.slice(0, 6);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 6);

  // Best Sellers — only genuine bestseller-tagged products.
  const bestsellers = products.filter((p) => p.bestseller);

  return (
    <div className="bg-cream">
      <HeroSection />
      <TrustStrip />
      <BrandSlider />
      <CategoryGrid />

      <ProductCarousel
        overline="Trending Now"
        title="This Week's Obsessions"
        products={trending}
        viewAllHref="/shop?sort=rating"
      />
      <BiggestDeals />
     
      <NewArrivalsCarousel products={newArrivals} />
      <BestSellers products={bestsellers} />

      <EditorialBanner />
      <PromoBanners />
      <ConcernSection />
      <IngredientSection />
      <SkinTypeSection />
      <RoutineSection />
      <CustomerStories />
      <InstagramGallery />
      <Newsletter />
    </div>
  );
}
