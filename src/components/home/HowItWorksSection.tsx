type Step = { id: string; title: string; description: string };

type Props = {
  steps: Step[];
};

export const HowItWorksSection = ({ steps }: Props) => {
  return (
    <section
      id="como-funciona"
      className="border-b border-slate-800 bg-slate-950"
    >
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-50">
            Cómo trabajamos contigo
          </h2>
          <p className="max-w-2xl text-sm text-slate-300">
            Acompañamos todo el proceso para que la IA no se quede en una idea,
            sino en resultados medibles.
          </p>
        </div>
        <ol className="grid gap-4 md:grid-cols-4">
          {steps.map((step, idx) => (
            <li
              key={step.id}
              className="relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
            >
              <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-500/20 text-xs font-semibold text-brand-100">
                {idx + 1}
              </span>
              <h3 className="text-sm font-semibold text-slate-50">
                {step.title}
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
