export const CONTACT_EMAIL = "lokmanbefe@gmail.com";

export const socialLinks: { label: string; href: string }[] = [
  { label: "GitHub", href: "https://github.com/lokicik" },
  { label: "LinkedIn", href: "https://linkedin.com/in/lokmanefe" },
  { label: "LeetCode", href: "https://leetcode.com/u/lokmanefe/" },
  { label: "Kaggle", href: "https://kaggle.com/lokmanefe/" },
];

export const hero = {
  name: "Lokman Efe",
  title: "Software Engineer",
  tagline:
    "High-agency full-stack engineer shipping production SaaS products, AI/RAG workflows, and the integrations behind them.",
  currentRole: "Software Engineer at Bottomless (YC W19)",
  availability: "Based in Turkey · open to selective remote opportunities",
};

export const workflow = [
  "I use coding agents to move faster, but I still own the work. I set the scope and architecture, review every diff, and verify the result with tests and telemetry before it ships. My workflow keeps changing as better tools appear; I test them on real work and keep the ones that earn a place.",
];

export interface ExperienceEntry {
  company: string;
  role: string;
  stack: string;
  location: string;
  period: string;
  url?: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    company: "Bottomless",
    role: "Software Engineer",
    stack: "Next.js, React Native, TypeScript",
    location: "Remote",
    period: "Jun 2026 – Present",
    bullets: [
      "Shipped end-to-end features for a production AI platform using Next.js and React Native, spanning web, mobile, APIs, persistence, and production rollout.",
      "Designed evaluation workflows for LLM routing and multi-agent coding harnesses, using controlled production-like runs and event-level telemetry to isolate model, orchestration, infrastructure, and measurement failures.",
      "Improved LLM routing and streaming reliability by parallelizing classification, eliminating redundant data loading, bounding model context, and strengthening failure handling under concurrent workloads.",
    ],
  },
  {
    company: "Beefair.ai",
    role: "Founding Engineer",
    stack: "Next.js, React Native, TypeScript",
    location: "Remote",
    period: "Dec 2025 – Apr 2026",
    bullets: [
      "Built and launched the web app from scratch in Next.js, owning frontend architecture, Figma-to-production implementation, and MVP release readiness.",
      "Maintained and stabilized the React Native mobile app through bug triage, fixes, and cross-platform flow alignment across ongoing feature work.",
      "Worked directly with backend, product, and management to shape MVP scope, resolve launch blockers, and align web/mobile user flows.",
    ],
  },
  {
    company: "Mlabs.vc",
    role: "Full-Stack Engineer",
    stack: "Next.js, Python, TypeScript",
    location: "Remote",
    period: "Nov 2025 – Jan 2026",
    bullets: [
      "Worked across Prymatica, 1Lookup, and 1Capture, shipping full-stack features in a fast-moving async environment.",
      "Built Stripe billing flows for 1Capture, including trial pages, pricing changes, revenue-based subscriptions, and production-facing UI/UX fixes.",
      "Built Python automation for Prymatica to generate outbound email templates and support lead-generation workflows.",
    ],
  },
  {
    company: "CompanyDNA AI",
    role: "Backend Engineer",
    stack: "Node.js, Python, GraphQL, AWS",
    location: "Remote",
    period: "Apr 2024 – Sep 2025",
    bullets: [
      "Integrated 30+ third-party platforms using OAuth2/Nango, handling auth, data sync, rate limits, pagination, schema design, and API documentation.",
      "Built multitenant RAG/data retrieval workflows with indexing, BM25/ranking logic, vector search flows, and evaluation pipelines for AI-assisted product features.",
      "Created OpenAPI documentation and a Stripe-like API key system to expose platform capabilities to external users.",
    ],
  },
  {
    company: "CTO Lab",
    role: "AI Product Engineer",
    stack: "React, TypeScript, Electron",
    location: "Remote",
    period: "Jan 2024 – Apr 2024",
    bullets: [
      "Helped build LingoEdit, an editor-based AI translation app that launched #2 on Product Hunt.",
      "Built new editor types including a voice-AI dictation editor, integrated multiple AI providers, and ported the web app to an Electron desktop app.",
    ],
  },
  {
    company: "Cosmos",
    role: "AI Engineer",
    stack: "Python, OpenCV, YOLO, Linux",
    location: "Onsite",
    period: "Dec 2023 – Jun 2024",
    bullets: [
      "Built computer-vision and OCR pipelines with Python, OpenCV, YOLO, Roboflow, Tesseract, PaddleOCR, EasyOCR, and Linux-based ML workflows.",
      "Processed 20,000+ labeled records and contributed to multimodal AI and edge-AI prototypes using camera input, sensors, Jetson Nano, and Arduino.",
    ],
  },
];

export interface ProjectHighlight {
  name: string;
  description: string;
  href?: string;
  imageUrl?: string;
}

export const featuredProjects: ProjectHighlight[] = [
  {
    name: "ReadMaxxer",
    href: "https://www.readmaxxer.com/",
    imageUrl: "/projects/readmaxxer.png",
    description:
      "Built and shipped a production web app for benchmarking and training visual speed through six interactive exercises, with server-authoritative scoring, adaptive workouts, accounts, and subscriptions.",
  },
  {
    name: "House Royale",
    href: "https://www.houseroyale.fun/",
    imageUrl: "/projects/houseroyale_ss1.webp",
    description:
      "Built an end-to-end multiplayer game where players compete against trained models to estimate prices from real Turkish property listings, including scraped data, live lobbies, and instant scoring.",
  },
  {
    name: "agentsurface",
    href: "https://agentsurface.vercel.app/",
    imageUrl: "/projects/agentsurface.png",
    description:
      "Built a scanner that scores how well coding agents can work with an OpenAPI spec, returning a 0-100 rating and a ranked, fix-by-fix report across six categories.",
  },
  {
    name: "EvalForge",
    imageUrl: "/projects/evalforge.png",
    description:
      "Built a prompt evaluation platform for versioning prompts, running curated test cases, scoring outputs with weighted rubrics, and comparing revisions over time.",
  },
  {
    name: "lbe.one",
    href: "https://lbe.one/",
    imageUrl: "/projects/lbe-one.png",
    description:
      "Built a personal permalink control plane with immutable routes, revision history, privacy-minimized analytics, validated imports, and authenticated management.",
  },
  {
    name: "GDG On Campus Trakya",
    href: "https://www.gdgoncampustu.com/",
    imageUrl: "/projects/gdg-on-campus-trakya.png",
    description:
      "Built and operated a production community platform that handled 2,000+ visitors in three days and 200+ concurrent users during a live event across registrations, interactive experiences, and admin workflows.",
  },
  {
    name: "Neologism Engine",
    href: "https://github.com/lokicik/neologism-engine",
    imageUrl: "/projects/neologism-engine.png",
    description:
      "Built a client-side naming tool that generates and ranks brand, sci-fi, and fantasy names with phonotactic filters, semantic matching, and a Rust/WebAssembly engine.",
  },
];

export interface EducationEntry {
  school: string;
  degree: string;
  gpa: string;
  location: string;
  period: string;
  bullets: string[];
}

export const education: EducationEntry = {
  school: "Trakya University",
  degree: "B.S. in Computer Engineering",
  gpa: "GPA: 3.42 / 4.00",
  location: "Edirne, Turkey",
  period: "2022 – 2026",
  bullets: [
    "Led student technical teams of 20+ to 50 people on university automation projects, including digital attendance, student affairs workflows, and reporting systems.",
    "Software Team Lead at GDG On Campus TÜ; built live event systems and organized AI/RAG workshops for the student developer community.",
  ],
};
