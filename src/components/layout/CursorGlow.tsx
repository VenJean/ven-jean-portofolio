"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useSyncExternalStore } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

function subscribeNoop() {
  return () => {};
}

function getFinePointerSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

/** Soft radial glow that trails the cursor — desktop (fine-pointer) only. */
export function CursorGlow() {
  const isFinePointer = useSyncExternalStore(
    subscribeNoop,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot,
  );
  const prefersReducedMotion = usePrefersReducedMotion();
  const enabled = isFinePointer && !prefersReducedMotion;
  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);
  const x = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.6 });
  const y = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (!enabled) return;
    const handleMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled, mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 h-[420px] w-[420px] rounded-full mix-blend-screen"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--glow-primary) 18%, transparent) 0%, transparent 70%)",
      }}
    />
  );
}
