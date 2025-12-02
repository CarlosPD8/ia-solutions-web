"use client";

import { motion, type Variants } from "framer-motion";
import { Service } from "@/core/domain/service";

type Props = {
  services: Service[];
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
};

export const ServicesSection = ({ services }: Props) => {
  return (
    <motion.section
      id="servicios"
      className="border-b border-slate-200 bg-transparent"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Servicios de IA para tu empresa
          </h2>
          <p className="max-w-2xl text-sm text-slate-600">
            Soluciones enfocadas en impacto real: automatización, asistentes
            inteligentes y analítica con modelos de IA de última generación.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              className="group relative flex h-full flex-col rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-1.5 hover:border-emerald-300 hover:shadow-[0_24px_60px_rgba(16,185,129,0.25)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              <div className="mb-3 flex items-center justify-between gap-2 text-xs text-slate-400">
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
              <ul className="mt-4 space-y-2 text-xs text-slate-500">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2">
                    <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-emerald-400 group-hover:bg-emerald-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="pointer-events-none absolute inset-x-4 bottom-0 h-10 translate-y-1 rounded-full bg-linear-to-t from-emerald-200/40 to-transparent opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
