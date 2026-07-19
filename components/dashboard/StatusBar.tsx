"use client";

import { ShieldCheck, Globe2, Server, Activity } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    icon: ShieldCheck,
    value: "99.98%",
    label: "Protection",
  },
  {
    icon: Server,
    value: "18,742",
    label: "Assets",
  },
  {
    icon: Globe2,
    value: "4",
    label: "Regions",
  },
  {
    icon: Activity,
    value: "LIVE",
    label: "Status",
  },
];

export default function StatusBar() {
  return (
    <motion.div
      className="dashboardStatus"
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .6 }}
    >
      <div className="dashboardStatus__left">
        <span className="dashboardStatus__dot" />

        <div>
          <small>GLOBAL STATUS</small>

          <strong>All Systems Operational</strong>
        </div>
      </div>

      <div className="dashboardStatus__stats">
        {stats.map(({ icon: Icon, value, label }) => (
          <motion.div
            key={label}
            className="dashboardStatus__card"
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
          >
            <Icon size={18} />

            <div>
              <strong>{value}</strong>

              <span>{label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}