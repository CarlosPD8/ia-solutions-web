"use client";

import { useEffect, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const metrics = [
  { label: "Speed", value: "80%", scale: 0.8 },
  { label: "Coste", value: "−35%", scale: 0.65 },
  { label: "Satisfacción", value: "+25%", scale: 0.72 },
];

export const MetricPanel = () => {
  const reduceMotion = useReducedMotionSafe();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const barRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (reduceMotion) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const modules = await getGsap();
      if (!modules || !rootRef.current) return;

      const { gsap } = modules;
      const ctx = gsap.context(() => {
        gsap.set(barRefs.current, { scaleX: 0, transformOrigin: "left center" });

        gsap.to(barRefs.current, {
          scaleX: (i: number) => metrics[i]?.scale ?? 0.5,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 78%",
            once: true,
          },
        });
      }, rootRef);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, [reduceMotion]);

  return (
    <aside ref={rootRef} className="surface-card p-6">
      <h3 className="text-2xl font-semibold tracking-tight text-primary">Estado de tus procesos</h3>
      <div className="mt-6 space-y-5">
        {metrics.map((metric, index) => (
          <div key={metric.label}>
            <div className="mb-2 flex items-center justify-between text-sm text-muted">
              <span>{metric.label}</span>
              <span className="text-xl tracking-tight text-primary">{metric.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10">
              <div
                ref={(node) => {
                  if (!node) return;
                  barRefs.current[index] = node;
                }}
                className="h-1.5 rounded-full bg-[linear-gradient(90deg,#60a5ff,#2563ff)] will-change-transform"
                style={{ transform: reduceMotion ? `scaleX(${metric.scale})` : "scaleX(0)" }}
              />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
