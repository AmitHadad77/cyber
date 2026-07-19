"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { PointerEvent } from "react";

import HeroMetrics from "./HeroMetrics";

type HeroCoreProps = {
  prefersReducedMotion: boolean;
};

const PARTICLES = [
  { left: "12%", top: "18%", delay: "0s", duration: "4.8s" },
  { left: "21%", top: "72%", delay: "0.7s", duration: "5.6s" },
  { left: "34%", top: "11%", delay: "1.2s", duration: "4.3s" },
  { left: "48%", top: "84%", delay: "1.8s", duration: "6.1s" },
  { left: "62%", top: "16%", delay: "0.4s", duration: "5.2s" },
  { left: "74%", top: "76%", delay: "1.5s", duration: "4.9s" },
  { left: "88%", top: "29%", delay: "2.1s", duration: "5.8s" },
  { left: "81%", top: "57%", delay: "0.9s", duration: "4.5s" },
];

export default function HeroCore({
  prefersReducedMotion,
}: HeroCoreProps) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springX = useSpring(pointerX, {
    stiffness: 110,
    damping: 18,
    mass: 0.7,
  });

  const springY = useSpring(pointerY, {
    stiffness: 110,
    damping: 18,
    mass: 0.7,
  });

  const translateX = useTransform(
    springX,
    [-1, 1],
    [-18, 18],
  );

  const translateY = useTransform(
    springY,
    [-1, 1],
    [-14, 14],
  );

  const rotateY = useTransform(
    springX,
    [-1, 1],
    [-7, 7],
  );

  const rotateX = useTransform(
    springY,
    [-1, 1],
    [7, -7],
  );

  const glowX = useTransform(
    springX,
    [-1, 1],
    ["35%", "65%"],
  );

  const glowY = useTransform(
    springY,
    [-1, 1],
    ["35%", "65%"],
  );

  const metricsX = useTransform(
    springX,
    [-1, 1],
    [-8, 8],
  );

  const metricsY = useTransform(
    springY,
    [-1, 1],
    [-6, 6],
  );

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>,
  ) {
    if (prefersReducedMotion) {
      return;
    }

    const bounds =
      event.currentTarget.getBoundingClientRect();

    const normalizedX =
      ((event.clientX - bounds.left) / bounds.width) *
        2 -
      1;

    const normalizedY =
      ((event.clientY - bounds.top) / bounds.height) *
        2 -
      1;

    pointerX.set(normalizedX);
    pointerY.set(normalizedY);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      className="heroObject aetherCoreWrap"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={
        prefersReducedMotion
          ? false
          : {
              opacity: 0,
              scale: 0.94,
              y: 24,
            }
      }
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{
        duration: 1,
        delay: 0.18,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <motion.div
        className="aetherCoreGlow"
        aria-hidden="true"
        style={{
          left: glowX,
          top: glowY,
        }}
      />

      <div
        className="aetherParticles"
        aria-hidden="true"
      >
        {PARTICLES.map((particle, index) => (
          <span
            className="aetherParticle"
            key={`${particle.left}-${particle.top}`}
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
            }}
          >
            <span>{index % 2 === 0 ? "01" : "10"}</span>
          </span>
        ))}
      </div>

      <motion.div
        className="aetherCoreScene"
        style={
          prefersReducedMotion
            ? undefined
            : {
                x: translateX,
                y: translateY,
                rotateX,
                rotateY,
                transformPerspective: 1100,
              }
        }
      >
        <div
          className="aetherCoreStage"
          aria-hidden="true"
        >
          <div className="aetherCoreGrid" />

          <div className="aetherOrbit aetherOrbit--outer">
            <span className="aetherOrbitNode aetherOrbitNode--one" />
            <span className="aetherOrbitNode aetherOrbitNode--two" />
          </div>

          <div className="aetherOrbit aetherOrbit--middle">
            <span className="aetherOrbitNode aetherOrbitNode--three" />
          </div>

          <div className="aetherOrbit aetherOrbit--inner" />

          <svg
            className="aetherDataLines"
            viewBox="0 0 500 500"
            role="presentation"
          >
            <defs>
              <linearGradient
                id="aether-line-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="rgba(77, 244, 255, 0)"
                />

                <stop
                  offset="50%"
                  stopColor="rgba(77, 244, 255, 0.9)"
                />

                <stop
                  offset="100%"
                  stopColor="rgba(139, 92, 246, 0)"
                />
              </linearGradient>
            </defs>

            <path
              className="aetherDataPath aetherDataPath--one"
              d="M65 180 C145 125 180 120 250 250"
            />

            <path
              className="aetherDataPath aetherDataPath--two"
              d="M435 160 C350 130 315 165 250 250"
            />

            <path
              className="aetherDataPath aetherDataPath--three"
              d="M100 380 C160 320 195 300 250 250"
            />

            <path
              className="aetherDataPath aetherDataPath--four"
              d="M405 365 C345 315 305 295 250 250"
            />
          </svg>

          <div className="aetherScanner" />

          <motion.div
            className="aetherCoreShell"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    scale: [1, 1.025, 1],
                  }
            }
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="aetherCoreShell__glass">
              <motion.div
                className="aetherCoreReflection"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        x: ["-140%", "180%"],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 2,
                }}
              />
            </div>

            <div className="aetherCoreShell__energy" />

            <motion.div
              className="aetherCoreHalo"
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                      opacity: [0.25, 0.55, 0.25],
                      scale: [0.96, 1.08, 0.96],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="aetherCoreShell__scan" />

            <div className="aetherCoreMark">
              <span>A</span>
            </div>
          </motion.div>

          <div className="aetherPulse aetherPulse--one" />
          <div className="aetherPulse aetherPulse--two" />
          <div className="aetherPulse aetherPulse--three" />

          <div className="aetherSignal aetherSignal--left">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="aetherSignal aetherSignal--right">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="aetherMetricsMotion"
        style={
          prefersReducedMotion
            ? undefined
            : {
                x: metricsX,
                y: metricsY,
              }
        }
      >
        <HeroMetrics
          prefersReducedMotion={prefersReducedMotion}
        />
      </motion.div>

      <div
        className="aetherCoreLabel"
        aria-hidden="true"
      >
        <span className="aetherCoreLabel__dot" />
        AUTONOMOUS DEFENSE ENGINE
      </div>
    </motion.div>
  );
}