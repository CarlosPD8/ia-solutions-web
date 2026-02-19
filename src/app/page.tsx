import { CtaSection } from "@/components/home/CtaSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { HeroApple } from "@/components/hero/HeroApple";
import { MainLayout } from "@/components/layout/MainLayout";
import { getHomeContent } from "@/core/application/getHomeContent";

export default function HomePage() {
  const content = getHomeContent();

  return (
    <MainLayout>
      <div data-scene-root>
        <HeroApple
          title={content.hero.title}
          subtitle={content.hero.subtitle}
          primaryCta={content.hero.primaryCta}
          secondaryCta={content.hero.secondaryCta}
        />
        <ServicesSection services={content.services} />
        <HowItWorksSection steps={content.howItWorks.steps} />
        <TestimonialsSection testimonials={content.testimonials} />
      </div>

      <CtaSection
        title={content.cta.title}
        description={content.cta.description}
        buttonText={content.cta.buttonText}
      />
    </MainLayout>
  );
}
