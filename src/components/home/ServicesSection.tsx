"use client";

import { useEffect, useRef } from "react";
import { Service } from "@/core/domain/service";
import { getGsap } from "@/lib/gsap";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

type Props = {
  services: Service[];
};

export const ServicesSection = ({ services }: Props) => {
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
          ".js-services-head",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 76%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          ".js-service-card",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 70%",
              once: true,
            },
          },
        );
      }, rootRef);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, [reduceMotion]);

  return (
    <section
      id="servicios"
      data-scene="services"
      ref={rootRef}
      className="scene-panel border-b border-default bg-transparent"
    >
      <div className="section-shell py-16 md:py-20">
        <div className="js-services-head scene-services-head mb-10 space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Servicios de IA para tu empresa
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-muted md:text-base">
            Soluciones de IA diseñadas para aportar impacto real en tus procesos, desde asistentes
            inteligentes hasta automatización y analítica avanzada.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.id}
              className="js-service-card scene-service-card surface-card flex h-full flex-col p-6 will-change-transform"
            >
              <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05]">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
              </div>

              <div className="mb-3 text-xs font-medium tracking-[0.2em] text-secondary">
                {String(index + 1).padStart(2, "0")}
              </div>

              <h3 className="text-xl font-semibold tracking-tight text-primary">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{service.shortDescription}</p>

              <ul className="mt-6 space-y-3 text-sm text-muted">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
