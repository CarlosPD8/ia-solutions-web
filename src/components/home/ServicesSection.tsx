import { Service } from "@/core/domain/service";

type Props = {
  services: Service[];
};

export const ServicesSection = ({ services }: Props) => {
  return (
    <section
      id="servicios"
      className="border-b border-slate-800 bg-slate-950/60"
    >
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50">
            Servicios de Inteligencia Artificial para tu empresa
          </h2>
          <p className="max-w-2xl text-sm text-slate-300">
            Empezamos siempre desde tu contexto y tus objetivos. Nada de
            experimentos sin retorno: proyectos con impacto real en negocio.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-5"
            >
              <h3 className="text-sm font-semibold text-slate-50">
                {service.title}
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                {service.shortDescription}
              </p>
              <ul className="mt-3 space-y-1 text-xs text-slate-400">
                {service.benefits.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-brand-500" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
