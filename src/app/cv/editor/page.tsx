import type { Metadata } from "next";
import { CvEditor } from "@/components/cv-editor";

export const metadata: Metadata = {
  title: "CV editor",
  description: "Edit the résumé and download it as a PDF, entirely in the browser.",
  alternates: {
    canonical: "/cv/editor",
  },
  // A personal tool, not content worth indexing.
  robots: { index: false, follow: false },
};

export default function CvEditorPage() {
  return <CvEditor />;
}
