"use client";

import { motion } from "framer-motion";

/**
 * Fondo con conexiones tipo "red neuronal":
 * - Base clara
 * - Red de líneas y nodos en SVG
 * - Nodos flotantes que dan sensación de movimiento
 */
export const NeuralBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-50">
      {/* Red principal en SVG */}
      <motion.svg
        className="absolute inset-0 h-full w-full opacity-80"
        viewBox="0 0 1440 900"
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
      >
        <defs>
          <linearGradient id="neural-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#22c55e" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="neural-node" r="1">
            <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#a7f3d0" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Conexiones principales */}
        <motion.path
          d="M120 200 L380 260 L620 180 L900 260 L1180 210"
          fill="none"
          stroke="url(#neural-line)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 10"
          animate={{ strokeDashoffset: [0, -40, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
        />
        <motion.path
          d="M200 480 L420 380 L680 420 L960 360 L1220 440"
          fill="none"
          stroke="url(#neural-line)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="3 9"
          animate={{ strokeDashoffset: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity }}
        />
        <motion.path
          d="M160 720 L420 640 L710 700 L980 640 L1260 720"
          fill="none"
          stroke="url(#neural-line)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 12"
          animate={{ strokeDashoffset: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
        />

        {/* Nodos estáticos */}
        {[
          [120, 200],
          [380, 260],
          [620, 180],
          [900, 260],
          [1180, 210],
          [200, 480],
          [420, 380],
          [680, 420],
          [960, 360],
          [1220, 440],
          [160, 720],
          [420, 640],
          [710, 700],
          [980, 640],
          [1260, 720],
        ].map(([x, y], i) => (
          <g key={`${x}-${y}-${i}`}>
            <circle cx={x} cy={y} r={3} fill="#22c55e" fillOpacity={0.95} />
            <circle
              cx={x}
              cy={y}
              r={16}
              fill="url(#neural-node)"
              opacity={0.9}
            />
          </g>
        ))}
      </motion.svg>

      {/* Nodos flotantes / partículas */}
      <FloatingNode className="left-[8%] top-[18%]" size={120} delay={0} />
      <FloatingNode className="left-[75%] top-[25%]" size={170} delay={3} />
      <FloatingNode className="left-[22%] top-[65%]" size={140} delay={1.5} />
      <FloatingNode className="left-[72%] top-[70%]" size={130} delay={4.5} />
    </div>
  );
};

type FloatingNodeProps = {
  className?: string;
  size: number;
  delay?: number;
};

const FloatingNode = ({
  className = "",
  size,
  delay = 0,
}: FloatingNodeProps) => {
  return (
    <motion.div
      className={`pointer-events-none absolute ${className}`}
      initial={{ opacity: 0.35, y: 0 }}
      animate={{ opacity: [0.3, 0.7, 0.3], y: [-12, 8, -12] }}
      transition={{
        duration: 18,
        delay,
        repeat: Infinity,
        ease: [0.22, 0.61, 0.36, 1],
      }}
    >
      <div
        className="rounded-full bg-emerald-200/50 blur-2xl"
        style={{ width: size, height: size }}
      />
      <div className="absolute inset-6 rounded-full border border-emerald-300/70 bg-emerald-50/60" />
      <div className="absolute inset-[35%] rounded-full bg-emerald-400/80 blur-md" />
    </motion.div>
  );
};
