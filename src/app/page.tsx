import { HeroApple } from "@/components/hero/HeroApple";
import { CtaSection } from "@/components/home/CtaSection";
import { MainLayout } from "@/components/layout/MainLayout";
import { ScrollScenes } from "@/components/scroll/ScrollScenes";
import { ProcessApple } from "@/components/sections/ProcessApple";
import { ServicesApple } from "@/components/sections/ServicesApple";
import { TestimonialsApple } from "@/components/sections/TestimonialsApple";
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
        <ServicesApple services={content.services} />
        <ProcessApple steps={content.howItWorks.steps} />
        <TestimonialsApple testimonials={content.testimonials} />
      </div>

      <CtaSection
        title={content.cta.title}
        description={content.cta.description}
        buttonText={content.cta.buttonText}
      />

      <ScrollScenes />
    </MainLayout>
  );
}
