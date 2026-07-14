"use client";

import { useEffect, useMemo, useState } from "react";

type LoaderPhase = "checking" | "running" | "leaving" | "hidden";

const stages = [
  { at: 0, text: "מאתחל ליבת הגנה" },
  { at: 20, text: "מחבר סוכנים אוטונומיים" },
  { at: 42, text: "סורק תשתיות ענן" },
  { at: 64, text: "טוען מודיעין איומים" },
  { at: 82, text: "מאמת שכבות הגנה" },
  { at: 100, text: "המערכת פעילה" },
];

const STORAGE_KEY = "aether-preloader-seen";
const LOADER_DURATION = 2400;

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<LoaderPhase>("checking");

  const currentStage = useMemo(() => {
    return (
      [...stages]
        .reverse()
        .find((stage) => progress >= stage.at) ?? stages[0]
    );
  }, [progress]);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(STORAGE_KEY);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /*
     * בזמן רענון:
     * הקומפוננטה מתחילה ב-checking ומחזירה null.
     * לכן לא רואים הבזק של 0%.
     */
    if (alreadySeen || reducedMotion) {
      setPhase("hidden");
      return;
    }

    setPhase("running");

    document.documentElement.classList.add("preloader-active");
    document.body.classList.add("preloader-visible");

    const startedAt = performance.now();
    let animationFrame = 0;

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startedAt;
      const linearProgress = Math.min(elapsed / LOADER_DURATION, 1);

      /*
       * התקדמות טבעית:
       * מהירה יחסית בהתחלה ואיטית מעט לקראת 100%.
       */
      const easedProgress = 1 - Math.pow(1 - linearProgress, 2.4);
      const nextProgress = Math.min(
        100,
        Math.round(easedProgress * 100)
      );

      setProgress(nextProgress);

      if (linearProgress < 1) {
        animationFrame = requestAnimationFrame(updateProgress);
        return;
      }

      setProgress(100);

      window.setTimeout(() => {
        setPhase("leaving");

        window.setTimeout(() => {
          sessionStorage.setItem(STORAGE_KEY, "true");

          document.documentElement.classList.remove(
            "preloader-active"
          );

          document.body.classList.remove("preloader-visible");

          setPhase("hidden");

          /*
           * אומר לאתר שהפתיח הסתיים.
           * אפשר להשתמש בזה בהמשך להפעלת אנימציית Hero.
           */
          window.dispatchEvent(
            new CustomEvent("aether-preloader-complete")
          );
        }, 900);
      }, 450);
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);

      document.documentElement.classList.remove(
        "preloader-active"
      );

      document.body.classList.remove("preloader-visible");
    };
  }, []);

  /*
   * גם בזמן הבדיקה הראשונית לא מציגים שום דבר.
   * זה פותר את הבזק ה-0% ברענון.
   */
  if (phase === "checking" || phase === "hidden") {
    return null;
  }

  const isLeaving = phase === "leaving";
  const isOnline = progress === 100;

  return (
    <div
      className={`aether-loader ${
        isLeaving ? "aether-loader--leaving" : ""
      }`}
      role="status"
      aria-live="polite"
      aria-label={`טעינת האתר: ${progress} אחוז`}
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

        <div className="aether-loader__counter">
          <span>{String(progress).padStart(3, "0")}</span>
          <small>%</small>
        </div>

        <div className="aether-loader__status">
          <span className={isOnline ? "is-online" : ""} />
          <strong>{currentStage.text}</strong>
        </div>

        <div className="aether-loader__bar" aria-hidden="true">
          <span
            style={{
              transform: `scaleX(${progress / 100})`,
            }}
          />
        </div>

        <div
          className="aether-loader__telemetry"
          aria-hidden="true"
        >
          <div>
            <span>NODE</span>
            <strong>AE-07</strong>
          </div>

          <div>
            <span>LATENCY</span>
            <strong>
              {Math.max(
                12,
                58 - Math.floor(progress / 2)
              )}
              ms
            </strong>
          </div>

          <div>
            <span>STATUS</span>

            <strong className={isOnline ? "is-online" : ""}>
              {isOnline ? "ONLINE" : "BOOT"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}