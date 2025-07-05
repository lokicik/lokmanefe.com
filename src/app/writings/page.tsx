import { getWritings } from "@/lib/markdown-writings";
import { WritingsPageContent } from "@/components/writings-page-content";
import { Suspense } from "react";

export default async function WritingsPage() {
  const writings = await getWritings();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WritingsPageContent initialWritings={writings} />
    </Suspense>
  );
}
