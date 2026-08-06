"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MediaPlaceholder } from "@/components/shared/MediaPlaceholder";
import { PresentationViewer } from "@/components/shared/PresentationViewer";
import type { MediaAsset, PresentationDeck } from "@/content/journey";
import { useLanguage } from "@/contexts/LanguageContext";
import { MEDIA_TYPE_ICONS, MEDIA_TYPE_LABELS } from "./journeyIcons";

/** One grid, one "Media Gallery" heading — single images and full slide
 * decks sit side by side as the same kind of tile, not split into separate
 * sections. */
export function JourneyGallery({
  assets,
  presentations,
}: {
  assets?: MediaAsset[];
  presentations?: PresentationDeck[];
}) {
  const { t } = useLanguage();
  if (!assets?.length && !presentations?.length) return null;

  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
        {t.journey.mediaGallery}
      </span>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {assets?.map((asset, index) => {
          const Icon = MEDIA_TYPE_ICONS[asset.type];
          const badgeText = asset.badge ?? MEDIA_TYPE_LABELS[asset.type];
          return (
            <Dialog key={`${asset.type}-${index}`}>
              <DialogTrigger className="group block text-left focus-visible:outline-none">
                <div className="overflow-hidden rounded-xl border border-white/10 transition-colors group-hover:border-primary/30 group-focus-visible:border-primary/50 group-focus-visible:ring-2 group-focus-visible:ring-primary/50">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <MediaPlaceholder
                      icon={Icon}
                      label={MEDIA_TYPE_LABELS[asset.type]}
                      src={asset.image}
                      alt={asset.label}
                      className="h-full w-full transition-transform duration-500 group-hover:scale-105"
                    />

                    <span className="absolute left-3 top-3">
                      <Badge variant="outline" className="border-white/20 bg-background/60 backdrop-blur">
                        {badgeText}
                      </Badge>
                    </span>

                    <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-foreground backdrop-blur-xl">
                        <Icon size={14} />
                        {t.journey.view}
                      </span>
                    </div>
                  </div>
                  <p className="break-words bg-card/60 px-2 py-1.5 text-xs leading-snug text-muted-foreground">
                    {asset.label}
                  </p>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                  <div className="mb-2 flex items-center gap-2">
                    <Icon size={16} className="text-secondary" />
                    <Badge variant="outline" className="border-white/15">
                      {badgeText}
                    </Badge>
                  </div>
                  <DialogTitle className="font-heading text-2xl">{asset.label}</DialogTitle>
                  <DialogDescription>
                    {asset.isPlaceholder
                      ? `This slot is ready for the real ${MEDIA_TYPE_LABELS[asset.type].toLowerCase()} — drop it into public${asset.image}.`
                      : "Preview"}
                  </DialogDescription>
                </DialogHeader>
                <MediaPlaceholder
                  icon={Icon}
                  label={MEDIA_TYPE_LABELS[asset.type]}
                  src={asset.image}
                  alt={asset.label}
                  fit="contain"
                  className="max-h-[70vh] min-h-[240px] w-full"
                />
              </DialogContent>
            </Dialog>
          );
        })}

        {presentations?.map((deck) => (
          <PresentationViewer key={deck.title} title={deck.title} slides={deck.slides} />
        ))}
      </div>
    </div>
  );
}
