"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  description: string;
  buttonText: string;
};

export const CtaSection = ({ title, description, buttonText }: Props) => {
  return (
    <motion.section
      id="contacto"
      className="bg-transparent pb-16 pt-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:flex md:items-center md:justify-between md:gap-8">
          {/* halo de luz */}
          <motion.div
            className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-emerald-200/60 blur-3xl"
            animate={{
              x: [0, 20, 0],
              y: [0, 10, -5],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <div className="relative space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              {title}
            </h2>
            <p className="max-w-xl text-sm text-slate-600">{description}</p>
          </div>

          <div className="relative mt-6 md:mt-0">
            <a
              href="/contacto"
              className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-medium text-white shadow-[0_18px_45px_rgba(16,185,129,0.35)] transition-colors hover:bg-emerald-600"
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
