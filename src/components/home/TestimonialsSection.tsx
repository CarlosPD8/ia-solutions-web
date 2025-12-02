"use client";

import { motion } from "framer-motion";
import { Testimonial } from "@/core/domain/testimonial";

type Props = {
  testimonials: Testimonial[];
};

export const TestimonialsSection = ({ testimonials }: Props) => {
  return (
    <motion.section
      id="testimonios"
      className="border-b border-slate-200 bg-transparent"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Lo que dicen nuestros clientes
          </h2>
          <p className="max-w-2xl text-sm text-slate-600">
            Resultados medibles aplicando IA de forma estratégica, no solo como
            una moda tecnológica.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, index) => (
            <motion.article
              key={t.id}
              className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: [0.22, 0.61, 0.36, 1],
              }}
            >
              <p className="text-sm italic text-slate-900">
                “{t.quote}”
              </p>
              <div className="mt-4 text-xs text-slate-600">
                <p className="font-semibold text-slate-900">{t.name}</p>
                <p>
                  {t.role}, {t.company}
                </p>
              </div>

              <div className="pointer-events-none absolute inset-x-4 bottom-0 h-9 translate-y-1 rounded-full bg-linear-to-t from-emerald-200/50 to-transparent opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
