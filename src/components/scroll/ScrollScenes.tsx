"use client";

import { useEffect } from "react";
import { getGsap } from "@/lib/gsap";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export const ScrollScenes = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const modules = await getGsap();
      if (!modules) return;

      const { gsap, ScrollTrigger } = modules;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const hero = document.querySelector<HTMLElement>('[data-scene="hero"]');
        const services = document.querySelector<HTMLElement>('[data-scene="services"]');
        const process = document.querySelector<HTMLElement>('[data-scene="process"]');
        const testimonials = document.querySelector<HTMLElement>('[data-scene="testimonials"]');

        if (!hero || !services || !process || !testimonials) return;

        const heroTl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=140%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });

        heroTl
          .to(".scene-hero-copy", { yPercent: -18, opacity: 0.42, ease: "none" }, 0)
          .to(".scene-hero-orbit", { yPercent: 10, scale: 0.93, opacity: 0.84, ease: "none" }, 0)
          .to(".scene-orbit-inner", { rotate: 45, ease: "none" }, 0);

        const serviceCards = gsap.utils.toArray<HTMLElement>(".scene-service-card");
        gsap.set(serviceCards, { transformPerspective: 1200, transformOrigin: "center center" });

        const servicesTl = gsap.timeline({
          scrollTrigger: {
            trigger: services,
            start: "top top",
            end: "+=180%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });

        servicesTl.fromTo(".scene-services-head", { opacity: 0.65 }, { opacity: 1, ease: "none" }, 0);
        servicesTl.to(serviceCards, { opacity: 0.42, scale: 0.92, rotateX: 6, y: 18, ease: "none" }, 0);
        serviceCards.forEach((_, index) => {
          const start = 0.2 + index * 0.28;
          servicesTl.to(
            serviceCards[index],
            {
              opacity: 1,
              scale: 1.04,
              rotateX: 0,
              y: 0,
              ease: "none",
              duration: 0.22,
            },
            start,
          );
          servicesTl.to(
            serviceCards[index],
            {
              opacity: 0.58,
              scale: 0.95,
              rotateX: 4,
              y: 10,
              ease: "none",
              duration: 0.18,
            },
            start + 0.22,
          );
        });
        servicesTl.to(serviceCards[serviceCards.length - 1], { opacity: 1, scale: 1.02, rotateX: 0, y: 0, ease: "none" }, 0.9);

        const processSteps = gsap.utils.toArray<HTMLElement>(".scene-process-step");
        const processDots = gsap.utils.toArray<HTMLElement>("[data-step-dot]");
        gsap.set(processSteps, { opacity: 0.45, scale: 0.98 });
        gsap.set(processDots, { opacity: 0.45, scale: 0.78 });

        const processTl = gsap.timeline({
          scrollTrigger: {
            trigger: process,
            start: "top top",
            end: "+=190%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });

        processSteps.forEach((step, index) => {
          const marker = index * 0.22;
          processTl.to(
            processSteps,
            { opacity: 0.42, scale: 0.97, duration: 0.001, ease: "none" },
            marker,
          );
          processTl.to(
            processDots,
            { opacity: 0.38, scale: 0.7, backgroundColor: "rgba(255,255,255,0.08)", duration: 0.001, ease: "none" },
            marker,
          );
          processTl.to(step, { opacity: 1, scale: 1.02, ease: "none", duration: 0.12 }, marker + 0.03);
          processTl.to(
            processDots[index],
            { opacity: 1, scale: 1, backgroundColor: "#2b6fff", ease: "none", duration: 0.12 },
            marker + 0.03,
          );
        });

        const metricPanel = document.querySelector<HTMLElement>("[data-metric-panel]");
        if (metricPanel) {
          const bars = gsap.utils.toArray<HTMLElement>("[data-metric-bar]");
          const shimmers = gsap.utils.toArray<HTMLElement>("[data-metric-shimmer]");
          const line = document.querySelector<SVGPathElement>("[data-metric-line] path");

          gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(shimmers, { opacity: 0 });
          if (line) {
            const length = line.getTotalLength();
            gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
          }

          const metricTl = gsap.timeline({
            scrollTrigger: {
              trigger: metricPanel,
              start: "top 70%",
              once: true,
            },
          });

          bars.forEach((bar, index) => {
            const target = Number(bar.dataset.target ?? "0.8");
            metricTl.to(bar, { scaleX: target, duration: 0.62, ease: "power2.out" }, index * 0.12);
            metricTl.to(
              shimmers[index],
              { xPercent: 240, opacity: 0.7, duration: 0.48, ease: "power2.out" },
              index * 0.12,
            );
          });

          if (line) {
            metricTl.to(line, { strokeDashoffset: 0, duration: 0.9, ease: "power2.out" }, 0.12);
          }
        }

        const testimonialCards = gsap.utils.toArray<HTMLElement>("[data-testimonial-card]");
        const testimonialsTl = gsap.timeline({
          scrollTrigger: {
            trigger: testimonials,
            start: "top top",
            end: "+=120%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        });

        testimonialsTl
          .fromTo(".scene-testimonials-head", { opacity: 0.5, yPercent: 4 }, { opacity: 1, yPercent: 0, ease: "none" }, 0)
          .fromTo(
            testimonialCards,
            { opacity: 0.48, y: 40, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.16, ease: "none" },
            0.08,
          );

        gsap.to(testimonialCards, {
          y: -7,
          repeat: -1,
          yoyo: true,
          duration: 2.8,
          stagger: 0.3,
          ease: "sine.inOut",
        });

        ScrollTrigger.create({
          trigger: hero.parentElement,
          start: "top top",
          end: "bottom bottom",
          snap: {
            snapTo: [0, 0.25, 0.5, 0.75],
            duration: { min: 0.12, max: 0.32 },
            delay: 0.04,
            ease: "power1.out",
          },
        });
      });

      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(
          '[data-scene="hero"] .scene-hero-copy, [data-scene="hero"] .scene-hero-orbit',
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.64,
            ease: "power3.out",
            scrollTrigger: {
              trigger: '[data-scene="hero"]',
              start: "top 78%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          ".scene-service-card, .scene-process-step, [data-testimonial-card]",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.62,
            ease: "power2.out",
            scrollTrigger: {
              trigger: '[data-scene="services"]',
              start: "top 82%",
              once: true,
            },
          },
        );
      });

      cleanup = () => {
        mm.revert();
      };
    })();

    return () => cleanup?.();
  }, [prefersReducedMotion]);

  return null;
};
