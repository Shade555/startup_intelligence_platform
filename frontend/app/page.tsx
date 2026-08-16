import { AmbientBackground } from "./components/home/AmbientBackground";
import { HeroSection } from "./components/home/HeroSection";
import { DashboardPreview } from "./components/home/DashboardPreview";
import { FeaturesSection } from "./components/home/FeaturesSection";
import { AboutSection } from "./components/home/AboutSection";
import { ActivityFeed } from "./components/home/ActivityFeed";
import { PricingSection } from "./components/home/PricingSection";
import { CTASection } from "./components/home/CTASection";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <main className="overflow-x-hidden pt-6 pb-20">
        <HeroSection />
        <DashboardPreview />
        <FeaturesSection />
        <AboutSection />
        <ActivityFeed />
        <PricingSection />
        <CTASection />
      </main>
      
      <footer className="py-[50px] text-center text-[#71717a] text-[11px]">
        <div className="w-[min(1180px,calc(100%-40px))] mx-auto">
          © {new Date().getFullYear()} Nova Intelligence · Dark Glass Design System
        </div>
      </footer>
    </>
  );
}
