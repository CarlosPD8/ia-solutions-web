"use client";

import { motion, type Variants } from "framer-motion";

type HeroProps = {
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
};

const container: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 0.61, 0.36, 1], // curva suave tipo "easeOut"
    },
  },
};

export const HeroSection = ({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroProps) => {
  return (
    <section className="border-b border-slate-200 bg-transparent">
      <motion.div
        className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-20 md:flex-row md:items-center md:justify-between"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Texto */}
        <div className="max-w-xl space-y-6">
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            Soluciones de IA para empresas
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            {subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-[0_18px_45px_rgba(16,185,129,0.35)] transition-colors hover:bg-emerald-600"
            >
              {primaryCta}
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/60 px-5 py-2.5 text-sm font-medium text-slate-800 shadow-sm transition-colors hover:border-slate-400"
            >
              {secondaryCta}
            </a>
          </div>
          <p className="text-xs text-slate-500">
            Evaluación inicial gratuita. Sin compromisos.
          </p>
        </div>

        {/* Tarjeta animada tipo panel */}
        <motion.div
          className="relative mx-auto w-full max-w-md"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            delay: 0.2,
            duration: 0.7,
            ease: [0.22, 0.61, 0.36, 1],
          }}
        >
          <div className="relative rounded-3xl border border-slate-200/80 bg-white/80 p-px shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
            <div className="rounded-3xl bg-linear-to-br from-slate-50 via-white to-emerald-50/60 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-medium text-slate-500">
                    Panel IA
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    Estado de tus procesos
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-emerald-100 ring-2 ring-emerald-400/40" />
              </div>

              {/* Métricas */}
              <div className="mt-6 space-y-3 text-xs">
                <Metric label="Speed" value="80%" />
                <Metric label="Coste" value="–35%" />
                <Metric label="Satisfacción" value="+25%" />
              </div>

              <p className="mt-4 text-[11px] text-slate-500">
                Datos ilustrativos. Diseñamos cuadros de mando a medida para tu
                empresa y tus indicadores clave.
              </p>
            </div>
          </div>

          {/* halo animado */}
          <motion.div
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-emerald-200/40 blur-3xl"
            animate={{
              opacity: [0.2, 0.5, 0.2],
              scale: [0.98, 1.02, 0.98],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div>
    <div className="mb-1 flex items-center justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
    <div className="h-1.5 w-full rounded-full bg-slate-200">
      <div className="h-full w-2/3 rounded-full bg-linear-to-t from-emerald-400 to-emerald-500" />
    </div>
  </div>
);
