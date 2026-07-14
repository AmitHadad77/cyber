"use client";

import { useEffect, useMemo, useState } from "react";

const stages = [
  { at: 0, text: "מאתחל ליבת הגנה" },
  { at: 20, text: "מחבר סוכנים אוטונומיים" },
  { at: 42, text: "סורק תשתיות ענן" },
  { at: 64, text: "טוען מודיעין איומים" },
  { at: 82, text: "מאמת שכבות הגנה" },
  { at: 100, text: "המערכת פעילה" },
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [hidden, setHidden] = useState(false);

  const stage = useMemo(() => {
    return (
      [...stages].reverse().find((item) => progress >= item.at) ?? stages[0]
    );
  }, [progress]);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const alreadySeen = sessionStorage.getItem("aether-preloader-seen");

    if (alreadySeen || reduceMotion) {
      setHidden(true);
      return;
    }

    document.documentElement.classList.add("preloader-active");

    let current = 0;

    const timer = window.setInterval(() => {
      const remaining = 100 - current;

      const step =
        current < 45
          ? Math.ceil(Math.random() * 5)
          : current < 80
            ? Math.ceil(Math.random() * 3)
            : Math.max(1, Math.ceil(remaining * 0.14));

      current = Math.min(100, current + step);
      setProgress(current);

      if (current >= 100) {
        window.clearInterval(timer);

        window.setTimeout(() => {
          setLeaving(true);

          window.setTimeout(() => {
            sessionStorage.setItem("aether-preloader-seen", "true");
            document.documentElement.classList.remove("preloader-active");
            setHidden(true);
          }, 1150);
        }, 650);
      }
    }, 48);

    return () => {
      window.clearInterval(timer);
      document.documentElement.classList.remove("preloader-active");
    };
  }, []);

  if (hidden) {
    return null;
  }

  return (
    <div
      className={`aether-loader ${
        leaving ? "aether-loader--leaving" : ""
      }`}
      aria-live="polite"
      aria-label="האתר נטען"
    >
      <div className="aether-loader__noise" aria-hidden="true" />
      <div className="aether-loader__grid" aria-hidden="true" />
      <div className="aether-loader__scan" aria-hidden="true" />

      <div
        className="aether-loader__aurora aether-loader__aurora--one"
        aria-hidden="true"
      />

      <div
        className="aether-loader__aurora aether-loader__aurora--two"
        aria-hidden="true"
      />

      <div className="aether-loader__shell">
        <div className="aether-core" aria-hidden="true">
          <span className="aether-core__ring aether-core__ring--outer" />
          <span className="aether-core__ring aether-core__ring--middle" />
          <span className="aether-core__ring aether-core__ring--inner" />
          <span className="aether-core__pulse" />
          <span className="aether-core__letter">A</span>
        </div>

        <div className="aether-loader__brand">
          <span>AI AETHER</span>
          <small>מערכת הגנה אוטונומית</small>
        </div>

        <div
          className="aether-loader__counter"
          aria-label={`${progress} אחוז`}
        >
          <span>{String(progress).padStart(3, "0")}</span>
          <small>%</small>
        </div>

        <div className="aether-loader__status">
          <span className={progress === 100 ? "is-online" : ""} />
          <strong>{stage.text}</strong>
        </div>

        <div className="aether-loader__bar" aria-hidden="true">
          <span
            style={{
              transform: `scaleX(${progress / 100})`,
            }}
          />
        </div>

        <div className="aether-loader__telemetry" aria-hidden="true">
          <div>
            <span>NODE</span>
            <strong>AE-07</strong>
          </div>

          <div>
            <span>LATENCY</span>
            <strong>
              {Math.max(12, 58 - Math.floor(progress / 2))}ms
            </strong>
          </div>

          <div>
            <span>STATUS</span>
            <strong className={progress === 100 ? "is-online" : ""}>
              {progress === 100 ? "ONLINE" : "BOOT"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}