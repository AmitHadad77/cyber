"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "סוכני AI אוטונומיים",
    description: "חקירת חריגות, הצלבת אותות ותגובה לפי מדיניות.",
    icon: "agents",
  },
  {
    title: "הגנה אקטיבית",
    description: "בידוד עומסים, ביטול הרשאות והכלת זהויות שנפרצו.",
    icon: "defense",
  },
  {
    title: "דיווח להנהלה",
    description: "המרת אירועים לתמונת סיכון וסדרי עדיפויות.",
    icon: "report",
  },
  {
    title: "נבנתה לענן",
    description: "AWS, Azure ו-Google Cloud בהרשאות מינימליות.",
    icon: "cloud",
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities">
      <div className="container">
        <div className="sectionHead">
          <span>CAPABILITIES</span>
          <h2>פחות רעש. יותר החלטות ברורות.</h2>
        </div>

        <div className="bento">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              className={`capCard c${index + 1}`}
              whileHover={{ y: -6 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 22,
              }}
            >
              <div className="capCard__top">
                <div className="capIcon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <use href={`#icon-${card.icon}`} />
                  </svg>
                </div>

                <span className="capCard__index">
                  0{index + 1}
                </span>
              </div>

              <div className="capCard__content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>

              <div className="capCard__signal" aria-hidden="true">
                <span />
                <span />
                <span />
                <span />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}