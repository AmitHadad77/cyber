"use client";

import { useEffect, useRef } from "react";

type StoryScene = {
  step: string;
  eyebrow: string;
  title: string;
  description: string;
  status: string;
  metricLabel: string;
  metricValue: string;
  progress: number;
  tags: string[];
  events: {
    label: string;
    value: string;
    state: "active" | "complete" | "warning";
  }[];
};

const scenes: StoryScene[] = [
  {
    step: "01",
    eyebrow: "THREAT DETECTED",
    title: "זוהתה חריגה בזהות השירות",
    description:
      "Aether מזהה בקשת API שאינה תואמת את דפוס ההתנהגות הרגיל של השירות ומתחיל לאסוף הקשר מכל שכבות המערכת.",
    status: "LIVE SIGNAL",
    metricLabel: "Risk score",
    metricValue: "87%",
    progress: 87,
    tags: ["Identity", "API", "Cloud"],
    events: [
      {
        label: "Behavior baseline",
        value: "Mismatch",
        state: "warning",
      },
      {
        label: "Source reputation",
        value: "Unknown",
        state: "active",
      },
      {
        label: "Access scope",
        value: "Elevated",
        state: "warning",
      },
    ],
  },
  {
    step: "02",
    eyebrow: "AI CORRELATION",
    title: "האותות מתחברים למסלול תקיפה",
    description:
      "מנוע הקורלציה מחבר בין פעילות הזהות, ניסיונות הגישה והאירועים ברשת כדי לזהות כוונה ולא רק סימפטום בודד.",
    status: "ANALYZING",
    metricLabel: "Confidence",
    metricValue: "98.4%",
    progress: 98,
    tags: ["Behavior", "Network", "Policy"],
    events: [
      {
        label: "Signals correlated",
        value: "14",
        state: "complete",
      },
      {
        label: "Attack path",
        value: "Confirmed",
        state: "complete",
      },
      {
        label: "Business impact",
        value: "Critical",
        state: "warning",
      },
    ],
  },
  {
    step: "03",
    eyebrow: "AUTONOMOUS RESPONSE",
    title: "האיום מנוטרל ומתועד",
    description:
      "Aether מבטל את הגישה, מבודד את הסשן ומייצר מסלול ביקורת מלא — תוך שמירה על שליטה אנושית ומדיניות הארגון.",
    status: "MITIGATED",
    metricLabel: "Response time",
    metricValue: "18ms",
    progress: 100,
    tags: ["Contain", "Verify", "Audit"],
    events: [
      {
        label: "Session revoked",
        value: "Complete",
        state: "complete",
      },
      {
        label: "Key rotation",
        value: "Complete",
        state: "complete",
      },
      {
        label: "Audit evidence",
        value: "Stored",
        state: "complete",
      },
    ],
  },
];

