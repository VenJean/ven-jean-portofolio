"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn, getFlagUrl } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const NAV_LINKS = [
    { href: "#who-am-i", label: t.nav.story },
    { href: "#philosophy", label: t.nav.philosophy },
    { href: "#journey", label: t.nav.journey },
    { href: "#tools-playground", label: t.nav.tools },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300",
        isScrolled
          ? "glass-card rounded-none border-x-0 border-t-0"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
        <a
          href="#hero"
          className="font-heading text-sm font-semibold tracking-[0.25em] text-foreground"
        >
          VEN JEAN
        </a>

        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <LanguageToggle language={language} setLanguage={setLanguage} />

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 lg:hidden"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card overflow-hidden rounded-none border-x-0 border-t-0 lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block rounded py-2 font-mono text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <LanguageToggle language={language} setLanguage={setLanguage} />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Two flag buttons, no dropdown/menu — switching is a plain Context update
 * over strings already in the bundle, so there's nothing to lazy-load or
 * fetch: the toggle itself must be just as instant as the data behind it. */
function LanguageToggle({
  language,
  setLanguage,
}: {
  language: "en" | "id";
  setLanguage: (language: "en" | "id") => void;
}) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 p-1">
      {(
        [
          { code: "en" as const, flag: "gb", label: "English" },
          { code: "id" as const, flag: "id", label: "Bahasa Indonesia" },
        ]
      ).map((option) => (
        <button
          key={option.code}
          type="button"
          aria-label={option.label}
          aria-pressed={language === option.code}
          onClick={() => setLanguage(option.code)}
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
            language === option.code
              ? "bg-white/15 ring-1 ring-white/20"
              : "opacity-50 hover:opacity-80",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={getFlagUrl(option.flag, 40)}
            alt={option.label}
            width={18}
            height={18}
            className="h-[18px] w-[18px] rounded-full object-cover"
          />
        </button>
      ))}
    </div>
  );
}
