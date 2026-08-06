"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Lenis (root mode) tracks scroll limits off `document.documentElement`,
 * whose own box height stays pinned to the viewport (html is `h-full`) even
 * when child content grows past it — so its ResizeObserver never fires when
 * an accordion (Journey/Tool card, gallery dialog, etc.) expands below the
 * fold, and the scroll limit goes stale mid-page. `document.body` has no
 * such ceiling (`min-h-full` only), so it reliably grows with content —
 * watching it and calling `lenis.resize()` keeps the limit in sync with
 * whatever just expanded, however deep in the tree it happened.
 */
function LenisResizeSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const observer = new ResizeObserver(() => lenis.resize());
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [lenis]);

  return null;
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: !prefersReducedMotion,
        syncTouch: false,
      }}
    >
      <LenisResizeSync />
      {children}
    </ReactLenis>
  );
}
