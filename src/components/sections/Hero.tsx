"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { ConnectionNodes } from "@/components/shared/ConnectionNodes";
import { useLanguage } from "@/contexts/LanguageContext";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { HeroPortrait } from "./HeroPortrait";

export function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="gradient-mesh-bg relative flex min-h-screen items-center overflow-hidden bg-background"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <ConnectionNodes className="absolute inset-0 h-full w-full" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={staggerContainer(0.15, 0.1)}
        initial="hidden"
        animate="visible"
        className="hero-grid relative z-10 mx-auto max-w-5xl items-start gap-y-6 px-6 sm:px-8"
      >
        <motion.span
          variants={fadeUp}
          style={{ gridArea: "eyebrow" }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground"
        >
          C. Caesar Sancho Ven Jean
        </motion.span>

        <motion.h1
          variants={fadeUp}
          style={{ gridArea: "title" }}
          className="font-heading text-6xl font-semibold leading-[0.95] tracking-tight text-foreground sm:text-8xl md:text-9xl"
        >
          VEN JEAN
        </motion.h1>

        <motion.p
          variants={fadeUp}
          style={{ gridArea: "subtitle" }}
          className="text-gradient font-heading text-lg font-medium sm:text-2xl"
        >
          Product Builder • Web3 Operator • AI Creator
        </motion.p>

        <motion.p
          variants={fadeUp}
          style={{ gridArea: "description" }}
          className="max-w-2xl text-balance text-base text-muted-foreground sm:text-lg"
        >
          {t.hero.description}
        </motion.p>

        <HeroPortrait />

        <motion.a
          variants={fadeUp}
          href="#who-am-i"
          style={{ gridArea: "cta" }}
          className="group mt-4 inline-flex w-fit items-center gap-3 rounded-full border border-white/15 bg-white/5 px-6 py-3 font-mono text-sm uppercase tracking-wider text-foreground backdrop-blur-xl transition-colors hover:border-primary/50 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
          {t.hero.cta}
          <ArrowDown
            size={16}
            className="transition-transform group-hover:translate-y-1"
          />
        </motion.a>
      </motion.div>
    </section>
  );
}
