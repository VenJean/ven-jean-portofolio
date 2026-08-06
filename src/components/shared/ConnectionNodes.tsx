"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Node = { x: number; y: number; vx: number; vy: number };

const MAX_DISTANCE = 140;
const NODE_COLOR = "59, 130, 246";
const LINE_COLOR = "34, 211, 238";

function getNodeCount(width: number) {
  if (width < 640) return 26;
  if (width < 1024) return 42;
  return 64;
}

/** Canvas background: drifting nodes connected by proximity lines. RAF-driven,
 * paused off-screen/hidden-tab, skipped entirely under reduced motion. */
export function ConnectionNodes({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let animationFrame = 0;
    let isRunning = true;
    let isPageVisible = true;
    let isOnScreen = true;
    let isScrolling = false;
    let scrollEndTimer = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = getNodeCount(width);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
      }));
    }

    function draw() {
      if (!isRunning) return;
      ctx!.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x <= 0 || node.x >= width) node.vx *= -1;
        if (node.y <= 0 || node.y >= height) node.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < MAX_DISTANCE) {
            ctx!.strokeStyle = `rgba(${LINE_COLOR}, ${0.16 * (1 - distance / MAX_DISTANCE)})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const node of nodes) {
        ctx!.fillStyle = `rgba(${NODE_COLOR}, 0.7)`;
        ctx!.beginPath();
        ctx!.arc(node.x, node.y, 1.6, 0, Math.PI * 2);
        ctx!.fill();
      }

      animationFrame = requestAnimationFrame(draw);
    }

    function start() {
      if (isRunning) return;
      isRunning = true;
      animationFrame = requestAnimationFrame(draw);
    }

    function stop() {
      isRunning = false;
      cancelAnimationFrame(animationFrame);
    }

    // The per-frame distance check between every node pair is real work —
    // fine at rest, but it competes with the main thread for the exact
    // frames a slow, deliberate scroll gesture needs, which is what makes
    // that kind of scroll feel like it stutters/catches. A fast flick is
    // handled by the OS's own momentum scrolling and never touches this, so
    // it stays smooth either way. Pausing the redraw for the scroll's
    // duration (and just after) removes the contention only when it'd
    // otherwise be visible — the idle animation itself is unchanged.
    function syncRunState() {
      if (isPageVisible && isOnScreen && !isScrolling) start();
      else stop();
    }

    function onScroll() {
      isScrolling = true;
      stop();
      window.clearTimeout(scrollEndTimer);
      scrollEndTimer = window.setTimeout(() => {
        isScrolling = false;
        syncRunState();
      }, 150);
    }

    resize();
    animationFrame = requestAnimationFrame(draw);

    const resizeObserver = new ResizeObserver(resize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);

    const onVisibilityChange = () => {
      isPageVisible = !document.hidden;
      syncRunState();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isOnScreen = entry.isIntersecting;
        syncRunState();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stop();
      window.clearTimeout(scrollEndTimer);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", onScroll);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
    />
  );
}
