"use client";

import { useEffect, useRef, useState } from "react";

type LoaderPhase = "checking" | "running" | "leaving" | "hidden";

type LoaderStage = {
  at: number;
  text: string;
};

const STORAGE_KEY = "aether-preloader-seen";
const LOADER_DURATION_MS = 2400;
const COMPLETE_HOLD_MS = 420;
const EXIT_DURATION_MS = 900;

const stages: readonly LoaderStage[] = [
  { at: 0, text: "מאתחל ליבת הגנה" },
  { at: 20, text: "מחבר סוכנים אוטונומיים" },
  { at: 42, text: "סורק תשתיות ענן" },
  { at: 64, text: "טוען מודיעין איומים" },
  { at: 82, text: "מאמת שכבות הגנה" },
  { at: 100, text: "המערכת פעילה" },
];

function getStage(progress: number): LoaderStage {
  for (let index = stages.length - 1; index >= 0; index -= 1) {
    if (progress >= stages[index].at) {
      return stages[index];
    }
  }

  return stages[0];
}

function readSessionValue(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSessionValue(key: string, value: string): void {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // האתר ממשיך לעבוד גם כאשר אחסון הדפדפן חסום.
  }
}

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<LoaderPhase>("checking");

  const animationFrameRef = useRef<number | null>(null);
  const holdTimeoutRef = useRef<number | null>(null);
  const exitTimeoutRef = useRef<number | null>(null);
  const previousProgressRef = useRef(-1);
  const completedRef = useRef(false);

  useEffect(() => {
    const root = document.documentElement;

    const bootstrapDecision = root.dataset.aetherLoader;
    const alreadySeen =
      bootstrapDecision === "skip" ||
      readSessionValue(STORAGE_KEY) === "true";

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (alreadySeen || reducedMotion) {
      root.dataset.aetherLoader = "skip";
      root.classList.remove("preloader-active");
      root.removeAttribute("aria-busy");
      setPhase("hidden");
      return;
    }

    /*
     * שומרים מיד כדי שרענון במהלך האנימציה
     * לא יפעיל את הפתיח פעם נוספת.
     */
    writeSessionValue(STORAGE_KEY, "true");

    root.dataset.aetherLoader = "show";
    root.classList.add("preloader-active");
    root.setAttribute("aria-busy", "true");

    document.body.classList.add("preloader-visible");
    setPhase("running");

    const startedAt = performance.now();

    const finishLoader = () => {
      if (completedRef.current) {
        return;
      }

      completedRef.current = true;
      setProgress(100);

      holdTimeoutRef.current = window.setTimeout(() => {
        setPhase("leaving");

        exitTimeoutRef.current = window.setTimeout(() => {
          root.dataset.aetherLoader = "skip";
          root.classList.remove("preloader-active");
          root.removeAttribute("aria-busy");

          document.body.classList.remove("preloader-visible");

          setPhase("hidden");

          window.dispatchEvent(
            new CustomEvent("aether-preloader-complete")
          );
        }, EXIT_DURATION_MS);
      }, COMPLETE_HOLD_MS);
    };

    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startedAt;
      const linearProgress = Math.min(
        elapsed / LOADER_DURATION_MS,
        1
      );

      /*
       * התקדמות מהירה בתחילה ואיטית לקראת הסוף.
       */
      const easedProgress =
        1 - Math.pow(1 - linearProgress, 2.4);

      const nextProgress = Math.min(
        100,
        Math.round(easedProgress * 100)
      );

      /*
       * לא גורמים ל-React לבצע רינדור נוסף
       * כאשר המספר המוצג לא השתנה.
       */
      if (nextProgress !== previousProgressRef.current) {
        previousProgressRef.current = nextProgress;
        setProgress(nextProgress);
      }

      if (linearProgress >= 1) {
        finishLoader();
        return;
      }

      animationFrameRef.current =
        window.requestAnimationFrame(updateProgress);
    };

    animationFrameRef.current =
      window.requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(
          animationFrameRef.current
        );
      }

      if (holdTimeoutRef.current !== null) {
        window.clearTimeout(holdTimeoutRef.current);
      }

      if (exitTimeoutRef.current !== null) {
        window.clearTimeout(exitTimeoutRef.current);
      }

      root.classList.remove("preloader-active");
      root.removeAttribute("aria-busy");

      document.body.classList.remove("preloader-visible");
    };
  }, []);

  if (phase === "checking" || phase === "hidden") {
    return null;
  }

  const currentStage = getStage(progress);
  const isOnline = progress >= 100;
  const isLeaving = phase === "leaving";

  return (
    <div
      className={[
        "aether-loader",
        isLeaving ? "aether-loader--leaving" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      role="status"
      aria-label="אתחול מערכת ההגנה"
    >
      <div
        className="aether-loader__noise"
        aria-hidden="true"
      />

      <div
        className="aether-loader__grid"
        aria-hidden="true"
      />

      <div
        className="aether-loader__scan"
        aria-hidden="true"
      />

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
          aria-hidden="true"
        >
          <span>{String(progress).padStart(3, "0")}</span>
          <small>%</small>
        </div>

        <div
          className="aether-loader__status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className={isOnline ? "is-online" : ""} />

          <strong>{currentStage.text}</strong>
        </div>

        <div
          className="aether-loader__bar"
          aria-hidden="true"
        >
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