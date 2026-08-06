"use client";

import { ImageIcon, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Shows the real asset at `src` once it exists; falls back to a decorative
 * icon + label placeholder when no `src` is given or the file fails to load
 * (e.g. it hasn't been dropped into public/ yet).
 *
 * `fit="cover"` (default) crops to fill — right for uniform grid thumbnails.
 * `fit="contain"` shows the whole image with no cropping — right for a
 * closer-look preview where the asset's real aspect ratio (a portrait
 * poster, say) shouldn't be cut off.
 */
export function MediaPlaceholder({
  label,
  icon: Icon = ImageIcon,
  src,
  alt,
  className,
  fit = "cover",
}: {
  label?: string;
  icon?: LucideIcon;
  src?: string;
  alt?: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/10 bg-card/40",
          fit === "contain" && "flex items-center justify-center",
          className,
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? label ?? ""}
          loading="lazy"
          onError={() => setFailed(true)}
          className={
            fit === "cover"
              ? "h-full w-full object-cover"
              : "max-h-full max-w-full object-contain"
          }
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "gradient-mesh-bg relative flex items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-card/40",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
        <Icon size={28} strokeWidth={1.5} />
        {label && (
          <span className="font-mono text-[10px] uppercase tracking-widest">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
