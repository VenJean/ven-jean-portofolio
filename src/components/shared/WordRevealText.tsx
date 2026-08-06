"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { staggerContainer, viewportOnce, wordReveal } from "@/lib/animations";
import { cn } from "@/lib/utils";

/** Cinematic word-by-word reveal, with optional gradient-highlighted words.
 * Shared between Philosophy and Contact so the site's signature reveal
 * reads identically wherever it appears. */
export function WordRevealText({
  text,
  className,
  highlight,
  as = "p",
}: {
  text: string;
  className?: string;
  highlight?: string[];
  as?: "p" | "h2" | "h3";
}) {
  const words = text.split(" ");
  const MotionTag = motion[as];

  return (
    <MotionTag
      variants={staggerContainer(0.06)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={className}
    >
      {words.map((word, index) => {
        const isHighlighted = highlight?.includes(word.replace(/[.,]/g, ""));
        return (
          <Fragment key={`${word}-${index}`}>
            <motion.span
              variants={wordReveal}
              className={cn("inline-block", isHighlighted && "text-gradient")}
            >
              {word}
            </motion.span>
            {index < words.length - 1 ? " " : ""}
          </Fragment>
        );
      })}
    </MotionTag>
  );
}
