import {
  getWritings as getMarkdownPosts,
  type MarkdownWriting as MarkdownPost,
} from "@/lib/markdown-writing";
import { getBooks, type Book } from "@/lib/markdown-books";
import { absoluteUrl, site } from "@/lib/seo";
import { contentDate } from "@/lib/content-date";

// Revalidate RSS feed every 1 hour
export const revalidate = 3600;

type BlogItem = MarkdownPost & { itemType: "blog"; url: string };
type BookItem = Book & { itemType: "book"; url: string; date?: string };
type RSSItem = BlogItem | BookItem;

function xml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export async function GET() {
  const [posts, books] = await Promise.all([getMarkdownPosts(), getBooks()]);

  // Combine and sort by date
  const allItems: RSSItem[] = [
    ...posts.map(
      (post: MarkdownPost): BlogItem => ({
        itemType: "blog",
        ...post,
        url: `/writing/${post.slug}`,
      })
    ),
    ...books.map(
      (book: Book): BookItem => ({
        itemType: "book",
        ...book,
        url: `/reading/${book.slug}`,
        date: book.lastModified || contentDate(book.completedDate) || contentDate(book.startDate),
      })
    ),
  ].sort((a, b) => (b.date ? new Date(b.date).getTime() : 0) - (a.date ? new Date(a.date).getTime() : 0));

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(site.name)}</title>
    <description>Blog posts and reading updates from ${xml(site.fullName)}</description>
    <link>${absoluteUrl()}</link>
    <atom:link href="${absoluteUrl("/rss")}" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${allItems
      .map((item) => {
        const title =
          item.itemType === "blog" ? item.title : `📚 ${item.title}`;
        const description =
          item.itemType === "blog"
            ? item.excerpt || "No excerpt available"
            : `Rating: ${item.rating || "N/A"}/5 - ${
                item.description || "No description available"
              }`;

        return `
    <item>
      <title>${xml(title)}</title>
      <description>${xml(description)}</description>
      <link>${xml(absoluteUrl(item.url))}</link>
      ${item.date ? `<pubDate>${new Date(item.date).toUTCString()}</pubDate>` : ""}
      <guid>${xml(absoluteUrl(item.url))}</guid>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
