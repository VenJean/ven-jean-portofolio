export type JourneyCategory = "career" | "entrepreneur" | "builder";

export type MediaAssetType =
  | "website"
  | "prototype"
  | "presentation"
  | "poster"
  | "prd"
  | "screenshot"
  | "demo"
  | "github"
  | "video"
  /** Real-world/on-the-job photos — not an app screenshot. */
  | "activity"
  /** Screenshots specifically of a bot in action (chat/Telegram, etc). */
  | "botActivity"
  /** Product/packaging photos and product marketing shots. */
  | "product"
  /** Brand logo/badge artwork. */
  | "logo"
  /** Android app screens. */
  | "androidApp"
  /** Telegram Mini App screens. */
  | "miniApp";

export type MediaAsset = {
  type: MediaAssetType;
  label: string;
  /** Path under public/images/journey/<slug>/ — drop the real file in to replace the placeholder. */
  image: string;
  url?: string;
  isPlaceholder?: boolean;
  /** Override the tile's badge text (defaults to the type's label) — for one-off tags like "Site 1"/"Site 2" that aren't a reusable media type. */
  badge?: string;
};

/** A single external link shown in the card's "Resources" section — icon is
 * derived from the URL's own domain favicon, nothing to configure per entry. */
export type ResourceLink = {
  label: string;
  url: string;
  /** Override the auto-fetched domain favicon (e.g. a GitHub Pages/Vercel host with no real icon of its own) with a local logo. */
  icon?: string;
};

/** A full slide deck, viewed one slide at a time in <PresentationViewer /> —
 * distinct from `MediaAsset` (a single image) since a deck needs its own
 * ordered slide list rather than one image path. */
export type PresentationDeck = {
  title: string;
  /** Paths under public/images/journey/<slug>/, in slide order. */
  slides: string[];
};

/**
 * Per-company branding for a Journey card — a real favicon-based logo where
 * a public domain is confirmed, otherwise a colored initials badge. `accent`
 * drives the card's glow/border/chip/icon color; it is never used to
 * recolor the card background.
 */
export type CompanyBranding = {
  name: string;
  accent: string;
  /** 1–2 letter fallback badge, shown when there's no `domain` (or its favicon 404s). */
  initials: string;
  /** Real domain used to fetch a favicon logo — omitted where none is confirmed. */
  domain?: string;
  /** Local logo image (e.g. "/images/journey/<slug>/logo.png"). Takes priority over the domain favicon. */
  logo?: string;
  /** Exact "View Website" URL. Falls back to `https://${domain}` when omitted. */
  website?: string;
  /** Short category shown under the name in the Company Identity Panel, e.g. "Prop Trading Firm". */
  industry: string;
  /** Indonesian translation of `industry`. */
  industryId?: string;
};

/**
 * Category-specific story shape for the expanded detail panel. Kept as a
 * discriminated union rather than flattened into generic fields so
 * Entrepreneur's Opportunity→Strategy→Key Learning flow and Builder's
 * Problem→Product Thinking→Building flow don't lose fidelity to a
 * lowest-common-denominator shape.
 */
export type JourneyNarrative =
  | { kind: "career"; pagesDesigned?: string[] }
  | {
      kind: "entrepreneur";
      opportunity: string;
      strategy: string;
      keyLearning: string;
      /** The one-line lesson, highlighted in the card's accent color under keyLearning. */
      takeaway: string;
      /** Indonesian translations — same fields, mirrored. */
      opportunityId?: string;
      strategyId?: string;
      keyLearningId?: string;
      takeawayId?: string;
    }
  | {
      kind: "builder";
      /** The user pain point or market gap — deeper than the hero's short mission summary. */
      problem: string;
      /** Why this solution over another — the product decision, not the tech choice. */
      productThinking: string;
      /** The product workflow, in order (requirements → user flow → spec → build → test → iterate). Not a tech stack. */
      building: string[];
      /** Indonesian translations — same fields, mirrored. */
      problemId?: string;
      productThinkingId?: string;
      buildingId?: string[];
    };

export type JourneyEntry = {
  slug: string;
  category: JourneyCategory;
  /** Big label on the card. Omitted (not invented) when no real date exists. */
  year?: string;
  period?: string;
  /** Card "Role" — job title for career, "Founder" for entrepreneur/builder. */
  role: string;
  /** Card "Company" — employer, business name, or project name. */
  organization: string;
  company: CompanyBranding;
  type?: string;
  /** Card "Mission". "TODO — ..." strings render as a visible placeholder (see isTodoPlaceholder). */
  mission: string;
  /** Indonesian translation of `mission`. */
  missionId?: string;
  /** Card "Lesson Learned". Not shown for entrepreneur entries — Key Learning in the narrative covers that. */
  reflection?: string;
  /** Indonesian translation of `reflection`. */
  reflectionId?: string;
  contribution: string[];
  narrative: JourneyNarrative;
  gallery?: MediaAsset[];
  presentations?: PresentationDeck[];
  resources?: ResourceLink[];
};

