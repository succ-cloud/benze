import { FeatureSplit } from "@/components/home/FeatureSplit";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { ModelCarousel } from "@/components/home/ModelCarousel";
import { PromoCards } from "@/components/home/PromoCards";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <ModelCarousel />
      <FeatureSplit />
      <PromoCards />
    </>
  );
}
