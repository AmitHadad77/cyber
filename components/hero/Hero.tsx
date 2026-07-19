"use client";

import { useReducedMotion } from "framer-motion";

import HeroBackground from "./HeroBackground";
import HeroLighting from "./HeroLighting";
import HeroCopy from "./HeroCopy";
import HeroCore from "./HeroCore";

export default function Hero() {
  const prefersReducedMotion = Boolean(useReducedMotion());

  return (
    <section
      className="hero"
      id="top"
      aria-labelledby="hero-title"
      aria-describedby="hero-description"
    >
      <HeroBackground />

      <HeroLighting
        prefersReducedMotion={prefersReducedMotion}
      />

      <div className="container heroLayout">
        <HeroCopy
          prefersReducedMotion={prefersReducedMotion}
        />

        <HeroCore
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
    </section>
  );
}