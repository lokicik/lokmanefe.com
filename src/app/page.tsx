import Image from "next/image";
import { CVButton } from "@/components/cv-button";
import {
  hero,
  workflow,
  experience,
  featuredProjects,
  education,
  socialLinks,
  CONTACT_EMAIL,
} from "@/lib/home-content";
import { CursorBird } from "@/components/cursor-bird";
import { Metadata } from "next";
import { Github, Linkedin, Mail } from "lucide-react";

// Enable ISR with 1 day revalidation (homepage changes rarely)
export const revalidate = 86400; // 24 hours

export const metadata: Metadata = {
  title: "Full-Stack Software Engineer",
  description:
    "Lokman Efe is a high-agency full-stack software engineer building production SaaS products, AI/RAG workflows, and the integrations behind them.",
  alternates: {
    canonical: "/",
  },
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lokmanefe.com";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 border-b border-border pb-2 text-2xl font-bold text-balance">
      {children}
    </h2>
  );
}

function LeetCodeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
    </svg>
  );
}

function KaggleIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
      <path d="M.1025 7.3475c-.0681 0-.1022.0341-.1022.102v6.752c0 .0681.034.1022.1022.1022h.7049c.068 0 .1022-.034.1022-.1023v-1.481l.4187-.3985 1.5016 1.91c.041.0477.0884.0716.143.0716h.9091c.0476 0 .0748-.0135.0817-.0407.0135-.041.0066-.075-.0206-.1023l-1.9816-2.4618 1.9002-1.8384c.0204-.0205.0237-.051.01-.092-.0137-.0339-.0408-.051-.0816-.051h-.9398c-.0477 0-.0953.024-.143.0716L.9096 11.607V7.4496c0-.0679-.0342-.102-.1022-.102zm18.0417 0c-.068 0-.102.0341-.102.102v6.752c0 .0681.034.102.102.102h.705c.068 0 .102-.034.102-.102v-6.752c0-.068-.034-.102-.102-.102zM5.961 9.6254c-.5653 0-1.11.1806-1.6343.5415-.0545.0545-.0648.102-.0307.143l.3676.5208c.0272.0477.0717.0545.133.0204.3948-.2722.783-.4086 1.1644-.4086.2927 0 .5158.0886.669.2656.1532.1771.2197.3917.1992.6436-.6606.0681-1.1545.1495-1.4813.245-.8308.2383-1.2461.6913-1.2461 1.3586 0 .4222.1533.7695.4598 1.0419.3132.2654.6845.3982 1.1134.3982.4698 0 .8545-.1125 1.1542-.3372v.1432c0 .0682.0374.102.1123.102h.7048c.068 0 .102-.0338.102-.102V11.372c0-.6604-.2245-1.1406-.6739-1.4403-.3065-.2043-.6776-.3063-1.1134-.3063zm4.3225 0c-.6742 0-1.195.2622-1.5627.7865-.3133.4359-.4699.9671-.4699 1.5936 0 .6604.1634 1.2087.4903 1.6444.3744.4972.892.7455 1.5526.7455.5313 0 .9567-.1327 1.2768-.3982v.531c0 .858-.4122 1.287-1.236 1.287-.361 0-.732-.1907-1.1132-.572a.098.098 0 00-.0716-.0306c-.034 0-.0613.0102-.0817.0307l-.4802.48c-.0408.0613-.0375.1124.0103.1532.1361.1157.2554.2129.3576.2911.102.0783.1905.1413.2656.189.354.1975.7284.2961 1.1235.2961.6808 0 1.207-.1925 1.5781-.577.3711-.3848.5567-.9484.5567-1.6903V9.8196c0-.068-.034-.102-.102-.102h-.705c-.0682 0-.1021.034-.1021.102v.2043c-.3471-.2657-.7763-.3985-1.287-.3985zm4.8021 0c-.6742 0-1.195.2622-1.5627.7865-.3132.4359-.4699.9671-.4699 1.5936 0 .6604.1633 1.2087.4903 1.6444.3744.4972.892.7455 1.5526.7455.5311 0 .9566-.1327 1.2768-.3982v.531c0 .858-.4122 1.287-1.236 1.287-.361 0-.732-.1907-1.1133-.572a.098.098 0 00-.0716-.0306c-.034 0-.0612.0102-.0816.0307l-.48.48c-.0409.0613-.0376.1124.01.1532.1363.1157.2555.2129.3576.2911.1021.0783.1906.1413.2657.189.354.1975.7285.2961 1.1237.2961.6808 0 1.2068-.1925 1.5781-.577.371-.3848.5565-.9484.5565-1.6903V9.8196c0-.068-.034-.102-.102-.102h-.7049c-.0682 0-.1022.034-.1022.102v.2043c-.3474-.2657-.7763-.3985-1.287-.3985zm6.7457 0c-.6537 0-1.185.211-1.5936.6332-.4427.4632-.664 1.0283-.664 1.6956 0 .7083.225 1.2905.6743 1.7467.463.463 1.042.6945 1.7366.6945.6467 0 1.2154-.1838 1.7057-.5515.0545-.041.0545-.0884 0-.143l-.4802-.4903c-.041-.0409-.0919-.0409-.1533 0-.2998.2112-.6368.3167-1.0112.3167-.4222 0-.7729-.119-1.052-.3576-.2452-.2248-.3882-.5038-.429-.8375h3.3197c.0679 0 .1022-.0341.1022-.1023l.01-.2244c.0341-.6878-.1668-1.26-.6025-1.7162-.4224-.4426-.9432-.664-1.5627-.664zm-.0206.7865c.3268 0 .6062.1056.8377.3166.2452.211.371.4734.378.7865h-2.4618c.0613-.3269.2077-.5925.4392-.7968.2313-.2042.5004-.3063.8069-.3063zm-11.4249.102c.6196 0 1.0146.2181 1.1848.6538v1.6854c-.1702.4358-.5755.6538-1.2155.6538-.3133 0-.5687-.0986-.7661-.2963-.2656-.2518-.3983-.6538-.3983-1.2053 0-.9941.3984-1.4914 1.1951-1.4914zm4.802 0c.6196 0 1.0148.2181 1.1851.6538h-.0002v1.6854c-.1703.4358-.5755.6538-1.2155.6538-.3132 0-.5686-.0986-.7661-.2963-.2655-.2518-.3983-.6538-.3983-1.2053 0-.9941.3983-1.4914 1.195-1.4914zm-8.3586 1.6547v1.0215c-.286.286-.6675.412-1.1441.3779-.1703-.0135-.32-.0663-.4493-.1582-.1294-.0919-.2045-.2129-.2249-.3627-.0341-.2657.1158-.47.4495-.6129.2452-.1088.7013-.1974 1.3688-.2656z" />
    </svg>
  );
}

