"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getJourneyByCategory, type JourneyCategory } from "@/content/journey";
import { useLanguage } from "@/contexts/LanguageContext";
import { JourneyCard } from "./JourneyCard";

export function Journey() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<JourneyCategory>("career");
  const entries = getJourneyByCategory(activeCategory);

  const categoryTabs: Array<{ value: JourneyCategory; label: string }> = [
    { value: "career", label: t.journey.tabCareer },
    { value: "entrepreneur", label: t.journey.tabEntrepreneur },
    { value: "builder", label: t.journey.tabBuilder },
  ];

  return (
    <section id="journey" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-5xl px-6 sm:px-8">
        <SectionHeading
          eyebrow={t.journey.eyebrow}
          title={t.journey.title}
          description={t.journey.description}
        />

        <Tabs
          value={activeCategory}
          onValueChange={(value) => setActiveCategory(value as JourneyCategory)}
          className="mt-12"
        >
          <TabsList className="mx-auto">
            {categoryTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-col gap-6"
          >
            {entries.map((entry, index) => (
              <JourneyCard key={entry.slug} entry={entry} delay={Math.min(index, 3) * 0.05} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
