"use client";

const metrics = [
  { label: "Speed", value: "80%", scale: 0.8 },
  { label: "Coste", value: "−35%", scale: 0.65 },
  { label: "Satisfacción", value: "+25%", scale: 0.72 },
];

export const MetricPanel = () => {
  return (
    <aside data-metric-panel className="surface-card relative overflow-hidden p-6 md:p-7">
      <div className="absolute inset-0 bg-[radial-gradient(380px_180px_at_88%_18%,rgba(43,111,255,0.18),transparent_68%)]" />
      <div className="relative">
        <h3 className="text-2xl font-semibold tracking-tight text-primary">Estado de tus procesos</h3>

        <div className="mt-6 space-y-5">
          {metrics.map((metric) => (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted">
                <span>{metric.label}</span>
                <span className="text-2xl leading-none tracking-tight text-primary">
                  {metric.value}
                </span>
              </div>
              <div className="relative h-1.5 overflow-hidden rounded-full bg-white/10">
                <div
                  data-metric-bar
                  data-target={metric.scale}
                  className="h-full origin-left scale-x-0 rounded-full bg-[linear-gradient(90deg,#7fb7ff,#2b6fff)] will-change-transform"
                />
                <div
                  data-metric-shimmer
                  className="absolute inset-0 -translate-x-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)] opacity-0"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.02] p-3">
          <svg
            data-metric-line
            viewBox="0 0 260 72"
            className="h-16 w-full text-blue-300/90"
            fill="none"
            aria-hidden="true"
          >
            <path d="M2 58 C 24 48, 36 50, 54 39 S 92 28, 116 34 S 156 49, 176 31 S 222 20, 258 12" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </aside>
  );
};
