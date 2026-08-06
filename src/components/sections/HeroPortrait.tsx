"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { User } from "lucide-react";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const PORTRAIT_SRC = "/images/profile/portrait.png";

/**
 * Supports the Hero identity — never competes with it. Kept out of Hero's
 * own staggerContainer/fadeUp chain since it needs its own duration and a
 * continuous mouse-parallax layer, not just a one-shot reveal.
 */
export function HeroPortrait() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // A same-origin 404 can resolve before hydration attaches onError (the
  // browser starts fetching the SSR'd <img src> the instant it parses the
  // HTML, well ahead of React taking over), so onError alone can miss it.
  // decode() reliably reports the real outcome instead of racing against
  // img.complete, which can briefly read true before loading even starts.
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    img.decode().catch(() => setFailed(true));
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });
  const translateX = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-8, 8]);

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.div
      style={{ gridArea: "portrait" }}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative mx-auto mt-8 w-[85%] max-w-[240px] sm:mt-0 sm:w-full sm:max-w-[210px] sm:justify-self-end lg:max-w-[290px]"
    >
      {/* Sits behind the portrait only — ConnectionNodes' particles keep
          drifting through it since this is a translucent gradient, not a
          solid layer. */}
      <div
        aria-hidden
        className="portrait-glow pointer-events-none absolute inset-0 -z-10 scale-150 opacity-[0.15] blur-[100px]"
      />

      <motion.div
        style={
          prefersReducedMotion ? undefined : { x: translateX, y: translateY }
        }
        whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-[4/5] w-full overflow-hidden"
      >
        {!failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={imgRef}
            src={PORTRAIT_SRC}
            alt="C. Caesar Sancho Ven Jean"
            onError={() => setFailed(true)}
            className="portrait-vignette h-full w-full scale-[1.35] object-cover object-[50%_15%]"
            style={{ filter: "drop-shadow(0 20px 40px rgba(8, 17, 31, 0.5))" }}
          />
        ) : (
          <div className="gradient-mesh-bg flex h-full w-full flex-col items-center justify-center gap-2 rounded-3xl border border-white/10 bg-card/40">
            <User size={32} strokeWidth={1.5} className="text-muted-foreground/60" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
              Portrait
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
