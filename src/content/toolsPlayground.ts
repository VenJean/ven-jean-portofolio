export type ToolCategoryName =
  | "AI"
  | "Design"
  | "Marketing"
  | "Knowledge"
  | "Communication";

export type ToolEntry = {
  name: string;
  /** What this tool actually produces / covers — shown as chips. */
  outputs: string[];
  /** Short, real "how and why I use it" line — framing, not a claimed fact. */
  note: string;
  /** Indonesian translation of `note`. */
  noteId?: string;
  /** Product domain (no protocol) used to fetch a real app icon. Omitted
   * for entries that aren't actual software (Crypto, English). */
  domain?: string;
};

export type ToolCategory =
  | { category: ToolCategoryName; format: "tools"; framing: string; framingId?: string; tools: ToolEntry[] }
  | { category: ToolCategoryName; format: "skills"; framing: string; framingId?: string; items: string[] };

/**
 * "How I work," not "what software I know" — every category explains the
 * output and the reason, never just a name. Categories with genuinely named
 * tools (each with their own distinct output list) use the "tools" format;
 * flat skill/knowledge lists with no natural per-item output use "skills".
 */
export const toolsPlayground: ToolCategory[] = [
  {
    category: "AI",
    format: "tools",
    framing: "Where an idea gets shaped, argued with, and eventually built.",
    framingId: "Tempat sebuah ide dibentuk, diperdebatkan, dan akhirnya dibangun.",
    tools: [
      {
        name: "Gamma",
        outputs: ["Presentation Deck", "Pitch Deck", "Education Slides"],
        note: "Turning a rough outline into a client-ready deck in minutes, not hours.",
        noteId: "Mengubah outline kasar menjadi deck yang siap dipresentasikan ke klien dalam hitungan menit, bukan jam.",
        domain: "gamma.app",
      },
      {
        name: "ChatGPT",
        outputs: ["Copywriting", "Poster", "Content", "Visual Slides", "Research"],
        note: "Thinking partner for research and first-draft copy before anything becomes final.",
        noteId: "Rekan berpikir untuk riset dan draf pertama copy sebelum semuanya menjadi final.",
        domain: "chatgpt.com",
      },
      {
        name: "Claude",
        outputs: ["Product Discussion", "Product Strategy", "Brainstorming", "PRD", "Planning"],
        note: "Where product ideas get pressure-tested before they turn into a spec.",
        noteId: "Tempat ide produk diuji habis-habisan sebelum berubah menjadi spesifikasi.",
        domain: "claude.ai",
      },
      {
        name: "Claude Code",
        outputs: [
          "Telegram Bot",
          "Mini App",
          "Website",
          "Android App",
          "iOS App",
          "AI Assistant",
          "Automation",
        ],
        note: "My default builder — takes a product idea all the way to shipped code.",
        noteId: "Builder utama saya — membawa ide produk sampai menjadi kode yang benar-benar dirilis.",
        domain: "claude.com",
      },
      {
        name: "Cursor",
        outputs: ["Coding", "Refactoring", "Debugging", "Development"],
        note: "Fast, focused work inside an existing codebase.",
        noteId: "Kerja cepat dan fokus di dalam codebase yang sudah ada.",
        domain: "cursor.com",
      },
    ],
  },
  {
    category: "Design",
    format: "tools",
    framing: "Where a requirement becomes something you can actually click through.",
    framingId: "Tempat sebuah requirement berubah menjadi sesuatu yang benar-benar bisa diklik.",
    tools: [
      {
        name: "Figma",
        outputs: ["Wireframe", "Prototype", "UI Design"],
        note: "Where a business requirement becomes an actual screen.",
        noteId: "Tempat kebutuhan bisnis berubah menjadi tampilan layar yang sesungguhnya.",
        domain: "figma.com",
      },
      {
        name: "Lovable",
        outputs: ["Rapid Website Design", "Landing Page", "MVP Design"],
        note: "For when a website needs to exist today, not next sprint.",
        noteId: "Untuk saat sebuah website harus sudah ada hari ini, bukan sprint berikutnya.",
        domain: "lovable.dev",
      },
    ],
  },
  {
    category: "Marketing",
    format: "tools",
    framing: "Turning a message into something people actually stop and read.",
    framingId: "Mengubah sebuah pesan menjadi sesuatu yang benar-benar dihentikan dan dibaca orang.",
    tools: [
      {
        name: "Canva",
        outputs: ["Poster", "Social Media", "Presentation"],
        note: "Fast, on-brand visuals for campaigns and daily community content.",
        noteId: "Visual yang cepat dan sesuai brand untuk kampanye dan konten komunitas harian.",
        domain: "canva.com",
      },
      {
        name: "CapCut",
        outputs: ["Video Editing", "Reels", "TikTok"],
        note: "Turning raw footage into something worth watching.",
        noteId: "Mengubah rekaman mentah menjadi sesuatu yang layak ditonton.",
        domain: "capcut.com",
      },
    ],
  },
  {
    category: "Knowledge",
    format: "tools",
    framing: "Domain knowledge earned by operating in it, not just reading about it.",
    framingId: "Pengetahuan domain yang didapat dari benar-benar beroperasi di dalamnya, bukan sekadar membacanya.",
    tools: [
      {
        name: "Crypto",
        outputs: ["DEX", "CEX", "Wallet", "Gas Fee", "Market Cap", "Blockchain Basics"],
        note: "Working knowledge from actually operating inside Web3 communities and products.",
        noteId: "Pengetahuan praktis dari benar-benar beroperasi di dalam komunitas dan produk Web3.",
        domain: "bitcoin.org",
      },
      {
        name: "English",
        outputs: ["Level B2", "Daily Communication"],
        note: "Enough to work, write, and communicate daily with an international team.",
        noteId: "Cukup untuk bekerja, menulis, dan berkomunikasi sehari-hari dengan tim internasional.",
      },
      {
        name: "Programming Language",
        outputs: ["HTML", "CSS", "JavaScript", "TailwindCSS", "Basic Frontend Development"],
        note: "Enough frontend to build and ship a real interface myself.",
        noteId: "Cukup frontend untuk membangun dan merilis sendiri sebuah interface yang nyata.",
      },
    ],
  },
  {
    category: "Communication",
    format: "skills",
    framing: "How I actually operate day to day, not just what I know.",
    framingId: "Bagaimana saya benar-benar beroperasi sehari-hari, bukan sekadar apa yang saya tahu.",
    items: [
      "Public Speaking",
      "Presentation",
      "Teamwork",
      "Time Management",
      "Rapid Technology Adaptation",
      "Community Admin",
      "Social Media Admin",
    ],
  },
];
