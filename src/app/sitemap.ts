import { getBooks } from "@/lib/markdown-books";
import { getWritings } from "@/lib/markdown-writing";
import { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// The indexed Markdown files and their explicit dates change only on deploy.
export const dynamic = "force-static";
export const revalidate = false;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const writings = await getWritings();
  const writingsUrls = writings.map((writing) => ({
    url: absoluteUrl(`/writing/${writing.slug}`),
    lastModified: writing.lastModified,
  }));

  const books = await getBooks();
  const booksUrls = books.map((book) => ({
    url: absoluteUrl(`/reading/${book.slug}`),
    lastModified: book.lastModified,
  }));

  return [
    {
      url: absoluteUrl(),
    },
    {
      url: absoluteUrl("/reading"),
    },
    {
      url: absoluteUrl("/writing"),
    },
    ...writingsUrls,
    ...booksUrls,
  ];
}
