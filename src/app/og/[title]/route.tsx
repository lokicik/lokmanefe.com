import { getBooks } from "@/lib/markdown-books";
import { getWritings } from "@/lib/markdown-writing";
import { site } from "@/lib/seo";
import { createSocialImage } from "@/lib/social-image";

export const dynamic = "force-static";
export const dynamicParams = false;
export const revalidate = false;

export async function generateStaticParams() {
  const [writings, books] = await Promise.all([
    getWritings({ includeUnlisted: true }),
    getBooks(),
  ]);
  const titles = new Set([
    site.name,
    "Writing",
    "Reading",
    ...writings.map((writing) => writing.title),
    ...books.map((book) => book.title),
  ]);
  return Array.from(titles, (title) => ({ title }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ title: string }> }
) {
  const { title } = await params;
  return createSocialImage(title);
}
