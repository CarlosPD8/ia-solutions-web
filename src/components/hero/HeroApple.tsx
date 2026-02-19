"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const IconOrbit = dynamic(() => import("@/components/hero/IconOrbit").then((m) => m.IconOrbit), {
  ssr: false,
});

type HeroAppleProps = {
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
};

export const HeroApple = ({ title, subtitle, primaryCta, secondaryCta }: HeroAppleProps) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [shouldLoadOrbit, setShouldLoadOrbit] = useState(false);
  const [isCompactOrbit, setIsCompactOrbit] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadOrbit(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setIsCompactOrbit(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-scene="hero"
      className="scene-panel border-b border-default bg-transparent"
    >
      <div className="section-shell flex min-h-[100svh] items-center py-16 md:py-20">
        <div className="grid w-full gap-10 md:grid-cols-[1fr_1fr] md:items-center">
          <div className="scene-hero-copy space-y-7 will-change-transform">
            <span className="inline-flex rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs font-medium text-secondary">
              Soluciones de IA para empresas
            </span>

            <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-primary md:text-6xl lg:text-7xl lg:leading-[1.06]">
              {title}
            </h1>

            <p className="max-w-xl text-base leading-8 text-muted md:text-lg md:leading-9">{subtitle}</p>

            <div className="flex flex-col gap-3 sm:flex-row">
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

            <p className="text-xs text-muted">Evaluación inicial gratuita. Sin compromisos.</p>
          </div>

          <div className="scene-hero-orbit hero-orbit-panel surface-card relative overflow-hidden p-3 sm:p-6 md:p-7">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(560px_300px_at_58%_44%,rgba(73,128,255,0.2),transparent_68%)]" />
            <div className="pointer-events-none absolute inset-x-8 bottom-2 h-24 rounded-full bg-[radial-gradient(200px_62px_at_50%_52%,rgba(194,216,255,0.2),rgba(8,10,16,0)_72%)]" />
            <div className="relative">
              {shouldLoadOrbit ? (
                <IconOrbit compact={isCompactOrbit || prefersReducedMotion} />
              ) : (
                <div className="mx-auto h-[23rem] w-full max-w-[32rem] animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.03] md:h-[28rem]" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
