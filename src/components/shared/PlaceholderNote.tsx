import { PenLine } from "lucide-react";
import { cn } from "@/lib/utils";

/** Visibly-a-placeholder note for copy that hasn't been written yet — used
 * instead of ever inventing facts about the user's own businesses/projects. */
export function PlaceholderNote({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-start gap-2 rounded-lg border border-dashed border-white/15 bg-white/[0.03] px-3 py-2 font-mono text-xs italic text-muted-foreground/80",
        className,
      )}
    >
      <PenLine size={13} className="mt-0.5 shrink-0 text-secondary/70" />
      <span>{children.replace(/^TODO\s*—\s*/i, "")}</span>
    </p>
  );
}
