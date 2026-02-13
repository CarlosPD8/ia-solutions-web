// src/components/home/TestimonialsSection.tsx
"use client";

import { motion } from "framer-motion";
import { Testimonial } from "@/core/domain/testimonial";
import { enterBlurUp, stagger } from "@/components/motion/presets";

type Props = {
  testimonials: Testimonial[];
};

export const TestimonialsSection = ({ testimonials }: Props) => {
  return (
    <section id="testimonios" className="border-b border-default bg-transparent">
      <motion.div
        className="mx-auto max-w-6xl px-4 py-14"
        variants={stagger(0.08, 0.06)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div className="mb-8 space-y-3" variants={enterBlurUp}>
          <h2 className="text-2xl font-semibold tracking-tight text-primary">
            Lo que dicen nuestros clientes
          </h2>
          <p className="max-w-2xl text-sm text-muted">
            Resultados medibles aplicando IA de forma estratégica, no solo como
            una moda tecnológica.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <motion.article
              key={t.id}
              className="card group relative flex flex-col rounded-3xl p-6"
              variants={enterBlurUp}
            >
              <p className="text-sm italic text-primary">“{t.quote}”</p>
              <div className="mt-4 text-xs text-muted">
                <p className="font-semibold text-primary">{t.name}</p>
                <p>
                  {t.role}, {t.company}
                </p>
              </div>

              <div className="pointer-events-none absolute inset-x-4 bottom-0 h-9 translate-y-1 rounded-full bg-linear-to-t from-[color:var(--color-secondary-500)]/35 to-transparent opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
