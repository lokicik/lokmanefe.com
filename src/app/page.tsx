import Image from "next/image";
import { CVButton } from "@/components/cv-button";
import {
  hero,
  about,
  workflow,
  experience,
  featuredProjects,
  education,
  socialLinks,
  CONTACT_EMAIL,
} from "@/lib/home-content";
import { CursorBird } from "@/components/cursor-bird";
import { Metadata } from "next";

// Enable ISR with 1 day revalidation (homepage changes rarely)
export const revalidate = 86400; // 24 hours

export const metadata: Metadata = {
  title: "Lokman Efe",
  description:
    "Lokman Efe — AI Product Engineer. High-agency engineer shipping production SaaS products, AI/RAG workflows, billing systems, and third-party integrations in fast-moving startups.",
  alternates: {
    canonical: "/",
  },
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lokmanefe.com";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold mb-5 pb-2 border-b border-border">
      {children}
    </h2>
  );
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Lokman Efe",
    url: baseUrl,
    sameAs: [
      "https://github.com/lokicik",
      "https://linkedin.com/in/lokmanefe",
      "https://leetcode.com/u/lokmanefe/",
      "https://kaggle.com/lokmanefe/",
    ],
    jobTitle: "AI Product Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Freelancer",
    },
    email: `mailto:${CONTACT_EMAIL}`,
    image: `${baseUrl}/projects/lokmanefe_ss1.png`,
    description:
      "High-agency software engineer shipping production SaaS products, AI/RAG workflows, and third-party integrations.",
    nationality: "Turkish",
    address: {
      "@type": "PostalAddress",
      addressCountry: "TR",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
            <CursorBird />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero */}
        <div className="text-center pt-2">
          <h1 className="text-4xl font-bold mb-2">{hero.name}</h1>
          <p className="text-lg text-primary font-medium mb-2">{hero.title}</p>
          <p className="text-lg text-foreground mb-2 max-w-2xl mx-auto">
            {hero.tagline}
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            {hero.availability}
          </p>
          <CVButton />
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-primary hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            {socialLinks.map((link) => (
              <span key={link.label} className="flex items-center gap-x-2">
                <span className="text-muted-foreground">·</span>
                <a href={link.href} className="text-primary hover:underline">
                  {link.label}
                </a>
              </span>
            ))}
          </div>
        </div>

        {/* About */}
        <section>
          <SectionHeading>About</SectionHeading>
          <div className="space-y-3 text-foreground leading-relaxed">
            {about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section>
          <SectionHeading>Experience</SectionHeading>
          <div className="space-y-6">
            {experience.map((job) => (
              <div key={job.company}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-semibold text-foreground">
                    {job.company}
                    <span className="text-muted-foreground font-normal">
                      {" "}
                      — {job.role}
                    </span>
                  </h3>
                  <span className="text-sm text-muted-foreground tabular-nums">
                    {job.location} · {job.period}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {job.stack}
                </p>
                <ul className="mt-2 space-y-1.5 text-foreground leading-relaxed list-disc pl-5">
                  {job.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* How I Work */}
        <section>
          <SectionHeading>How I Work</SectionHeading>
          <div className="space-y-3 text-foreground leading-relaxed">
            {workflow.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <SectionHeading>Projects</SectionHeading>
          <div className="space-y-6">
            {featuredProjects.map((project) => {
              const title = project.href ? (
                <a
                  href={project.href}
                  className="text-primary hover:underline font-medium"
                >
                  {project.name}
                </a>
              ) : (
                <span className="font-medium text-foreground">
                  {project.name}
                </span>
              );
              return (
                <div
                  key={project.name}
                  className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      {title}
                      {project.status === "building" && (
                        <span className="text-xs text-muted-foreground border border-border rounded px-1.5 py-0.5">
                          building
                        </span>
                      )}
                    </div>
                    <p className="text-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  {project.imageUrl &&
                    (project.href ? (
                      <a
                        href={project.href}
                        className="shrink-0 block w-40 max-w-full"
                      >
                        <Image
                          src={project.imageUrl}
                          alt={`${project.name} screenshot`}
                          width={320}
                          height={200}
                          className="w-40 max-w-full aspect-[16/10] object-cover rounded border border-border"
                        />
                      </a>
                    ) : (
                      <Image
                        src={project.imageUrl}
                        alt={`${project.name} screenshot`}
                        width={320}
                        height={200}
                        className="shrink-0 w-40 max-w-full aspect-[16/10] object-cover rounded border border-border"
                      />
                    ))}
                </div>
              );
            })}
          </div>
          <a
            href="/projects"
            className="text-primary hover:underline font-medium inline-flex items-center mt-5"
          >
            View all projects →
          </a>
        </section>

        {/* Education */}
        <section>
          <SectionHeading>Education</SectionHeading>
          <div className="flex flex-wrap items-baseline justify-between gap-x-3">
            <h3 className="font-semibold text-foreground">
              {education.school}
              <span className="text-muted-foreground font-normal">
                {" "}
                — {education.degree}
              </span>
            </h3>
            <span className="text-sm text-muted-foreground tabular-nums">
              {education.location} · {education.period}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{education.gpa}</p>
          <ul className="mt-2 space-y-1.5 text-muted-foreground leading-relaxed list-disc pl-5">
            {education.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
