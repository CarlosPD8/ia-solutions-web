"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { getGsap } from "@/lib/gsap";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const orbitNodes = [
  { top: "14%", left: "50%" },
  { top: "26%", left: "80%" },
  { top: "50%", left: "88%" },
  { top: "74%", left: "80%" },
  { top: "86%", left: "50%" },
  { top: "74%", left: "20%" },
  { top: "50%", left: "12%" },
  { top: "26%", left: "20%" },
];

type HeroOrbitProps = {
  triggerRef?: RefObject<HTMLElement | null>;
};

export const HeroOrbit = ({ triggerRef }: HeroOrbitProps) => {
  const reduceMotion = useReducedMotionSafe();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<HTMLDivElement[]>([]);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!active || reduceMotion) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const modules = await getGsap();
      if (!modules || !rootRef.current) return;

      const { gsap } = modules;
      const ctx = gsap.context(() => {
        if (ringRef.current) {
          gsap.to(ringRef.current, {
            rotate: 360,
            duration: 60,
            ease: "none",
            repeat: -1,
          });
        }

        if (nodeRefs.current.length > 0) {
          gsap.to(nodeRefs.current, {
            y: (i: number) => (i % 2 === 0 ? -5 : 5),
            duration: 3.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: 0.08,
          });
        }

        if (stageRef.current) {
          gsap.to(stageRef.current, {
            y: -28,
            scale: 0.94,
            rotate: 8,
            ease: "none",
            scrollTrigger: {
              trigger: triggerRef?.current ?? rootRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }
      }, rootRef);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, [active, reduceMotion, triggerRef]);

  return (
    <div ref={rootRef} className="relative mx-auto h-[22rem] w-full max-w-[28rem] md:h-[26rem] md:max-w-[31rem]">
      <div ref={stageRef} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0 rounded-[50%] border border-white/10" />
        <div ref={ringRef} className="absolute inset-[8%] rounded-[50%] border border-white/15">
          <div className="absolute inset-[12%] rounded-[50%] border border-white/10" />
        </div>

        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),rgba(37,99,255,0.2)_45%,rgba(7,10,18,0.95)_80%)] shadow-[inset_0_1px_8px_rgba(255,255,255,0.16)]">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl font-semibold tracking-tight text-primary">
            IA
          </span>
        </div>

        {orbitNodes.map((item, index) => (
          <div
            key={index}
            ref={(node) => {
              if (!node) return;
              nodeRefs.current[index] = node;
            }}
            className="absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/15 bg-[#0c111c] will-change-transform"
            style={{ top: item.top, left: item.left }}
            aria-hidden="true"
          >
            <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/50 bg-blue-400/20" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-x-8 bottom-4 h-16 rounded-full border border-white/10 bg-white/[0.02]" />
    </div>
  );
};
