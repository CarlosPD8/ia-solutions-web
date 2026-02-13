// src/components/motion/presets.ts
export const easeApple: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export const enterBlurUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeApple },
  },
};

export const enterBlur = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: easeApple },
  },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0.05) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});
