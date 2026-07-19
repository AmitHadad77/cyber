"use client";

import { motion } from "framer-motion";

const regions = [
  {
    name: "North America",
    risk: 18,
    status: "LOW",
  },
  {
    name: "Europe",
    risk: 32,
    status: "MEDIUM",
  },
  {
    name: "Middle East",
    risk: 11,
    status: "LOW",
  },
  {
    name: "Asia Pacific",
    risk: 57,
    status: "HIGH",
  },
];

export default function ThreatHeatmap() {
  return (
    <motion.section
      className="threatHeatmap"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .6 }}
    >
      <div className="threatHeatmap__header">
        <div>
          <span>GLOBAL THREAT MAP</span>
          <h4>Regional Risk Levels</h4>
        </div>

        <strong>LIVE</strong>
      </div>

      <div className="threatHeatmap__grid">
        {regions.map((region) => (
          <motion.div
            key={region.name}
            className="threatHeatmap__card"
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
          >
            <span>{region.name}</span>

            <div className="threatHeatmap__progress">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{
                  width: `${region.risk}%`,
                }}
                viewport={{ once: true }}
                transition={{ duration: .8 }}
              />
            </div>

            <footer>
              <strong>{region.risk}%</strong>
              <small>{region.status}</small>
            </footer>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}