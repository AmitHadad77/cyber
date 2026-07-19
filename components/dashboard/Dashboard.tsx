"use client";

import { useEffect, useState } from "react";
import { Activity, Cloud, ShieldCheck } from "lucide-react";
import ActivityGraph from "./ActivityGraph";
import ConfidenceCard from "./ConfidenceCard";
import LiveNotifications from "./LiveNotifications";
import StatusBar from "./StatusBar";
import ThreatHeatmap from "./ThreatHeatmap";

const feed = [
  {
    time: "08:42:11",
    event: "IDENTITY_ANOMALY",
    asset: "prod-admin-04",
    state: "Blocked",
  },
  {
    time: "08:42:08",
    event: "PRIVILEGE_ESCALATION",
    asset: "billing-api",
    state: "Contained",
  },
  {
    time: "08:41:56",
    event: "EXFILTRATION_PATTERN",
    asset: "eu-data-lake",
    state: "Isolated",
  },
  {
    time: "08:41:40",
    event: "POLICY_DRIFT",
    asset: "cloud-role-18",
    state: "Remediated",
  },
];

const navItems = [
  { label: "Overview", icon: ShieldCheck },
  { label: "Activity", icon: Activity },
  { label: "AI decisions", icon: Activity },
  { label: "Cloud assets", icon: Cloud },
];

export default function Dashboard() {
  const [events, setEvents] = useState(1248);
  const [decisions, setDecisions] = useState(38);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setEvents((value) => value + Math.floor(Math.random() * 4) + 1);
      setDecisions((value) => (value >= 44 ? 38 : value + 1));
    }, 1800);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      className="aetherDashboard"
      id="product"
      aria-labelledby="dashboard-title"
    >
      <div className="container">
        <header className="aetherDashboard__head">
          <div>
            <span className="aetherDashboard__eyebrow">
              <i aria-hidden="true" />
              LIVE PRODUCT
            </span>

            <h2 id="dashboard-title">
              מרכז שליטה אחד.
              <span> תמונת הגנה מלאה.</span>
            </h2>
          </div>

          <p>
            Aether מחבר בין נכסים, זהויות, סיכונים ופעולות תגובה — ומציג לצוות
            רק את ההחלטות שבאמת דורשות תשומת לב.
          </p>
        </header>

        <StatusBar />

        <div className="aetherDashboard__shell">
          <div className="aetherDashboard__topbar">
            <div className="aetherDashboard__dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>

            <span>AETHER / AUTONOMOUS DEFENSE</span>

            <div className="aetherDashboard__online">
              <i aria-hidden="true" />
              LIVE PROTECTION
            </div>
          </div>

          <div className="aetherDashboard__layout">
            <aside
              className="aetherDashboard__sidebar"
              aria-label="Dashboard navigation"
            >
              <div className="aetherDashboard__brandMark" aria-hidden="true">
                A
              </div>

              {navItems.map(({ label, icon: Icon }, index) => (
                <button
                  className={index === 0 ? "is-active" : ""}
                  key={label}
                  type="button"
                  aria-label={label}
                >
                  <Icon size={17} strokeWidth={1.8} />
                </button>
              ))}
            </aside>

            <main className="aetherDashboard__main">
              <div className="aetherDashboard__titleRow">
                <div>
                  <span>SECURITY OVERVIEW</span>
                  <h3>Good morning, Security Team.</h3>
                </div>

                <div className="aetherDashboard__range">LAST 24 HOURS</div>
              </div>

              <div className="aetherDashboard__metrics">
                <article>
                  <span>Events classified</span>
                  <strong>{events.toLocaleString()}</strong>
                  <small>+12.4% today</small>
                </article>

                <article>
                  <span>Autonomous decisions</span>
                  <strong>{decisions}</strong>
                  <small>100% policy aligned</small>
                </article>

                <article>
                  <span>Median response</span>
                  <strong>
                    42<span>ms</span>
                  </strong>
                  <small>−18ms this week</small>
                </article>

                <article>
                  <span>Protected assets</span>
                  <strong>
                    18.7<span>K</span>
                  </strong>
                  <small>Across 4 regions</small>
                </article>
              </div>

              <div className="aetherDashboard__grid">
                <section
                  className="aetherDashboard__map"
                  aria-label="Live threat graph"
                >
                  <div className="aetherDashboard__panelHead">
                    <div>
                      <span>ATTACK GRAPH</span>
                      <h4>Live environment map</h4>
                    </div>

                    <strong>18,742 assets</strong>
                  </div>

                  <div
                    className="aetherDashboard__graph"
                    aria-hidden="true"
                  >
                    <span className="aetherDashboard__ring ring-one" />
                    <span className="aetherDashboard__ring ring-two" />
                    <span className="aetherDashboard__scan" />
                    <span className="aetherDashboard__core">A</span>

                    <i className="graph-node node-a" />
                    <i className="graph-node node-b" />
                    <i className="graph-node node-c" />
                    <i className="graph-node node-d" />

                    <svg viewBox="0 0 600 300" preserveAspectRatio="none">
                      <path d="M300 145 L155 70 M300 145 L455 72 M300 145 L130 228 M300 145 L480 230" />
                      <path d="M155 70 L455 72 M130 228 L480 230" />
                    </svg>
                  </div>

                  <div className="aetherDashboard__mapLegend">
                    <span>
                      <i className="safe" />
                      Healthy asset
                    </span>

                    <span>
                      <i className="watch" />
                      Under analysis
                    </span>

                    <span>
                      <i className="risk" />
                      Contained threat
                    </span>
                  </div>
                </section>

                <ConfidenceCard />
                <ActivityGraph />
                <LiveNotifications />
                <ThreatHeatmap />

                <section className="aetherDashboard__feed">
                  <div className="aetherDashboard__panelHead">
                    <div>
                      <span>DECISION STREAM</span>
                      <h4>Recent autonomous actions</h4>
                    </div>

                    <strong>VIEW ALL</strong>
                  </div>

                  <div className="aetherDashboard__feedTable">
                    {feed.map((item) => (
                      <div key={`${item.time}-${item.event}`}>
                        <time>{item.time}</time>
                        <code>{item.event}</code>
                        <span>{item.asset}</span>
                        <strong>{item.state}</strong>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
}