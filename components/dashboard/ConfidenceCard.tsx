"use client";

import { motion } from "framer-motion";
import { Activity } from "lucide-react";

const confidence = 99.2;

export default function ConfidenceCard() {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (circumference * confidence) / 100;

  return (
    <motion.section
      className="confidenceCard"
      initial={{ opacity: 0, scale: .95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: .6 }}
    >
      <div className="confidenceCard__header">
        <div>
          <span>AI DECISION ENGINE</span>
          <h4>Confidence Score</h4>
        </div>

        <Activity size={20} />
      </div>

      <div className="confidenceCard__circle">

        <svg viewBox="0 0 140 140">

          <circle
            cx="70"
            cy="70"
            r={radius}
          />

          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            className="confidenceCard__progress"
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            style={{
              strokeDasharray: circumference,
            }}
          />

        </svg>

        <div>

          <strong>{confidence}%</strong>

          <span>Accuracy</span>

        </div>

      </div>

      <div className="confidenceCard__stats">

        <div>
          <strong>18K+</strong>
          <span>Signals</span>
        </div>

        <div>
          <strong>42ms</strong>
          <span>Latency</span>
        </div>

        <div>
          <strong>AUTO</strong>
          <span>Mode</span>
        </div>

      </div>

    </motion.section>
  );
}