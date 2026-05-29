export const CONTACT_EMAIL = "lokmanbefe@gmail.com";

export const socialLinks: { label: string; href: string }[] = [
  { label: "GitHub", href: "https://github.com/lokicik" },
  { label: "LinkedIn", href: "https://linkedin.com/in/lokmanefe" },
  { label: "LeetCode", href: "https://leetcode.com/u/lokmanefe/" },
  { label: "Kaggle", href: "https://kaggle.com/lokmanefe/" },
];

export const hero = {
  name: "Lokman Efe",
  title: "AI Product Engineer",
  tagline:
    "High-agency engineer shipping production SaaS, AI/RAG workflows, and the integrations behind them.",
  availability: "Based in Turkey · open to engineering roles",
};

export const workflow = [
  "Most of my building now runs through agentic coding tools like Claude Code, Cursor, Codex, and opencode. I usually have a few agents working at once on different parts of a problem, so my real job is less typing and more deciding: scoping the work, reviewing every diff, and keeping the architecture coherent.",
  "I keep agents on-rails with project conventions like AGENTS.md and SKILL.md, watch for prompt-injection and bad assumptions, and verify before anything ships. The tooling changed how fast I move, not who's accountable for the result.",
];

export const about = [
  "High-agency software engineer with experience shipping production SaaS products, AI/RAG workflows, billing systems, and third-party integrations in fast-moving startup environments.",
  "Strong ownership across frontend, backend, API integrations, and LLM-powered data retrieval. I learn any stack fast and ship under pressure.",
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
    company: "Cosmos",
    role: "AI Engineer",
    stack: "Python, OpenCV, YOLO, Linux",
    location: "Turkey",
    period: "Dec 2023 – Jun 2024",
    bullets: [
      "Built computer-vision and OCR pipelines with Python, OpenCV, YOLO, Roboflow, Tesseract, PaddleOCR, EasyOCR, and Linux-based ML workflows.",
      "Processed 20,000+ labeled records and contributed to multimodal AI and edge-AI prototypes using camera input, sensors, Jetson Nano, and Arduino.",
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
      "Prototyped collaborative editing and fixed a wide range of frontend UI/UX bugs.",
    ],
  },
];

export interface ProjectHighlight {
  name: string;
  description: string;
  href?: string;
  status?: "building";
  imageUrl?: string;
}

export const featuredProjects: ProjectHighlight[] = [
  {
    name: "House Royale",
    href: "https://houseroyale.fun",
    status: "building",
    imageUrl: "/projects/houseroyale_ss1.webp",
    description:
      "Real-time AI game with Go backend, React frontend, Python ML infra, scraped real-estate data, 9 trained models, and WebSocket lobbies.",
  },
  {
    name: "EvalForge",
    status: "building",
    description: "Multitenant AI prompt-evaluation platform, built on Ruby on Rails.",
  },
  {
    name: "Orienteering game",
    status: "building",
    description:
      "Web-based orienteering with voxel graphics and a Fortnite-style lobby system.",
  },
  {
    name: "mythology_untold",
    status: "building",
    description:
      "AI-driven mythology storytelling: one illustration, auto-zoomed and narrated into a finished video.",
  },
  {
    name: "gdgoncampustu.com",
    href: "https://gdgoncampustu.com",
    imageUrl: "/projects/gdgwebsite_ss1.webp",
    description:
      "Official student developer community platform; handled 2,000+ visitors in 3 days and 200+ concurrent users during a live event.",
  },
  {
    name: "Chimera",
    href: "https://github.com/orgs/Chimera-Platform/repositories",
    imageUrl: "/projects/chimera_ss1.webp",
    description:
      "Multi-agent AI chat/game platform with OpenRouter model routing, agent personalities, Flux avatar generation, and AI inpainting workflows.",
  },
  {
    name: "GeoIP Explorer",
    href: "https://geoip-explorer-lokmanefe.netlify.app/",
    imageUrl: "/projects/geoip_1.webp",
    description:
      "IP tracking and geolocation app built with Vue 3 and Leaflet: real-time mapping, distance measurement, and a tactical UI.",
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
