"use client";

import { useEffect, useMemo, useRef, useState, type TouchEventHandler } from "react";
import { Testimonial } from "@/core/domain/testimonial";
import { getGsap } from "@/lib/gsap";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

type Props = {
  testimonials: Testimonial[];
};

export const TestimonialsSection = ({ testimonials }: Props) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotionSafe();
  const [activeIndex, setActiveIndex] = useState(0);
  const total = testimonials.length;
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 42;
  const companies = useMemo(() => Array.from(new Set(testimonials.map((item) => item.company))), [testimonials]);

  const goTo = (index: number) => {
    if (!total) return;
    setActiveIndex((index + total) % total);
  };

  const movePrev = () => goTo(activeIndex - 1);
  const moveNext = () => goTo(activeIndex + 1);

  const onTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
    const x = event.touches[0]?.clientX;
    if (typeof x !== "number") return;
    touchStartX.current = x;
    touchCurrentX.current = x;
  };

  const onTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
    const x = event.touches[0]?.clientX;
    if (typeof x !== "number") return;
    touchCurrentX.current = x;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null || touchCurrentX.current === null) return;
    const deltaX = touchCurrentX.current - touchStartX.current;

    if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
      if (deltaX < 0) moveNext();
      if (deltaX > 0) movePrev();
    }

    touchStartX.current = null;
    touchCurrentX.current = null;
  };

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
            stagger: 0.1,
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
        <div className="js-testimonial-head scene-testimonials-head mx-auto mb-8 max-w-4xl space-y-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-muted md:text-base">
            Resultados medibles aplicando IA de forma estratégica, con foco en eficiencia, experiencia y crecimiento.
          </p>
        </div>

        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="text-xs tracking-[0.16em] text-secondary md:text-sm">
            {total ? `${String(activeIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}` : "00 / 00"}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={movePrev}
              aria-label="Testimonio anterior"
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-primary transition hover:bg-white/[0.08]"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 12 6 8l4-4" />
              </svg>
            </button>
            <button
              type="button"
              onClick={moveNext}
              aria-label="Testimonio siguiente"
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] text-primary transition hover:bg-white/[0.08]"
            >
              <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 4l4 4-4 4" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="relative overflow-hidden rounded-[1.5rem]"
          style={{ touchAction: "pan-y" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translate3d(-${activeIndex * 100}%, 0, 0)` }}
          >
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                data-testimonial-card
                className="js-testimonial-card w-full shrink-0"
              >
                <div className="surface-card relative overflow-hidden p-6 md:p-8">
                  <div className="pointer-events-none absolute -right-8 -top-10 h-36 w-36 rounded-full bg-secondary/20 blur-3xl" />
                  <div className="pointer-events-none absolute -left-6 -bottom-8 h-28 w-28 rounded-full bg-violet-500/10 blur-2xl" />

                  <svg
                    viewBox="0 0 40 28"
                    className="mb-4 h-7 w-7 opacity-30"
                    fill="currentColor"
                    aria-hidden="true"
                    style={{ color: "#5c96ff" }}
                  >
                    <path d="M0 28V17.5C0 7.833 5.333 2.167 16 .5L18 4C13.333 5.167 10.333 7.5 9 11h7V28H0Zm22 0V17.5C22 7.833 27.333 2.167 38 .5L40 4c-4.667 1.167-7.667 3.5-9 7h7V28H22Z" />
                  </svg>

                  <div className="relative z-10">
                    <div className="mb-4 flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} viewBox="0 0 12 12" className="h-3.5 w-3.5" fill="#f59e0b" aria-hidden="true">
                          <path d="M6 .5l1.4 2.9 3.1.4-2.2 2.2.5 3.1L6 7.7 3.2 9.1l.5-3.1L1.5 3.8l3.1-.4L6 .5Z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-xl leading-8 tracking-tight text-primary md:text-2xl md:leading-[1.45]">
                      {testimonial.quote}
                    </p>

                    <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-sm font-semibold text-primary">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="text-sm text-muted">
                        <p className="font-semibold text-primary">{testimonial.name}</p>
                        <p>{testimonial.role} {"·"} {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={`dot-${testimonial.id}`}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Ir al testimonio ${index + 1}`}
              className={`focus-ring h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-8 bg-secondary" : "w-2.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-3 gap-y-3 text-sm text-muted">
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
