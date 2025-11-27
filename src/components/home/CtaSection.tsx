type Props = {
  title: string;
  description: string;
  buttonText: string;
};

export const CtaSection = ({ title, description, buttonText }: Props) => {
  return (
    <section
      id="contacto"
      className="bg-gradient-to-r from-brand-500/10 via-slate-950 to-emerald-500/10"
    >
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-slate-800 bg-slate-950/80 p-8 md:flex-row md:items-center">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-50">
              {title}
            </h2>
            <p className="max-w-xl text-sm text-slate-300">{description}</p>
          </div>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-brand-500/30 hover:bg-brand-600"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
};
