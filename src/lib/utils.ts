import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Pulls the first 4-digit year out of a period string like "May 2023 — July 2023". */
export function extractStartYear(period: string): string {
  return period.match(/\d{4}/)?.[0] ?? period
}

/** True for the "TODO — ..." placeholder copy used across content/*.ts so a
 * component can render it as a visible placeholder instead of real prose. */
export function isTodoPlaceholder(text: string): boolean {
  return /^TODO/i.test(text.trim())
}

/** Real app icon via Google's favicon service — no bundled brand assets to
 * license/maintain, and it covers niche tools (Gamma, Lovable, Cursor) that
 * icon packages like lucide-react don't ship. */
export function getFaviconUrl(domain: string, size = 64): string {
  return `https://www.google.com/s2/favicons?sz=${size}&domain=${domain}`
}

/** Real flag image via flagcdn.com — lucide-react ships no country flags,
 * and an emoji flag silently degrades to plain letters on systems without
 * color-emoji font support. `code` is the ISO 3166-1 alpha-2 code (e.g. "gb"). */
export function getFlagUrl(code: string, width = 40): string {
  return `https://flagcdn.com/w${width}/${code.toLowerCase()}.png`
}