export const journeyEntries: JourneyEntry[] = [
  // ---------------------------------------------------------------- CAREER
  {
    slug: "bot-cam",
    category: "career",
    year: "2023",
    period: "May 2023 — July 2023",
    role: "BOT CAM",
    organization: "PT Telkomsel",
    company: {
      name: "Telkomsel",
      accent: "#E4022D",
      initials: "TS",
      domain: "telkomsel.com",
      website: "https://www.telkomsel.com/",
      industry: "Telecommunications Company",
      industryId: "Perusahaan Telekomunikasi",
    },
    type: "Internship",
    mission:
      "Build Telegram Bot using JavaScript, Google Spreadsheet and Google Apps Script.",
    missionId:
      "Membangun Bot Telegram menggunakan JavaScript, Google Spreadsheet, dan Google Apps Script.",
    reflection: "This project introduced me to automation and product thinking.",
    reflectionId: "Proyek ini mengenalkan saya pada otomatisasi dan cara berpikir produk.",
    contribution: [
      "JavaScript",
      "Telegram Bot",
      "Google Spreadsheet",
      "Google Apps Script",
      "Excel Data Cleaning",
    ],
    narrative: { kind: "career" },
    gallery: [
      { type: "botActivity", label: "Bot Activity", image: "/images/journey/bot-cam/screenshot-1.png" },
      { type: "botActivity", label: "Bot Activity", image: "/images/journey/bot-cam/screenshot-2.png" },
    ],
  },
  {
    slug: "product-project-educator",
    category: "career",
    year: "2023",
    period: "September 2023 — December 2023",
    role: "Product Project Educator",
    organization: "PT ENEL",
    company: {
      name: "ENEL",
      accent: "#10B981",
      initials: "EN",
      industry: "Product Education Platform",
      industryId: "Platform Edukasi Produk",
    },
    mission:
      "Help users understand products and perform live transactions confidently.",
    missionId:
      "Membantu pengguna memahami produk dan melakukan transaksi langsung dengan percaya diri.",
    reflection: "Technology is useless if users don't understand how to use it.",
    reflectionId: "Teknologi tidak ada gunanya jika pengguna tidak memahami cara menggunakannya.",
    contribution: [
      "Product Education",
      "Customer Communication",
      "Product Walkthrough",
      "Live Guidance",
    ],
    narrative: { kind: "career" },
  },
  {
    slug: "web-designer",
    category: "career",
    year: "2024",
    period: "August 2024 — January 2025",
    role: "Web Designer",
    organization: "PT Rumah & Club 1001 Bintang Vessilia",
    company: {
      name: "Rumah & Club",
      accent: "#EC4899",
      initials: "RC",
      logo: "/images/journey/web-designer/logo.png",
      industry: "Rewards & Marketplace Platform",
      industryId: "Platform Rewards & Marketplace",
    },
    mission: "Transform business requirements into responsive web experiences.",
    missionId: "Mengubah kebutuhan bisnis menjadi pengalaman web yang responsif.",
    reflection: "Great design starts from understanding business problems.",
    reflectionId: "Desain yang baik dimulai dari memahami masalah bisnis.",
    contribution: [
      "Business Analysis",
      "UI Design",
      "Responsive Design",
      "Figma",
      "Stakeholder Collaboration",
    ],
    narrative: {
      kind: "career",
      pagesDesigned: [
        "Welcome",
        "Login",
        "Marketplace",
        "Reward",
        "Wallet",
        "Withdraw",
        "Profile",
      ],
    },
    gallery: [
      {
        type: "prototype",
        label: "Figma Pages",
        image: "/images/journey/web-designer/figma-pages.png",
      },
      {
        type: "prototype",
        label: "Figma Pages",
        image: "/images/journey/web-designer/screenshot-1.png",
      },
      {
        type: "prototype",
        label: "Figma Pages",
        image: "/images/journey/web-designer/screenshot-2.png",
      },
    ],
    resources: [
      {
        label: "Figma Design File",
        url: "https://www.figma.com/design/g6cMQ8AdrmpOiKKjWMEwil/DAY-1---Icon--Coloring---Plugin?node-id=0-1&t=wYMFrPmjImiFzb1E-1",
      },
    ],
  },
  {
    slug: "staff-toko",
    category: "career",
    year: "2025",
    period: "March 2025 — January 2026",
    role: "Costumer Relation",
    organization: "PT Alfaria Trijaya",
    company: {
      name: "Alfamart",
      accent: "#DC2626",
      initials: "AF",
      domain: "alfagift.id",
      logo: "/images/journey/staff-toko/logo.png",
      website: "https://alfagift.id/",
      industry: "Retail Company",
      industryId: "Perusahaan Ritel",
    },
    mission: "Understand real customer behavior through direct interaction.",
    missionId: "Memahami perilaku pelanggan yang sebenarnya melalui interaksi langsung.",
    reflection: "Products exist because customers exist.",
    reflectionId: "Produk ada karena pelanggan ada.",
    contribution: [
      "Sales",
      "Cashier",
      "Customer Service",
      "Inventory",
      "Stock Opname",
      "Merchandising",
    ],
    narrative: { kind: "career" },
    gallery: [
      { type: "activity", label: "Activity 1", image: "/images/journey/staff-toko/activity-1.png" },
      { type: "activity", label: "Activity 2", image: "/images/journey/staff-toko/activity-2.png" },
      { type: "activity", label: "Activity 3", image: "/images/journey/staff-toko/activity-3.png" },
      { type: "activity", label: "Activity 4", image: "/images/journey/staff-toko/activity-4.png" },
      { type: "activity", label: "Activity 5", image: "/images/journey/staff-toko/activity-5.png" },
      { type: "activity", label: "Activity 6", image: "/images/journey/staff-toko/activity-6.png" },
      { type: "activity", label: "Activity 7", image: "/images/journey/staff-toko/activity-7.png" },
    ],
  },
  {
    slug: "customer-service",
    category: "career",
    year: "2025",
    period: "October 2025 — July 2026",
    role: "Customer Service & Business Development",
    organization: "WeMasterTrade",
    company: {
      name: "WeMasterTrade",
      accent: "#D4AF37",
      initials: "WT",
      domain: "wemastertrade.com",
      logo: "/images/journey/customer-service/logo.png",
      website: "https://wemastertrade.com/",
      industry: "Prop Trading Firm",
      industryId: "Perusahaan Prop Trading",
    },
    mission: "Support traders while improving customer satisfaction.",
    missionId: "Mendukung para trader sambil meningkatkan kepuasan pelanggan.",
    reflection:
      "Great support turns a product feature into something a trader actually trusts.",
    reflectionId:
      "Dukungan yang baik mengubah fitur produk menjadi sesuatu yang benar-benar dipercaya oleh trader.",
    contribution: [
      "Customer Success",
      "Webinar Campaign",
      "Poster Design",
      "Presentation Slides",
      "CRM",
      "Affiliate Strategy",
    ],
    narrative: { kind: "career" },
    // TODO(ven-jean): drop the real poster exports into
    // public/images/journey/customer-service/ using these filenames.
    gallery: [
      { type: "poster", label: "Webinar campaign poster", image: "/images/journey/customer-service/poster-1.png" },
      { type: "poster", label: "Webinar campaign poster", image: "/images/journey/customer-service/poster-2.png" },
    ],
    // TODO(ven-jean): drop the real slide exports into
    // public/images/journey/customer-service/ using these filenames — rename
    // the deck titles below once you tell me what each webinar was about.
    presentations: [
      {
        title: "Webinar Presentation #1",
        slides: [
          "/images/journey/customer-service/materi_slide-1.png",
          "/images/journey/customer-service/materi_slide-2.png",
          "/images/journey/customer-service/materi_slide-3.png",
          "/images/journey/customer-service/materi_slide-4.png",
          "/images/journey/customer-service/materi_slide-5.png",
          "/images/journey/customer-service/materi_slide-6.png",
          "/images/journey/customer-service/materi_slide-7.png",
        ],
      },
      {
        title: "Webinar Presentation #2",
        slides: [
          "/images/journey/customer-service/materi2_slide-1.png",
          "/images/journey/customer-service/materi2_slide-2.png",
          "/images/journey/customer-service/materi2_slide-3.png",
          "/images/journey/customer-service/materi2_slide-4.png",
          "/images/journey/customer-service/materi2_slide-5.png",
          "/images/journey/customer-service/materi2_slide-6.png",
          "/images/journey/customer-service/materi2_slide-7.png",
          "/images/journey/customer-service/materi2_slide-8.png",
        ],
      },
    ],
    resources: [
      { label: "Indonesia Community 1", url: "https://t.me/wecopytradetalk/170144" },
      { label: "Indonesia Community 2", url: "https://t.me/IndonesiaWeMasterTrade" },
      { label: "Discord Community", url: "https://discord.gg/M2TMUYqj5s" },
      {
        label: "Business Development Profile",
        url: "https://www.tiktok.com/@jean.funded.wmt?is_from_webapp=1&sender_device=pc",
      },
    ],
  },
  {
    slug: "moderator-specialist",
    category: "career",
    year: "2026",
    period: "February 2026 — Present",
    role: "Moderator Specialist",
    organization: "Indoxnito",
    company: {
      name: "Indoxnito",
      accent: "#A855F7",
      initials: "IX",
      domain: "indoxnito.com",
      logo: "/images/journey/moderator-specialist/logo.png",
      website: "https://indoxnito.com/",
      industry: "Web3 Community Platform",
      industryId: "Platform Komunitas Web3",
    },
    mission: "Help build one of the most engaging Web3 communities.",
    missionId: "Membantu membangun salah satu komunitas Web3 paling aktif.",
    reflection:
      "A community grows the same way a product does — through iteration, listening, and consistent daily execution.",
    reflectionId:
      "Komunitas tumbuh dengan cara yang sama seperti produk — melalui iterasi, mendengarkan, dan eksekusi harian yang konsisten.",
    contribution: [
      "Product Research",
      "PRD",
      "Feature Suggestions",
      "Gamification Ideas",
      "Bug Reports",
      "AI Seeding",
      "AI Prompt Engineering",
      "Community Content",
      "Daily Activity Content",
      "AI Automation",
    ],
    narrative: { kind: "career" },
    gallery: [
      { type: "activity", label: "Indoxnito Website", image: "/images/journey/moderator-specialist/community-activity-1.jpg" },
      { type: "activity", label: "Manual Content Seeding", image: "/images/journey/moderator-specialist/community-activity-2.jpg" },
      { type: "activity", label: "District Logo Design", image: "/images/journey/moderator-specialist/community-activity-3.jpg" },
      { type: "activity", label: "Lovable Indoxnito Design Prototype", image: "/images/journey/moderator-specialist/community-activity-4.jpg" },
      { type: "activity", label: "AI Assistant Content Seeding Dashboard", image: "/images/journey/moderator-specialist/community-activity-5.jpg" },
    ],
  },

  // ----------------------------------------------------------- ENTREPRENEUR
  {
    slug: "abon-gulung-cookies",
    category: "entrepreneur",
    year: "2024",
    period: "August 2024",
    role: "Founder",
    organization: "Abon Gulung Khas Babeh Jean",
    company: {
      name: "Abon Gulung Khas Babeh Jean",
      accent: "#D97706",
      initials: "AG",
      logo: "/images/journey/abon-gulung-cookies/logo.png",
      industry: "Food & Snacks Business",
      industryId: "Bisnis Makanan & Camilan",
    },
    type: "Instagram",
    mission: "Homemade shredded roll snacks built from scratch and sold through Instagram.",
    missionId:
      "Camilan roll abon buatan rumahan dibuat dari nol dan dijual melalui Instagram.",
    contribution: ["Instagram"],
    narrative: {
      kind: "entrepreneur",
      opportunity:
        "I saw an opportunity to sell homemade snacks with healthy profit margins by producing them independently and building a simple brand through social media.",
      strategy:
        "Developed the recipe, handled production, created the brand identity, and managed customer orders through Instagram.",
      keyLearning:
        "I focused too much on maximizing profit margins and underestimated operational scalability. The recipe was not fully standardized, and the production process became the bottleneck as orders increased.",
      takeaway:
        "That experience taught me that a business must first be operationally sustainable before it can be financially optimized.",
      opportunityId:
        "Saya melihat peluang untuk menjual camilan buatan rumahan dengan margin keuntungan yang sehat dengan memproduksinya secara mandiri dan membangun brand sederhana melalui media sosial.",
      strategyId:
        "Mengembangkan resep, menangani produksi, membuat identitas brand, dan mengelola pesanan pelanggan melalui Instagram.",
      keyLearningId:
        "Saya terlalu fokus memaksimalkan margin keuntungan dan meremehkan skalabilitas operasional. Resepnya belum sepenuhnya distandarisasi, dan proses produksi menjadi bottleneck saat pesanan meningkat.",
      takeawayId:
        "Pengalaman itu mengajarkan saya bahwa bisnis harus dulu berkelanjutan secara operasional sebelum bisa dioptimalkan secara finansial.",
    },
    gallery: [
      { type: "logo", label: "Logo", image: "/images/journey/abon-gulung-cookies/activity-1.jpg" },
      { type: "product", label: "Product", image: "/images/journey/abon-gulung-cookies/activity-2.jpg" },
      { type: "product", label: "Product", image: "/images/journey/abon-gulung-cookies/activity-3.jpg" },
      { type: "product", label: "Product", image: "/images/journey/abon-gulung-cookies/activity-4.jpg" },
      { type: "product", label: "Product", image: "/images/journey/abon-gulung-cookies/activity-5.jpg" },
      { type: "product", label: "Product", image: "/images/journey/abon-gulung-cookies/activity-6.jpg" },
      { type: "product", label: "Product", image: "/images/journey/abon-gulung-cookies/activity-7.jpg" },
      { type: "product", label: "Product", image: "/images/journey/abon-gulung-cookies/activity-8.jpg" },
    ],
    resources: [
      {
        label: "Instagram",
        url: "https://www.instagram.com/abongulung_babehjean?igsh=eWVwanJ0YzE0bWRv",
      },
    ],
  },
  {
    slug: "thai-tea",
    category: "entrepreneur",
    year: "2025",
    period: "March 2025",
    role: "Founder",
    organization: "Thai Tea Cap Nai",
    company: {
      name: "Thai Tea Cap Nai",
      accent: "#F97316",
      initials: "TT",
      logo: "/images/journey/thai-tea/logo.png",
      industry: "Beverage Business",
      industryId: "Bisnis Minuman",
    },
    type: "TikTok, Instagram",
    mission: "Beverage brand focused on efficient operations and social-first marketing.",
    missionId:
      "Brand minuman yang fokus pada operasional yang efisien dan pemasaran berbasis media sosial.",
    contribution: ["TikTok", "Instagram"],
    narrative: {
      kind: "entrepreneur",
      opportunity:
        "Applied the lessons from my previous business to build a beverage brand with a simpler production process, stronger marketing, and healthier unit economics.",
      strategy:
        "Simplified operations, improved branding, optimized pricing, and focused on marketing to attract repeat customers.",
      keyLearning:
        "Operations became significantly more efficient, but I overlooked market validation beyond demand. While customer interest was high, the location and target audience had limited purchasing power, making customer acquisition expensive relative to long-term profitability.",
      opportunityId:
        "Menerapkan pelajaran dari bisnis sebelumnya untuk membangun brand minuman dengan proses produksi yang lebih sederhana, pemasaran yang lebih kuat, dan unit ekonomi yang lebih sehat.",
      strategyId:
        "Menyederhanakan operasional, meningkatkan branding, mengoptimalkan harga, dan fokus pada pemasaran untuk menarik pelanggan yang kembali.",
      keyLearningId:
        "Operasional menjadi jauh lebih efisien, tapi saya melewatkan validasi pasar di luar sekadar permintaan. Meski minat pelanggan tinggi, lokasi dan target audiens punya daya beli yang terbatas, membuat akuisisi pelanggan mahal dibanding profitabilitas jangka panjang.",
      takeaway: "I learned that great marketing cannot compensate for poor market fit.",
      takeawayId: "Saya belajar bahwa pemasaran yang bagus tidak bisa menutupi market fit yang buruk.",
    },
    gallery: [
      { type: "product", label: "Product", image: "/images/journey/thai-tea/activity-1.jpg" },
      { type: "product", label: "Product", image: "/images/journey/thai-tea/activity-2.jpg" },
      { type: "poster", label: "Menu", image: "/images/journey/thai-tea/activity-3.jpg" },
      { type: "product", label: "Product Marketing (Mini Size)", image: "/images/journey/thai-tea/activity-4.jpg" },
      { type: "activity", label: "Business Location", image: "/images/journey/thai-tea/activity-5.jpg" },
      { type: "activity", label: "Business Location", image: "/images/journey/thai-tea/activity-6.jpg" },
      { type: "product", label: "Product Marketing (Opened)", image: "/images/journey/thai-tea/activity-7.jpg" },
    ],
    resources: [
      {
        label: "TikTok",
        url: "https://www.tiktok.com/@thai.tea.cap.nai?_r=1&_t=ZS-98ZKqPS4B9w",
      },
    ],
  },
  {
    slug: "indocair",
    category: "entrepreneur",
    year: "2025",
    period: "August 2025 — April 2026",
    role: "Founder",
    organization: "IndoCair",
    company: {
      name: "IndoCair",
      accent: "#FF3B30",
      initials: "IC",
      logo: "/images/journey/indocair/logo.png",
      industry: "Digital Currency Exchanger",
      industryId: "Penukaran Mata Uang Digital",
    },
    type: "Website, TikTok, Exchanger",
    mission: "Digital payment exchange service for Indonesian PayPal users.",
    missionId:
      "Layanan penukaran pembayaran digital untuk pengguna PayPal di Indonesia.",
    contribution: ["Website", "TikTok", "Exchanger"],
    narrative: {
      kind: "entrepreneur",
      opportunity:
        "Saw an opportunity to help Indonesian users convert digital payment balances into local bank transfers through a simpler, faster service.",
      strategy:
        "Built an online service with no physical inventory, low operational costs, and high transaction margins while providing personalized customer support.",
      keyLearning:
        "The business achieved strong margins and low operational risk, but I underestimated platform evolution. As payment providers introduced direct withdrawal methods, the value of intermediaries naturally declined.",
      takeaway:
        "I learned that businesses built on platform gaps must continuously evolve because the platform itself may eventually solve the problem.",
      opportunityId:
        "Melihat peluang untuk membantu pengguna Indonesia mengonversi saldo pembayaran digital ke transfer bank lokal melalui layanan yang lebih sederhana dan cepat.",
      strategyId:
        "Membangun layanan online tanpa inventaris fisik, biaya operasional rendah, dan margin transaksi tinggi sambil memberikan dukungan pelanggan yang personal.",
      keyLearningId:
        "Bisnis ini mencapai margin yang kuat dan risiko operasional yang rendah, tapi saya meremehkan evolusi platform. Saat penyedia pembayaran memperkenalkan metode penarikan langsung, nilai perantara secara alami menurun.",
      takeawayId:
        "Saya belajar bahwa bisnis yang dibangun di atas celah platform harus terus berevolusi karena platform itu sendiri pada akhirnya bisa menyelesaikan masalah tersebut.",
    },
    gallery: [
      { type: "screenshot", label: "Social Media Account", image: "/images/journey/indocair/activity-1.jpg" },
      { type: "screenshot", label: "Customer Proof", image: "/images/journey/indocair/activity-2.jpg" },
      { type: "poster", label: "Fee Table", image: "/images/journey/indocair/activity-3.jpg" },
      { type: "poster", label: "Affiliate Commission", image: "/images/journey/indocair/activity-4.jpg" },
    ],
    resources: [
      { label: "Website", url: "https://venjean.github.io/IndoCair.Net/", icon: "/images/journey/indocair/logo.png" },
      {
        label: "TikTok",
        url: "https://www.tiktok.com/@indocair_exchanger?_r=1&_t=ZS-98ZKsutjVfY",
      },
    ],
  },

  // ---------------------------------------------------------------- BUILDER
  {
    slug: "web3-project-websites",
    category: "builder",
    role: "Founder",
    organization: "MoDaoStudio",
    company: {
      name: "MoDaoStudio",
      accent: "#FFFFFF",
      initials: "MD",
      logo: "/images/journey/web3-project-websites/logo.png",
      industry: "Web3 Website Studio",
      industryId: "Studio Website Web3",
    },
    type: "Crypto Websites",
    mission:
      "Built a production workflow that rapidly delivers modern websites for early-stage Web3 projects using AI-assisted development.",
    missionId:
      "Membangun alur kerja produksi yang dengan cepat menghasilkan website modern untuk proyek Web3 tahap awal menggunakan pengembangan berbasis AI.",
    reflection:
      "I learned that AI doesn't replace product thinking. The biggest value comes from understanding client goals, designing the right structure, and making good product decisions before writing any code.",
    reflectionId:
      "Saya belajar bahwa AI tidak menggantikan cara berpikir produk. Nilai terbesar datang dari memahami tujuan klien, merancang struktur yang tepat, dan membuat keputusan produk yang baik sebelum menulis kode apa pun.",
    contribution: ["Product Design", "Web3", "Website"],
    narrative: {
      kind: "builder",
      problem:
        "Many early-stage crypto projects needed professional landing pages but lacked the budget and development speed to launch quickly.",
      productThinking:
        "Instead of building every website completely from scratch, I designed a reusable workflow that combines product planning, reusable UI patterns, and AI-assisted development. This dramatically reduced delivery time while maintaining consistent quality.",
      building: [
        "Defined project requirements with clients.",
        "Planned the page structure and information hierarchy.",
        "Designed user flows and layouts.",
        "Directed Claude Code to build production-ready websites.",
        "Reviewed, tested, and refined every project before delivery.",
      ],
      problemId:
        "Banyak proyek crypto tahap awal membutuhkan landing page profesional tapi tidak punya anggaran dan kecepatan pengembangan untuk meluncur dengan cepat.",
      productThinkingId:
        "Daripada membangun setiap website sepenuhnya dari nol, saya merancang alur kerja yang bisa dipakai ulang yang menggabungkan perencanaan produk, pola UI yang bisa dipakai ulang, dan pengembangan berbasis AI. Ini secara drastis mengurangi waktu pengerjaan sambil menjaga kualitas yang konsisten.",
      buildingId: [
        "Menentukan kebutuhan proyek bersama klien.",
        "Merencanakan struktur halaman dan hierarki informasi.",
        "Merancang alur pengguna dan tata letak.",
        "Mengarahkan Claude Code untuk membangun website yang siap produksi.",
        "Meninjau, menguji, dan menyempurnakan setiap proyek sebelum diserahkan.",
      ],
    },
    // TODO(ven-jean): add the 3 site names/URLs and drop previews into
    // public/images/journey/web3-project-websites/.
    gallery: [
      { type: "website", badge: "Site 1", label: "BYEMoney Project", image: "/images/journey/web3-project-websites/site-1.jpg" },
      { type: "website", badge: "Site 2", label: "BlackOut OG", image: "/images/journey/web3-project-websites/site-2.jpg" },
    ],
    resources: [
      { label: "X (Twitter)", url: "https://x.com/MoDaoStudio" },
      { label: "BlackoutOG Project", url: "https://blackoutog.xyz/" },
      { label: "BYE Money Project", url: "https://venjean.github.io/byemoney-website/" },
    ],
  },
  {
    slug: "behavebot",
    category: "builder",
    role: "Founder",
    organization: "BehaveBot",
    company: {
      name: "BehaveBot",
      accent: "#2563EB",
      initials: "BB",
      logo: "/images/journey/behavebot/logo.png",
      industry: "AI Assistant",
      industryId: "Asisten AI",
    },
    type: "Telegram AI Assistant",
    mission:
      "An AI-powered Telegram assistant that helps crypto traders understand themselves before trying to understand the market.",
    missionId:
      "Asisten Telegram berbasis AI yang membantu trader crypto memahami diri mereka sendiri sebelum mencoba memahami pasar.",
    reflection:
      "The hardest part wasn't building AI. The real challenge was designing conversations that traders would actually continue using every day.",
    reflectionId:
      "Bagian tersulit bukan membangun AI. Tantangan sebenarnya adalah merancang percakapan yang benar-benar terus dipakai trader setiap hari.",
    contribution: ["Python", "Telegram Bot", "SQLite", "System Architecture"],
    narrative: {
      kind: "builder",
      problem:
        "Many crypto traders repeatedly make emotional trading decisions but have no system to record or analyze why they entered or exited a trade. Without understanding themselves, they cannot consistently improve.",
      productThinking:
        "Instead of creating another trading dashboard, I chose a conversational Telegram assistant. The bot asks lightweight psychological questions before and after trades without interrupting the trading process. This allows users to naturally build a personal trading journal that focuses on behavior rather than profits alone.",
      building: [
        "Designed the trader journey.",
        "Planned the psychology-based journal flow.",
        "Created prompts and AI behavior.",
        "Directed Claude Code to build the Telegram bot.",
        "Tested conversations and improved user experience through multiple iterations.",
      ],
      problemId:
        "Banyak trader crypto berulang kali membuat keputusan trading yang emosional tapi tidak punya sistem untuk mencatat atau menganalisis alasan mereka masuk atau keluar dari sebuah trade. Tanpa memahami diri mereka sendiri, mereka tidak bisa berkembang secara konsisten.",
      productThinkingId:
        "Daripada membuat dashboard trading lainnya, saya memilih asisten percakapan Telegram. Bot ini menanyakan pertanyaan psikologis ringan sebelum dan sesudah trade tanpa mengganggu proses trading. Ini membuat pengguna bisa secara alami membangun jurnal trading pribadi yang fokus pada perilaku, bukan hanya profit.",
      buildingId: [
        "Merancang perjalanan trader.",
        "Merencanakan alur jurnal berbasis psikologi.",
        "Membuat prompt dan perilaku AI.",
        "Mengarahkan Claude Code untuk membangun bot Telegram.",
        "Menguji percakapan dan meningkatkan pengalaman pengguna melalui berbagai iterasi.",
      ],
    },
    // TODO(ven-jean): add a real outcome once you have one (users, retention, etc).
    gallery: [
      { type: "demo", label: "Branding", image: "/images/journey/behavebot/screenshot-1.jpg" },
      { type: "screenshot", label: "BehaveBot Telegram", image: "/images/journey/behavebot/screenshot-2.jpg" },
      { type: "screenshot", label: "BehaveBot Features", image: "/images/journey/behavebot/screenshot-3.jpg" },
    ],
    resources: [
      { label: "Website", url: "https://behavebot-website.vercel.app/", icon: "/images/journey/behavebot/logo.png" },
      { label: "Telegram Bot", url: "https://t.me/BehaveAiBot" },
    ],
  },
  {
    slug: "novex",
    category: "builder",
    role: "Founder",
    organization: "Novex · MoDaoStudio",
    company: {
      name: "Novex",
      accent: "#F2C94C",
      initials: "NX",
      logo: "/images/journey/novex/logo.png",
      industry: "Web3 & AI Product Studio",
      industryId: "Studio Produk Web3 & AI",
    },
    type: "Android Application",
    mission:
      "An Android application exploring how AI-powered business operations could be combined with a referral-based investment ecosystem.",
    missionId:
      "Aplikasi Android yang mengeksplorasi bagaimana operasional bisnis berbasis AI bisa dikombinasikan dengan ekosistem investasi berbasis referral.",
    reflection:
      "Building financial products requires much more than good technology. Trust, sustainability, and long-term business models are far more important than feature development.",
    reflectionId:
      "Membangun produk finansial membutuhkan lebih dari sekadar teknologi yang baik. Kepercayaan, keberlanjutan, dan model bisnis jangka panjang jauh lebih penting dibanding pengembangan fitur.",
    contribution: ["Product Design", "Research", "Development", "UI", "Web3", "AI"],
    narrative: {
      kind: "builder",
      problem:
        "Many people want passive income opportunities but have little visibility into how investment funds are managed.",
      productThinking:
        "I explored combining AI-managed business operations with a multi-level referral model. The goal was to create a system where investor funds could be allocated into real businesses while profit distributions remained transparent. This project was primarily an exploration of product architecture and business system design.",
      building: [
        "Designed the investment ecosystem.",
        "Planned user flows.",
        "Created product specifications.",
        "Structured referral mechanics.",
        "Directed Claude Code to build the Android application prototype.",
      ],
      problemId:
        "Banyak orang menginginkan peluang penghasilan pasif tapi punya sedikit visibilitas mengenai bagaimana dana investasi dikelola.",
      productThinkingId:
        "Saya mengeksplorasi kombinasi operasional bisnis yang dikelola AI dengan model referral multi-level. Tujuannya adalah menciptakan sistem di mana dana investor bisa dialokasikan ke bisnis nyata sementara distribusi profit tetap transparan. Proyek ini terutama merupakan eksplorasi arsitektur produk dan desain sistem bisnis.",
      buildingId: [
        "Merancang ekosistem investasi.",
        "Merencanakan alur pengguna.",
        "Membuat spesifikasi produk.",
        "Menyusun mekanika referral.",
        "Mengarahkan Claude Code untuk membangun prototipe aplikasi Android.",
      ],
    },
    gallery: [
      { type: "androidApp", label: "Novex App Features", image: "/images/journey/novex/screenshot-1.jpg" },
      { type: "androidApp", label: "Novex App Features", image: "/images/journey/novex/screenshot-2.jpg" },
      { type: "androidApp", label: "Novex App Features", image: "/images/journey/novex/screenshot-3.jpg" },
      { type: "androidApp", label: "Novex App Features", image: "/images/journey/novex/screenshot-4.jpg" },
      { type: "androidApp", label: "Novex App Features", image: "/images/journey/novex/screenshot-5.jpg" },
    ],
    resources: [
      { label: "Website & App", url: "https://novex-official.github.io/novex/", icon: "/images/journey/novex/logo.png" },
    ],
  },
  {
    slug: "betra",
    category: "builder",
    role: "Founder",
    organization: "Betra · MoDaoStudio",
    company: {
      name: "Betra",
      accent: "#E4002B",
      initials: "BT",
      logo: "/images/journey/betra/logo.png",
      industry: "Web3 Mini App",
      industryId: "Mini App Web3",
    },
    type: "Mini App",
    mission:
      "A Telegram Mini App that enables competitive Mobile Legends players to compete in instant 1v1 skill matches.",
    missionId:
      "Mini App Telegram yang memungkinkan pemain kompetitif Mobile Legends bertanding dalam match skill 1v1 instan.",
    reflection:
      "Accessibility creates adoption. A product becomes valuable when it removes barriers instead of adding more features.",
    reflectionId:
      "Aksesibilitas menciptakan adopsi. Produk menjadi berharga saat ia menghilangkan hambatan, bukan menambah lebih banyak fitur.",
    contribution: ["Research", "Product", "UI", "Frontend", "Web3", "Mini App"],
    narrative: {
      kind: "builder",
      problem:
        "Many Indonesian Mobile Legends players dream of competing professionally, but tournament registration is often expensive, limited, and difficult to access.",
      productThinking:
        "Instead of building another esports tournament platform, I designed Betra as a Telegram Mini App. Players already organize communities through Telegram, so reducing friction was more valuable than adding unnecessary features. The focus was making competitive matches accessible within minutes.",
      building: [
        "Planned matchmaking flows.",
        "Designed tournament logic.",
        "Created product specifications.",
        "Designed the user experience.",
        "Directed Claude Code to build the Telegram Mini App.",
        "Repeatedly tested and refined the experience.",
      ],
      problemId:
        "Banyak pemain Mobile Legends di Indonesia bermimpi untuk bertanding secara profesional, tapi pendaftaran turnamen sering kali mahal, terbatas, dan sulit diakses.",
      productThinkingId:
        "Daripada membangun platform turnamen esports lainnya, saya merancang Betra sebagai Mini App Telegram. Pemain sudah mengorganisir komunitas melalui Telegram, jadi mengurangi friksi lebih berharga dibanding menambah fitur yang tidak perlu. Fokusnya adalah membuat match kompetitif bisa diakses dalam hitungan menit.",
      buildingId: [
        "Merencanakan alur matchmaking.",
        "Merancang logika turnamen.",
        "Membuat spesifikasi produk.",
        "Merancang pengalaman pengguna.",
        "Mengarahkan Claude Code untuk membangun Mini App Telegram.",
        "Berulang kali menguji dan menyempurnakan pengalamannya.",
      ],
    },
    gallery: [
      { type: "miniApp", label: "Home Page", image: "/images/journey/betra/screenshot-1.jpg" },
      { type: "miniApp", label: "Match", image: "/images/journey/betra/screenshot-2.jpg" },
      { type: "miniApp", label: "Victory / Defeated Animation", image: "/images/journey/betra/screenshot-3.jpg" },
      { type: "miniApp", label: "Admin Panel", image: "/images/journey/betra/screenshot-4.jpg" },
      { type: "miniApp", label: "User Profile", image: "/images/journey/betra/screenshot-5.jpg" },
      { type: "miniApp", label: "Profile Settings", image: "/images/journey/betra/screenshot-6.jpg" },
      { type: "miniApp", label: "Wallet Page", image: "/images/journey/betra/screenshot-7.jpg" },
    ],
    resources: [
      { label: "Telegram Mini App", url: "https://t.me/BetraArena_bot" },
      { label: "Telegram Community", url: "https://t.me/+vvtJp8_k-HZjMmI1" },
      { label: "Customer Service", url: "https://t.me/BetraSupport" },
    ],
  },
];

export function getJourneyByCategory(category: JourneyCategory): JourneyEntry[] {
  return journeyEntries.filter((entry) => entry.category === category);
}
