"use client";

import { useEffect, useRef } from "react";
import { Testimonial } from "@/core/domain/testimonial";
import { getGsap } from "@/lib/gsap";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

type Props = {
  testimonials: Testimonial[];
};

export const TestimonialsSection = ({ testimonials }: Props) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotionSafe();
  const companies = Array.from(new Set(testimonials.map((item) => item.company)));

  useEffect(() => {
    if (reduceMotion) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const modules = await getGsap();
      if (!modules || !rootRef.current) return;

      const { gsap } = modules;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".js-testimonial-head",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 78%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          ".js-testimonial-card",
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 68%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          ".js-company-pill",
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.06,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 62%",
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
      id="testimonios"
      data-scene="testimonials"
      ref={rootRef}
      className="scene-panel border-b border-default bg-transparent"
    >
      <div className="section-shell py-16 md:py-20">
        <div className="js-testimonial-head scene-testimonials-head mb-10 space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-muted md:text-base">
            Resultados medibles aplicando IA de forma estratégica, no solo como una moda tecnológica.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              data-testimonial-card
              className="js-testimonial-card surface-card p-6 md:p-7"
            >
              <p className="text-2xl leading-9 tracking-tight text-primary">“{testimonial.quote}”</p>
              <div className="mt-6 text-sm text-muted">
                <p className="text-base font-semibold text-primary">{testimonial.name}</p>
                <p>
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          {companies.map((company) => (
            <span
              key={company}
              className="js-company-pill inline-flex items-center rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
