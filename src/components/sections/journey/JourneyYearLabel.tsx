/** Compact version of the outlined-year motif — sized for a card, not a
 * full-viewport chapter. Doubles as each card's "timeline indicator": its
 * stroke uses the company accent when one is given. Renders nothing when an
 * entry has no real date rather than inventing one (several Builder
 * projects have none yet). */
export function JourneyYearLabel({ year, accent }: { year?: string; accent?: string }) {
  if (!year) return null;

  return (
    <div
      className="font-heading text-4xl font-bold leading-none text-transparent sm:text-5xl"
      style={{
        WebkitTextStroke: `1.5px color-mix(in oklab, ${accent ?? "var(--primary)"} 55%, transparent)`,
      }}
    >
      {year}
    </div>
  );
}
