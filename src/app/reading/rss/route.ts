import { getBooks } from "@/lib/markdown-books";
import { NextResponse } from "next/server";

export async function GET() {
  const books = await getBooks();

  // Get recently completed books and currently reading books
  const recentlyCompleted = books
    .filter((book) => book.status === "completed" && book.completedDate)
    .sort(
      (a, b) =>
        new Date(b.completedDate!).getTime() -
        new Date(a.completedDate!).getTime()
    )
    .slice(0, 10);

  const currentlyReading = books
    .filter((book) => book.status === "currently-reading")
    .sort(
      (a, b) =>
        new Date(b.startDate || "").getTime() -
        new Date(a.startDate || "").getTime()
    );

  const siteUrl = process.env.SITE_URL || "https://lokmanbaturayefe.com";

  const rssItems = [
    // Add currently reading books
    ...currentlyReading.map((book) => ({
      title: `Currently Reading: ${book.title}`,
      description: `Started reading "${book.title}" by ${book.author}. ${book.description}`,
      link: `${siteUrl}/reading/${book.slug}`,
      pubDate: new Date(book.startDate || "").toUTCString(),
      guid: `${siteUrl}/reading/${book.slug}#started`,
    })),
    // Add recently completed books
    ...recentlyCompleted.map((book) => ({
      title: `Completed: ${book.title}`,
      description: `Finished reading "${book.title}" by ${book.author}${
        book.rating ? ` - Rating: ${book.rating}/5 stars` : ""
      }. ${book.description}`,
      link: `${siteUrl}/reading/${book.slug}`,
      pubDate: new Date(book.completedDate!).toUTCString(),
      guid: `${siteUrl}/reading/${book.slug}#completed`,
    })),
  ].sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Reading Updates - Lokman Baturay Efe</title>
    <description>Books I'm reading and have completed</description>
    <link>${siteUrl}/reading</link>
    <atom:link href="${siteUrl}/reading/rss" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js</generator>
    ${rssItems
      .map(
        (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <description><![CDATA[${item.description}]]></description>
      <link>${item.link}</link>
      <guid isPermaLink="false">${item.guid}</guid>
      <pubDate>${item.pubDate}</pubDate>
    </item>`
      )
      .join("")}
  </channel>
</rss>`.trim();

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
