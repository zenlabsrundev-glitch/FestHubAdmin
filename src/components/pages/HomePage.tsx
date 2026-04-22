import { HeroSection } from "@/components/pages/home/HeroSection";
import { StatsSection } from "@/components/pages/home/StatsSection";
import { CtaSection } from "@/components/pages/home/CtaSection";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
  
      <CtaSection />
    </>
  );
}
