// src/components/home/ServicesSection.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import { Service } from "@/core/domain/service";
import { enterBlurUp, stagger } from "@/components/motion/presets";

type Props = {
  services: Service[];
};

const containerVariants: Variants = stagger(0.08, 0.06);

const cardEnter: Variants = enterBlurUp;

export const ServicesSection = ({ services }: Props) => {
  return (
    <section id="servicios" className="border-b border-default bg-transparent">
      <motion.div
        className="mx-auto max-w-6xl px-4 py-14"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div className="mb-8 space-y-3" variants={cardEnter}>
          <h2 className="text-2xl font-semibold tracking-tight text-primary">
            Servicios de IA para tu empresa
          </h2>
          <p className="max-w-2xl text-sm text-muted">
            Soluciones de IA diseñadas para aportar impacto real en tus
            procesos, desde asistentes inteligentes hasta automatización y
            analítica avanzada.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              className="card group relative flex h-full flex-col rounded-3xl p-4 transition-all hover:-translate-y-2 hover:border-[color:var(--color-secondary-400)] hover:shadow-[0_0_30px_rgba(31,107,255,0.25)]"
              variants={cardEnter}
            >
              {/* Panel interactivo superior (INTACTO) */}
              <div className="mb-4 rounded-2xl border border-default bg-[color:var(--color-primary-900)] px-4 py-3 text-primary shadow-inner">
                {renderServicePreview(service.id)}
              </div>

              {/* Contenido textual (INTACTO) */}
              <div className="flex flex-1 flex-col">
                <div className="mb-2 flex items-center justify-between gap-2 text-xs text-muted">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>IA Service</span>
                </div>
                <h3 className="text-sm font-semibold text-primary">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs text-muted">
                  {service.shortDescription}
                </p>

                <ul className="mt-4 space-y-1.5 text-xs text-muted">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-secondary group-hover:bg-[color:var(--color-secondary-400)]" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

/* ========= PREVIEWS (INTACTOS) ========= */

function renderServicePreview(serviceId: string) {
  if (serviceId === "chatbots") return <ChatbotPreview />;
  if (serviceId === "automation") return <AutomationPreview />;
  if (serviceId === "analytics") return <AnalyticsPreview />;
  return <DefaultPreview />;
}

const ChatbotPreview = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-[11px] text-muted">
        <span>Asistente IA</span>
        <span className="rounded-full bg-[color:var(--color-secondary-500)]/15 px-2 py-0.5 text-[10px] text-secondary">
          Online
        </span>
      </div>
      <div className="space-y-2">
        <motion.div
          className="inline-flex max-w-[80%] rounded-2xl bg-[color:var(--color-primary-700)] px-3 py-1.5 text-[11px] text-primary"
          animate={{ y: [-2, 2, -2] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          “¿Cómo automatizamos las consultas repetitivas?”
        </motion.div>
        <motion.div
          className="ml-auto inline-flex max-w-[80%] rounded-2xl bg-secondary px-3 py-1.5 text-[11px] text-white"
          animate={{ y: [2, -2, 2] }}
          transition={{
            duration: 4,
            delay: 1,
            repeat: Infinity,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          Diseñamos un chatbot entrenado con tu negocio.
        </motion.div>
      </div>
    </div>
  );
};

const AutomationPreview = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[11px] text-muted">
        <span>Pipeline</span>
        <span>Ops</span>
      </div>
      <div className="space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-14 text-[10px] text-muted">
              {i === 0 ? "Input" : i === 1 ? "IA Flow" : "Output"}
            </span>
            <div className="relative h-1.5 flex-1 rounded-full bg-[color:var(--color-primary-700)]">
              <motion.div
                className="absolute left-0 top-0 h-1.5 rounded-full bg-secondary"
                style={{ width: "60%" }}
                animate={{ x: [0, "40%", 0] }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Tu AnalyticsPreview NUEVO (INTACTO) */
const AnalyticsPreview = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[11px] text-muted">
        <span>Analytics</span>
        <span className="text-secondary">+18%</span>
      </div>

      <div className="relative grid h-20 grid-cols-[1fr_72px] gap-3">
        <div className="relative overflow-hidden rounded-xl border border-default bg-[color:var(--color-primary-900)]/70 p-2">
          <div className="absolute inset-0 opacity-70">
            <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:16px_16px]" />
          </div>

          <div className="relative h-full">
            <div className="absolute bottom-1 left-1 right-1 flex items-end gap-1">
              {[10, 18, 14, 24, 20, 30, 26].map((v, i) => (
                <motion.div
                  key={i}
                  className="w-full rounded-sm bg-[color:var(--color-secondary-500)]/25"
                  style={{ height: `${v}px` }}
                  animate={{ opacity: [0.45, 0.8, 0.45] }}
                  transition={{
                    duration: 3.6,
                    delay: i * 0.12,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <svg className="relative h-full w-full">
              <path
                d="M6 54 C 24 48, 34 50, 50 40 S 82 34, 98 26 S 122 30, 136 18"
                fill="none"
                stroke="rgba(31,107,255,0.55)"
                strokeWidth="1.6"
              />
              <motion.path
                d="M6 54 C 24 48, 34 50, 50 40 S 82 34, 98 26 S 122 30, 136 18"
                fill="none"
                stroke="rgba(96,165,255,0.95)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeDasharray="10 14"
                animate={{ strokeDashoffset: [0, -80] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
            </svg>

            <motion.div
              className="pointer-events-none absolute -inset-6 opacity-50"
              animate={{ opacity: [0.18, 0.42, 0.18] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(220px 80px at 70% 30%, rgba(31,107,255,0.22), transparent 60%)",
              }}
            />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-default bg-[color:var(--color-primary-900)]/70 p-2">
          <div className="flex h-full flex-col items-center justify-center">
            <div className="relative h-10 w-10">
              <svg viewBox="0 0 36 36" className="h-full w-full">
                <path
                  d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
                  fill="none"
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth="3.2"
                />
                <motion.path
                  d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32"
                  fill="none"
                  stroke="rgba(96,165,255,0.95)"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  strokeDasharray="78 100"
                  animate={{ strokeDasharray: ["62 100", "78 100", "62 100"] }}
                  transition={{
                    duration: 4.4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </svg>
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{ opacity: [0.15, 0.4, 0.15] }}
                transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
                style={{ boxShadow: "0 0 22px rgba(31,107,255,0.35)" }}
              />
            </div>
            <div className="mt-1 text-[10px] font-medium text-primary">CTR</div>
            <div className="text-[10px] text-secondary">+18%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DefaultPreview = () => {
  return (
    <div className="flex h-[92px] items-center justify-center text-[11px] text-muted">
      Vista previa de servicio
    </div>
  );
};
