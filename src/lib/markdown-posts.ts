import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

export type MarkdownPost = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  published: boolean;
  tags?: string[];
  content: string;
  source: "markdown";
  createdAt: Date;
  updatedAt: Date;
};

export type CombinedPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  source: "database" | "markdown";
  author?: { name: string | null };
  tags?: string[];
};

const postsDirectory = path.join(process.cwd(), "content/posts");

export async function getMarkdownPosts(): Promise<MarkdownPost[]> {
  try {
    // Check if posts directory exists
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const markdownFiles = fileNames.filter((name) => name.endsWith(".md"));

    const posts: MarkdownPost[] = [];

    for (const fileName of markdownFiles) {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Generate slug from filename
      const slug = fileName.replace(/\.md$/, "");

      // Get file stats for dates
      const stats = fs.statSync(fullPath);

      posts.push({
        slug,
        title: data.title || slug,
        date: data.date || stats.birthtime.toISOString().split("T")[0],
        excerpt: data.excerpt,
        published: data.published !== false, // Default to true
        tags: data.tags || [],
        content,
        source: "markdown",
        createdAt: data.date ? new Date(data.date) : stats.birthtime,
        updatedAt: stats.mtime,
      });
    }

    // Sort by date (newest first)
    return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error("Error reading markdown posts:", error);
    return [];
  }
}

export async function getMarkdownPostBySlug(
  slug: string
): Promise<MarkdownPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const stats = fs.statSync(fullPath);

    return {
      slug,
      title: data.title || slug,
      date: data.date || stats.birthtime.toISOString().split("T")[0],
      excerpt: data.excerpt,
      published: data.published !== false,
      tags: data.tags || [],
      content,
      source: "markdown",
      createdAt: data.date ? new Date(data.date) : stats.birthtime,
      updatedAt: stats.mtime,
    };
  } catch (error) {
    console.error("Error reading markdown post:", error);
    return null;
  }
}

export async function renderMarkdownContent(content: string) {
  try {
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(content);

    return processedContent.toString();
  } catch (error) {
    console.error("Error rendering markdown:", error);
    return null;
  }
}
