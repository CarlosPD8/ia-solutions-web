"use client";

import { useMemo, useRef, useState, type MouseEvent, type TouchEventHandler } from "react";
import { Service } from "@/core/domain/service";

type Props = {
  services: Service[];
};

export const ServicesSection = ({ services }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = services.length;
  const touchStartX = useRef<number | null>(null);
  const touchCurrentX = useRef<number | null>(null);
  const SWIPE_THRESHOLD = 42;

  const movePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);
  const moveNext = () => setActiveIndex((prev) => (prev + 1) % total);

  const getRelative = (index: number) => {
    if (total <= 1) return 0;
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  const visibleIndexes = useMemo(() => {
    if (total === 0) return new Set<number>();
    if (total <= 3) return new Set(services.map((_, i) => i));

    const left = (activeIndex - 1 + total) % total;
    const right = (activeIndex + 1) % total;
    return new Set([left, activeIndex, right]);
  }, [activeIndex, services, total]);

  const getCardStyle = (relative: number) => {
    if (relative === 0) {
      return {
        transform: "translate3d(-50%, 0, 0) scale(1) rotateY(0deg)",
        opacity: 1,
        zIndex: 30,
        pointerEvents: "auto" as const,
      };
    }

    if (relative < 0) {
      return {
        transform: "translate3d(-112%, 0, 0) scale(0.88) rotateY(16deg)",
        opacity: 0.82,
        zIndex: 20,
        pointerEvents: "auto" as const,
      };
    }

    if (relative > 0) {
      return {
        transform: "translate3d(12%, 0, 0) scale(0.88) rotateY(-16deg)",
        opacity: 0.82,
        zIndex: 20,
        pointerEvents: "auto" as const,
      };
    }

    return {
      transform: "translate3d(-50%, 0, 0) scale(0.74)",
      opacity: 0,
      zIndex: 1,
      pointerEvents: "none" as const,
    };
  };

  const getMobileCardStyle = (relative: number) => {
    if (relative === 0) {
      return {
        transform: "translate3d(-50%, 0, 0) scale(1)",
        opacity: 1,
        zIndex: 30,
        pointerEvents: "auto" as const,
      };
    }

    if (relative < 0) {
      return {
        transform: "translate3d(-90%, 0, 0) scale(0.92)",
        opacity: 0.78,
        zIndex: 20,
        pointerEvents: "auto" as const,
      };
    }

    if (relative > 0) {
      return {
        transform: "translate3d(-10%, 0, 0) scale(0.92)",
        opacity: 0.78,
        zIndex: 20,
        pointerEvents: "auto" as const,
      };
    }

    return {
      transform: "translate3d(-50%, 0, 0) scale(0.74)",
      opacity: 0,
      zIndex: 1,
      pointerEvents: "none" as const,
    };
  };

  const onMobileTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
    const x = event.touches[0]?.clientX;
    if (typeof x !== "number") return;
    touchStartX.current = x;
    touchCurrentX.current = x;
  };

  const onMobileTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
    const x = event.touches[0]?.clientX;
    if (typeof x !== "number") return;
    touchCurrentX.current = x;
  };

  const onMobileTouchEnd = () => {
    if (touchStartX.current === null || touchCurrentX.current === null) return;
    const deltaX = touchCurrentX.current - touchStartX.current;

    if (Math.abs(deltaX) >= SWIPE_THRESHOLD) {
      if (deltaX < 0) moveNext();
      if (deltaX > 0) movePrev();
    }

    touchStartX.current = null;
    touchCurrentX.current = null;
  };

  const onDesktopCardClick =
    (relative: number) => (event: MouseEvent<HTMLElement>) => {
      if (relative < 0) {
        movePrev();
        return;
      }

      if (relative > 0) {
        moveNext();
        return;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const isLeftHalf = event.clientX - rect.left < rect.width / 2;
      if (isLeftHalf) movePrev();
      else moveNext();
    };

  return (
    <section id="servicios" data-scene="services" className="scene-panel border-b border-default bg-transparent">
      <div className="section-shell py-16 md:py-20">
        <div className="js-services-head scene-services-head mx-auto mb-10 max-w-4xl space-y-4 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl">
            Servicios de IA para tu empresa
          </h2>
          <p className="text-sm leading-7 text-muted md:text-base">
            Soluciones de IA diseñadas para aportar impacto real en tus procesos, desde asistentes
            inteligentes hasta automatización y analítica avanzada.
          </p>
        </div>

        <div className="md:hidden">
          <div
            className="relative mx-auto h-[31.5rem] w-full overflow-visible [perspective:1200px]"
            style={{ touchAction: "pan-y" }}
            onTouchStart={onMobileTouchStart}
            onTouchMove={onMobileTouchMove}
            onTouchEnd={onMobileTouchEnd}
            onTouchCancel={onMobileTouchEnd}
          >
            {services.map((service, index) => {
              const relative = getRelative(index);
              const visible = visibleIndexes.has(index);
              const style = visible ? getMobileCardStyle(relative) : getMobileCardStyle(99);

              return (
                <article
                  key={`mobile-${service.id}`}
                  style={style}
                  className="surface-card absolute left-1/2 top-0 flex h-[31rem] w-[min(88vw,23.5rem)] flex-col p-6 will-change-transform transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                >
                  <div className="relative z-10">
                    <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05]">
                      <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                    </div>

                    <div className="mb-3 text-xs font-medium tracking-[0.2em] text-secondary">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <h3 className="text-xl font-semibold tracking-tight text-primary">{service.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{service.shortDescription}</p>
                    <ul className="mt-5 space-y-3 text-sm text-muted">
                      {service.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="hidden md:block">
          <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2 overflow-visible">
            <div className="relative mx-auto h-[33rem] w-full max-w-[96rem] overflow-visible [perspective:1600px]">
              {services.map((service, index) => {
                const relative = getRelative(index);
                const visible = visibleIndexes.has(index);
                const isCenter = relative === 0;
                const isLeft = relative < 0;
                const style = visible ? getCardStyle(relative) : getCardStyle(99);

                return (
                  <article
                    key={service.id}
                    style={style}
                    onClick={onDesktopCardClick(relative)}
                    className="js-service-card scene-service-card surface-card absolute left-[50vw] top-0 flex h-[32rem] w-[clamp(26rem,44vw,32rem)] flex-col p-7 will-change-transform transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                    <div className="relative z-10 pointer-events-none">
                      <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05]">
                        <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                      </div>

                      <div className="mb-3 text-xs font-medium tracking-[0.2em] text-secondary">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <h3 className="text-2xl font-semibold tracking-tight text-primary">{service.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted">{service.shortDescription}</p>

                      <ul className="mt-6 space-y-3 text-sm text-muted">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2.5">
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-secondary" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
