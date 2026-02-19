"use client";

import { useEffect } from "react";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export const ScrollScenes = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    (async () => {
      const modules = await getGsap();
      if (!modules) return;

      const { gsap, ScrollTrigger } = modules;
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const conditions = ctx.conditions as { desktop?: boolean; reduced?: boolean };
          const useReduced = Boolean(conditions.reduced || prefersReducedMotion);

          const hero = document.querySelector<HTMLElement>('[data-scene="hero"]');
          const services = document.querySelector<HTMLElement>('[data-scene="services"]');
          const process = document.querySelector<HTMLElement>('[data-scene="process"]');
          const testimonials = document.querySelector<HTMLElement>('[data-scene="testimonials"]');
          const root = document.querySelector<HTMLElement>("[data-scene-root]");
          if (!hero || !services || !process || !testimonials) return;

          const sectionPanels = [hero, services, process, testimonials];
          const serviceCards = gsap.utils.toArray<HTMLElement>(".scene-service-card");
          const processSteps = gsap.utils.toArray<HTMLElement>(".scene-process-step");
          const processDots = gsap.utils.toArray<HTMLElement>("[data-step-dot]");
          const testimonialCards = gsap.utils.toArray<HTMLElement>("[data-testimonial-card]");

          if (conditions.desktop && !useReduced) {
            const createPinnedScene = (panel: HTMLElement, duration = 160) =>
              ScrollTrigger.create({
                trigger: panel,
                start: "top top",
                end: `+=${duration}%`,
                pin: true,
                scrub: 0.6,
                anticipatePin: 1,
                fastScrollEnd: true,
              });

            createPinnedScene(hero, 135);
            createPinnedScene(services, 175);
            createPinnedScene(process, 170);
            createPinnedScene(testimonials, 130);

            gsap.timeline({ scrollTrigger: { trigger: hero, start: "top top", end: "+=135%", scrub: 0.7 } }).to(
              ".scene-hero-copy",
              { yPercent: -12, opacity: 0.55, scale: 0.985, ease: "none" },
              0,
            ).to(
              ".scene-hero-orbit",
              { yPercent: 5, scale: 1.03, opacity: 0.95, ease: "none" },
              0,
            );

            gsap.set(serviceCards, { transformPerspective: 1200, transformOrigin: "center center", opacity: 0.62 });
            const servicesTl = gsap.timeline({
              scrollTrigger: { trigger: services, start: "top top", end: "+=175%", scrub: 0.7 },
            });
            servicesTl
              .fromTo(".scene-services-head", { opacity: 0.62, yPercent: 4 }, { opacity: 1, yPercent: 0, ease: "none" }, 0)
              .to(serviceCards, { opacity: 0.48, scale: 0.95, y: 14, rotateX: 4, ease: "none" }, 0);

            serviceCards.forEach((card, index) => {
              servicesTl.to(
                card,
                { opacity: 1, scale: 1.02, y: 0, rotateX: 0, ease: "none", duration: 0.16 },
                0.22 + index * 0.24,
              );
            });

            gsap.set(processSteps, { opacity: 0.5, scale: 0.985 });
            gsap.set(processDots, { opacity: 0.42, scale: 0.72 });
            const processTl = gsap.timeline({
              scrollTrigger: { trigger: process, start: "top top", end: "+=170%", scrub: 0.68 },
            });
            processSteps.forEach((step, index) => {
              const marker = index * 0.24;
              processTl
                .to(processSteps, { opacity: 0.45, scale: 0.98, duration: 0.001, ease: "none" }, marker)
                .to(
                  processDots,
                  {
                    opacity: 0.4,
                    scale: 0.68,
                    backgroundColor: "rgba(255,255,255,0.12)",
                    duration: 0.001,
                    ease: "none",
                  },
                  marker,
                )
                .to(step, { opacity: 1, scale: 1.018, duration: 0.12, ease: "none" }, marker + 0.04)
                .to(
                  processDots[index],
                  { opacity: 1, scale: 1, backgroundColor: "#2b6fff", duration: 0.12, ease: "none" },
                  marker + 0.04,
                );
            });

            gsap.timeline({
              scrollTrigger: { trigger: testimonials, start: "top top", end: "+=130%", scrub: 0.65 },
            })
              .fromTo(
                ".scene-testimonials-head",
                { opacity: 0.55, yPercent: 5 },
                { opacity: 1, yPercent: 0, ease: "none" },
                0,
              )
              .fromTo(
                testimonialCards,
                { opacity: 0.48, y: 26, scale: 0.965 },
                { opacity: 1, y: 0, scale: 1, stagger: 0.14, ease: "none" },
                0.1,
              );

            gsap.to(testimonialCards, {
              y: -5,
              repeat: -1,
              yoyo: true,
              duration: 3.1,
              stagger: 0.25,
              ease: "sine.inOut",
            });

            if (root) {
              ScrollTrigger.create({
                trigger: root,
                start: "top top",
                end: "bottom bottom",
                snap: {
                  snapTo: (progress) => {
                    const points = [0, 0.25, 0.5, 0.75];
                    return points.reduce((prev, curr) =>
                      Math.abs(curr - progress) < Math.abs(prev - progress) ? curr : prev,
                    );
                  },
                  duration: { min: 0.15, max: 0.35 },
                  ease: "power1.out",
                  delay: 0.05,
                },
              });
            }

            return;
          }

          sectionPanels.forEach((panel, index) => {
            gsap.fromTo(
              panel.querySelectorAll("h1, h2, p, .scene-service-card, .scene-process-step, [data-testimonial-card], .scene-hero-orbit, .scene-hero-copy"),
              { opacity: 0, y: 18 },
              {
                opacity: 1,
                y: 0,
                duration: 0.62,
                ease: "power2.out",
                stagger: 0.04,
                scrollTrigger: {
                  trigger: panel,
                  start: index === 0 ? "top 88%" : "top 82%",
                  once: true,
                },
              },
            );
          });
        },
      );

      cleanup = () => {
        mm.revert();
      };
    })();

    return () => cleanup?.();
  }, [prefersReducedMotion]);

  return null;
};
