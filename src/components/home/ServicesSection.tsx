"use client";

import { motion } from "framer-motion";
import { Service } from "@/core/domain/service";

type Props = {
  services: Service[];
};

export const ServicesSection = ({ services }: Props) => {
  return (
    <section
      id="servicios"
      className="border-b border-slate-200 bg-transparent"
    >
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Servicios de IA para tu empresa
          </h2>
          <p className="max-w-2xl text-sm text-slate-600">
            Más que proyectos aislados: diseñamos soluciones de IA integradas en
            tu negocio, con foco en impacto real y retorno medible.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              className="group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-[0_22px_55px_rgba(15,23,42,0.08)] transition-all hover:-translate-y-2 hover:border-emerald-300 hover:shadow-[0_28px_70px_rgba(16,185,129,0.25)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              {/* Panel interactivo superior (oscuro) */}
              <div className="mb-4 rounded-2xl border border-emerald-500/30 bg-slate-950 px-4 py-3 text-emerald-50 shadow-inner">
                {renderServicePreview(service.id)}
              </div>

              {/* Contenido textual */}
              <div className="flex flex-1 flex-col">
                <div className="mb-2 flex items-center justify-between gap-2 text-xs text-slate-400">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>IA Service</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs text-slate-600">
                  {service.shortDescription}
                </p>

                <ul className="mt-4 space-y-1.5 text-xs text-slate-500">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-2">
                      <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-emerald-400 group-hover:bg-emerald-500" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

/* --------- PREVIEWS ANIMADOS POR SERVICIO --------- */

function renderServicePreview(serviceId: string) {
  if (serviceId === "chatbots") return <ChatbotPreview />;
  if (serviceId === "automation") return <AutomationPreview />;
  if (serviceId === "analytics") return <AnalyticsPreview />;

  return <DefaultPreview />;
}

const ChatbotPreview = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>Asistente IA</span>
        <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-200">
          Online
        </span>
      </div>
      <div className="space-y-2">
        <motion.div
          className="inline-flex max-w-[80%] rounded-2xl bg-slate-800 px-3 py-1.5 text-[11px]"
          animate={{ y: [-2, 2, -2] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          “¿Cómo podemos automatizar las consultas repetitivas?”
        </motion.div>
        <motion.div
          className="ml-auto inline-flex max-w-[80%] rounded-2xl bg-emerald-500 px-3 py-1.5 text-[11px] text-slate-950"
          animate={{ y: [2, -2, 2] }}
          transition={{
            duration: 4,
            delay: 1,
            repeat: Infinity,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          Diseñamos un chatbot entrenado con tus procesos y FAQs.
        </motion.div>
      </div>
    </div>
  );
};

const AutomationPreview = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>Pipeline</span>
        <span>Ops</span>
      </div>
      <div className="space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-14 text-[10px] text-slate-500">
              {i === 0 ? "Input" : i === 1 ? "IA Flow" : "Output"}
            </span>
            <div className="relative h-1.5 flex-1 rounded-full bg-slate-800">
              <motion.div
                className="absolute left-0 top-0 h-1.5 rounded-full bg-emerald-400"
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
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>Analytics</span>
        <span className="text-emerald-300">+18%</span>
      </div>
      <div className="relative h-20 w-full">
        {/* Ejes */}
        <div className="absolute inset-0 rounded-lg border border-slate-800/70" />
        {/* Línea principal */}
        <svg className="absolute inset-2 h-[calc(100%-16px)] w-[calc(100%-16px)]">
          <polyline
            fill="none"
            stroke="rgba(52,211,153,0.8)"
            strokeWidth="1.5"
            points="0,40 30,32 60,36 90,20 120,26 150,12"
          />
        </svg>
        {/* Punto que late */}
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
          <div className="h-2 w-2 rounded-full bg-emerald-400" />
          <div className="h-5 w-5 rounded-full bg-emerald-400/40 blur-sm" />
        </motion.div>
      </div>
      <p className="text-[11px] text-slate-400">
        Modelos que transforman datos en decisiones claras para tu equipo.
      </p>
    </div>
  );
};

const DefaultPreview = () => {
  return (
    <div className="flex h-[92px] items-center justify-center text-[11px] text-slate-400">
      Vista previa de servicio
    </div>
  );
};
