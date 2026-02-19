"use client";

import { Service } from "@/core/domain/service";

type ServicesAppleProps = {
  services: Service[];
};

export const ServicesApple = ({ services }: ServicesAppleProps) => {
  return (
    <section
      id="servicios"
      data-scene="services"
      className="scene-panel border-b border-default bg-transparent"
    >
      <div className="section-shell flex min-h-[100svh] items-center py-16 md:py-20">
        <div className="w-full space-y-10">
          <div className="scene-services-head space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-5xl">
              Servicios de IA para tu empresa
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-muted md:text-base">
              Soluciones de IA diseñadas para aportar impacto real en tus procesos, desde asistentes
              inteligentes hasta automatización y analítica avanzada.
            </p>
          </div>

          <div className="scene-services-track perspective-[1200px] grid gap-5 md:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.id}
                className="scene-service-card surface-card relative overflow-hidden p-6 will-change-transform"
                data-service-index={index}
              >
                <div className="absolute inset-0 bg-[linear-gradient(170deg,rgba(255,255,255,0.06),transparent_65%)]" />
                <div className="relative">
                  <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04]">
                    <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                  </div>

                  <div className="mb-3 text-xs font-medium tracking-[0.2em] text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <h3 className="text-[1.65rem] font-semibold tracking-tight text-primary md:text-[1.8rem]">
                    {service.title}
                  </h3>
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
