"use client";

import { useEffect, useRef } from "react";

type TimelineState = "active" | "processing" | "secured";

type TimelineItem = {
  number: string;
  label: string;
  title: string;
  description: string;
  state: TimelineState;
  status: string;
  latency: string;
  confidence: string;
  decision: string;
  signals: string[];
  log: Array<{
    time: string;
    action: string;
    result: string;
  }>;
};

const timelineItems: TimelineItem[] = [
  {
    number: "01",
    label: "SENSE",
    title: "חישה רציפה של סביבת הארגון",
    description:
      "Aether ממפה זהויות, שירותים, תעבורה והתנהגות בזמן אמת — ומזהה שינוי קטן עוד לפני שהוא הופך לאירוע אבטחה.",
    state: "active",
    status: "LIVE",
    latency: "8ms",
    confidence: "94.8%",
    decision: "Anomaly detected",
    signals: ["Identity", "API", "Cloud", "Network"],
    log: [
      { time: "00:00.008", action: "Behavior baseline", result: "Loaded" },
      { time: "00:00.014", action: "Privilege drift", result: "Detected" },
      { time: "00:00.021", action: "Context enrichment", result: "Complete" },
    ],
  },
  {
    number: "02",
    label: "REASON",
    title: "ניתוח הקשר ומסלול התקיפה",
    description:
      "מנוע ההסקה מחבר בין אותות מפוזרים, בוחן השפעה עסקית ומחשב את מסלול התקיפה הסביר ביותר — במקום להציף את הצוות בהתראות.",
    state: "processing",
    status: "CORRELATING",
    latency: "14ms",
    confidence: "98.4%",
    decision: "Attack path confirmed",
    signals: ["Behavior", "Policy", "Risk", "Assets"],
    log: [
      { time: "00:00.036", action: "Signals correlated", result: "14 linked" },
      { time: "00:00.049", action: "Blast radius", result: "Calculated" },
      { time: "00:00.061", action: "Risk model", result: "Critical" },
    ],
  },
  {
    number: "03",
    label: "ACT",
    title: "תגובה מדויקת עם שליטה אנושית",
    description:
      "המערכת מבודדת את האיום, מבטלת הרשאות ומייצרת תיעוד מלא. כל פעולה כפופה למדיניות הארגון וניתנת לאישור או לביקורת.",
    state: "secured",
    status: "MITIGATED",
    latency: "18ms",
    confidence: "99.2%",
    decision: "Threat contained",
    signals: ["Contain", "Revoke", "Verify", "Audit"],
    log: [
      { time: "00:00.074", action: "Session revoked", result: "Complete" },
      { time: "00:00.081", action: "Credential rotation", result: "Complete" },
      { time: "00:00.093", action: "Audit evidence", result: "Stored" },
    ],
  },
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let context: { revert: () => void } | undefined;
    let cancelled = false;

    async function setupAnimations() {
      const [{ default: gsap }, scrollTriggerModule] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled || !sectionRef.current) return;

      const ScrollTrigger =
        scrollTriggerModule.ScrollTrigger ?? scrollTriggerModule.default;

      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        gsap.fromTo(
          ".aetherTimeline__progress",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".aetherTimeline__flow",
              start: "top 72%",
              end: "bottom 62%",
              scrub: 1,
            },
          },
        );

        const rows = gsap.utils.toArray<HTMLElement>(".aetherTimeline__row");

        rows.forEach((row) => {
          const card = row.querySelector(".aetherTimeline__card");
          const consolePanel = row.querySelector(".aetherTimeline__console");
          const node = row.querySelector(".aetherTimeline__node");
          const bars = row.querySelectorAll(".aetherTimeline__meterFill");

          gsap.fromTo(
            row,
            { opacity: 0.28, y: 76 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: row,
                start: "top 84%",
                end: "center 58%",
                scrub: 0.8,
              },
            },
          );

          if (card) {
            gsap.fromTo(
              card,
              { opacity: 0, x: 40, rotateY: -4 },
              {
                opacity: 1,
                x: 0,
                rotateY: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 74%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }

          if (consolePanel) {
            gsap.fromTo(
              consolePanel,
              { opacity: 0, x: -40, rotateY: 4 },
              {
                opacity: 1,
                x: 0,
                rotateY: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 72%",
                  toggleActions: "play none none reverse",
                },
              },
            );
          }

          if (node) {
            gsap.fromTo(
              node,
              { scale: 0.72, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: 0.7,
                ease: "back.out(1.8)",
                scrollTrigger: {
                  trigger: row,
                  start: "top 72%",
                },
              },
            );
          }

          bars.forEach((bar) => {
            const width = bar.getAttribute("data-width") ?? "0";
            gsap.fromTo(
              bar,
              { width: "0%" },
              {
                width: `${width}%`,
                duration: 1.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 68%",
                },
              },
            );
          });
        });
      }, sectionRef);
    }

    void setupAnimations();

    return () => {
      cancelled = true;
      context?.revert();
    };
  }, []);

  return (
    <section
      id="timeline"
      className="aetherTimeline"
      ref={sectionRef}
      aria-labelledby="timeline-title"
    >
      <div className="container">
        <header className="aetherTimeline__head">
          <div>
            <span className="aetherTimeline__eyebrow">
              <i aria-hidden="true" />
              DEFENSE LOOP
            </span>

            <h2 id="timeline-title">
              מערכת הגנה שלא מפסיקה
              <span> ללמוד, להחליט ולפעול.</span>
            </h2>
          </div>

          <div className="aetherTimeline__intro">
            <p>
              לולאת הגנה אוטונומית שמחברת בין טלמטריה, הקשר עסקי
              ומדיניות — עם בקרה אנושית בכל נקודת החלטה.
            </p>

            <div className="aetherTimeline__systemStatus">
              <span>
                <i aria-hidden="true" />
                SYSTEM ONLINE
              </span>
              <strong>99.99% uptime</strong>
            </div>
          </div>
        </header>

        <div className="aetherTimeline__flow">
          <div className="aetherTimeline__rail" aria-hidden="true">
            <span className="aetherTimeline__progress" />
          </div>

          {timelineItems.map((item) => (
            <article className="aetherTimeline__row" key={item.number}>
              <div className="aetherTimeline__node" aria-hidden="true">
                <span>{item.number}</span>
                <i />
              </div>

              <div className="aetherTimeline__card">
                <div className="aetherTimeline__cardTop">
                  <span>{item.label}</span>
                  <span
                    className={`aetherTimeline__badge aetherTimeline__badge--${item.state}`}
                  >
                    <i aria-hidden="true" />
                    {item.status}
                  </span>
                </div>

                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <div className="aetherTimeline__signals">
                  {item.signals.map((signal) => (
                    <span key={signal}>{signal}</span>
                  ))}
                </div>

                <dl className="aetherTimeline__metrics">
                  <div>
                    <dt>Latency</dt>
                    <dd>{item.latency}</dd>
                  </div>
                  <div>
                    <dt>Confidence</dt>
                    <dd>{item.confidence}</dd>
                  </div>
                  <div>
                    <dt>AI decision</dt>
                    <dd>{item.decision}</dd>
                  </div>
                </dl>

                <div className="aetherTimeline__meter">
                  <div>
                    <span>Decision confidence</span>
                    <strong>{item.confidence}</strong>
                  </div>
                  <span className="aetherTimeline__meterTrack">
                    <i
                      className="aetherTimeline__meterFill"
                      data-width={Number.parseFloat(item.confidence)}
                    />
                  </span>
                </div>
              </div>

              <div className="aetherTimeline__console">
                <div className="aetherTimeline__consoleHeader">
                  <div>
                    <span className="aetherTimeline__windowDot" />
                    <span className="aetherTimeline__windowDot" />
                    <span className="aetherTimeline__windowDot" />
                  </div>
                  <span>AETHER / DECISION LOG</span>
                  <strong>LIVE</strong>
                </div>

                <div className="aetherTimeline__visual" aria-hidden="true">
                  <span className="aetherTimeline__orbit aetherTimeline__orbit--one" />
                  <span className="aetherTimeline__orbit aetherTimeline__orbit--two" />
                  <span className="aetherTimeline__orbit aetherTimeline__orbit--three" />
                  <span className="aetherTimeline__scan" />
                  <span className="aetherTimeline__visualCore">
                    <b>A</b>
                    <i />
                  </span>
                  <span className="aetherTimeline__signal aetherTimeline__signal--one" />
                  <span className="aetherTimeline__signal aetherTimeline__signal--two" />
                  <span className="aetherTimeline__signal aetherTimeline__signal--three" />
                </div>

                <div className="aetherTimeline__log">
                  {item.log.map((entry) => (
                    <div key={`${item.number}-${entry.time}`}>
                      <time>{entry.time}</time>
                      <span>{entry.action}</span>
                      <strong>{entry.result}</strong>
                    </div>
                  ))}
                </div>

                <div className="aetherTimeline__consoleFooter">
                  <span>
                    POLICY
                    <strong>ENFORCED</strong>
                  </span>
                  <span>
                    REGION
                    <strong>EU-WEST</strong>
                  </span>
                  <span>
                    MODE
                    <strong>HUMAN-GOVERNED</strong>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}