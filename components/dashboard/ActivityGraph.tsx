"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const points = [
  72, 80, 76, 88, 91, 84, 95, 93, 98, 94, 99, 97,
];

export default function ActivityGraph() {
  const max = Math.max(...points);

  return (
    <motion.section
      className="activityGraph"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .6 }}
    >
      <div className="activityGraph__header">
        <div>
          <span>AI ACTIVITY</span>
          <h4>Neural Decision Engine</h4>
        </div>

        <TrendingUp size={18} />
      </div>

      <div className="activityGraph__chart">
        {points.map((point, index) => (
          <motion.div
            key={index}
            className="activityGraph__bar"
            initial={{ height: 0 }}
            whileInView={{
              height: `${(point / max) * 100}%`,
            }}
            viewport={{ once: true }}
            transition={{
              delay: index * .05,
              duration: .6,
            }}
          />
        ))}
      </div>

      <div className="activityGraph__footer">
        <div>
          <strong>99.8%</strong>
          <span>Accuracy</span>
        </div>

        <div>
          <strong>18K+</strong>
          <span>Signals</span>
        </div>

        <div>
          <strong>42ms</strong>
          <span>Response</span>
        </div>
      </div>
    </motion.section>
  );
}