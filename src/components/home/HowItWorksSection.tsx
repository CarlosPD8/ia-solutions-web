"use client";

import { motion } from "framer-motion";

type Step = { id: string; title: string; description: string };

type Props = {
  steps: Step[];
};

export const HowItWorksSection = ({ steps }: Props) => {
  return (
    <motion.section
      id="como-funciona"
      className="border-b border-slate-200 bg-transparent"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Nuestro proceso
          </h2>
          <p className="max-w-2xl text-sm text-slate-600">
            Desde la primera llamada hasta la implantación y mejora continua. Un
            marco claro para aplicar IA en tu empresa con seguridad.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative flex flex-col rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-[0_16px_40px_rgba(15,23,42,0.05)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: index * 0.06,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-sm font-semibold text-slate-900">
                {step.title}
              </h3>
              <p className="mt-2 text-xs text-slate-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
