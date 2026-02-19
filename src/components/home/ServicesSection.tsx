"use client";

import { useMemo, useState } from "react";
import { Service } from "@/core/domain/service";

type Props = {
  services: Service[];
};

export const ServicesSection = ({ services }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const total = services.length;

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

        <div className="space-y-4 md:hidden">
          {services.map((service, index) => (
            <article key={service.id} className="surface-card p-6">
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
            </article>
          ))}
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
                    className="js-service-card scene-service-card surface-card absolute left-[50vw] top-0 flex h-[32rem] w-[clamp(26rem,44vw,32rem)] flex-col p-7 will-change-transform transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  >
                    {!isCenter ? (
                      <button
                        type="button"
                        onClick={isLeft ? movePrev : moveNext}
                        aria-label="Cambiar tarjeta de servicio"
                        className="absolute inset-0 z-20 rounded-[inherit] cursor-pointer"
                      />
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={movePrev}
                          aria-label="Ir al servicio anterior"
                          className="absolute bottom-0 left-0 top-0 z-20 w-1/2 rounded-l-[inherit] cursor-w-resize"
                        />
                        <button
                          type="button"
                          onClick={moveNext}
                          aria-label="Ir al servicio siguiente"
                          className="absolute bottom-0 right-0 top-0 z-20 w-1/2 rounded-r-[inherit] cursor-e-resize"
                        />
                      </>
                    )}

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
