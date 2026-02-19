"use client";

import { motion } from "framer-motion";
import { enterUp } from "@/components/motion/presets";

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
        <motion.div variants={enterUp} className="surface-card relative overflow-hidden p-8 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(540px_220px_at_10%_10%,rgba(31,107,255,0.22),transparent_58%)]" />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-primary md:text-4xl">
                {title}
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-muted md:text-base">{description}</p>
            </div>

            <a
              href="https://wa.me/34670294712?text=Hola%20quiero%20información%20sobre%20una%20solución%20con%20IA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-apple-primary focus-ring px-6 py-3 text-sm font-medium"
            >
              {buttonText}
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
