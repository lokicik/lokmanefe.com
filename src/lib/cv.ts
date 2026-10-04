// Résumé data for the in-browser CV editor (/cv/editor). The template mirrors
// public/Lokman-Efe-Software-Engineer-Resume.pdf; edits live only in the
// visitor's browser and can be exported as JSON.

export type CvEntry = {
  id: string;
  /** Bold lead, e.g. "Software Engineer, Bottomless (YC W19)". */
  title: string;
  /** Regular text after an en dash, e.g. "Remote". */
  subtitle: string;
  /** Right-aligned dates or a link such as "houseroyale.fun". */
  meta: string;
  bullets: string[];
};

export type CvSkill = { id: string; label: string; value: string };

export type CvSection =
  | { id: string; kind: "entries"; title: string; entries: CvEntry[] }
  | { id: string; kind: "skills"; title: string; skills: CvSkill[] };

export type CvContact = { id: string; text: string };

export type Cv = {
  name: string;
  fileName: string;
  contacts: CvContact[];
  sections: CvSection[];
};

export const CV_DRAFT_STORAGE_KEY = "cv-editor:draft:v1";

export function createId() {
  return Math.random().toString(36).slice(2, 10);
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DOMAIN = /^(https?:\/\/)?[\w-]+(\.[\w-]+)*\.[a-z]{2,}(\/\S*)?$/i;

/** Contacts and entry links are typed as plain text; derive their targets. */
export function linkFor(text: string): string | null {
  const value = text.trim();
  if (EMAIL.test(value)) return `mailto:${value}`;
  if (DOMAIN.test(value)) return /^https?:\/\//i.test(value) ? value : `https://${value}`;
  return null;
}

/** Bullets are edited one per line; blank lines are not printed. */
export function printableBullets(bullets: string[]) {
  return bullets.map((bullet) => bullet.trim()).filter(Boolean);
}

export function cvFileName(cv: Cv, extension: "pdf" | "json") {
  const base = cv.fileName.trim().replace(/[\\/:*?"<>|]+/g, "-") || "Resume";
  return `${base}.${extension}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

function list(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function id(value: unknown, fallback: string) {
  return typeof value === "string" && value ? value : fallback;
}

/**
 * Accepts stored drafts, imported JSON, and the template. Missing ids get
 * positional ones so the server and client render the template identically.
 */
export function parseCv(value: unknown): Cv | null {
  if (!isRecord(value) || !Array.isArray(value.sections)) return null;

  return {
    name: text(value.name),
    fileName: text(value.fileName),
    contacts: list(value.contacts).map((contact, index) => ({
      id: id(isRecord(contact) ? contact.id : null, `c${index}`),
      text: isRecord(contact) ? text(contact.text) : text(contact),
    })),
    sections: value.sections.filter(isRecord).map((section, index): CvSection => {
      const sectionId = id(section.id, `s${index}`);
      const title = text(section.title);

      if (section.kind === "skills") {
        return {
          id: sectionId,
          kind: "skills",
          title,
          skills: list(section.skills).filter(isRecord).map((skill, skillIndex) => ({
            id: id(skill.id, `${sectionId}-${skillIndex}`),
            label: text(skill.label),
            value: text(skill.value),
          })),
        };
      }

      return {
        id: sectionId,
        kind: "entries",
        title,
        entries: list(section.entries).filter(isRecord).map((entry, entryIndex) => ({
          id: id(entry.id, `${sectionId}-${entryIndex}`),
          title: text(entry.title),
          subtitle: text(entry.subtitle),
          meta: text(entry.meta),
          bullets: list(entry.bullets).map(text),
        })),
      };
    }),
  };
}

/** JSON export without the editor's internal ids. */
export function exportableCv(cv: Cv) {
  return {
    name: cv.name,
    fileName: cv.fileName,
    contacts: cv.contacts.map(({ text }) => ({ text })),
    sections: cv.sections.map((section) =>
      section.kind === "skills"
        ? {
            kind: section.kind,
            title: section.title,
            skills: section.skills.map(({ label, value }) => ({ label, value })),
          }
        : {
            kind: section.kind,
            title: section.title,
            entries: section.entries.map(({ title, subtitle, meta, bullets }) => ({
              title,
              subtitle,
              meta,
              bullets,
            })),
          }
    ),
  };
}

export const cvTemplate = parseCv({
  name: "Lokman Efe",
  fileName: "Lokman-Efe-Software-Engineer-Resume",
  contacts: [
    { text: "lokmanbefe@gmail.com" },
    { text: "lokmanefe.com" },
    { text: "github.com/lokicik" },
    { text: "linkedin.com/in/lokmanefe" },
  ],
  sections: [
    {
      kind: "entries",
      title: "Experience",
      entries: [
        {
          title: "Software Engineer, Bottomless (YC W19)",
          subtitle: "Remote",
          meta: "June 2026 – Present",
          bullets: [
            "Shipped end-to-end features for a production AI platform using Next.js and React Native, spanning web, mobile, APIs, persistence, and production rollout",
            "Designed evaluation workflows for LLM routing and multi-agent coding harnesses, using controlled production-like runs and event-level telemetry to isolate model, orchestration, infrastructure, and measurement failures",
            "Improved LLM routing and streaming reliability by parallelizing classification, eliminating redundant data loading, bounding model context, and strengthening failure handling under concurrent workloads",
          ],
        },
        {
          title: "Founding Engineer, Beefair",
          subtitle: "Remote",
          meta: "Dec 2025 – Apr 2026",
          bullets: [
            "Built the Next.js app from scratch, owning frontend architecture, design implementation, and MVP launch readiness",
            "Stabilized the React Native app by fixing 40+ cross-platform bugs and unblocking critical web and mobile workflows",
            "Drove MVP delivery by resolving launch blockers and aligning priorities across backend, product, and management",
          ],
        },
        {
          title: "Full-Stack Engineer, Mlabs.vc",
          subtitle: "Remote",
          meta: "Nov 2025 – Jan 2026",
          bullets: [
            "Shipped full-stack features across Prymatica, 1Lookup, and 1Capture, spanning frontend and backend workflows",
            "Built Stripe billing flows for 1Capture, enabling trials, pricing updates, and revenue-based subscriptions",
            "Automated outbound email generation with Python, reducing manual lead-generation effort by 50%+",
          ],
        },
        {
          title: "Backend Engineer, CompanyDNA AI",
          subtitle: "Remote",
          meta: "Apr 2024 – Sept 2025",
          bullets: [
            "Integrated 30+ third-party platforms using Node.js, OAuth2, and Nango, handling authentication, data synchronization, rate limits, pagination, schema design, and API documentation",
            "Built multitenant RAG workflows using indexing, BM25 ranking, vector search, and evaluation pipelines for AI-assisted product features",
          ],
        },
        {
          title: "AI Engineer, Cosmos",
          subtitle: "Onsite",
          meta: "Dec 2023 – June 2024",
          bullets: [
            "Built computer-vision and OCR pipelines with Python, OpenCV, YOLO, Roboflow, Tesseract, and Linux-based ML workflows for camera-based prototypes",
            "Processed 20,000+ labeled records and contributed to multimodal and edge-AI prototypes combining camera input, sensors, Jetson Nano, and Arduino",
          ],
        },
      ],
    },
    {
      kind: "skills",
      title: "Skills",
      skills: [
        { label: "Languages", value: "TypeScript, JavaScript, Python, Go" },
        {
          label: "Development",
          value: "React, Next.js, React Native, Node.js, FastAPI, GraphQL, PostgreSQL, MongoDB",
        },
        {
          label: "Applied AI & Infrastructure",
          value: "LLM evaluation, agentic systems, RAG, vector search, OpenCV, YOLO, AWS, Docker",
        },
      ],
    },
    {
      kind: "entries",
      title: "Projects",
      entries: [
        {
          title: "House Royale",
          subtitle: "",
          meta: "houseroyale.fun",
          bullets: [
            "Built and launched a real-time multiplayer real-estate prediction game with WebSocket lobbies, scraped real-estate datasets, Firebase authentication, and 9 ML models served through a Python inference service",
          ],
        },
        {
          title: "GDG On Campus TU",
          subtitle: "",
          meta: "gdgoncampustu.com",
          bullets: [
            "Built and operated a live event platform with registration, admin workflows, real-time quizzes, and audience games, supporting 2,000+ visitors and 200+ concurrent users during a three-day event",
          ],
        },
      ],
    },
    {
      kind: "entries",
      title: "Education",
      entries: [
        {
          title: "Trakya University",
          subtitle: "B.S. in Computer Engineering",
          meta: "2026",
          bullets: [
            "Led 50+ students in delivering university automation systems for attendance, student affairs, and reporting",
          ],
        },
      ],
    },
  ],
})!;
