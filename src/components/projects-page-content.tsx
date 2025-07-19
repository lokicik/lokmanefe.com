"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ExternalLink,
  Github,
  Search,
  Code2,
  Globe,
  Bot,
  Brain,
  Smartphone,
  Sparkles,
  ChevronDown,
} from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: "Full-Stack" | "AI/ML" | "Desktop" | "Web" | "Tool" | "Bot";
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  year: number;
}

const projects: Project[] = [
  {
    id: "geoip-explorer",
    title: "GeoIP Explorer",
    description:
      "An advanced IP tracking and geolocation application built with Vue 3 and Leaflet",
    longDescription:
      "GeoIP Explorer is an advanced IP tracking and geolocation application featuring real-time IP location mapping, distance measurements, custom markers, weather information, and more. Built with Vue 3, TypeScript, and Leaflet with a tactical/military theme, it includes multiple map modes, marker systems, analytics, and export options.",
    category: "Web",
    technologies: ["Vue.js", "TypeScript", "Leaflet", "Pinia", "Vite"],
    githubUrl: "https://github.com/lokicik/geoip-explorer",
    liveUrl: "https://geoip-explorer-lokmanefe.netlify.app/",
    imageUrl: "/projects/geoip_1.jpg",
    featured: true,
    year: 2025,
  },
  {
    id: "blogcraft-ai",
    title: "BlogCraft AI",
    description: "Automated blog post generator with AI-powered content creation",
    longDescription:
      "BlogCraft AI is an intelligent blog post generation system that creates SEO-optimized, professional content about career development, AI hiring trends, and job market insights. Features Google Gemini integration, smart template system, dynamic personalization, and beautiful Streamlit interface with automation capabilities.",
    category: "AI/ML",
    technologies: ["Python", "Streamlit", "Gemini", "FastAPI", "HTMX", "AI"],
    githubUrl: "https://github.com/lokicik/BlogCraft-ai",
    imageUrl: "/projects/blogpost_ss1.jpg",
    featured: true,
    year: 2025,
  },
  {
    id: "matchtalent-ai",
    title: "MatchTalent AI",
    description: "Intelligent CV analysis & job matching platform with AI-powered insights",
    longDescription:
      "MatchTalent AI is a powerful web application that leverages artificial intelligence to analyze CVs/resumes and provide personalized job recommendations. Features smart CV analysis, multi-platform job search across JSearch, Adzuna, and RemoteOK, intelligent matching with relevance scoring, and secure processing with automatic data clearing for privacy.",
    category: "AI/ML",
    technologies: ["Python", "Streamlit", "Gemini", "AI", "APIs", "PDF Processing", "NLP"],
    githubUrl: "https://github.com/lokicik/matchtalent-ai",
    imageUrl: "/projects/matchtalent-ai.jpg",
    featured: true,
    year: 2025,
  },
  {
    id: "storycut",
    title: "StoryCut",
    description: "An AI-powered tool to generate storybooks from user prompts.",
    longDescription:
      "StoryCut is a tool that allows users to generate complete storybooks, including characters, scenes, and a cover, based on their own prompts. A key feature is character referencing, allowing for consistent characters across different scenes. The tool provides a seamless experience for creating and exporting stories as PDF files.",
    category: "AI/ML",
    technologies: ["Python", "FastAPI", "HTMX", "AI", "OpenAI API"],
    liveUrl: "/projects/After_The_Adventure's_End_storybook.pdf",
    imageUrl: "/projects/ai-storybook_ss1.jpg",
    featured: true,
    year: 2025,
  },
  {
    id: "saaskit",
    title: "SaaS Kit",
    description: "A SaaS template with Next.js 15",
    longDescription:
      "A comprehensive SaaS starter kit built with the latest Next.js 15, featuring authentication, billing, user management, and modern UI components. Perfect for quickly launching SaaS applications.",
    category: "Web",
    technologies: ["Next.js 15", "TypeScript", "Tailwind CSS", "Prisma"],
    liveUrl: "https://saas-kit-eosin.vercel.app/",
    imageUrl: "/projects/saaskit_ss1.png",
    featured: true,
    year: 2025,
  },
  {
    id: "chimera",
    title: "Chimera",
    description: "A modern full-stack AI-powered chat application",
    longDescription:
      "Built with Next.js frontend and Go backend, featuring real-time messaging, Firebase integration, and AI capabilities. A sophisticated chat platform with modern architecture and scalable design.",
    category: "Full-Stack",
    technologies: ["Next.js", "Go", "Firebase", "WebSocket", "AI"],
    githubUrl: "https://github.com/orgs/Chimera-Platform/repositories",
    imageUrl: "/projects/chimera_ss1.jpg",
    featured: true,
    year: 2025,
  },
  {
    id: "lokmanyefe",
    title: "lokmanefe.com",
    description: "This very website - my personal portfolio and blog",
    longDescription:
      "A modern, clean portfolio website built with Next.js, featuring a blog system, reading tracker, and project showcase. Demonstrates my skills in modern web development and design.",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Markdown"],
    githubUrl: "https://github.com/lokicik/lokmanefe.com",
    liveUrl: "https://lokmanefe.com",
    imageUrl: "/projects/lokmanefe_ss1.png",
    featured: true,
    year: 2022,
  },
  {
    id: "gdg-website",
    title: "GDG Website",
    description: "A school club website with Next.js",
    longDescription:
      "Official website for GDG on Campus Trakya, built with Next.js. Features event management, member profiles, and club information with a modern, responsive design.",
    category: "Web",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    featured: true,
    githubUrl:
      "https://github.com/GDG-on-Campus-Trakya/GDG-on-Campus-Trakya-Website",
    imageUrl: "/projects/gdgwebsite_ss1.png",
    year: 2024,
  },
  {
    id: "eyedoro",
    title: "Eyedoro",
    description: "An open-source Electron alternative for lookaway.app",
    longDescription:
      "A beautiful desktop application built with Electron that helps protect your eyes by enforcing regular breaks from screen time. Features customizable work/break intervals, full screen blocking, system tray integration, and beautiful UI with dark mode support.",
    category: "Desktop",
    technologies: ["Electron", "React", "JavaScript", "CSS3"],
    githubUrl: "https://github.com/lokicik/eyedoro",
    imageUrl: "/projects/eyedoro_ss1.png",
    featured: true,
    year: 2024,
  },
  {
    id: "gochop",
    title: "GoChop",
    description:
      "Open-source, privacy-respecting link shortener designed for power users",
    longDescription:
      "A powerful link shortener with advanced features like A/B testing, password protection, dynamic QR codes, and comprehensive analytics. Built with Go backend and TypeScript frontend for optimal performance.",
    category: "Full-Stack",
    technologies: ["Go", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    githubUrl: "https://github.com/lokicik/gochop",
    imageUrl: "/projects/gochop_ss1.png",
    featured: true,
    year: 2024,
  },
  {
    id: "hms",
    title: "Hotel Management System",
    description:
      "A simple hotel management system with Google Sheets integration",
    longDescription:
      "A streamlined hotel management solution that leverages Google Sheets for data storage, providing an easy-to-use interface for managing bookings, guests, and hotel operations.",
    category: "Web",
    technologies: ["JavaScript", "Google Sheets API", "HTML", "CSS"],
    githubUrl: "https://github.com/lokicik/hms",
    year: 2025,
  },
  {
    id: "ikigai-bot",
    title: "Ikigai Discord Bot",
    description: "A Discord bot with music support",
    longDescription:
      "A feature-rich Discord bot with music playback capabilities, moderation tools, and various utility commands to enhance server management and user experience.",
    category: "Bot",
    technologies: ["Python", "Discord.py", "SQLite"],
    githubUrl: "https://github.com/lokicik/ikigai-discord-bot",
    year: 2023,
  },
  {
    id: "easyscreenocr",
    title: "EasyScreenOCR Clone",
    description: "An open-source solution for a paid OCR app",
    longDescription:
      "A free alternative to paid OCR software, providing text extraction capabilities from screenshots and images with high accuracy and a simple interface.",
    category: "Tool",
    technologies: ["Python", "OCR", "Tkinter"],
    githubUrl: "https://github.com/lokicik/easyscreenocr-clone",
    year: 2023,
  },
  {
    id: "dog-cat-classification",
    title: "Dog or Cat Classification",
    description:
      "A deep learning model for classifying images of dogs and cats with CNN",
    longDescription:
      "Computer vision project using Convolutional Neural Networks to accurately classify images as containing either dogs or cats. Demonstrates deep learning and image processing skills.",
    category: "AI/ML",
    technologies: ["Python", "TensorFlow", "CNN", "Computer Vision"],
    githubUrl: "https://github.com/lokicik/dog_or_cat_image_classification",
    year: 2023,
  },
  {
    id: "smoking-drinking-classification",
    title: "Smoking/Drinking Classification",
    description:
      "A deep learning project for drinking or smoking prediction with ensemble learning",
    longDescription:
      "Machine learning project using ensemble methods (LGBM, XGB, and Random Forest) to predict smoking and drinking habits based on various health and lifestyle indicators.",
    category: "AI/ML",
    technologies: [
      "Python",
      "LGBM",
      "XGBoost",
      "Random Forest",
      "Scikit-learn",
    ],
    githubUrl: "https://github.com/lokicik/smoking_drinking_classification",
    year: 2023,
  },
  {
    id: "aygaz-project",
    title: "Dog Breed Classification",
    description: "A deep learning project for classifying dog breeds with CNN",
    longDescription:
      "Advanced computer vision project for the Aygaz Deep Learning competition, using CNNs to classify different dog breeds with high accuracy.",
    category: "AI/ML",
    technologies: ["Python", "TensorFlow", "CNN", "Data Augmentation"],
    githubUrl: "https://github.com/lokicik/Aygaz_Deep_Learning_Project",
    year: 2023,
  },
  {
    id: "akbank-project",
    title: "Melbourne Housing Regression",
    description:
      "A machine learning project for house price prediction with Random Forest",
    longDescription:
      "Regression analysis project for the Akbank Machine Learning competition, predicting Melbourne housing prices using Random Forest algorithms and feature engineering.",
    category: "AI/ML",
    technologies: ["Python", "Random Forest", "Pandas", "Feature Engineering"],
    githubUrl: "https://github.com/lokicik/Akbank_Machine_Learning_Project",
    year: 2023,
  },
];

const categoryIcons = {
  "Full-Stack": Code2,
  "AI/ML": Brain,
  Desktop: Smartphone,
  Web: Globe,
  Tool: Sparkles,
  Bot: Bot,
};

const categoryColors = {
  "Full-Stack": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  "AI/ML":
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  Desktop: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  Web: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  Tool: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  Bot: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
};

export function ProjectsPageContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showOtherProjects, setShowOtherProjects] = useState(false);

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const featuredProjects = filteredProjects.filter((p) => p.featured);
  const otherProjects = filteredProjects.filter((p) => !p.featured);

  const categories = [...new Set(projects.map((p) => p.category))];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Software Projects</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A collection of applications, tools, and experiments I&apos;ve built
          over the years. From full-stack web applications to AI/ML projects and
          desktop tools.
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects, technologies, or descriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
          >
            All Projects ({projects.length})
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category} (
              {projects.filter((p) => p.category === category).length})
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">Featured Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
          </div>
        </section>
      )}

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <section
          className={
            featuredProjects.length > 0 && selectedCategory !== "all"
              ? "mt-12"
              : ""
          }
        >
          {selectedCategory === "all" ? (
            // Collapsible dropdown for "All Projects" view
            <div className="space-y-6">
              <button
                onClick={() => setShowOtherProjects(!showOtherProjects)}
                className="flex items-center gap-2 text-2xl font-bold hover:text-primary transition-colors"
              >
                <span>
                  {featuredProjects.length > 0
                    ? "Other Projects"
                    : "All Projects"}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({otherProjects.length})
                </span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    showOtherProjects ? "rotate-180" : ""
                  }`}
                />
              </button>

              {showOtherProjects && (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {otherProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Always-visible list when a category is selected
            <div>
              <h2 className="text-2xl font-bold mb-6">
                {featuredProjects.length > 0
                  ? "Other Projects"
                  : `${selectedCategory} Projects`}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {otherProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No projects found matching your filters.
          </p>
        </div>
      )}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  const CategoryIcon = categoryIcons[project.category];

  return (
    <Card
      className={`group hover:shadow-lg transition-all duration-200 h-full flex flex-col ${
        featured ? "border-primary/20" : ""
      }`}
    >
      {project.imageUrl && (
        <div
          className={`${
            featured ? "aspect-[16/10]" : "aspect-video"
          } relative overflow-hidden rounded-t-lg flex-shrink-0`}
        >
          <Image
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className={`${categoryColors[project.category]} border-0 text-xs`}
            >
              <CategoryIcon className="w-3 h-3 mr-1" />
              {project.category}
            </Badge>
          </div>
        </div>
      )}

      <CardHeader className={`space-y-3 ${featured ? "pb-4" : "pb-3"}`}>
        <div className="flex items-start justify-between gap-2">
          <CardTitle
            className={`${
              featured ? "text-xl" : "text-lg"
            } group-hover:text-primary transition-colors leading-tight`}
          >
            {project.title}
          </CardTitle>
        </div>
        <CardDescription
          className={`${featured ? "text-sm" : "text-sm"} leading-relaxed`}
        >
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 flex-grow flex flex-col">
        {project.longDescription && featured && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.longDescription}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5">
          {project.technologies.slice(0, featured ? 8 : 5).map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs px-2 py-1">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > (featured ? 8 : 5) && (
            <Badge variant="outline" className="text-xs px-2 py-1">
              +{project.technologies.length - (featured ? 8 : 5)}
            </Badge>
          )}
        </div>

        <div className="flex-grow"></div>

        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap gap-2">
            {project.githubUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="flex-1 min-w-0"
              >
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Code</span>
                </Link>
              </Button>
            )}
            {project.liveUrl && (
              <Button
                variant="default"
                size="sm"
                asChild
                className="flex-1 min-w-0"
              >
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...(project.id === "storycut" && {
                    download: "After_The_Adventure's_End_storybook.pdf",
                  })}
                >
                  <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="truncate">Live Demo</span>
                </Link>
              </Button>
            )}
          </div>

          <div className="text-xs text-muted-foreground border-t pt-2">
            {project.year}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
