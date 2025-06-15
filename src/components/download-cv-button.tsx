"use client";

import { useState, useEffect } from "react";
import { Download, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GitHubFile {
  name: string;
  download_url: string;
  type: string;
}

export function DownloadCVButton() {
  const [latestCV, setLatestCV] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestCV = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Try GitHub API first
      try {
        const response = await fetch(
          "https://api.github.com/repos/lokicik/CV/contents",
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
            },
          }
        );

        if (response.ok) {
          const files: GitHubFile[] = await response.json();

          // Filter PDF files and sort by date in filename
          const pdfFiles = files
            .filter(
              (file) => file.name.endsWith(".pdf") && file.type === "file"
            )
            .sort((a, b) => {
              // Extract dates from filenames (DD-MM-YYYY format)
              const dateA = extractDateFromFilename(a.name);
              const dateB = extractDateFromFilename(b.name);
              return dateB.getTime() - dateA.getTime(); // Latest first
            });

          if (pdfFiles.length > 0) {
            setLatestCV(pdfFiles[0].download_url);
            return;
          }
        }
      } catch {
        // Fall through to fallback
      }

      // Fallback: Use the latest known CV (update this when you upload new versions)
      const fallbackCV =
        "https://github.com/lokicik/CV/raw/main/15-06-2025-Lokman-Efe-CV.pdf";
      setLatestCV(fallbackCV);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load CV");
      // Even if there's an error, provide fallback
      const fallbackCV =
        "https://github.com/lokicik/CV/raw/main/15-06-2025-Lokman-Efe-CV.pdf";
      setLatestCV(fallbackCV);
    } finally {
      setIsLoading(false);
    }
  };

  // Extract date from filename format: DD-MM-YYYY-...
  const extractDateFromFilename = (filename: string): Date => {
    const match = filename.match(/^(\d{2})-(\d{2})-(\d{4})/);
    if (match) {
      const [, day, month, year] = match;
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }
    return new Date(0); // Fallback for files without date
  };

  const handleDownload = async () => {
    if (!latestCV) {
      await fetchLatestCV();
      return;
    }

    try {
      // Create a link element and trigger download
      const link = document.createElement("a");
      link.href = latestCV;
      link.download = "Lokman-Efe-CV.pdf";
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      setError("Failed to download CV");
    }
  };

  // Fetch CV on component mount
  useEffect(() => {
    fetchLatestCV();
  }, []);

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={handleDownload}
        disabled={isLoading}
        className="flex items-center gap-2"
        size="lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading CV...
          </>
        ) : (
          <>
            <FileText className="h-4 w-4" />
            <Download className="h-4 w-4" />
            Download CV
          </>
        )}
      </Button>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {latestCV && !error && (
        <p className="text-xs text-muted-foreground">
          Latest version available
        </p>
      )}
    </div>
  );
}