export default function Story() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let gsapContext: { revert: () => void } | undefined;

    let cancelled = false;

    async function initializeAnimation() {
      const [{ default: gsap }, { default: ScrollTrigger }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled || !sectionRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      gsapContext = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(
          ".storyPipelineCard",
        );

        cards.forEach((card) => {
          const content = card.querySelector(
            ".storyPipelineCard__content",
          );

          const panel = card.querySelector(
            ".storyPipelineCard__panel",
          );

          const progress = card.querySelector(
            ".storyProgress__fill",
          );

          gsap.fromTo(
            card,
            {
              opacity: 0.25,
              y: 70,
              scale: 0.97,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                end: "center 58%",
                scrub: 0.9,
              },
            },
          );

          if (content) {
            gsap.fromTo(
              content,
              {
                opacity: 0,
                x: 36,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 72%",
                },
              },
            );
          }

          if (panel) {
            gsap.fromTo(
              panel,
              {
                opacity: 0,
                x: -36,
              },
              {
                opacity: 1,
                x: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 72%",
                },
              },
            );
          }

          if (progress) {
            const targetWidth =
              progress.getAttribute("data-progress") ?? "0";

            gsap.fromTo(
              progress,
              {
                width: "0%",
              },
              {
                width: `${targetWidth}%`,
                duration: 1.25,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 68%",
                },
              },
            );
          }
        });

        gsap.fromTo(
          ".storyPipeline__lineFill",
          {
            scaleY: 0,
          },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".storyPipeline",
              start: "top 70%",
              end: "bottom 65%",
              scrub: 1,
            },
          },
        );
      }, sectionRef);
    }

    initializeAnimation();

    return () => {
      cancelled = true;
      gsapContext?.revert();
    };
  }, []);

  return (
    <section
      className="story"
      id="story"
      ref={sectionRef}
      aria-labelledby="story-title"
    >
      <div className="container">
        <header className="sectionHead storyHead">
          <span className="sectionHead__eyebrow">
            AUTONOMOUS DECISION ENGINE
          </span>

          <h2 id="story-title">
            כך Aether עובר מאות לאירוע לפעולה
          </h2>

          <p>
            כל אירוע עובר דרך שכבת זיהוי, קורלציה
            ותגובה אוטונומית — עם הסבר מלא לכל החלטה.
          </p>

          <div
            className="storyHead__status"
            aria-label="Aether engine status"
          >
            <span className="storyHead__statusDot" />
            ENGINE ONLINE
            <strong>12 agents active</strong>
          </div>
        </header>

        <div className="storyPipeline">
          <div
            className="storyPipeline__rail"
            aria-hidden="true"
          >
            <span className="storyPipeline__lineFill" />
          </div>

          {scenes.map((scene) => (
            <article
              className="storyPipelineCard"
              key={scene.step}
            >
              <div
                className="storyPipelineCard__node"
                aria-hidden="true"
              >
                <span>{scene.step}</span>
              </div>

              <div className="storyPipelineCard__inner">
                <div className="storyPipelineCard__content">
                  <div className="storyPipelineCard__topline">
                    <span className="storyPipelineCard__eyebrow">
                      {scene.eyebrow}
                    </span>

                    <span className="storyPipelineCard__status">
                      <i />
                      {scene.status}
                    </span>
                  </div>

                  <h3>{scene.title}</h3>

                  <p>{scene.description}</p>

                  <div className="storyPipelineCard__tags">
                    {scene.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>

                  <div className="storyMetric">
                    <div className="storyMetric__top">
                      <span>{scene.metricLabel}</span>
                      <strong>{scene.metricValue}</strong>
                    </div>

                    <div
                      className="storyProgress"
                      aria-label={`${scene.metricLabel}: ${scene.metricValue}`}
                    >
                      <span
                        className="storyProgress__fill"
                        data-progress={scene.progress}
                      />
                    </div>
                  </div>
                </div>

                <div className="storyPipelineCard__panel">
                  <div className="storyPanel">
                    <div className="storyPanel__header">
                      <div>
                        <span>CASE ID</span>
                        <strong>
                          AETH-{scene.step}-2048
                        </strong>
                      </div>

                      <span className="storyPanel__live">
                        LIVE
                      </span>
                    </div>

                    <div className="storyPanel__radar">
                      <span className="storyPanel__ring storyPanel__ring--one" />
                      <span className="storyPanel__ring storyPanel__ring--two" />
                      <span className="storyPanel__ring storyPanel__ring--three" />
                      <span className="storyPanel__scanner" />
                      <span className="storyPanel__target storyPanel__target--one" />
                      <span className="storyPanel__target storyPanel__target--two" />
                      <span className="storyPanel__core">
                        A
                      </span>
                    </div>

                    <div className="storyPanel__events">
                      {scene.events.map((event) => (
                        <div
                          className="storyPanel__event"
                          key={event.label}
                        >
                          <span
                            className={`storyPanel__eventState storyPanel__eventState--${event.state}`}
                          />

                          <span>{event.label}</span>

                          <strong>{event.value}</strong>
                        </div>
                      ))}
                    </div>

                    <div className="storyPanel__footer">
                      <span>
                        POLICY ENGINE
                        <strong>ENFORCED</strong>
                      </span>

                      <span>
                        LATENCY
                        <strong>18ms</strong>
                      </span>

                      <span>
                        REGION
                        <strong>EU-WEST</strong>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}