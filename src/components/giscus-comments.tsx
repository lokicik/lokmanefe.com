"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface GiscusCommentsProps {
  repo: string; // Format: "username/repository"
  repoId: string;
  category: string;
  categoryId: string;
  mapping?: string;
  term?: string;
  reactionsEnabled?: boolean;
  emitMetadata?: boolean;
}

export function GiscusComments({
  repo,
  repoId,
  category,
  categoryId,
  mapping = "pathname",
  term,
  reactionsEnabled = true,
  emitMetadata = false,
}: GiscusCommentsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: "200px", // Load 200px before it comes into view
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ref.current || !isVisible || ref.current.hasChildNodes()) return;

    const scriptElement = document.createElement("script");
    scriptElement.src = "https://giscus.app/client.js";
    scriptElement.async = true;
    scriptElement.crossOrigin = "anonymous";

    // Giscus configuration
    scriptElement.setAttribute("data-repo", repo);
    scriptElement.setAttribute("data-repo-id", repoId);
    scriptElement.setAttribute("data-category", category);
    scriptElement.setAttribute("data-category-id", categoryId);
    scriptElement.setAttribute("data-mapping", mapping);
    if (term) {
      scriptElement.setAttribute("data-term", term);
    }
    scriptElement.setAttribute("data-strict", "0");
    scriptElement.setAttribute(
      "data-reactions-enabled",
      reactionsEnabled ? "1" : "0"
    );
    scriptElement.setAttribute("data-emit-metadata", emitMetadata ? "1" : "0");
    scriptElement.setAttribute("data-input-position", "top");
    scriptElement.setAttribute("data-lang", "en");
    scriptElement.setAttribute("data-loading", "lazy");

    // Theme handling - map your custom themes to appropriate Giscus themes
    const getGiscusTheme = (theme: string) => {
      switch (theme) {
        case "dark":
        case "soft-dark":
          return "dark";
        case "blue":
          return "dark_dimmed"; // Works well with blue theme
        case "sepia":
          return "light"; // Sepia is light-based
        case "light":
        default:
          return "light";
      }
    };

    const giscusTheme = getGiscusTheme(resolvedTheme || "light");
    scriptElement.setAttribute("data-theme", giscusTheme);

    ref.current.appendChild(scriptElement);
  }, [
    repo,
    repoId,
    category,
    categoryId,
    mapping,
    term,
    reactionsEnabled,
    emitMetadata,
    resolvedTheme,
    isVisible,
  ]);

  // Update theme when it changes
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    if (!iframe) return;

    // Use the same theme mapping function
    const getGiscusTheme = (theme: string) => {
      switch (theme) {
        case "dark":
        case "soft-dark":
          return "dark";
        case "blue":
          return "dark_dimmed"; // Works well with blue theme
        case "sepia":
          return "light"; // Sepia is light-based
        case "light":
        default:
          return "light";
      }
    };

    const giscusTheme = getGiscusTheme(resolvedTheme || "light");

    iframe.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme: giscusTheme,
          },
        },
      },
      "https://giscus.app"
    );
  }, [resolvedTheme]);

  return (
    <section className="mt-16 pt-12 border-t relative z-30 pb-40 md:pb-16 mb-32 md:mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Comments</h2>
        <p className="text-muted-foreground text-sm">
          Comments are powered by{" "}
          <a
            href="https://giscus.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Giscus
          </a>
          . Join the discussion on GitHub!
        </p>
      </div>

      <div ref={ref} className="giscus-container relative z-30" />
    </section>
  );
}

// Writings comments component with your actual repository configuration
export function WritingComments() {
  // Your actual GitHub repository configuration
  const GISCUS_CONFIG = {
    repo: "lokicik/lokmanefe.com", // Your repository
    repoId: "R_kgDONOXVwQ", // Your repo ID
    category: "Writings", // Your category name for writings
    categoryId: "DIC_kwDONOXVwc4Crhvw", // Your category ID
  };

  return (
    <GiscusComments
      repo={GISCUS_CONFIG.repo}
      repoId={GISCUS_CONFIG.repoId}
      category={GISCUS_CONFIG.category}
      categoryId={GISCUS_CONFIG.categoryId}
      mapping="pathname"
      reactionsEnabled={true}
      emitMetadata={false}
    />
  );
}
