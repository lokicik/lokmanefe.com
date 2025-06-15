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
  readingTime: number; // in minutes
  wordCount: number;
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
  readingTime?: number;
  wordCount?: number;
};

const postsDirectory = path.join(process.cwd(), "content/posts");

// Calculate reading time based on word count
function calculateReadingTime(content: string): {
  readingTime: number;
  wordCount: number;
} {
  // Remove markdown syntax and HTML tags for accurate word count
  const cleanContent = content
    .replace(/!\[.*?\]\(.*?\)/g, "") // Remove images
    .replace(/\[.*?\]\(.*?\)/g, "") // Remove links (keep text)
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`.*?`/g, "") // Remove inline code
    .replace(/#{1,6}\s/g, "") // Remove headers
    .replace(/[*_~`]/g, "") // Remove markdown formatting
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  const words = cleanContent.split(" ").filter((word) => word.length > 0);
  const wordCount = words.length;

  // Average reading speed is 200-250 words per minute, using 225
  const readingTime = Math.ceil(wordCount / 225);

  return { readingTime: Math.max(1, readingTime), wordCount };
}

// Get all unique tags from posts
export function getAllTags(posts: MarkdownPost[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort();
}

// Get posts grouped by year and month for archive
export function getPostsArchive(posts: MarkdownPost[]): {
  [year: string]: { [month: string]: MarkdownPost[] };
} {
  const archive: { [year: string]: { [month: string]: MarkdownPost[] } } = {};

  posts.forEach((post) => {
    const year = post.createdAt.getFullYear().toString();
    const month = post.createdAt.toLocaleDateString("en-US", { month: "long" });

    if (!archive[year]) archive[year] = {};
    if (!archive[year][month]) archive[year][month] = [];

    archive[year][month].push(post);
  });

  return archive;
}

// Find related posts based on tags
export function getRelatedPosts(
  currentPost: MarkdownPost,
  allPosts: MarkdownPost[],
  limit: number = 3
): MarkdownPost[] {
  if (!currentPost.tags || currentPost.tags.length === 0) {
    return [];
  }

  const otherPosts = allPosts.filter(
    (post) => post.slug !== currentPost.slug && post.published
  );

  // Calculate similarity score based on shared tags
  const postsWithScore = otherPosts.map((post) => {
    if (!post.tags || post.tags.length === 0) {
      return { post, score: 0 };
    }

    const sharedTags = post.tags.filter((tag) =>
      currentPost.tags?.includes(tag)
    );
    const score =
      sharedTags.length /
      Math.max(post.tags.length, currentPost.tags?.length || 0);

    return { post, score };
  });

  return postsWithScore
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

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

      // Calculate reading time and word count
      const { readingTime, wordCount } = calculateReadingTime(content);

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
        readingTime,
        wordCount,
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

    // Calculate reading time and word count
    const { readingTime, wordCount } = calculateReadingTime(content);

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
      readingTime,
      wordCount,
    };
  } catch (error) {
    console.error("Error reading markdown post:", error);
    return null;
  }
}

export async function renderMarkdownContent(content: string): Promise<string> {
  try {
    const result = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(content);

    return result.toString();
  } catch (error) {
    console.error("Error rendering markdown:", error);
    return "";
  }
}
