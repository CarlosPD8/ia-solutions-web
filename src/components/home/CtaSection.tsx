"use client";

import { motion } from "framer-motion";
import { enterUp } from "@/components/motion/presets";

const CALENDLY_URL = "https://calendly.com/avancia-avanciatech/30min";

type Props = {
  title: string;
  description: string;
  buttonText: string;
};

export const CtaSection = ({ title, description, buttonText }: Props) => {
  return (
    <section id="contacto" className="bg-transparent pb-16 pt-8 md:pb-20">
      <motion.div
        className="section-shell"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={enterUp} className="surface-card relative overflow-hidden p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(700px_340px_at_8%_8%,rgba(26,98,255,0.26),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(500px_260px_at_92%_92%,rgba(120,70,240,0.14),transparent_60%)]" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="space-y-4 md:max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/[0.07] px-3.5 py-1.5 text-xs font-medium text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                Oferta limitada
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-4xl lg:text-[2.6rem] lg:leading-[1.1]">
                {title}
              </h2>
              <p className="text-sm leading-7 text-muted md:text-base">{description}</p>
            </div>

            <div className="flex flex-col items-start gap-4 md:items-end md:shrink-0">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-apple-primary focus-ring w-full px-8 py-3.5 text-center text-sm font-semibold md:w-auto"
              >
                {buttonText}
              </a>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted">
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 text-emerald-400" fill="none" aria-hidden="true">
                    <path d="M10 3 4.5 8.5 2 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Sin compromiso
                </span>
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 text-emerald-400" fill="none" aria-hidden="true">
                    <path d="M10 3 4.5 8.5 2 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Respuesta en 24h
                </span>
                <span className="flex items-center gap-1.5">
                  <svg viewBox="0 0 12 12" className="h-3 w-3 shrink-0 text-emerald-400" fill="none" aria-hidden="true">
                    <path d="M10 3 4.5 8.5 2 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  100% gratuita
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
