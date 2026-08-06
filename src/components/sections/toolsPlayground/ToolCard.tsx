"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bitcoin, ChevronDown, Code2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { TiltCard } from "@/components/shared/TiltCard";
import type { ToolEntry } from "@/content/toolsPlayground";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn, getFaviconUrl, getFlagUrl } from "@/lib/utils";

/** Fallback icon if the real image (favicon/flag) above fails to load, or
 * for entries with no image source of their own (e.g. a skill, not a product). */
const TOOL_ICON_OVERRIDES: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Crypto: Bitcoin,
  "Programming Language": Code2,
};
/** Real image source for entries with no product `domain` of their own. */
const TOOL_IMAGE_OVERRIDES: Record<string, string> = {
  English: getFlagUrl("gb"),
};

export function ToolCard({ tool, delay = 0 }: { tool: ToolEntry; delay?: number }) {
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [iconFailed, setIconFailed] = useState(false);
  const OverrideIcon = TOOL_ICON_OVERRIDES[tool.name];
  const imageSrc = tool.domain ? getFaviconUrl(tool.domain) : TOOL_IMAGE_OVERRIDES[tool.name];
  const note = language === "id" && tool.noteId ? tool.noteId : tool.note;

  return (
    <RevealOnScroll delay={delay}>
      <TiltCard disabled={isExpanded}>
        <div className="glass-card flex h-full flex-col gap-4 p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5">
              {imageSrc && !iconFailed ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imageSrc}
                  alt=""
                  width={22}
                  height={22}
                  loading="lazy"
                  onError={() => setIconFailed(true)}
                  className="h-[22px] w-[22px] rounded-sm object-contain"
                />
              ) : OverrideIcon ? (
                <OverrideIcon size={18} className="text-secondary" />
              ) : (
                <Sparkles size={18} className="text-secondary" />
              )}
            </span>
            <h3 className="font-heading text-lg font-semibold text-foreground">{tool.name}</h3>
          </div>

          <button
            type="button"
            onClick={() => setIsExpanded((open) => !open)}
            aria-expanded={isExpanded}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-wider text-foreground/80 transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
          >
            {isExpanded ? t.journey.hideDetails : t.journey.viewDetails}
            <ChevronDown
              size={14}
              className={cn("transition-transform", isExpanded && "rotate-180")}
            />
          </button>

          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
                  <p className="text-sm text-muted-foreground">{note}</p>
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                      {t.tools.covers}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {tool.outputs.map((output) => (
                        <Badge key={output} variant="secondary" className="bg-white/5 text-foreground/80">
                          {output}
                        </Badge>
                      ))}
                    </div>
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
