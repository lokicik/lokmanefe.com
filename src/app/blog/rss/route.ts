import { getMarkdownPosts } from "@/lib/markdown-posts";

export async function GET() {
  const posts = await getMarkdownPosts();
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://lokmanbaturayefe.com";

  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Lokman Baturay Efe - Blog</title>
    <description>Software developer blog featuring thoughts on development, AI, machine learning, and technology</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/blog/rss" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <generator>Next.js Blog</generator>
    <webMaster>efelokman227@gmail.com (Lokman Baturay Efe)</webMaster>
    <managingEditor>efelokman227@gmail.com (Lokman Baturay Efe)</managingEditor>
    <copyright>Copyright ${new Date().getFullYear()} Lokman Baturay Efe</copyright>
    <category>Technology</category>
    <category>Software Development</category>
    <category>Machine Learning</category>
    <category>AI</category>
${posts
  .filter((post) => post.published)
  .slice(0, 20) // Limit to 20 most recent posts
  .map((post) => {
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    const pubDate = new Date(post.date).toUTCString();

    // Clean up content for RSS (remove HTML tags for description)
    const description =
      post.excerpt ||
      post.content
        .replace(/```[\s\S]*?```/g, "") // Remove code blocks
        .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
        .replace(/\[.*?\]\(.*?\)/g, "") // Remove links
        .replace(/[#*_~`]/g, "") // Remove markdown formatting
        .replace(/\s+/g, " ") // Normalize whitespace
        .trim()
        .slice(0, 200) + "...";

    return `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${description}]]></description>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>efelokman227@gmail.com (Lokman Baturay Efe)</author>
      ${
        post.tags
          ? post.tags
              .map((tag) => `<category>${tag}</category>`)
              .join("\n      ")
          : ""
      }
    </item>`;
  })
  .join("\n")}
  </channel>
</rss>`;

  return new Response(rssContent, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600", // Cache for 1 hour
    },
  });
}
