import { MainLayout } from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { getHomeContent } from "@/core/application/getHomeContent";

export default function HomePage() {
  const content = getHomeContent();

  return (
    <MainLayout>
      <HeroSection
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        primaryCta={content.hero.primaryCta}
        secondaryCta={content.hero.secondaryCta}
      />
      <ServicesSection services={content.services} />
      <HowItWorksSection steps={content.howItWorks.steps} />
      <TestimonialsSection testimonials={content.testimonials} />
      <CtaSection
        title={content.cta.title}
        description={content.cta.description}
        buttonText={content.cta.buttonText}
      />
    </MainLayout>
  );
}
