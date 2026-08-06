"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Lightbulb } from "lucide-react";
import { useState, type CSSProperties } from "react";
import { Badge } from "@/components/ui/badge";
import { PlaceholderNote } from "@/components/shared/PlaceholderNote";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { TiltCard } from "@/components/shared/TiltCard";
import { useLanguage } from "@/contexts/LanguageContext";
import type { JourneyEntry } from "@/content/journey";
import { cn, isTodoPlaceholder } from "@/lib/utils";
import { CompanyPanel } from "./CompanyPanel";
import { JourneyGallery } from "./JourneyGallery";
import { JourneyResources } from "./JourneyResources";
import { JourneyYearLabel } from "./JourneyYearLabel";
import { CareerNarrative } from "./narratives/CareerNarrative";
import { EntrepreneurNarrative } from "./narratives/EntrepreneurNarrative";
import { BuilderNarrative } from "./narratives/BuilderNarrative";

export function JourneyCard({ entry, delay = 0 }: { entry: JourneyEntry; delay?: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { language, t } = useLanguage();
  const accent = entry.company.accent;
  const accentStyle = { "--accent": accent } as CSSProperties;
  const mission = language === "id" && entry.missionId ? entry.missionId : entry.mission;
  const reflection = language === "id" && entry.reflectionId ? entry.reflectionId : entry.reflection;

  return (
    <RevealOnScroll delay={delay}>
      <TiltCard disabled={isExpanded}>
        <div className="company-card glass-card overflow-hidden" style={accentStyle}>
          {/* Header row: Journey content (left) + Company Identity Panel (right) —
              the panel only spans this row, not the full expanded card. */}
          <div className="flex flex-col sm:flex-row sm:items-stretch">
            <div className="min-w-0 flex-1 p-6 sm:p-8">
              <div className="flex items-start gap-5">
                <JourneyYearLabel year={entry.year} accent={accent} />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
                      {entry.role}
                    </h3>
                    {entry.type && (
                      <Badge variant="outline" className="company-chip border-secondary/40 text-secondary">
                        {entry.type}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 font-mono text-sm text-muted-foreground">
                    {entry.organization}
                    {entry.period ? ` · ${entry.period}` : ""}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                {isTodoPlaceholder(entry.mission) ? (
                  <PlaceholderNote>{mission}</PlaceholderNote>
                ) : (
                  <p className="max-w-2xl text-balance font-heading text-lg font-medium text-foreground/90 sm:text-xl">
                    &ldquo;{mission}&rdquo;
                  </p>
                )}
              </div>

              <div className="mt-5 flex flex-col gap-2">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {t.journey.contribution}
                </span>
                <div className="flex flex-wrap gap-2">
                  {entry.contribution.map((skill) => (
                    <Badge key={skill} variant="secondary" className="company-chip bg-white/5 text-foreground/80">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsExpanded((open) => !open)}
                aria-expanded={isExpanded}
                className="company-button mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
              >
                {isExpanded ? t.journey.hideDetails : t.journey.viewDetails}
                <ChevronDown
                  size={14}
                  className={cn("transition-transform", isExpanded && "rotate-180")}
                />
              </button>
            </div>

            <CompanyPanel company={entry.company} className="sm:w-[23%] sm:shrink-0" />
          </div>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                  <div className="flex flex-col gap-6 border-t border-white/10 pt-6">
                    {entry.narrative.kind === "career" && (
                      <CareerNarrative narrative={entry.narrative} />
                    )}
                    {entry.narrative.kind === "entrepreneur" && (
                      <EntrepreneurNarrative narrative={entry.narrative} accent={accent} />
                    )}
                    {entry.narrative.kind === "builder" && (
                      <BuilderNarrative narrative={entry.narrative} />
                    )}

                    {(entry.gallery || entry.presentations) && (
                      <JourneyGallery assets={entry.gallery} presentations={entry.presentations} />
                    )}

                    {entry.resources && <JourneyResources resources={entry.resources} />}

                    {entry.category !== "entrepreneur" && (
                      <div
                        className="glass-card flex items-start gap-3 border-l-2 p-4"
                        style={{ borderLeftColor: accent }}
                      >
                        <Lightbulb size={18} className="company-icon mt-0.5 shrink-0" />
                        <div>
                          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                            {t.journey.reflection}
                          </span>
                          {isTodoPlaceholder(entry.reflection ?? "") ? (
                            <PlaceholderNote className="mt-1">{reflection ?? ""}</PlaceholderNote>
                          ) : (
                            <p className="mt-1 text-foreground/90">{reflection}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </TiltCard>
    </RevealOnScroll>
  );
}
