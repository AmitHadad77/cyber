"use client";

import { motion } from "framer-motion";

type Props = {
  prefersReducedMotion: boolean;
};

export default function HeroLighting({
  prefersReducedMotion,
}: Props) {
  return (
    <div
      className="heroLighting"
      aria-hidden="true"
    >
      <motion.div
        className="heroLighting__ambient"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                scale: [1, 1.08, 1],
                opacity: [0.8, 1, 0.8],
              }
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="heroLighting__cyan"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [-20, 25, -20],
                y: [-15, 10, -15],
              }
        }
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="heroLighting__violet"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                x: [20, -25, 20],
                y: [15, -10, 15],
              }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="heroLighting__noise" />
      <div className="heroLighting__vignette" />
    </div>
  );
}