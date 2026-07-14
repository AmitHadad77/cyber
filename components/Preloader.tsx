"use client";

import { useEffect, useState } from "react";

const systemMessages = [
  "מאתחל מנוע הגנה אוטונומי",
  "מחבר סוכני בינה מלאכותית",
  "סורק תשתיות ענן",
  "טוען מודיעין איומים",
  "מערכת ההגנה מוכנה",
];

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // אל תציג שוב את הפתיח באותה לשונית.
    const alreadyViewed = sessionStorage.getItem("aether-preloader-viewed");

    if (alreadyViewed) {
      setProgress(100);
      setIsFinished(true);
      return;
    }

    let currentProgress = 0;

    const interval = window.setInterval(() => {
      // התקדמות מהירה בהתחלה ואיטית מעט לקראת הסוף.
      const remaining = 100 - currentProgress;
      const increment = Math.max(1, Math.ceil(remaining * 0.075));

      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        window.clearInterval(interval);

        window.setTimeout(() => {
          setIsFinished(true);
          sessionStorage.setItem("aether-preloader-viewed", "true");
        }, 550);
      }
    }, 45);

    return () => window.clearInterval(interval);
  }, []);

  const messageIndex = Math.min(
    systemMessages.length - 1,
    Math.floor(progress / 20)
  );

  if (isFinished) {
    return null;
  }

  return (
    <div
      className={`cyber-preloader ${
        progress === 100 ? "cyber-preloader--complete" : ""
      }`}
      aria-label="האתר נטען"
      aria-live="polite"
    >
      <div className="cyber-preloader__background" aria-hidden="true">
        <div className="cyber-preloader__grid" />
        <div className="cyber-preloader__glow cyber-preloader__glow--violet" />
        <div className="cyber-preloader__glow cyber-preloader__glow--blue" />
        <div className="cyber-preloader__scan" />
      </div>

      <div className="cyber-preloader__content">
        <div className="cyber-preloader__logo" aria-hidden="true">
          <span>A</span>
          <div className="cyber-preloader__orbit" />
        </div>

        <p className="cyber-preloader__brand">AI AETHER</p>

        <div className="cyber-preloader__percentage">
          <span>{progress}</span>
          <small>%</small>
        </div>

        <p className="cyber-preloader__status">
          {systemMessages[messageIndex]}
          <span className="cyber-preloader__dots" aria-hidden="true">
            ...
          </span>
        </p>

        <div className="cyber-preloader__track" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>

        <div className="cyber-preloader__footer">
          <span>מערכת הגנה אוטונומית</span>

          <span
            className={
              progress === 100
                ? "cyber-preloader__online"
                : "cyber-preloader__offline"
            }
          >
            <i />
            {progress === 100 ? "המערכת פעילה" : "מתבצע אתחול"}
          </span>
        </div>
      </div>
    </div>
  );
}