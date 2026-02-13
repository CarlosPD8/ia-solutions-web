// src/components/home/ServicesSection.tsx
"use client";

import { motion, type Variants } from "framer-motion";
import { Service } from "@/core/domain/service";

type Props = {
  services: Service[];
};

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 0.61, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export const ServicesSection = ({ services }: Props) => {
  return (
    <section id="servicios" className="border-b border-default bg-transparent">
      <motion.div
        className="mx-auto max-w-6xl px-4 py-14"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-primary">
            Servicios de IA para tu empresa
          </h2>
          <p className="max-w-2xl text-sm text-muted">
            Soluciones de IA diseñadas para aportar impacto real en tus
            procesos, desde asistentes inteligentes hasta automatización y
            analítica avanzada.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              className="card group relative flex h-full flex-col rounded-3xl p-4 transition-all hover:-translate-y-2 hover:border-[color:var(--color-secondary-400)] hover:shadow-[0_0_30px_rgba(31,107,255,0.25)]"
              variants={cardVariants}
            >
              {/* Panel interactivo superior */}
              <div className="mb-4 rounded-2xl border border-default bg-[color:var(--color-primary-900)] px-4 py-3 text-primary shadow-inner">
                {renderServicePreview(service.id)}
              </div>

              {/* Contenido textual */}
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

/* ========= PREVIEWS ANIMADOS POR SERVICIO ========= */

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

const AnalyticsPreview = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[11px] text-muted">
        <span>Analytics</span>
        <span className="text-secondary">+18%</span>
      </div>
      <div className="relative h-20 w-full">
        <div className="absolute inset-0 rounded-lg border border-default" />
        <svg className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)]">
          <polyline
            fill="none"
            stroke="rgba(31,107,255,0.8)"
            strokeWidth="1.5"
            points="0,40 30,32 60,36 90,20 120,26 150,12"
          />
        </svg>
        <motion.div
          className="absolute"
          style={{ left: "70%", top: "24%" }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          <div className="h-2 w-2 rounded-full bg-secondary" />
          <div className="h-5 w-5 rounded-full bg-[color:var(--color-secondary-500)]/40 blur-sm" />
        </motion.div>
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
