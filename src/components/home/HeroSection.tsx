type HeroProps = {
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
};

export const HeroSection = ({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroProps) => {
  return (
    <section className="border-b border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-20 pt-16 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-6">
          <span className="inline-flex rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-100">
            Soluciones de IA para empresas
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
            {subtitle}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#contacto"
              className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-500/30 hover:bg-brand-600"
            >
              {primaryCta}
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-200 hover:border-slate-500"
            >
              {secondaryCta}
            </a>
          </div>
          <p className="text-xs text-slate-500">
            Evaluación inicial gratuita. Sin compromisos.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-brand-500/20 via-slate-900 to-emerald-500/20 p-[1px]">
            <div className="flex h-full flex-col justify-between rounded-3xl bg-slate-950 p-5">
              <div>
                <p className="text-xs text-slate-400">Panel de IA</p>
                <p className="mt-1 text-sm font-medium text-slate-100">
                  Visión general de tus procesos
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 px-3 py-2">
                  <div>
                    <p className="text-xs text-slate-400">Consultas automatizadas</p>
                    <p className="text-sm font-semibold text-emerald-400">-40% carga</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-emerald-500/20" />
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/60 px-3 py-2">
                  <div>
                    <p className="text-xs text-slate-400">Tiempo por proceso</p>
                    <p className="text-sm font-semibold text-emerald-400">-30% media</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-brand-500/20" />
                </div>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                Datos ficticios ilustrativos. Te ayudamos a construir tus propios
                cuadros de mando de IA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
