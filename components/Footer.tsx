export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="siteFooter">
      <div className="container siteFooter__grid">
        <div className="siteFooter__brandCol">
          <a className="siteFooter__brand" href="#top" aria-label="AI Aether home">
            <span className="siteFooter__brandMark">A</span>
            <span>
              <b>AI Aether</b>
              <small>Autonomous Cloud Defense</small>
            </span>
          </a>

          <p className="siteFooter__description">
            אתר הדגמה המציג חוויית מוצר עבור פלטפורמת AI לאבטחת ענן.
            הפרויקט נבנה כדי להמחיש חשיבה מוצרית, עיצוב מדויק, היררכיית תוכן
            ופיתוח פרונטאנד ברמה מסחרית.
          </p>
        </div>

        <div className="siteFooter__col">
          <h4>ניווט</h4>
          <a href="#story">הסיפור</a>
          <a href="#product">המוצר</a>
          <a href="#capabilities">יכולות</a>
          <a href="#timeline">תהליך</a>
          <a href="#contact">צור קשר</a>
        </div>

        <div className="siteFooter__col">
          <h4>טכנולוגיות</h4>
          <span>Next.js</span>
          <span>TypeScript</span>
          <span>Framer Motion</span>
          <span>GSAP</span>
          <span>RTL Responsive UI</span>
        </div>

        <div className="siteFooter__col">
          <h4>פרטי הפרויקט</h4>
          <span>סוג: אתר תדמית / מוצר</span>
          <span>קטגוריה: Cyber Security / SaaS</span>
          <span>שפה: עברית RTL</span>
          <span>מטרה: הצגת פרויקט לתיק עבודות</span>
        </div>
      </div>

      <div className="container siteFooter__bottom">
        <span>© {year} AI Aether. All rights reserved.</span>
        <span>Designed for clarity, trust and control.</span>
      </div>
    </footer>
  );
}