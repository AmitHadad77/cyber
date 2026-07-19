"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";

type CursorVariant =
  | "default"
  | "link"
  | "button"
  | "text"
  | "media"
  | "hidden";

type CursorState = {
  variant: CursorVariant;
  label: string;
};

const CURSOR_SIZE: Record<CursorVariant, number> = {
  default: 42,
  link: 64,
  button: 78,
  text: 92,
  media: 108,
  hidden: 0,
};

export default function PremiumCursor() {
  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  const ringX = useSpring(pointerX, {
    stiffness: 380,
    damping: 32,
    mass: 0.45,
  });

  const ringY = useSpring(pointerY, {
    stiffness: 380,
    damping: 32,
    mass: 0.45,
  });

  const dotX = useSpring(pointerX, {
    stiffness: 900,
    damping: 45,
    mass: 0.16,
  });

  const dotY = useSpring(pointerY, {
    stiffness: 900,
    damping: 45,
    mass: 0.16,
  });

  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const [cursor, setCursor] = useState<CursorState>({
    variant: "default",
    label: "",
  });

  useEffect(() => {
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    const updateAvailability = () => {
      const enabled = finePointer.matches && !prefersReducedMotion;

      setIsEnabled(enabled);

      document.documentElement.classList.toggle(
        "has-premium-cursor",
        enabled
      );

      if (!enabled) {
        setIsVisible(false);
      }
    };

    updateAvailability();

    finePointer.addEventListener("change", updateAvailability);

    return () => {
      finePointer.removeEventListener("change", updateAvailability);
      document.documentElement.classList.remove("has-premium-cursor");
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!isEnabled) {
      return;
    }

    let animationFrame = 0;
    let latestX = -100;
    let latestY = -100;

    const updatePosition = () => {
      pointerX.set(latestX);
      pointerY.set(latestY);
      animationFrame = 0;
    };

    const handlePointerMove = (event: PointerEvent) => {
      latestX = event.clientX;
      latestY = event.clientY;

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(updatePosition);
      }

      setIsVisible(true);

      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const cursorTarget = target.closest<HTMLElement>("[data-cursor]");

      if (!cursorTarget) {
        setCursor((current) => {
          if (
            current.variant === "default" &&
            current.label === ""
          ) {
            return current;
          }

          return {
            variant: "default",
            label: "",
          };
        });

        return;
      }

      const rawVariant = cursorTarget.dataset.cursor;
      const label = cursorTarget.dataset.cursorLabel ?? "";

      const variant: CursorVariant =
        rawVariant === "link" ||
        rawVariant === "button" ||
        rawVariant === "text" ||
        rawVariant === "media" ||
        rawVariant === "hidden"
          ? rawVariant
          : "default";

      setCursor((current) => {
        if (
          current.variant === variant &&
          current.label === label
        ) {
          return current;
        }

        return {
          variant,
          label,
        };
      });
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    const handlePointerEnter = () => {
      setIsVisible(true);
    };

    const handlePointerDown = () => {
      setIsPressed(true);
    };

    const handlePointerUp = () => {
      setIsPressed(false);
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    document.documentElement.addEventListener(
      "pointerenter",
      handlePointerEnter
    );

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      document.documentElement.removeEventListener(
        "pointerenter",
        handlePointerEnter
      );

      window.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [dotX, dotY, isEnabled, pointerX, pointerY]);

  if (!isEnabled) {
    return null;
  }

  const size = CURSOR_SIZE[cursor.variant];
  const hasLabel = cursor.label.length > 0;

  return (
    <div
      className="premiumCursor"
      aria-hidden="true"
      data-visible={isVisible}
      data-variant={cursor.variant}
      data-pressed={isPressed}
    >
      <motion.div
        className="premiumCursor__ring"
        style={{
          x: ringX,
          y: ringY,
          width: size,
          height: size,
        }}
        animate={{
          opacity:
            isVisible && cursor.variant !== "hidden" ? 1 : 0,
          scale: isPressed ? 0.82 : 1,
        }}
        transition={{
          opacity: {
            duration: 0.18,
          },
          scale: {
            type: "spring",
            stiffness: 480,
            damping: 28,
          },
        }}
      >
        <span className="premiumCursor__ringGlow" />

        {hasLabel && (
          <motion.span
            className="premiumCursor__label"
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
            }}
          >
            {cursor.label}
          </motion.span>
        )}
      </motion.div>

      <motion.div
        className="premiumCursor__dot"
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          opacity:
            isVisible && cursor.variant !== "hidden" ? 1 : 0,
          scale:
            cursor.variant === "default"
              ? isPressed
                ? 0.7
                : 1
              : 0.38,
        }}
        transition={{
          opacity: {
            duration: 0.12,
          },
          scale: {
            type: "spring",
            stiffness: 600,
            damping: 32,
          },
        }}
      />
    </div>
  );
}