"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const MOTION_EASE = [0.16, 1, 0.3, 1] as const;

const METRIC_UPDATE_INTERVAL_MS = 2200;

function createLatency(): number {
  return 38 + Math.floor(Math.random() * 8);
}

function createResolutionRate(): number {
  return Number((98 + Math.random()).toFixed(1));
}

export default function Hero() {
  const prefersReducedMotion = Boolean(useReducedMotion());

  const [latency, setLatency] = useState(42);
  const [resolved, setResolved] = useState(98.7);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let timer: ReturnType<typeof window.setInterval> | null = null;

    const updateMetrics = () => {
      setLatency(createLatency());
      setResolved(createResolutionRate());
    };

    const stopTimer = () => {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    };

    const startTimer = () => {
      stopTimer();

      if (document.visibilityState === "visible") {
        timer = window.setInterval(
          updateMetrics,
          METRIC_UPDATE_INTERVAL_MS
        );
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startTimer();
      } else {
        stopTimer();
      }
    };

    startTimer();

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      stopTimer();

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [prefersReducedMotion]);

  const fadeUpInitial = prefersReducedMotion
    ? false
    : {
        opacity: 0,
        y: 16,
      };

  const objectInitial = prefersReducedMotion
    ? false
    : {
        opacity: 0,
        scale: 0.96,
        y: 20,
      };

  const textMaskInitial = prefersReducedMotion
    ? false
    : {
        y: "110%",
      };

  return (
    <section
      className="hero"
      id="top"
      aria-labelledby="hero-title"
      aria-describedby="hero-description"
    >
      <div className="heroGrid" aria-hidden="true" />
      <div className="aurora a" aria-hidden="true" />
      <div className="aurora b" aria-hidden="true" />

      <div className="container heroLayout">
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
            סביבת הדגמה פעילה
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
                אבטחת ענן שמבינה
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
                ופועלת בזמן אמת.
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
            מערכת הגנת ענן אוטונומית שמזהה חריגות,
            מחברת את ההקשר ומפעילה תגובה מדויקת בזמן
            אמת — לפני שהאיום הופך לנזק עסקי.
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
            <a className="button primary" href="#contact">
              תיאום הדגמה
            </a>

            <a className="button secondary" href="#story">
              גלו את הסיפור
            </a>
          </motion.div>

          <motion.div
            className="trustStrip"
            initial={
              prefersReducedMotion
                ? false
                : {
                    opacity: 0,
                  }
            }
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 0.7,
            }}
            aria-label="יכולות המוצגות בסביבת ההדגמה"
          >
            <span>SOC 2 READY</span>
            <span>ISO 27001 READY</span>
            <span>MULTI-CLOUD</span>
          </motion.div>
        </div>

        <motion.div
          className="heroObject"
          initial={objectInitial}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: MOTION_EASE,
          }}
        >
          <div className="aiCore" aria-hidden="true">
            <div className="aiCore__halo aiCore__halo--outer" />
            <div className="aiCore__halo aiCore__halo--middle" />
            <div className="aiCore__halo aiCore__halo--inner" />

            <div className="aiCore__beam aiCore__beam--one" />
            <div className="aiCore__beam aiCore__beam--two" />

            <div className="aiCore__shell">
              <div className="aiCore__energy" />
              <div className="aiCore__letter">A</div>
            </div>

            <span className="aiCore__node aiCore__node--one" />
            <span className="aiCore__node aiCore__node--two" />
            <span className="aiCore__node aiCore__node--three" />
          </div>

          <motion.div
            className="heroCard top"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, -7, 0],
                  }
            }
            transition={{
              duration: 4.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <strong>{latency}ms</strong>
            <span>זמן תגובת הדגמה</span>
          </motion.div>

          <motion.div
            className="heroCard bottom"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, 7, 0],
                  }
            }
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.35,
            }}
          >
            <strong>{resolved}%</strong>
            <span>פתרון אוטונומי מדומה</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}