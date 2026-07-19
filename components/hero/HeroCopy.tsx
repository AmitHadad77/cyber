"use client";

import { motion } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

type HeroCopyProps = {
  prefersReducedMotion: boolean;
};

export default function HeroCopy({
  prefersReducedMotion,
}: HeroCopyProps) {
  const fadeUpInitial = prefersReducedMotion
    ? false
    : {
        opacity: 0,
        y: 16,
      };

  const textMaskInitial = prefersReducedMotion
    ? false
    : {
        y: "110%",
      };

  return (
    <div className="heroCopy">
      <motion.div
        className="status"
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                y: 12,
              }
        }
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.15,
          duration: 0.65,
          ease: MOTION_EASE,
        }}
      >
        <i aria-hidden="true" />
        ניטור אוטונומי פעיל
      </motion.div>

      <h1 id="hero-title">
        <span className="mask">
          <motion.span
            initial={textMaskInitial}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              ease: MOTION_EASE,
            }}
          >
            מזהים את האיום
          </motion.span>
        </span>

        <span className="mask">
          <motion.span
            className="gradient"
            initial={textMaskInitial}
            animate={{ y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: MOTION_EASE,
            }}
          >
            לפני שהוא הופך לאירוע.
          </motion.span>
        </span>
      </h1>

      <motion.p
        id="hero-description"
        initial={fadeUpInitial}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.25,
          duration: 0.7,
          ease: MOTION_EASE,
        }}
      >
        Aether מנתחת פעילות בענן בזמן אמת, מתעדפת סיכונים
        ומפעילה תגובה אוטונומית לפני שהנזק העסקי מתחיל.
      </motion.p>

      <motion.div
        className="heroActions"
        initial={fadeUpInitial}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.35,
          duration: 0.7,
          ease: MOTION_EASE,
        }}
      >
        <Magnetic strength={0.22}>
          <a
            className="button primary"
            href="#contact"
            data-cursor="button"
            data-cursor-label="צפייה"
          >
            צפו במערכת בפעולה
          </a>
        </Magnetic>

        <Magnetic strength={0.14}>
          <a
            className="button secondary"
            href="#story"
            data-cursor="link"
            data-cursor-label="גלו"
          >
            איך Aether פועלת
          </a>
        </Magnetic>
      </motion.div>

      <motion.div
        className="trustStrip"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.7,
        }}
        aria-label="יכולות המערכת"
      >
        <span>REAL-TIME DETECTION</span>
        <span>AUTONOMOUS RESPONSE</span>
        <span>MULTI-CLOUD</span>
      </motion.div>
    </div>
  );
}