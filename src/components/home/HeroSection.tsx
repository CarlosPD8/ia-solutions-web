"use client";

import { useEffect, useRef } from "react";
import { HeroOrbit } from "@/components/hero/HeroOrbit";
import { getGsap } from "@/lib/gsap";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

type HeroProps = {
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
};

export const HeroSection = ({ title, subtitle, primaryCta, secondaryCta }: HeroProps) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotionSafe();

  useEffect(() => {
    if (reduceMotion) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const modules = await getGsap();
      if (!modules || !rootRef.current) return;

      const { gsap } = modules;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".js-hero-item",
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.78,
            ease: "power3.out",
            stagger: 0.08,
          },
        );
      }, rootRef);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, [reduceMotion]);

  return (
    <section ref={rootRef} className="border-b border-default bg-transparent">
      <div className="section-shell grid gap-10 pb-16 pt-14 md:grid-cols-[1fr_1fr] md:items-center md:gap-12 md:pb-24 md:pt-20">
        <div className="space-y-7">
          <span className="js-hero-item inline-flex rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs font-medium text-secondary">
            Soluciones de IA para empresas
          </span>

          <h1 className="js-hero-item max-w-xl text-5xl font-semibold tracking-tight text-primary md:text-6xl lg:text-7xl lg:leading-[1.05]">
            {title}
          </h1>

          <p className="js-hero-item max-w-xl text-base leading-8 text-muted md:text-lg md:leading-9">
            {subtitle}
          </p>

          <div className="js-hero-item flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/34670294712?text=Hola%20quiero%20información%20sobre%20una%20solución%20con%20IA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-apple-primary focus-ring px-6 py-3 text-sm font-medium"
            >
              {primaryCta}
            </a>
            <a href="#servicios" className="btn-apple-ghost focus-ring px-6 py-3 text-sm font-medium">
              {secondaryCta}
            </a>
          </div>

          <p className="js-hero-item text-xs text-muted">Evaluación inicial gratuita. Sin compromisos.</p>
        </div>

        <div className="js-hero-item surface-card relative overflow-hidden p-5 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(460px_260px_at_55%_40%,rgba(43,111,255,0.22),transparent_62%)]" />
          <HeroOrbit triggerRef={rootRef} />
        </div>
      </div>
    </section>
  );
};
