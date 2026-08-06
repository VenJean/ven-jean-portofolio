"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { useLanguage } from "@/contexts/LanguageContext";

export function WhoAmI() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="who-am-i" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <SectionHeading
          eyebrow={t.whoAmI.eyebrow}
          title={t.whoAmI.title}
          description={t.whoAmI.description}
        />

        <div ref={containerRef} className="relative mt-20 pl-10 sm:pl-14">
          <div className="absolute left-[3px] top-2 bottom-2 w-px bg-white/10 sm:left-[7px]" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[3px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-primary to-secondary sm:left-[7px]"
          />

          <ol className="flex flex-col gap-16">
            {t.whoAmI.steps.map((step, index) => (
              <RevealOnScroll key={step.label} as="li" className="relative">
                <span className="absolute -left-10 top-1 flex h-4 w-4 items-center justify-center rounded-full border border-primary/60 bg-background sm:-left-14">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary" />
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-heading text-2xl font-semibold text-foreground sm:text-3xl">
                  {step.label}
                </h3>
                <p className="mt-1 text-muted-foreground">{step.description}</p>
              </RevealOnScroll>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
