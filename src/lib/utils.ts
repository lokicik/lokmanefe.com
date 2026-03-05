import { clsx, type ClassValue } from "clsx";

export const CV_URL =
  "https://github.com/lokicik/CV/raw/main/04-01-2026/Fullstack-Engineer-Lokman-Efe-Resume.pdf";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
