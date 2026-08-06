"use client";

import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize, Minimize, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 60;
const WHEEL_THRESHOLD = 50;
const WHEEL_COOLDOWN_MS = 350;

type Direction = 1 | -1;

const slideVariants = {
  enter: (direction: Direction) => ({ x: direction > 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: Direction) => ({ x: direction > 0 ? -48 : 48, opacity: 0 }),
};

export function PresentationModal({
  title,
  slides,
  onClose,
}: {
  title: string;
  slides: string[];
  onClose: () => void;
}) {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [failedSlides, setFailedSlides] = useState<Record<number, boolean>>({});

  const containerRef = useRef<HTMLDivElement>(null);
  const wheelLockRef = useRef(false);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const goTo = useCallback((next: number) => {
    setIndex((current) => {
      const clamped = Math.max(0, Math.min(slides.length - 1, next));
      setDirection(clamped >= current ? 1 : -1);
      return clamped;
    });
  }, [slides.length]);

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Keyboard navigation — Escape is left to the Dialog's own handling.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") goNext();
      else if (event.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goNext, goPrev]);

  // Preload immediate neighbors so Next/Previous never re-fetches.
  useEffect(() => {
    [index - 1, index + 1].forEach((i) => {
      if (i < 0 || i >= slides.length) return;
      const img = new window.Image();
      img.src = slides[i];
    });
  }, [index, slides]);

  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(document.fullscreenElement === containerRef.current);
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    thumbRefs.current[index]?.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: "smooth",
    });
  }, [index]);

  function toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      containerRef.current?.requestFullscreen().catch(() => {});
    }
  }

  function handleWheel(event: React.WheelEvent) {
    const delta = event.shiftKey ? event.deltaY : event.deltaX;
    if (Math.abs(delta) < WHEEL_THRESHOLD || wheelLockRef.current) return;
    wheelLockRef.current = true;
    if (delta > 0) goNext();
    else goPrev();
    window.setTimeout(() => {
      wheelLockRef.current = false;
    }, WHEEL_COOLDOWN_MS);
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) goNext();
    else if (info.offset.x > SWIPE_THRESHOLD) goPrev();
  }

  const currentFailed = failedSlides[index];

  return (
    <div
      ref={containerRef}
      className="flex h-[92vh] w-[96vw] flex-col overflow-hidden rounded-2xl border border-white/10 bg-background sm:h-[88vh] sm:w-[92vw]"
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3">
          <h2 className="font-heading text-sm font-semibold text-foreground sm:text-base">
            {title}
          </h2>
          <span className="font-mono text-xs text-muted-foreground">
            Slide {index + 1} / {slides.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? t.presentation.exitFullscreen : t.presentation.enterFullscreen}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground/80 transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            {isFullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.presentation.closePresentation}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground/80 transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            <X size={15} />
          </button>
        </div>
      </div>

      <div
        className="relative flex-1 overflow-hidden"
        onWheel={handleWheel}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 flex cursor-grab items-center justify-center p-4 active:cursor-grabbing sm:p-8"
          >
            {currentFailed ? (
              <p className="font-mono text-xs italic text-muted-foreground/80">
                This slide hasn&apos;t been dropped into public{slides[index]} yet.
              </p>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={slides[index]}
                alt={`${title} — slide ${index + 1} of ${slides.length}`}
                draggable={false}
                onError={() =>
                  setFailedSlides((prev) => ({ ...prev, [index]: true }))
                }
                className="max-h-full max-w-full select-none object-contain"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={goPrev}
          disabled={index === 0}
          aria-label={t.presentation.previousSlide}
          className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-background/70 text-foreground/80 backdrop-blur-xl transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:pointer-events-none disabled:opacity-30 sm:left-4"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={index === slides.length - 1}
          aria-label={t.presentation.nextSlide}
          className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-background/70 text-foreground/80 backdrop-blur-xl transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:pointer-events-none disabled:opacity-30 sm:right-4"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-4 py-3 sm:px-6">
        {slides.map((slide, i) => (
          <button
            key={slide + i}
            ref={(el) => {
              thumbRefs.current[i] = el;
            }}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${t.presentation.goToSlide} ${i + 1}`}
            aria-current={i === index}
            className={cn(
              "relative h-12 w-16 shrink-0 overflow-hidden rounded-md border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 sm:h-14 sm:w-20",
              i === index
                ? "border-primary opacity-100"
                : "border-white/10 opacity-50 hover:opacity-80",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide}
              alt=""
              loading="lazy"
              draggable={false}
              className="h-full w-full select-none object-cover"
              onError={(event) => {
                event.currentTarget.style.visibility = "hidden";
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
