// src/components/home/CtaSection.tsx
"use client";

import { motion } from "framer-motion";
import { enterBlurUp } from "@/components/motion/presets";

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
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          className="card relative overflow-hidden rounded-3xl p-8 md:flex md:items-center md:justify-between md:gap-8"
          variants={enterBlurUp}
        >
          {/* halo de luz (INTACTO) */}
          <motion.div
            className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-[color:var(--color-secondary-500)]/35 blur-3xl"
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
            <h2 className="text-2xl font-semibold tracking-tight text-primary">
              {title}
            </h2>
            <p className="max-w-xl text-sm text-muted">{description}</p>
          </div>

          <div className="relative mt-6 md:mt-0">
            <a
              href="https://wa.me/34670294712?text=Hola%20quiero%20información%20sobre%20una%20solución%20de%20IA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium"
            >
              {buttonText}
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
