"use client";

import { useEffect, useMemo, useRef } from "react";
import { getGsap } from "@/lib/gsap";
import { useReducedMotionSafe } from "@/hooks/useReducedMotionSafe";

const metrics = [
  { label: "Velocidad", value: "80%", scale: 0.8 },
  { label: "Coste", value: "−35%", scale: 0.65 },
  { label: "Satisfacción", value: "+25%", scale: 0.72 },
];

export const MetricPanel = () => {
  const reduceMotion = useReducedMotionSafe();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const barRefs = useRef<HTMLDivElement[]>([]);
  const lineRef = useRef<SVGPathElement | null>(null);
  const areaRef = useRef<SVGPathElement | null>(null);
  const pointRefs = useRef<SVGCircleElement[]>([]);

  const chart = useMemo(() => {
    const width = 320;
    const height = 132;
    const paddingX = 24;
    const paddingY = 16;
    const pointsRaw = [
      { cost: 26, productivity: 22 },
      { cost: 34, productivity: 33 },
      { cost: 45, productivity: 46 },
      { cost: 56, productivity: 58 },
      { cost: 68, productivity: 71 },
      { cost: 78, productivity: 83 },
      { cost: 88, productivity: 93 },
    ];
    const stepX = (width - paddingX * 2) / (pointsRaw.length - 1);

    const points = pointsRaw.map((point, index) => {
      const x = paddingX + index * stepX;
      const normalized = point.productivity / 100;
      const y = height - paddingY - normalized * (height - paddingY * 2);
      return { x, y };
    });

    const line = createSmoothPath(points);
    const area = `${line} L ${points[points.length - 1]?.x ?? width - paddingX} ${height - paddingY} L ${
      points[0]?.x ?? paddingX
    } ${height - paddingY} Z`;

    return { width, height, points, line, area };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const modules = await getGsap();
      if (!modules || !rootRef.current) return;

      const { gsap } = modules;
      const ctx = gsap.context(() => {
        gsap.set(barRefs.current, { scaleX: 0, transformOrigin: "left center" });

        gsap.to(barRefs.current, {
          scaleX: (i: number) => metrics[i]?.scale ?? 0.5,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 78%",
            once: true,
          },
        });

        if (lineRef.current) {
          const lineLength = lineRef.current.getTotalLength();
          gsap.set(lineRef.current, {
            strokeDasharray: lineLength,
            strokeDashoffset: lineLength,
            opacity: 0.9,
          });
          gsap.to(lineRef.current, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 78%",
              once: true,
            },
          });
        }

        if (areaRef.current) {
          gsap.fromTo(
            areaRef.current,
            { opacity: 0, y: 8 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: rootRef.current,
                start: "top 78%",
                once: true,
              },
            },
          );
        }

        gsap.fromTo(
          pointRefs.current,
          { opacity: 0, scale: 0.55, transformOrigin: "center center" },
          {
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "back.out(1.8)",
            stagger: 0.07,
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top 78%",
              once: true,
            },
          },
        );
      }, rootRef);

      cleanup = () => ctx.revert();
    })();

    return () => cleanup?.();
  }, [reduceMotion]);

  return (
    <aside ref={rootRef} className="surface-card p-6">
      <h3 className="text-2xl font-semibold tracking-tight text-primary">Estado de tus procesos</h3>
      <div className="mt-6 space-y-5">
        {metrics.map((metric, index) => (
          <div key={metric.label}>
            <div className="mb-2 flex items-center justify-between text-sm text-muted">
              <span>{metric.label}</span>
              <span className="text-xl tracking-tight text-primary">{metric.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10">
              <div
                ref={(node) => {
                  if (!node) return;
                  barRefs.current[index] = node;
                }}
                className="h-1.5 rounded-full bg-[linear-gradient(90deg,#60a5ff,#2563ff)] will-change-transform"
                style={{ transform: reduceMotion ? `scaleX(${metric.scale})` : "scaleX(0)" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
        <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-muted">
          <span>Coste</span>
          <span>Productividad</span>
        </div>
        <svg
          viewBox={`0 0 ${chart.width} ${chart.height}`}
          className="h-32 w-full"
          role="img"
          aria-label="Gráfica de coste frente productividad"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="metric-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#5ea7ff" />
              <stop offset="100%" stopColor="#1f6bff" />
            </linearGradient>
            <linearGradient id="metric-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(63,134,255,0.54)" />
              <stop offset="55%" stopColor="rgba(43,117,255,0.22)" />
              <stop offset="100%" stopColor="rgba(31,107,255,0.04)" />
            </linearGradient>
          </defs>

          {[20, 40, 60, 80].map((v) => (
            <line
              key={v}
              x1="20"
              x2={chart.width}
              y1={chart.height - (chart.height * v) / 100 + 2}
              y2={chart.height - (chart.height * v) / 100 + 2}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
          ))}

          <line x1="20" x2="20" y1="8" y2={chart.height - 10} stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          <line
            x1="20"
            x2={chart.width - 4}
            y1={chart.height - 10}
            y2={chart.height - 10}
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />

          <path
            ref={areaRef}
            d={chart.area}
            fill="url(#metric-area)"
            opacity={reduceMotion ? 1 : 0}
            className={reduceMotion ? "opacity-100" : ""}
          />
          <path
            ref={lineRef}
            d={chart.line}
            fill="none"
            stroke="url(#metric-line)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ filter: "drop-shadow(0 0 6px rgba(62,134,255,0.35))" }}
          />

          {chart.points.map((point, index) => (
            <g key={`${point.x}-${point.y}`}>
              <circle
                cx={point.x}
                cy={point.y}
                r="5"
                fill="rgba(42,112,255,0.18)"
            className={reduceMotion ? "opacity-100" : "opacity-0"}
          />
              <circle
                ref={(node) => {
                  if (!node) return;
                  pointRefs.current[index] = node;
                }}
                cx={point.x}
                cy={point.y}
                r="2.8"
                fill="#e6f1ff"
                stroke="#2a7bff"
                strokeWidth="1.4"
                className={reduceMotion ? "opacity-100" : "opacity-0"}
              />
            </g>
          ))}
        </svg>
      </div>
    </aside>
  );
};

function createSmoothPath(points: Array<{ x: number; y: number }>) {
  if (points.length < 2) return "";
  if (points.length === 2) return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    const prev = points[index - 1] ?? current;
    const afterNext = points[index + 2] ?? next;

    const control1X = current.x + (next.x - prev.x) / 6;
    const control1Y = current.y + (next.y - prev.y) / 6;
    const control2X = next.x - (afterNext.x - current.x) / 6;
    const control2Y = next.y - (afterNext.y - current.y) / 6;

    path += ` C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${next.x} ${next.y}`;
  }

  return path;
}
