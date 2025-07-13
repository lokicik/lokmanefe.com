import { ProjectsPageContent } from "@/components/projects-page-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore a selection of software projects, applications, and tools I've built, from full-stack web apps to AI/ML experiments.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | Lokman Efe",
    description:
      "A showcase of my software development projects and applications.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
