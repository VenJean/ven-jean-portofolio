import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/journey/Journey";
import { Philosophy } from "@/components/sections/Philosophy";
import { ToolsPlayground } from "@/components/sections/toolsPlayground/ToolsPlayground";
import { WhoAmI } from "@/components/sections/WhoAmI";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <WhoAmI />
      <Philosophy />
      <Journey />
      <ToolsPlayground />
      <Contact />
    </main>
  );
}
