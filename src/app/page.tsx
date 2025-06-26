import { CVButton } from "@/components/cv-button";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Lokman Baturay Efe</h1>
        <p className="text-lg text-muted-foreground mb-6">
          I&apos;m a software developer based in Edirne, Türkiye. I build
          things.
        </p>
        <CVButton />
      </div>

      <section>
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <p className="text-muted-foreground leading-relaxed">
          I&apos;ve been programming for nearly two years, focusing on web
          technologies and artificial intelligence. Did some work voluntarily
          for startups about ai (image processing, ocr, data labeling, object
          detection) and frontend (react). Currently working at a startup doing
          backend (finally getting paid!). I am active in uni student clubs like
          IEEE and GDG.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <p className="text-muted-foreground">
          Email:{" "}
          <a
            href="mailto:lokman@lokmanbaturayefe.com"
            className="text-primary hover:underline"
          >
            lokman@lokmanbaturayefe.com
          </a>
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
            href="https://www.kaggle.com/lokmanefe"
            className="text-primary hover:underline"
          >
            Kaggle
          </a>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <p className="text-muted-foreground mb-4">
          I&apos;ve built various applications ranging from full-stack web apps
          to AI/ML projects and desktop tools. Here are some highlights:
        </p>
        <ul className="space-y-3 text-muted-foreground mb-6">
          <li>
            <a
              href="https://github.com/lokicik/eyedoro"
              className="text-primary hover:underline font-medium"
            >
              Eyedoro
            </a>{" "}
            - Open-source Electron alternative for lookaway.app
          </li>
          <li>
            <a
              href="https://github.com/lokicik/gochop"
              className="text-primary hover:underline font-medium"
            >
              GoChop
            </a>{" "}
            - Privacy-respecting link shortener with advanced features
          </li>
          <li>
            <a
              href="https://saas-kit-eosin.vercel.app/"
              className="text-primary hover:underline font-medium"
            >
              SaaS Kit
            </a>{" "}
            - Next.js 15 SaaS template with authentication and billing
          </li>
          <li>
            <a
              href="https://github.com/orgs/Chimera-Platform/repositories"
              className="text-primary hover:underline font-medium"
            >
              Chimera
            </a>{" "}
            - AI-powered chat application with real-time messaging
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
  );
}
