"use client";

import { MetricPanel } from "@/components/ui/MetricPanel";

type Step = {
  id: string;
  title: string;
  description: string;
};

type ProcessAppleProps = {
  steps: Step[];
};

export const ProcessApple = ({ steps }: ProcessAppleProps) => {
  return (
    <section
      id="como-funciona"
      data-scene="process"
      className="scene-panel border-b border-default bg-transparent"
    >
      <div className="section-shell flex min-h-[100svh] items-center py-16 md:py-20">
        <div className="w-full space-y-10">
          <div className="scene-process-head space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-5xl">
              Cómo trabajamos contigo
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-muted md:text-base">
              Un proceso claro de principio a fin: desde entender tu contexto hasta acompañarte en la
              mejora continua de las soluciones de IA.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.18fr_0.82fr] lg:items-start">
            <div className="surface-card relative overflow-hidden p-6 md:p-8">
              <div className="absolute left-10 top-14 bottom-14 w-px bg-gradient-to-b from-white/35 via-white/12 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-18 bg-[radial-gradient(500px_120px_at_35%_100%,rgba(43,111,255,0.18),transparent_72%)]" />

              <div className="relative space-y-5">
                {steps.map((step, index) => (
                  <article
                    key={step.id}
                    data-process-step
                    className="scene-process-step rounded-2xl border border-white/10 bg-white/[0.04] p-4 will-change-transform"
                  >
                    <div className="flex items-start gap-4">
                      <span
                        data-step-dot
                        className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-[11px] font-semibold text-primary"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[1.7rem] font-semibold leading-tight tracking-tight text-primary">
                          {step.title}
                        </h3>
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
      </div>
    </section>
  );
};
