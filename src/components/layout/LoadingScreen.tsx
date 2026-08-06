"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- skips the timed reveal outright; not a derivable external store, so useSyncExternalStore doesn't apply here.
      setIsLoading(false);
      return;
    }
    const timer = setTimeout(() => setIsLoading(false), 1400);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.span
              className="font-heading text-3xl font-semibold tracking-[0.3em] text-foreground sm:text-4xl"
              initial={{ opacity: 0, letterSpacing: "0.6em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              VEN JEAN
            </motion.span>
            <motion.div
              className="h-px w-40 origin-left bg-gradient-to-r from-primary via-secondary to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
