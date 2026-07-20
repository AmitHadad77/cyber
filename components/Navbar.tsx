"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  ["#story", "הסיפור"],
  ["#product", "המוצר"],
  ["#capabilities", "יכולות"],
  ["#timeline", "תהליך"],
  ["#contact", "צור קשר"],
] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#story");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = links
      .map(([href]) => document.querySelector(href))
      .filter((section): section is Element => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActive(`#${visible.target.id}`);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.05, 0.2, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={`aetherNav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="aetherNav__shell">
          <a
            className="aetherNav__brand"
            href="#top"
            aria-label="AI Aether home"
          >
            <span>A</span>
            <span>
              <b>AI Aether</b>
              <small>Autonomous Cloud Defense</small>
            </span>
          </a>

          <nav className="aetherNav__links" aria-label="ניווט ראשי">
            {links.map(([href, label]) => (
              <a
                className={active === href ? "is-active" : ""}
                key={href}
                href={href}
              >
                {label}
              </a>
            ))}
          </nav>

          <a className="aetherNav__cta" href="#contact">
            <span>צור קשר</span>
            <i aria-hidden="true">↗</i>
          </a>

          <button
            className="aetherNav__menuButton"
            type="button"
            onClick={() => setOpen(true)}
            aria-label="פתיחת תפריט"
            aria-expanded={open}
          >
            <Menu size={20} />
          </button>
        </div>
      </header>

      <div className={`aetherNavMobile ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div className="aetherNavMobile__top">
          <span>AI AETHER</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="סגירת תפריט"
          >
            <X size={22} />
          </button>
        </div>

        <nav>
          {links.map(([href, label], index) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>
              {label}
            </a>
          ))}
        </nav>

        <a
          className="aetherNavMobile__contact"
          href="#contact"
          onClick={() => setOpen(false)}
        >
          דברו איתי
        </a>

        <div className="aetherNavMobile__status">
          <i aria-hidden="true" />
          SYSTEM ONLINE
        </div>
      </div>
    </>
  );
}