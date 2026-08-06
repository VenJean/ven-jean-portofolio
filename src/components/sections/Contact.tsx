"use client";

import { Menu } from "@base-ui/react/menu";
import { Briefcase, Camera, ChevronDown, FileText, Mail, MessageCircle, Send, type LucideIcon } from "lucide-react";
import { RevealOnScroll } from "@/components/shared/RevealOnScroll";
import { WordRevealText } from "@/components/shared/WordRevealText";
import { resumeOptions, socialLinks } from "@/content/social";
import { useLanguage } from "@/contexts/LanguageContext";

// lucide-react doesn't ship brand/logo icons — these are the closest
// generic stand-ins, kept consistent with the icon language used everywhere
// else on the site rather than pulling in a separate brand-icon package.
const SOCIAL_ICONS: Record<string, LucideIcon> = {
  LinkedIn: Briefcase,
  Email: Mail,
  Instagram: Camera,
  Telegram: Send,
  WhatsApp: MessageCircle,
};

/** One "Resume" pill that opens a small menu of role-specific variants,
 * instead of a single generic file — picks up new/removed entries from
 * `resumeOptions` automatically. */
function ResumeMenu() {
  return (
    <Menu.Root>
      <Menu.Trigger className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-foreground/80 backdrop-blur-xl transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 data-[popup-open]:border-primary/50 data-[popup-open]:bg-primary/10 data-[popup-open]:text-foreground">
        <FileText size={14} className="text-secondary transition-transform group-hover:scale-110" />
        Resume
        <ChevronDown size={12} className="transition-transform data-[popup-open]:rotate-180" />
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner sideOffset={8}>
          <Menu.Popup className="min-w-[200px] rounded-xl border border-white/10 bg-popover p-1.5 text-popover-foreground shadow-lg ring-1 ring-foreground/10 backdrop-blur-xl data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95">
            {resumeOptions.map((option) => (
              <Menu.LinkItem
                key={option.label}
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                closeOnClick
                className="flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 font-mono text-xs uppercase tracking-wider text-foreground/80 outline-none transition-colors data-[highlighted]:bg-primary/10 data-[highlighted]:text-foreground"
              >
                <FileText size={13} className="shrink-0 text-secondary" />
                {option.label}
              </Menu.LinkItem>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

export function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="gradient-mesh-bg relative overflow-hidden py-32">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-16 px-6 text-center sm:px-8">
        <div className="flex flex-col gap-3">
          <WordRevealText
            as="h2"
            text={t.contact.headline1}
            className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground sm:text-5xl"
          />
          <WordRevealText
            text={t.contact.headline2}
            className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground/90 sm:text-5xl"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {t.contact.words.map((word, index) => (
            <RevealOnScroll key={word} delay={index * 0.08}>
              <span className="font-heading text-2xl font-semibold text-gradient sm:text-3xl">
                {word}
              </span>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.1}>
          <p className="text-balance font-heading text-2xl font-semibold text-foreground sm:text-4xl">
            {t.contact.closing}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((link) => {
              const Icon = SOCIAL_ICONS[link.label] ?? Mail;

              if (link.isPlaceholder) {
                return (
                  <span
                    key={link.label}
                    aria-disabled="true"
                    title={`${link.label} not available yet`}
                    className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-dashed border-white/15 bg-white/5 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-foreground/40 backdrop-blur-xl"
                  >
                    <Icon size={14} className="text-secondary/40" />
                    {link.label}
                  </span>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-foreground/80 backdrop-blur-xl transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  <Icon size={14} className="text-secondary transition-transform group-hover:scale-110" />
                  {link.label}
                </a>
              );
            })}
            <ResumeMenu />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
