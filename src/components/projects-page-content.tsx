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
import { projects, type Project } from "@/lib/projects";

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
                  prefetch={false}
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
                  prefetch={false}
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
