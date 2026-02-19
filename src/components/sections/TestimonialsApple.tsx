"use client";

import { Testimonial } from "@/core/domain/testimonial";

type TestimonialsAppleProps = {
  testimonials: Testimonial[];
};

export const TestimonialsApple = ({ testimonials }: TestimonialsAppleProps) => {
  const companies = Array.from(new Set(testimonials.map((item) => item.company)));

  return (
    <section
      id="testimonios"
      data-scene="testimonials"
      className="scene-panel border-b border-default bg-transparent"
    >
      <div className="section-shell flex min-h-[100svh] items-center py-16 md:py-20">
        <div className="w-full space-y-10">
          <div className="scene-testimonials-head space-y-4">
            <h2 className="text-3xl font-semibold tracking-tight text-primary md:text-5xl">
              Lo que dicen nuestros clientes
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-muted md:text-base">
              Resultados medibles aplicando IA de forma estratégica, no solo como una moda tecnológica.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <article
                key={testimonial.id}
                data-testimonial-card
                className="surface-card relative overflow-hidden p-6 md:p-7"
              >
                <div className="absolute inset-0 bg-[linear-gradient(170deg,rgba(255,255,255,0.06),transparent_70%)]" />
                <div className="relative">
                  <p className="text-2xl leading-9 tracking-tight text-primary">“{testimonial.quote}”</p>
                  <div className="mt-6 text-sm text-muted">
                    <p className="text-base font-semibold text-primary">{testimonial.name}</p>
                    <p>
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
            {companies.map((company) => (
              <span
                key={company}
                data-company-pill
                className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5"
              >
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
