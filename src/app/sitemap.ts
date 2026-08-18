import { getBooks } from "@/lib/markdown-books";
import { getWritings } from "@/lib/markdown-writing";
import { MetadataRoute } from "next";

// Revalidate sitemap every 1 hour
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lokmanefe.com";

  const writings = await getWritings();
  const writingsUrls = writings.map((writing) => ({
    url: `${baseUrl}/writing/${writing.slug}`,
    lastModified: new Date(writing.updatedAt).toISOString(),
  }));

  const books = await getBooks();
  const booksUrls = books.map((book) => ({
    url: `${baseUrl}/reading/${book.slug}`,
    lastModified: new Date(book.updatedAt).toISOString(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/reading`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/writing`,
      lastModified: new Date().toISOString(),
    },
    ...writingsUrls,
    ...booksUrls,
  ];
}
