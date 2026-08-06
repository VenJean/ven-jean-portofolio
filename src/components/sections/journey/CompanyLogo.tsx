"use client";

import { useState } from "react";
import type { CompanyBranding } from "@/content/journey";
import { cn, getFaviconUrl } from "@/lib/utils";

/**
 * Logo priority: a real local `company.logo` image, then the domain's
 * favicon, then a colored initials badge. A rounded square (never a circle)
 * so it reads as a proper brand mark, not an avatar. Both image variants are
 * monochrome/muted by default and shift to the full company accent on the
 * parent `.company-card`'s hover — see the `.company-logo`/
 * `.company-logo-initials` rules in globals.css.
 */
export function CompanyLogo({
  company,
  size = 60,
  className,
}: {
  company: CompanyBranding;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = company.logo ?? (company.domain ? getFaviconUrl(company.domain, 128) : undefined);

  if (src && !failed) {
    return (
      <span
        className={cn(
          "company-logo flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5",
          className,
        )}
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={company.name}
          width={size}
          height={size}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "company-logo-initials flex shrink-0 items-center justify-center rounded-xl border font-heading font-bold",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.32 }}
      aria-label={company.name}
    >
      {company.initials}
    </span>
  );
}
