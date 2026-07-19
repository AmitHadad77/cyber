"use client";

import { useEffect, useMemo, useState } from "react";
import { BellRing, CheckCircle2, ShieldAlert, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type NotificationItem = {
  id: number;
  time: string;
  title: string;
  description: string;
  type: "success" | "warning" | "info";
};

const notifications: NotificationItem[] = [
  {
    id: 1,
    time: "08:42",
    title: "Threat blocked",
    description: "Suspicious identity chain was contained automatically.",
    type: "success",
  },
  {
    id: 2,
    time: "08:43",
    title: "Policy updated",
    description: "A new cloud access policy was synchronized globally.",
    type: "info",
  },
  {
    id: 3,
    time: "08:44",
    title: "Privilege anomaly",
    description: "Unusual admin behavior is currently under analysis.",
    type: "warning",
  },
  {
    id: 4,
    time: "08:45",
    title: "Identity verified",
    description: "High-risk authentication was verified successfully.",
    type: "success",
  },
];

function getIcon(type: NotificationItem["type"]) {
  if (type === "success") {
    return CheckCircle2;
  }

  if (type === "warning") {
    return ShieldAlert;
  }

  return Sparkles;
}

export default function LiveNotifications() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % notifications.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  const visibleNotifications = useMemo(() => {
    return notifications.map((_, offset) => {
      const index = (activeIndex + offset) % notifications.length;
      return notifications[index];
    });
  }, [activeIndex]);

  return (
    <motion.section
      className="liveNotifications"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
      aria-labelledby="live-notifications-title"
    >
      <header className="liveNotifications__header">
        <div>
          <span className="liveNotifications__eyebrow">
            <BellRing size={14} aria-hidden="true" />
            LIVE NOTIFICATIONS
          </span>

          <h4 id="live-notifications-title">Security activity</h4>
        </div>

        <div className="liveNotifications__status">
          <i aria-hidden="true" />
          STREAMING
        </div>
      </header>

      <div className="liveNotifications__list">
        <AnimatePresence initial={false} mode="popLayout">
          {visibleNotifications.slice(0, 3).map((item, index) => {
            const Icon = getIcon(item.type);

            return (
              <motion.article
                key={item.id}
                className={`liveNotifications__item is-${item.type}`}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{
                  opacity: index === 0 ? 1 : 0.64,
                  y: 0,
                  scale: index === 0 ? 1 : 0.985,
                }}
                exit={{ opacity: 0, y: -16, scale: 0.97 }}
                transition={{ duration: 0.38 }}
              >
                <div className="liveNotifications__icon">
                  <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                </div>

                <div className="liveNotifications__content">
                  <div>
                    <strong>{item.title}</strong>
                    <time>{item.time}</time>
                  </div>

                  <p>{item.description}</p>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="liveNotifications__footer">
        <span>{notifications.length} recent events</span>
        <strong>No critical alerts</strong>
      </div>
    </motion.section>
  );
}