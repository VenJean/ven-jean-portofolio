"use client";

import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { WordRevealText } from "@/components/shared/WordRevealText";
import { useLanguage } from "@/contexts/LanguageContext";

export function Philosophy() {
  const { t } = useLanguage();

  return (
    <section
      id="philosophy"
      className="gradient-mesh-bg relative overflow-hidden py-32"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-14 px-6 text-center sm:px-8">
        <RevealOnScroll>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
            {t.philosophy.eyebrow}
          </span>
        </RevealOnScroll>

        <div className="flex flex-col gap-2">
          <WordRevealText
            text={t.philosophy.line1}
            highlight={[t.philosophy.line1Highlight]}
            className="text-balance font-heading text-4xl font-semibold leading-tight text-foreground sm:text-6xl"
          />
          <WordRevealText
            text={t.philosophy.line2}
            highlight={[t.philosophy.line2Highlight]}
            className="text-balance font-heading text-4xl font-semibold leading-tight text-foreground sm:text-6xl"
          />
        </div>

        <RevealOnScroll delay={0.1}>
          <p className="max-w-2xl text-balance text-lg text-muted-foreground">
            {t.philosophy.intro}
          </p>
        </RevealOnScroll>

        <div className="flex flex-col gap-3">
          {t.philosophy.lines.map((line, index) => (
            <RevealOnScroll key={line} delay={index * 0.06}>
              <p className="font-heading text-xl text-foreground/90 sm:text-2xl">
                {line}
              </p>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.1}>
          <p className="max-w-xl text-balance text-lg text-muted-foreground">
            {t.philosophy.closingIntro}{" "}
            <span className="text-foreground">
              {t.philosophy.closingHighlight}
            </span>
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}
