export default function Footer() {
  return (
    <footer className="aetherFooter">
      <div className="aetherFooter__glow" aria-hidden="true" />

      <div className="container">
        <div className="aetherFooter__cta">
          <span>THE NEXT MOVE</span>
          <h2>
            בואו נראה איך הגנה
            <strong> אוטונומית באמת מרגישה.</strong>
          </h2>
          <a href="#contact">
            תיאום הדגמה
            <i aria-hidden="true">↗</i>
          </a>
        </div>

        <div className="aetherFooter__grid">
          <div className="aetherFooter__brand">
            <a href="#top" aria-label="AI Aether home">
              <span>A</span>
              <div>
                <b>AI Aether</b>
                <small>Autonomous Cloud Defense</small>
              </div>
            </a>
            <p>
              קונספט למוצר SaaS מתקדם שמחבר בין AI, אבטחת ענן ותגובה אוטונומית.
            </p>
            <div className="aetherFooter__system">
              <i aria-hidden="true" />
              ALL SYSTEMS OPERATIONAL
            </div>
          </div>

          <nav>
            <h3>מוצר</h3>
            <a href="#product">דשבורד</a>
            <a href="#capabilities">יכולות</a>
            <a href="#timeline">תהליך</a>
          </nav>

          <nav>
            <h3>פרויקט</h3>
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>GSAP + Motion</span>
          </nav>

          <nav>
            <h3>יצירת קשר</h3>
            <a href="#contact">תיאום הדגמה</a>
            <a href="mailto:security@aether.example">Security</a>
          </nav>
        </div>

        <div className="aetherFooter__bottom">
          <span>© 2026 AI Aether. Portfolio concept.</span>
          <span>Designed for clarity, trust and control.</span>
        </div>
      </div>
    </footer>
  );
}