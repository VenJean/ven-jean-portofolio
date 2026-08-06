import { cn } from "@/lib/utils";
import { RevealOnScroll } from "./RevealOnScroll";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <RevealOnScroll>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-secondary">
            {eyebrow}
          </span>
        </RevealOnScroll>
      )}
      <RevealOnScroll delay={0.05}>
        <h2 className="text-balance font-heading text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </RevealOnScroll>
      {description && (
        <RevealOnScroll delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-balance text-base text-muted-foreground sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </RevealOnScroll>
      )}
    </div>
  );
}
