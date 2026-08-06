"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type MouseEvent, type ReactNode, useEffect, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

function subscribeNoop() {
  return () => {};
}

function getHoverCapableSnapshot() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function getHoverCapableServerSnapshot() {
  return false;
}

/** Subtle 3D tilt on hover — disabled automatically on touch/coarse pointers,
 * and via `disabled` while a card is expanded so reading its detail isn't
 * fighting a tilting surface. */
export function TiltCard({
  children,
  className,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  const tiltEnabled = useSyncExternalStore(
    subscribeNoop,
    getHoverCapableSnapshot,
    getHoverCapableServerSnapshot,
  );
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(springY, [0, 1], [7, -7]);
  const rotateY = useTransform(springX, [0, 1], [-7, 7]);

  // Ease back to flat (rather than snapping) when a card becomes disabled.
  useEffect(() => {
    if (disabled) {
      mouseX.set(0.5);
      mouseY.set(0.5);
    }
  }, [disabled, mouseX, mouseY]);

  const isActive = tiltEnabled && !disabled;

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (!isActive) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - bounds.left) / bounds.width);
    mouseY.set((event.clientY - bounds.top) / bounds.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        tiltEnabled
          ? { rotateX, rotateY, transformPerspective: 800 }
          : undefined
      }
      className={cn(tiltEnabled && "[transform-style:preserve-3d]", className)}
    >
      {children}
    </motion.div>
  );
}
