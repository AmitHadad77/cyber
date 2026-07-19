"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import {
  type PointerEvent,
  type ReactNode,
} from "react";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export default function Magnetic({
  children,
  className = "",
  strength = 0.28,
}: MagneticProps) {
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 260,
    damping: 22,
    mass: 0.55,
  });

  const springY = useSpring(y, {
    stiffness: 260,
    damping: 22,
    mass: 0.55,
  });

  function handlePointerMove(
    event: PointerEvent<HTMLDivElement>
  ) {
    if (prefersReducedMotion) {
      return;
    }

    const bounds =
      event.currentTarget.getBoundingClientRect();

    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;

    x.set((event.clientX - centerX) * strength);
    y.set((event.clientY - centerY) * strength);
  }

  function resetPosition() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className={`magneticElement ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPosition}
      onPointerCancel={resetPosition}
      style={
        prefersReducedMotion
          ? undefined
          : {
              x: springX,
              y: springY,
            }
      }
    >
      {children}
    </motion.div>
  );
}