export type Language = "en" | "id";

export type Translations = {
  nav: {
    story: string;
    philosophy: string;
    journey: string;
    tools: string;
    contact: string;
  };
  hero: {
    description: string;
    cta: string;
  };
  contact: {
    headline1: string;
    headline2: string;
    words: string[];
    closing: string;
  };
  journey: {
    eyebrow: string;
    title: string;
    description: string;
    tabCareer: string;
    tabEntrepreneur: string;
    tabBuilder: string;
    contribution: string;
    viewDetails: string;
    hideDetails: string;
    reflection: string;
    pagesDesigned: string;
    opportunity: string;
    strategy: string;
    keyLearning: string;
    problem: string;
    productThinking: string;
    building: string;
    viewWebsite: string;
    comingSoon: string;
    mediaGallery: string;
    resources: string;
    view: string;
  };
  tools: {
    title: string;
    description: string;
    covers: string;
  };
  whoAmI: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Array<{ label: string; description: string }>;
  };
  philosophy: {
    eyebrow: string;
    line1: string;
    line1Highlight: string;
    line2: string;
    line2Highlight: string;
    intro: string;
    lines: string[];
    closingIntro: string;
    closingHighlight: string;
  };
  presentation: {
    viewPresentation: string;
    slidesSuffix: string;
    exitFullscreen: string;
    enterFullscreen: string;
    closePresentation: string;
    previousSlide: string;
    nextSlide: string;
    goToSlide: string;
  };
};

/**
 * Plain string dictionary, not a routing-based i18n library — this is a
 * single-page site, so there's no per-locale route to generate. Switching
 * language is just a Context update over an object already in the client
 * bundle: no network request, no reload, no measurable perf cost.
 */
