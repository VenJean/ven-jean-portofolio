"use client";

import { CheckCircle2, Hammer, Lightbulb, Target } from "lucide-react";
import { PlaceholderNote } from "@/components/shared/PlaceholderNote";
import type { JourneyNarrative } from "@/content/journey";
import { useLanguage } from "@/contexts/LanguageContext";
import { isTodoPlaceholder } from "@/lib/utils";

const STAGES = [
  { key: "problem", idKey: "problemId", labelKey: "problem", icon: Target },
  { key: "productThinking", idKey: "productThinkingId", labelKey: "productThinking", icon: Lightbulb },
] as const;

export function BuilderNarrative({
  narrative,
}: {
  narrative: Extract<JourneyNarrative, { kind: "builder" }>;
}) {
  const { language, t } = useLanguage();
  const building = language === "id" && narrative.buildingId ? narrative.buildingId : narrative.building;

  return (
    <ol className="flex flex-col gap-4">
      {STAGES.map((stage) => {
        const Icon = stage.icon;
        const englishValue = narrative[stage.key];
        const idValue = narrative[stage.idKey];
        const value = language === "id" && idValue ? idValue : englishValue;
        return (
          <li key={stage.key} className="relative flex gap-4 pl-1">
            <span className="absolute left-[15px] top-9 h-[calc(100%-0.75rem)] w-px bg-white/10" />
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-background text-secondary">
              <Icon size={14} />
            </span>
            <div className="flex-1">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {t.journey[stage.labelKey]}
              </span>
              {isTodoPlaceholder(value) ? (
                <PlaceholderNote className="mt-1.5">{value}</PlaceholderNote>
              ) : (
                <p className="mt-1.5 text-foreground/90">{value}</p>
              )}
            </div>
          </li>
        );
      })}

      <li className="relative flex gap-4 pl-1">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-background text-secondary">
          <Hammer size={14} />
        </span>
        <div className="flex-1">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {t.journey.building}
          </span>
          <ol className="mt-1.5 flex flex-col gap-1.5">
            {building.map((step) => (
              <li key={step} className="flex items-start gap-2 text-foreground/90">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary" />
                {step}
              </li>
            ))}
          </ol>
        </div>
      </li>
    </ol>
  );
}
