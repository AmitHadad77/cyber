"use client";

import { motion } from "framer-motion";
import { BrainCircuit, CloudCog, FileChartColumn, ShieldCheck } from "lucide-react";

const capabilities = [
  {
    icon: BrainCircuit,
    eyebrow: "AUTONOMOUS AGENTS",
    title: "סוכני AI שחוקרים לפני שהם מתריעים.",
    text: "כל חריגה נבדקת מול זהויות, נכסים, מדיניות והקשר עסקי — כך שהצוות מקבל החלטה, לא עוד רעש.",
    className: "aetherCapabilities__card--hero",
    visual: "agents",
    stats: ["14 signals", "99.2% confidence"],
  },
  {
    icon: ShieldCheck,
    eyebrow: "ACTIVE DEFENSE",
    title: "תגובה מיידית, תחת מדיניות.",
    text: "בידוד עומסים, ביטול הרשאות והכלת זהויות — עם תיעוד מלא ושליטה אנושית.",
    className: "aetherCapabilities__card--defense",
    visual: "defense",
    stats: ["42ms response", "Human governed"],
  },
  {
    icon: FileChartColumn,
    eyebrow: "EXECUTIVE CONTEXT",
    title: "סיכון טכני שהופך להחלטה עסקית.",
    text: "Aether מתרגם אירועים להשפעה, סדר עדיפויות ותמונה ברורה להנהלה.",
    className: "aetherCapabilities__card--report",
    visual: "report",
    stats: ["Live posture", "Board ready"],
  },
  {
    icon: CloudCog,
    eyebrow: "CLOUD NATIVE",
    title: "נבנה לענן מרובה סביבות.",
    text: "AWS, Azure ו-Google Cloud בהרשאות מינימליות, עם פריסה מהירה וללא סוכן כבד.",
    className: "aetherCapabilities__card--cloud",
    visual: "cloud",
    stats: ["3 clouds", "18.7K assets"],
  },
];

export default function Capabilities() {
  return (
    <section className="aetherCapabilities" id="capabilities" aria-labelledby="capabilities-title">
      <div className="container">
        <header className="aetherCapabilities__head">
          <span>CAPABILITIES</span>
          <h2 id="capabilities-title">
            פחות כלים.
            <span> יותר בהירות ושליטה.</span>
          </h2>
          <p>
            מערכת אחת שמחברת בין חישה, ניתוח ותגובה — בלי להוסיף עוד שכבת רעש
            לצוות האבטחה.
          </p>
        </header>

        <div className="aetherCapabilities__grid">
          {capabilities.map((capability, index) => {
            const Icon = capability.icon;
            return (
              <motion.article
                className={`aetherCapabilities__card ${capability.className}`}
                key={capability.title}
                initial={{ opacity: 0, y: 38 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: index * 0.07 }}
                whileHover={{ y: -6 }}
              >
                <div className="aetherCapabilities__top">
                  <div className="aetherCapabilities__icon">
                    <Icon size={20} strokeWidth={1.7} />
                  </div>
                  <span>{capability.eyebrow}</span>
                </div>

                <h3>{capability.title}</h3>
                <p>{capability.text}</p>

                <div className={`aetherCapabilities__visual visual-${capability.visual}`} aria-hidden="true">
                  <span /><span /><span /><span />
                </div>

                <div className="aetherCapabilities__stats">
                  {capability.stats.map((stat) => <span key={stat}>{stat}</span>)}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}