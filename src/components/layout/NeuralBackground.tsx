// src/components/layout/NeuralBackground.tsx
"use client";

import { motion } from "framer-motion";

/**
 * Fondo "hex-grid" moderno, palpitante (respira) con líneas iluminadas
 * y trazos animados tipo circuito. Inspirado en la referencia.
 */
export const NeuralBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[color:var(--color-bg)]">
      {/* Haze base que "respira" */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(1200px 700px at 20% 70%, rgba(31,107,255,0.14) 0%, transparent 55%)," +
            "radial-gradient(900px 600px at 80% 30%, rgba(31,107,255,0.10) 0%, transparent 60%)," +
            "radial-gradient(800px 500px at 60% 85%, rgba(255,255,255,0.04) 0%, transparent 55%)",
        }}
      />

      {/* Capa de rejilla hexagonal (SVG) */}
      <motion.svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <defs>
          {/* Hex pattern */}
          <pattern
            id="hexPattern"
            width="72"
            height="62.3538"
            patternUnits="userSpaceOnUse"
            patternTransform="translate(0 0)"
          >
            <path
              d="M36 1 L71 19.1769 L71 43.1769 L36 61.3538 L1 43.1769 L1 19.1769 Z"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
            <path
              d="M36 1 L36 61.3538"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
            <path
              d="M1 19.1769 L71 43.1769"
              stroke="rgba(255,255,255,0.02)"
              strokeWidth="1"
            />
            <path
              d="M71 19.1769 L1 43.1769"
              stroke="rgba(255,255,255,0.02)"
              strokeWidth="1"
            />
          </pattern>

          {/* Glow (IMPORTANTE: values en una sola línea para evitar hydration mismatch) */}
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradiente animado para trazos */}
          <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(31,107,255,0.0)" />
            <stop offset="45%" stopColor="rgba(31,107,255,0.9)" />
            <stop offset="65%" stopColor="rgba(96,165,255,0.7)" />
            <stop offset="100%" stopColor="rgba(31,107,255,0.0)" />
          </linearGradient>

          {/* Viñeta */}
          <radialGradient id="vignette" r="1">
            <stop offset="55%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
          </radialGradient>

          {/* Máscara de fade inferior */}
          <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
            <stop offset="35%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.65)" />
            <stop offset="100%" stopColor="rgba(255,255,255,1)" />
          </linearGradient>
          <mask id="maskBottom">
            <rect width="1440" height="900" fill="url(#bottomFade)" />
          </mask>
        </defs>

        {/* Grid base */}
        <motion.rect
          width="1440"
          height="900"
          fill="url(#hexPattern)"
          opacity={0.9}
          animate={{ opacity: [0.55, 0.85, 0.55] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Capa oscura para profundidad */}
        <rect width="1440" height="900" fill="rgba(0,0,0,0.18)" />

        {/* Trazos luminosos (zona inferior) */}
        <g mask="url(#maskBottom)">
          <BreathingTraces />
        </g>

        {/* Viñeta */}
        <rect width="1440" height="900" fill="url(#vignette)" />
      </motion.svg>

      {/* Orbes flotantes */}
      <FloatingOrb className="left-[10%] top-[65%]" size={260} delay={0} />
      <FloatingOrb className="left-[72%] top-[20%]" size={320} delay={2.2} />
      <FloatingOrb className="left-[55%] top-[78%]" size={220} delay={1.1} />
    </div>
  );
};

const BreathingTraces = () => {
  return (
    <motion.g
      initial={{ opacity: 0.65 }}
      animate={{ opacity: [0.45, 0.95, 0.45] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <TracePath
        d="M120 690 L260 610 L400 690 L540 610 L680 690 L820 610 L960 690"
        w={2.4}
        dur={14}
      />
      <TracePath
        d="M260 780 L400 700 L540 780 L680 700 L820 780 L960 700 L1100 780"
        w={2.0}
        dur={16}
        delay={0.7}
      />
      <TracePath
        d="M60 820 L200 740 L340 820 L480 740 L620 820 L760 740 L900 820"
        w={1.8}
        dur={18}
        delay={1.2}
      />

      {[
        [260, 610],
        [400, 690],
        [540, 610],
        [680, 690],
        [820, 610],
        [960, 690],
        [400, 700],
        [680, 700],
        [960, 700],
        [200, 740],
        [480, 740],
        [760, 740],
      ].map(([x, y], i) => (
        <PulseNode key={`${x}-${y}-${i}`} x={x} y={y} delay={i * 0.12} />
      ))}
    </motion.g>
  );
};

const TracePath = ({
  d,
  w,
  dur,
  delay = 0,
}: {
  d: string;
  w: number;
  dur: number;
  delay?: number;
}) => {
  return (
    <g filter="url(#softGlow)">
      <path
        d={d}
        fill="none"
        stroke="rgba(31,107,255,0.18)"
        strokeWidth={w}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d={d}
        fill="none"
        stroke="url(#traceGrad)"
        strokeWidth={w}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="8 18"
        animate={{ strokeDashoffset: [0, -80] }}
        transition={{
          duration: dur,
          delay,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </g>
  );
};

const PulseNode = ({
  x,
  y,
  delay = 0,
}: {
  x: number;
  y: number;
  delay?: number;
}) => {
  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        r={2.6}
        fill="rgba(31,107,255,0.95)"
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{
          duration: 2.8,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.circle
        cx={x}
        cy={y}
        r={14}
        fill="rgba(31,107,255,0.18)"
        animate={{ r: [10, 18, 10], opacity: [0.12, 0.26, 0.12] }}
        transition={{
          duration: 3.2,
          delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </g>
  );
};

type FloatingOrbProps = {
  className?: string;
  size: number;
  delay?: number;
};

const FloatingOrb = ({ className = "", size, delay = 0 }: FloatingOrbProps) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0.25, y: 0, scale: 1 }}
      animate={{
        opacity: [0.18, 0.45, 0.18],
        y: [-10, 10, -10],
        scale: [0.98, 1.03, 0.98],
      }}
      transition={{
        duration: 10,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <div
        className="rounded-full blur-3xl"
        style={{
          width: size,
          height: size,
          background:
            "radial-gradient(circle at 30% 30%, rgba(96,165,255,0.28), rgba(31,107,255,0.12) 45%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-[18%] rounded-full"
        style={{
          border: "1px solid rgba(96,165,255,0.18)",
          background: "rgba(31,107,255,0.06)",
        }}
      />
    </motion.div>
  );
};
