"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CVButton() {
  const handleDownload = () => {
    const cvUrl = `/cv?v=${Date.now()}`;

    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Lokman-Efe-Software-Engineer-Resume.pdf";
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
        className="flex items-center gap-2 transition-transform active:scale-[0.96]"
        size="lg"
      >
        <Download className="h-4 w-4" />
        Résumé
      </Button>

      <p className="text-xs text-muted-foreground">
        Last updated: July 22, 2026
      </p>
    </div>
  );
}
