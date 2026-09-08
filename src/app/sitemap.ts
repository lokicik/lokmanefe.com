import { getBooks } from "@/lib/markdown-books";
import { getWritings } from "@/lib/markdown-writing";
import { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

// Revalidate sitemap every 1 hour
export const revalidate = 3600;

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
