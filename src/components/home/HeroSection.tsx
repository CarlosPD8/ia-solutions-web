// src/components/home/HeroSection.tsx
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
    <section className="border-b border-default bg-transparent">
      <motion.div
        className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-20 md:flex-row md:items-center md:justify-between"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Texto */}
        <div className="max-w-xl space-y-6">
          <span className="inline-flex rounded-full border border-default bg-[color:var(--color-bg-soft)]/60 px-3 py-1 text-xs font-medium text-secondary">
            Soluciones de IA para empresas
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="text-sm leading-relaxed text-muted sm:text-base">
            {subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#contacto"
              className="btn-primary inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium"
            >
              {primaryCta}
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center rounded-full border border-default bg-[color:var(--color-bg-soft)]/50 px-5 py-2.5 text-sm font-medium text-primary shadow-sm transition-colors hover:border-[color:var(--color-secondary-400)]"
            >
              {secondaryCta}
            </a>
          </div>
          <p className="text-xs text-muted">
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
          <div className="card relative rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] font-medium text-muted">Panel IA</p>
                <p className="text-sm font-semibold text-primary">
                  Estado de tus procesos
                </p>
              </div>
              <div className="h-8 w-8 rounded-full bg-[color:var(--color-secondary-500)]/20 ring-2 ring-[color:var(--color-secondary-500)]/40" />
            </div>

            {/* Métricas */}
            <div className="mt-6 space-y-3 text-xs">
              <Metric label="Speed" value="80%" />
              <Metric label="Coste" value="–35%" />
              <Metric label="Satisfacción" value="+25%" />
            </div>

            <p className="mt-4 text-[11px] text-muted">
              Datos ilustrativos. Diseñamos cuadros de mando a medida para tu
              empresa y tus indicadores clave.
            </p>
          </div>

          {/* halo animado */}
          <motion.div
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-[color:var(--color-secondary-500)]/25 blur-3xl"
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
      <span className="text-muted">{label}</span>
      <span className="font-medium text-primary">{value}</span>
    </div>
    <div className="h-1.5 w-full rounded-full bg-[color:var(--color-primary-600)]">
      <div className="h-full w-2/3 rounded-full bg-secondary" />
    </div>
  </div>
);
