"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MessagesSquare } from "lucide-react";
import { useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toolsPlayground, type ToolCategoryName } from "@/content/toolsPlayground";
import { useLanguage } from "@/contexts/LanguageContext";
import { SkillCloudCard } from "./SkillCloudCard";
import { ToolCard } from "./ToolCard";

/** One representative icon per "skills" (flat badge cloud) category. */
const SKILL_CATEGORY_ICONS: Partial<Record<ToolCategoryName, typeof MessagesSquare>> = {
  Communication: MessagesSquare,
};

export function ToolsPlayground() {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ToolCategoryName>(
    toolsPlayground[0].category,
  );
  const active = toolsPlayground.find((c) => c.category === activeCategory)!;
  const framing = language === "id" && active.framingId ? active.framingId : active.framing;

  return (
    <section id="tools-playground" className="gradient-mesh-bg relative overflow-hidden py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          eyebrow="Tools Playground"
          title={t.tools.title}
          description={t.tools.description}
        />

        <Tabs
          value={activeCategory}
          onValueChange={(value) => setActiveCategory(value as ToolCategoryName)}
          className="mt-12"
        >
          <TabsList className="mx-auto flex-wrap">
            {toolsPlayground.map((category) => (
              <TabsTrigger key={category.category} value={category.category}>
                {category.category}
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
            className="mt-10"
          >
            {active.format === "tools" ? (
              <>
                <p className="mb-6 max-w-2xl text-muted-foreground">{framing}</p>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {active.tools.map((tool, index) => (
                    <ToolCard key={tool.name} tool={tool} delay={(index % 3) * 0.05} />
                  ))}
                </div>
              </>
            ) : (
              <SkillCloudCard
                framing={framing}
                items={active.items}
                icon={SKILL_CATEGORY_ICONS[active.category]}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
