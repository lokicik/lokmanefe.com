import { CVButton } from "@/components/cv-button";
import { Metadata } from "next";

// Enable ISR with 1 day revalidation (homepage changes rarely)
export const revalidate = 86400; // 24 hours

export const metadata: Metadata = {
  title: "Lokman Efe",
  description:
    "Lokman Efe is a software developer based in Edirne, Türkiye. This is his personal portfolio and blog.",
  alternates: {
    canonical: "/",
  },
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lokmanefe.com";

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
    email: "mailto:lokman@lokmanefe.com",
    image: `${baseUrl}/projects/lokmanefe_ss1.png`,
    description:
      "AI Product Engineer with experience in building scalable applications and intelligent systems.",
    nationality: "Turkish",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Edirne",
      addressCountry: "TR",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Lokman Efe</h1>
          <p className="text-lg text-muted-foreground mb-6">
            I want to scale.
          </p>
          <CVButton />
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-4">About</h2>
          <p className="text-muted-foreground leading-relaxed">
            I build, I break, I apply and get mostly rejected..
            <br/>
            I can learn any technology. Hire?
            <br/>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Contact</h2>
          <p className="text-muted-foreground">
            <a
              href="mailto:hello@lokmanefe.com"
              className="text-primary hover:underline"
            >
              Email         </a>
            <br />
            <a
              href="https://github.com/lokicik"
              className="text-primary hover:underline"
            >
              GitHub
            </a>{" "}
            |{" "}
            <a
              href="https://linkedin.com/in/lokmanefe"
              className="text-primary hover:underline"
            >
              LinkedIn
            </a>{" "}
            |{" "}
            <a
              href="https://leetcode.com/u/lokmanefe/"
              className="text-primary hover:underline"
            >
              LeetCode
            </a>{" "}
            |{" "}
            <a
              href="https://kaggle.com/lokmanefe/"
              className="text-primary hover:underline"
            >
              Kaggle
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Projects</h2>
          <ul className="space-y-3 text-muted-foreground mb-6">
            <li>
              <a
                href="https://gdgoncampustu.com"
                className="text-primary hover:underline font-medium"
              >
                GDG On Campus TÜ
              </a>{" "}
              - The best uni club site ever
            </li>
             <li>
              <a
                href="https://github.com/lokicik/eyedoro"
                className="text-primary hover:underline font-medium"
              >
                Eyedoro
              </a>{" "}
              - Open-source alternative for lookaway.app (I&apos;ll pick it up soon)
            </li>
            <li>
              <a
                href="https://github.com/lokicik/gochop"
                className="text-primary hover:underline font-medium"
              >
                GoChop
              </a>{" "}
              - A link shortener (I&apos;ll pick it up soon)
            </li>
            <li>
              <a
                href="https://saas-kit-eosin.vercel.app/"
                className="text-primary hover:underline font-medium"
              >
                SaaS Kit
              </a>{" "}
              - SaaS template (may be offline)
            </li>
            <li>
              <a
                href="https://github.com/orgs/Chimera-Platform/repositories"
                className="text-primary hover:underline font-medium"
              >
                Chimera
              </a>{" "}
              - AI chat application 
            </li>
          </ul>
          <a
            href="/projects"
            className="text-primary hover:underline font-medium inline-flex items-center"
          >
            View all projects →
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Competitions</h2>
          <ul className="space-y-3 text-muted-foreground">
             <li>
              <a
                href="https://www.kaggle.com/competitions/datathon-2025"
                className="text-primary hover:underline font-medium"
              >
                Datathon 2025 
              </a>{" "}
              - 229/571 (hell I&apos;m rusty)
            </li>
            <li>
              <a
                href="https://www.kaggle.com/competitions/datathon2023"
                className="text-primary hover:underline font-medium"
              >
                Datathon 2023
              </a>{" "}
              - 113/255
            </li>
            <li>
              <a
                href="https://www.kaggle.com/competitions/dtc-zoomcamp-qa-challenge"
                className="text-primary hover:underline font-medium"
              >
                DTC Zoomcamp Q&A Challenge
              </a>{" "}
              - 21/54
            </li>
          </ul>
        </section>
      </div>
    </>
  );
}
