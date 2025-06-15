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
          I&apos;ve been programming for nearly a year, focusing on web
          technologies and artificial intelligence. Did some work voluntarily
          for startups about ai (image processing, ocr, data labeling, object
          detection) and frontend (react). Currently working at a startup doing
          backend (finally getting paid!). I&apos;m eager to learn about
          creating custom ASIC and FPGA chip design for LLM-based systems. I am
          active in uni student clubs like IEEE and GDG On Campus.
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
        <ul className="space-y-3 text-muted-foreground">
          <li>
            <a
              href="https://github.com/lokicik/ikigai-discord-bot"
              className="text-primary hover:underline font-medium"
            >
              ikigai
            </a>{" "}
            - A discord bot with music support
          </li>
          <li>
            <a
              href="https://github.com/lokicik/easyscreenocr-clone"
              className="text-primary hover:underline font-medium"
            >
              easyscreenocr-clone
            </a>{" "}
            - An open-source solution for a paid app
          </li>
          <li>
            <a
              href="https://github.com/lokicik/dog_or_cat_image_classification"
              className="text-primary hover:underline font-medium"
            >
              Dog or Cat Classification
            </a>{" "}
            - A deep learning model for classifying images of dogs and cats with
            CNN
          </li>
          <li>
            <a
              href="https://github.com/lokicik/midterm_project_ml_zoomcamp"
              className="text-primary hover:underline font-medium"
            >
              Drinking or Smoking Classification
            </a>{" "}
            - A deep learning project for drinking or smoking prediction with
            ensemble learning (LGBM, XGB and RF)
          </li>
          <li>
            <a
              href="https://github.com/lokicik/Aygaz_Deep_Learning_Project"
              className="text-primary hover:underline font-medium"
            >
              Dog Breed Classification
            </a>{" "}
            - A deep learning project for classifying dog breeds with CNN
          </li>
          <li>
            <a
              href="https://github.com/lokicik/Akbank_Machine_Learning_Project"
              className="text-primary hover:underline font-medium"
            >
              Melbourne Housing Regression
            </a>{" "}
            - A machine learning project for house price prediction with RF
          </li>
        </ul>
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
