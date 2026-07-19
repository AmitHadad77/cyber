"use client";

import { motion } from "framer-motion";

type HeroMetricsProps = {
  prefersReducedMotion: boolean;
};

export default function HeroMetrics({
  prefersReducedMotion,
}: HeroMetricsProps) {
  return (
    <>
      <motion.div
        className="aetherMetric aetherMetric--top"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, -7, 0],
              }
        }
        transition={{
          duration: 4.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="aetherMetric__header">
          <span className="aetherMetric__indicator" />
          LIVE ANALYSIS
        </div>

        <div className="aetherMetric__value">
          <strong>2.4M</strong>
          <span>events/sec</span>
        </div>

        <div className="aetherMetric__graph" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </motion.div>

      <motion.div
        className="aetherMetric aetherMetric--bottom"
        animate={
          prefersReducedMotion
            ? undefined
            : {
                y: [0, 7, 0],
              }
        }
        transition={{
          duration: 5,
          delay: 0.3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="aetherMetric__header">
          <span className="aetherMetric__shield">✓</span>
          THREAT CONTAINED
        </div>

        <div className="aetherMetric__value">
          <strong>38ms</strong>
          <span>response time</span>
        </div>

        <div className="aetherMetric__progress" aria-hidden="true">
          <span />
        </div>
      </motion.div>
    </>
  );
}