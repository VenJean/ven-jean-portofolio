import {
  Clock,
  Megaphone,
  Mic,
  Presentation as PresentationIcon,
  ShieldCheck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { TiltCard } from "@/components/shared/TiltCard";

/** Per-skill icon — split out from the flat badge cloud so each item reads
 * as its own thing, not just a tag in a pile. */
const SKILL_ITEM_ICONS: Record<string, LucideIcon> = {
  "Public Speaking": Mic,
  Presentation: PresentationIcon,
  Teamwork: Users,
  "Time Management": Clock,
  "Rapid Technology Adaptation": Zap,
  "Community Admin": ShieldCheck,
  "Social Media Admin": Megaphone,
};

export function SkillCloudCard({
  framing,
  items,
  icon: Icon,
  delay = 0,
}: {
  framing: string;
  items: string[];
  icon?: LucideIcon;
  delay?: number;
}) {
  return (
    <RevealOnScroll delay={delay}>
      <TiltCard>
        <div className="glass-card flex flex-col gap-5 p-6">
          <div className="flex items-center gap-3">
            {Icon && (
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5">
                <Icon size={18} className="text-secondary" />
              </span>
            )}
            <p className="text-sm text-muted-foreground">{framing}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {items.map((item) => {
              const ItemIcon = SKILL_ITEM_ICONS[item];
              return (
                <div
                  key={item}
                  className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5"
                >
                  {ItemIcon && <ItemIcon size={16} className="shrink-0 text-primary" />}
                  <span className="text-sm text-foreground/80">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </TiltCard>
    </RevealOnScroll>
  );
}
