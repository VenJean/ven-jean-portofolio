"use client";

import { Presentation as PresentationIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { MediaPlaceholder } from "./MediaPlaceholder";
import { PresentationModal } from "./PresentationModal";

/**
 * A full slide deck as one gallery-style tile (cover = first slide, same
 * shape as the Media Gallery's poster/screenshot cards) — hovering reveals
 * "View Presentation", clicking opens a fullscreen keynote viewer
 * (PresentationModal). Reusable: any future deck only needs a title and an
 * ordered list of slide image paths.
 */
export function PresentationViewer({
  title,
  slides,
}: {
  title: string;
  slides: string[];
}) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const slidesLabel = `${slides.length} ${t.presentation.slidesSuffix}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="group block text-left focus-visible:outline-none">
        <div className="overflow-hidden rounded-xl border border-white/10 transition-colors group-hover:border-primary/30 group-focus-visible:border-primary/50 group-focus-visible:ring-2 group-focus-visible:ring-primary/50">
          <div className="relative aspect-[4/3] overflow-hidden">
            <MediaPlaceholder
              icon={PresentationIcon}
              label={slidesLabel}
              src={slides[0]}
              alt={title}
              className="h-full w-full transition-transform duration-500 group-hover:scale-105"
            />

            <span className="absolute left-3 top-3">
              <Badge variant="outline" className="border-white/20 bg-background/60 backdrop-blur">
                {slidesLabel}
              </Badge>
            </span>

            <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-foreground backdrop-blur-xl">
                <PresentationIcon size={14} />
                {t.presentation.viewPresentation}
              </span>
            </div>
          </div>
          <p className="truncate bg-card/60 px-3 py-2 text-sm text-foreground">{title}</p>
        </div>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="w-auto max-w-none gap-0 border-none bg-transparent p-0 shadow-none ring-0 sm:max-w-none"
      >
        <PresentationModal title={title} slides={slides} onClose={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
