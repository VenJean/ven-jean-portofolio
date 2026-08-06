"use client";

import { useState } from "react";
import { ArrowUpRight, Link as LinkIcon } from "lucide-react";
import type { ResourceLink } from "@/content/journey";
import { useLanguage } from "@/contexts/LanguageContext";
import { getFaviconUrl } from "@/lib/utils";

function ResourceIcon({ domain, icon }: { domain: string; icon?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <LinkIcon size={16} className="text-muted-foreground" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={icon ?? getFaviconUrl(domain, 64)}
      alt=""
      width={20}
      height={20}
      onError={() => setFailed(true)}
      className="h-5 w-5 object-contain"
    />
  );
}

export function JourneyResources({ resources }: { resources: ResourceLink[] }) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {t.journey.resources}
      </span>
      <div className="flex flex-col gap-2">
        {resources.map((resource) => {
          const domain = new URL(resource.url).hostname.replace(/^www\./, "");
          return (
            <a
              key={resource.url}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="journey-resource group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                <ResourceIcon domain={domain} icon={resource.icon} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-foreground">
                  {resource.label}
                </span>
                <span className="block truncate font-mono text-[11px] text-muted-foreground">
                  {domain}
                </span>
              </span>
              <ArrowUpRight
                size={16}
                className="company-icon shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}
