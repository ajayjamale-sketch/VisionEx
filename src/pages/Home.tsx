import { useScrollTop } from '@/hooks/useScrollTop';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import WorkflowSection from '@/components/sections/WorkflowSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import DashboardPreviewSection from '@/components/sections/DashboardPreviewSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import PricingSection from '@/components/sections/PricingSection';
import FAQSection from '@/components/sections/FAQSection';
import CTABannerSection from '@/components/sections/CTABannerSection';

export default function Home() {
  useScrollTop();

  return (
    <main className="page-transition">
      <HeroSection />
      <FeaturesSection />
      <WorkflowSection />
      <BenefitsSection />
      <DashboardPreviewSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTABannerSection />
    </main>
  );
}
