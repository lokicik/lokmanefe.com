"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ReadingBackLink({ href = "/reading" }: { href?: string }) {
  return (
    <Button asChild variant="ghost" size="sm" className="mb-4">
      <Link href={href} prefetch={false}>
        <ArrowLeft aria-hidden="true" className="h-4 w-4 mr-2" />
        Back to Reading
      </Link>
    </Button>
  );
}

export function ReadingBackLinkFromQuery() {
  const back = useSearchParams().get("back");
  const href = back === "/reading" || back?.startsWith("/reading?")
    ? back
    : "/reading";
  return <ReadingBackLink href={href} />;
}