function SocialIcon({ label }: { label: string }) {
  switch (label) {
    case "GitHub":
      return <Github aria-hidden="true" className="h-[18px] w-[18px]" />;
    case "LinkedIn":
      return <Linkedin aria-hidden="true" className="h-[18px] w-[18px]" />;
    case "LeetCode":
      return <LeetCodeIcon />;
    case "Kaggle":
      return <KaggleIcon />;
    default:
      return null;
  }
}

const socialIconLinkClass =
  "inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-[color,background-color,transform] hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.96]";

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
    jobTitle: "Software Engineer",
    email: `mailto:${CONTACT_EMAIL}`,
    image: `${baseUrl}/opengraph-image`,
    description:
      "High-agency full-stack software engineer building production SaaS products, AI/RAG workflows, and the integrations behind them.",
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
          <p className="text-sm text-foreground mb-1">{hero.currentRole}</p>
          <p className="text-sm text-muted-foreground mb-6">
            {hero.availability}
          </p>
          <CVButton />
          <div className="mt-5 flex items-center justify-center gap-1">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label={`Email ${CONTACT_EMAIL}`}
              title={`Email ${CONTACT_EMAIL}`}
              className={socialIconLinkClass}
            >
              <Mail aria-hidden="true" className="h-[18px] w-[18px]" />
            </a>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                title={link.label}
                className={socialIconLinkClass}
              >
                <SocialIcon label={link.label} />
              </a>
            ))}
          </div>
        </div>

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
          <div className="mx-auto max-w-[68ch] space-y-3 text-pretty leading-relaxed text-foreground">
            {workflow.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="projects">
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
