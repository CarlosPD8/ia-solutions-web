"use client";

import { useEffect, useRef } from "react";
import { MetricPanel } from "@/components/hero/MetricPanel";
import { getGsap } from "@/lib/gsap";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

type Step = { id: string; title: string; description: string };
type Props = { steps: Step[] };

export const HowItWorksSection = ({ steps }: Props) => {
  const rootRef = useRef<HTMLElement | null>(null);
  const stepRefs = useRef<HTMLElement[]>([]);
  const dotRefs = useRef<HTMLSpanElement[]>([]);
  const reduceMotion = useReducedMotionSafe();

  useEffect(() => {
    if (reduceMotion) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const modules = await getGsap();
      if (!modules || !rootRef.current) return;

      const { gsap, ScrollTrigger } = modules;
      const ctx = gsap.context(() => {
        gsap.fromTo(
          ".js-process-head",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        );

        stepRefs.current.forEach((item, index) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 22 },
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              delay: index * 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 84%",
                once: true,
              },
            },
          );
        });

        const previous = { value: -1 };

        ScrollTrigger.create({
          trigger: rootRef.current,
          start: "top 65%",
          end: "bottom 38%",
          scrub: 0.5,
          onUpdate: (self) => {
            const max = steps.length - 1;
            const next = Math.min(max, Math.floor(self.progress * steps.length));
            if (next === previous.value) return;
            previous.value = next;

            stepRefs.current.forEach((item, i) => {
              gsap.to(item, {
                opacity: i <= next ? 1 : 0.52,
                scale: i === next ? 1.01 : 1,
                duration: 0.25,
                overwrite: "auto",
              });
            });

            dotRefs.current.forEach((dot, i) => {
              gsap.to(dot, {
                scale: i <= next ? 1 : 0.7,
                opacity: i <= next ? 1 : 0.4,
                backgroundColor: i <= next ? "#2b6fff" : "rgba(255,255,255,0.18)",
                duration: 0.22,
                overwrite: "auto",
              });
            });
          },
        });
      }, rootRef);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, [reduceMotion, steps.length]);

  return (
    <section id="como-funciona" ref={rootRef} className="border-b border-default bg-transparent">
      <div className="section-shell py-16 md:py-20">
        <div className="js-process-head mb-10 space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Cómo trabajamos contigo
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-muted md:text-base">
            Un proceso claro de principio a fin: desde entender tu contexto hasta acompañarte en la
            mejora continua de las soluciones de IA.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div className="surface-card relative overflow-hidden p-6 md:p-8">
            <div className="absolute left-9 top-14 bottom-14 w-px bg-gradient-to-b from-white/30 via-white/15 to-transparent md:left-10" />
            <div className="absolute -left-24 top-10 h-72 w-72 rounded-full border border-white/10" />

            <div className="relative space-y-6">
              {steps.map((step, index) => (
                <article
                  key={step.id}
                  ref={(node) => {
                    if (!node) return;
                    stepRefs.current[index] = node;
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 opacity-100 will-change-transform"
                >
                  <div className="flex items-start gap-4">
                    <span
                      ref={(node) => {
                        if (!node) return;
                        dotRefs.current[index] = node;
                      }}
                      className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-[11px] font-semibold text-primary"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold tracking-tight text-primary">{step.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-muted">{step.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <MetricPanel />
        </div>
      </div>
    </section>
  );
};
