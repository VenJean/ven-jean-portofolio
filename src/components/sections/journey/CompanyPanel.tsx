"use client";

import { ExternalLink } from "lucide-react";
import type { CSSProperties } from "react";
import type { CompanyBranding } from "@/content/journey";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { CompanyLogo } from "./CompanyLogo";

/**
 * The Company Identity Panel — a dedicated ~20–25%-width brand zone beside
 * the Journey header (full-width strip on mobile, vertical rail on sm+).
 * Entirely data-driven off `company`; nothing here is per-entry logic.
 *
 * One single trigger for every reveal here (logo color, watermark shift,
 * logo scale, industry text color, panel glow/border) — hovering or
 * touch-pressing anywhere on the parent `.company-card`, not just this
 * panel. All of it is plain CSS keyed off `.company-card:hover`/`:active`
 * (see globals.css), so there's no JS gesture-tracking to keep in sync
 * across this component and its parent.
 */
export function CompanyPanel({
  company,
  className,
}: {
  company: CompanyBranding;
  className?: string;
}) {
  const { language, t } = useLanguage();
  const accentStyle = { "--accent": company.accent } as CSSProperties;
  // Only link where a real URL is confirmed — never a fabricated one.
  const websiteUrl = company.website ?? (company.domain ? `https://${company.domain}` : undefined);
  const industry = language === "id" && company.industryId ? company.industryId : company.industry;

  return (
    <div
      style={accentStyle}
      className={cn(
        "company-panel flex flex-row items-center gap-4 rounded-b-2xl border-t border-white/10 px-6 py-5",
        "sm:flex-col sm:justify-center sm:gap-3 sm:rounded-none sm:rounded-r-2xl sm:border-l sm:border-t-0 sm:px-4 sm:py-8 sm:text-center",
        className,
      )}
    >
      <span
        aria-hidden
        className="company-panel-watermark pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden font-heading font-bold leading-none"
        style={{ color: company.accent, opacity: 0.05, fontSize: "clamp(3.25rem, 11vw, 6.5rem)" }}
      >
        {company.initials}
      </span>

      <div className="company-logo-wrap shrink-0">
        <CompanyLogo company={company} size={48} />
      </div>

      <div className="flex min-w-0 flex-col sm:items-center">
        <p className="truncate font-heading text-sm font-semibold text-foreground sm:text-base">
          {company.name}
        </p>
        <p className="company-panel-industry truncate font-mono text-[11px] uppercase tracking-wider">
          {industry}
        </p>

        {websiteUrl ? (
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="company-website-button mt-3 inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            {t.journey.viewWebsite}
            <ExternalLink size={11} />
          </a>
        ) : (
          <span
            aria-disabled="true"
            title="Website link not available yet"
            className="company-website-button company-website-button--disabled mt-3 inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-dashed px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider"
          >
            {t.journey.comingSoon}
          </span>
        )}
      </div>
    </div>
  );
}