export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      story: "Story",
      philosophy: "Philosophy",
      journey: "Journey",
      tools: "Tools",
      contact: "Contact",
    },
    hero: {
      description:
        "I transform ideas into products, communities, businesses, and AI-powered digital experiences.",
      cta: "Explore My Journey",
    },
    contact: {
      headline1: "I never wanted to become just another developer.",
      headline2: "I wanted to become someone who could build anything.",
      words: ["Products.", "Businesses.", "Communities.", "Ideas."],
      closing: "Let's build something together.",
    },
    journey: {
      eyebrow: "Journey",
      title: "Every project, told once, told completely.",
      description:
        "Career, business, and product work — each one a full story: the role, the contribution, the proof, and what it taught me.",
      tabCareer: "Career",
      tabEntrepreneur: "Entrepreneur",
      tabBuilder: "Builder",
      contribution: "Contribution",
      viewDetails: "View Details",
      hideDetails: "Hide Details",
      reflection: "Reflection",
      pagesDesigned: "Pages Designed",
      opportunity: "Opportunity",
      strategy: "Strategy",
      keyLearning: "Key Learning",
      problem: "Problem",
      productThinking: "Product Thinking",
      building: "Building",
      viewWebsite: "View Website",
      comingSoon: "Coming Soon",
      mediaGallery: "Media Gallery",
      resources: "Resources",
      view: "View",
    },
    tools: {
      title: "How I work, not what I know.",
      description:
        "Every tool here exists to produce something specific — this is the workspace behind everything else on this site.",
      covers: "Covers",
    },
    whoAmI: {
      eyebrow: "Who Am I",
      title: "A story, not a job title.",
      description: "Every step changed how I think about building — not what I call myself.",
      steps: [
        { label: "Coding", description: "Started with coding." },
        { label: "Products", description: "Learned products." },
        { label: "Businesses", description: "Built businesses." },
        { label: "Communities", description: "Managed communities." },
        { label: "AI", description: "Built AI." },
        { label: "Today", description: "Today I combine everything." },
      ],
    },
    philosophy: {
      eyebrow: "Philosophy",
      line1: "I don't build software.",
      line1Highlight: "software",
      line2: "I build solutions.",
      line2Highlight: "solutions",
      intro:
        "I don't believe great products are built by job titles. They are built by people who solve problems.",
      lines: [
        "Sometimes I code.",
        "Sometimes I design.",
        "Sometimes I build communities.",
        "Sometimes I create businesses.",
        "Sometimes I automate everything using AI.",
      ],
      closingIntro: "I don't limit myself to one role.",
      closingHighlight: "I build whatever the product needs.",
    },
    presentation: {
      viewPresentation: "View Presentation",
      slidesSuffix: "Slides",
      exitFullscreen: "Exit fullscreen",
      enterFullscreen: "Enter fullscreen",
      closePresentation: "Close presentation",
      previousSlide: "Previous slide",
      nextSlide: "Next slide",
      goToSlide: "Go to slide",
    },
  },
  id: {
    nav: {
      story: "Cerita",
      philosophy: "Filosofi",
      journey: "Perjalanan",
      tools: "Tools",
      contact: "Kontak",
    },
    hero: {
      description:
        "Saya mengubah ide menjadi produk, komunitas, bisnis, dan pengalaman digital berbasis AI.",
      cta: "Jelajahi Perjalanan Saya",
    },
    contact: {
      headline1: "Saya tidak pernah ingin menjadi sekadar developer biasa.",
      headline2: "Saya ingin menjadi seseorang yang bisa membangun apa saja.",
      words: ["Produk.", "Bisnis.", "Komunitas.", "Ide."],
      closing: "Mari membangun sesuatu bersama.",
    },
    journey: {
      eyebrow: "Perjalanan",
      title: "Setiap proyek, diceritakan sekali, diceritakan secara lengkap.",
      description:
        "Karier, bisnis, dan pekerjaan produk — masing-masing adalah cerita yang utuh: peran, kontribusi, buktinya, dan apa yang saya pelajari.",
      tabCareer: "Karier",
      tabEntrepreneur: "Wirausaha",
      tabBuilder: "Builder",
      contribution: "Kontribusi",
      viewDetails: "Lihat Detail",
      hideDetails: "Sembunyikan Detail",
      reflection: "Refleksi",
      pagesDesigned: "Halaman yang Dirancang",
      opportunity: "Peluang",
      strategy: "Strategi",
      keyLearning: "Pelajaran Utama",
      problem: "Masalah",
      productThinking: "Pemikiran Produk",
      building: "Proses Membangun",
      viewWebsite: "Lihat Website",
      comingSoon: "Segera Hadir",
      mediaGallery: "Galeri Media",
      resources: "Referensi",
      view: "Lihat",
    },
    tools: {
      title: "Bagaimana saya bekerja, bukan sekadar apa yang saya tahu.",
      description:
        "Setiap tool di sini ada untuk menghasilkan sesuatu yang spesifik — inilah ruang kerja di balik semua hal lain di situs ini.",
      covers: "Mencakup",
    },
    whoAmI: {
      eyebrow: "Siapa Saya",
      title: "Sebuah cerita, bukan jabatan.",
      description:
        "Setiap langkah mengubah cara saya berpikir tentang membangun sesuatu — bukan apa yang saya sebut diri saya.",
      steps: [
        { label: "Coding", description: "Dimulai dengan coding." },
        { label: "Produk", description: "Belajar tentang produk." },
        { label: "Bisnis", description: "Membangun bisnis." },
        { label: "Komunitas", description: "Mengelola komunitas." },
        { label: "AI", description: "Membangun AI." },
        { label: "Hari Ini", description: "Hari ini saya menggabungkan semuanya." },
      ],
    },
    philosophy: {
      eyebrow: "Filosofi",
      line1: "Saya tidak membangun software.",
      line1Highlight: "software",
      line2: "Saya membangun solusi.",
      line2Highlight: "solusi",
      intro:
        "Saya tidak percaya produk hebat dibangun oleh jabatan. Produk hebat dibangun oleh orang-orang yang menyelesaikan masalah.",
      lines: [
        "Terkadang saya coding.",
        "Terkadang saya mendesain.",
        "Terkadang saya membangun komunitas.",
        "Terkadang saya menciptakan bisnis.",
        "Terkadang saya mengotomatisasi semuanya menggunakan AI.",
      ],
      closingIntro: "Saya tidak membatasi diri pada satu peran.",
      closingHighlight: "Saya membangun apa pun yang dibutuhkan produk.",
    },
    presentation: {
      viewPresentation: "Lihat Presentasi",
      slidesSuffix: "Slide",
      exitFullscreen: "Keluar layar penuh",
      enterFullscreen: "Masuk layar penuh",
      closePresentation: "Tutup presentasi",
      previousSlide: "Slide sebelumnya",
      nextSlide: "Slide berikutnya",
      goToSlide: "Ke slide",
    },
  },
};
