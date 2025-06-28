import { getMarkdownPosts, type MarkdownPost } from "@/lib/markdown-posts";
import { getBooks, type Book } from "@/lib/markdown-books";

type BlogItem = MarkdownPost & { type: "blog"; url: string };
type BookItem = Book & { type: "book"; url: string; date: string };
type RSSItem = BlogItem | BookItem;

export async function GET() {
  const [posts, books] = await Promise.all([getMarkdownPosts(), getBooks()]);

  // Combine and sort by date
  const allItems: RSSItem[] = [
    ...posts.map(
      (post: MarkdownPost): BlogItem => ({
        type: "blog",
        ...post,
        url: `/blog/${post.slug}`,
      })
    ),
    ...books.map(
      (book: Book): BookItem => ({
        type: "book",
        ...book,
        url: `/reading/${book.slug}`,
        date: book.completedDate || book.updatedAt.toISOString().split("T")[0],
      })
    ),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lokman Efe</title>
    <description>Blog posts and reading updates from Lokman Efe</description>
    <link>https://lokmanefe.com</link>
    <atom:link href="https://lokmanefe.com/rss" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${allItems
      .map((item) => {
        const title = item.type === "blog" ? item.title : `📚 ${item.title}`;
        const description =
          item.type === "blog"
            ? item.excerpt || "No excerpt available"
            : `Rating: ${item.rating || "N/A"}/5 - ${
                item.description || "No description available"
              }`;

        return `
    <item>
      <title>${title}</title>
      <description>${description}</description>
      <link>https://lokmanefe.com${item.url}</link>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <guid>https://lokmanefe.com${item.url}</guid>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml",
    },
  });
}
