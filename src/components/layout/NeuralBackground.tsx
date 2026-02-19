"use client";

import { motion, useReducedMotion } from "framer-motion";

export const NeuralBackground = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[radial-gradient(1200px_560px_at_25%_0%,rgba(31,107,255,0.24),transparent_60%),radial-gradient(980px_520px_at_85%_20%,rgba(96,165,255,0.14),transparent_64%),linear-gradient(180deg,#0c1220_0%,#080d16_100%)]">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.7 }}
        animate={
          reduceMotion
            ? { opacity: 0.75 }
            : {
                opacity: [0.68, 0.86, 0.68],
              }
        }
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }
        style={{
          background:
            "radial-gradient(650px 320px at 50% 0%, rgba(255,255,255,0.08), transparent 72%)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 h-[34vh] bg-gradient-to-t from-black/15 to-transparent" />
    </div>
  );
};
