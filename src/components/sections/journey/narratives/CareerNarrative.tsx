"use client";

import { Badge } from "@/components/ui/badge";
import type { JourneyNarrative } from "@/content/journey";
import { useLanguage } from "@/contexts/LanguageContext";

export function CareerNarrative({
  narrative,
}: {
  narrative: Extract<JourneyNarrative, { kind: "career" }>;
}) {
  const { t } = useLanguage();
  if (!narrative.pagesDesigned) return null;

  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {t.journey.pagesDesigned}
      </span>
      <div className="flex flex-wrap gap-2">
        {narrative.pagesDesigned.map((page) => (
          <Badge key={page} variant="outline" className="border-white/15">
            {page}
          </Badge>
        ))}
      </div>
    </div>
  );
}
