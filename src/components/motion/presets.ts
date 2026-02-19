import type { Variants } from "framer-motion";
//a
export const easeApple: [number, number, number, number] = [0.22, 0.61, 0.36, 1];

export const enterUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: easeApple },
  },
};

export const enterFade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.64, ease: easeApple },
  },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0.05): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});
