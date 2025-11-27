import { Testimonial } from "@/core/domain/testimonial";

type Props = {
  testimonials: Testimonial[];
};

export const TestimonialsSection = ({ testimonials }: Props) => {
  return (
    <section
      id="testimonios"
      className="border-b border-slate-800 bg-slate-950/80"
    >
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50">
            Lo que dicen nuestros clientes
          </h2>
          <p className="max-w-2xl text-sm text-slate-300">
            Trabajamos con equipos que quieren aplicar la IA con sentido
            estratégico, no solo por tendencia.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <article
              key={t.id}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <p className="text-sm italic text-slate-100">
                “{t.quote}”
              </p>
              <div className="mt-4 text-xs text-slate-400">
                <p className="font-semibold text-slate-100">{t.name}</p>
                <p>
                  {t.role}, {t.company}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
