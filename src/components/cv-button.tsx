"use client";

import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CV_URL } from "@/lib/utils";

export function CVButton() {
  const handleDownload = () => {
    // Direct download link to the latest CV
    // GitHub's raw content URL for direct download
    const cvUrl = CV_URL;

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Lokman-Efe-Resume.pdf";
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={handleDownload}
        className="flex items-center gap-2"
        size="lg"
      >
        <FileText className="h-4 w-4" />
        <Download className="h-4 w-4" />
        Download Resume
      </Button>

      <p className="text-xs text-muted-foreground">
        Last updated: 04-01-2026 • PDF format
      </p>
    </div>
  );
}
