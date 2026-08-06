"use client";

import { Lightbulb, Rocket, Target, type LucideIcon } from "lucide-react";
import { PlaceholderNote } from "@/components/shared/PlaceholderNote";
import type { JourneyNarrative } from "@/content/journey";
import { useLanguage } from "@/contexts/LanguageContext";
import { isTodoPlaceholder } from "@/lib/utils";

type EntrepreneurNarrativeType = Extract<JourneyNarrative, { kind: "entrepreneur" }>;
type EntrepreneurKey = "opportunity" | "strategy" | "keyLearning";

const STAGES: Array<{
  key: EntrepreneurKey;
  idKey: keyof EntrepreneurNarrativeType;
  labelKey: EntrepreneurKey;
  icon: LucideIcon;
}> = [
  { key: "opportunity", idKey: "opportunityId", labelKey: "opportunity", icon: Target },
  { key: "strategy", idKey: "strategyId", labelKey: "strategy", icon: Lightbulb },
  { key: "keyLearning", idKey: "keyLearningId", labelKey: "keyLearning", icon: Rocket },
];

export function EntrepreneurNarrative({
  narrative,
  accent,
}: {
  narrative: Extract<JourneyNarrative, { kind: "entrepreneur" }>;
  accent: string;
}) {
  const { language, t } = useLanguage();
  const takeaway = language === "id" && narrative.takeawayId ? narrative.takeawayId : narrative.takeaway;

  return (
    <ol className="flex flex-col gap-4">
      {STAGES.map((stage, index) => {
        const Icon = stage.icon;
        const englishValue = narrative[stage.key];
        const idValue = narrative[stage.idKey];
        const value = language === "id" && idValue ? idValue : englishValue;
        return (
          <li key={stage.key} className="relative flex gap-4 pl-1">
            {index < STAGES.length - 1 && (
              <span className="absolute left-[15px] top-9 h-[calc(100%-0.75rem)] w-px bg-white/10" />
            )}
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
              {stage.key === "keyLearning" && (
                <p className="mt-2 font-medium" style={{ color: accent }}>
                  {takeaway}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
