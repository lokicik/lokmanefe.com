import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";
import remarkRehype from "remark-rehype";
import { rehypeWrapTables } from "@/lib/rehype-wrap-tables";

// Minimal HAST properties type used for rehype-pretty-code visitors.
type HastProps = { [key: string]: unknown; className?: string | string[] };

export type WritingType = "article" | "story";

export type MarkdownWriting = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  description?: string;
  published: boolean;
  tags?: string[];
  content: string;
  source: "markdown";
  createdAt: Date;
  updatedAt: Date;
  readingTime: number; // in minutes
  wordCount: number;
  type: WritingType;
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

const writingsDirectory = path.join(process.cwd(), "content/writing");

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
export function getAllTags(posts: MarkdownWriting[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort();
}

// Get posts grouped by year and month for archive
export function getWritingsArchive(posts: MarkdownWriting[]): {
  [year: string]: { [month: string]: MarkdownWriting[] };
} {
  const archive: { [year: string]: { [month: string]: MarkdownWriting[] } } =
    {};

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
export function getRelatedWritings(
  currentPost: MarkdownWriting,
  allPosts: MarkdownWriting[],
  limit: number = 3
): MarkdownWriting[] {
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

async function getMarkdownFiles(
  directory: string,
  type: WritingType
): Promise<MarkdownWriting[]> {
  try {
    // Check if directory exists
    if (!fs.existsSync(directory)) {
      return [];
    }

    const fileNames = fs.readdirSync(directory);
    const markdownFiles = fileNames.filter((name) => name.endsWith(".md"));

    const writings: MarkdownWriting[] = [];

    for (const fileName of markdownFiles) {
      const fullPath = path.join(directory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      // Generate slug from filename
      const slug = fileName.replace(/\.md$/, "");

      // Get file stats for dates
      const stats = fs.statSync(fullPath);

      // Calculate reading time and word count
      const { readingTime, wordCount } = calculateReadingTime(content);

      writings.push({
        slug,
        title: data.title || slug,
        date: data.date || stats.birthtime.toISOString().split("T")[0],
        excerpt: data.excerpt,
        description: data.description,
        published: data.published !== false, // Default to true
        tags: data.tags || [],
        content,
        source: "markdown",
        createdAt: data.date ? new Date(data.date) : stats.birthtime,
        updatedAt: stats.mtime,
        readingTime,
        wordCount,
        type,
      });
    }

    return writings;
  } catch (error) {
    console.error(`Error reading markdown ${type}s:`, error);
    return [];
  }
}

export async function getWritings(): Promise<MarkdownWriting[]> {
  const articles = await getMarkdownFiles(
    path.join(writingsDirectory, "articles"),
    "article"
  );
  const stories = await getMarkdownFiles(
    path.join(writingsDirectory, "stories"),
    "story"
  );

  const allWritings = [...articles, ...stories];

  // Sort by date (newest first)
  return allWritings.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
}

export async function getWritingBySlug(
  slug: string
): Promise<MarkdownWriting | null> {
  const articlesPath = path.join(writingsDirectory, "articles", `${slug}.md`);
  const storiesPath = path.join(writingsDirectory, "stories", `${slug}.md`);

  let fullPath: string | null = null;
  let type: WritingType | null = null;

  if (fs.existsSync(articlesPath)) {
    fullPath = articlesPath;
    type = "article";
  } else if (fs.existsSync(storiesPath)) {
    fullPath = storiesPath;
    type = "story";
  }

  if (!fullPath || !type) {
    return null;
  }

  try {
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
      description: data.description,
      published: data.published !== false,
      tags: data.tags || [],
      content,
      source: "markdown",
      createdAt: data.date ? new Date(data.date) : stats.birthtime,
      updatedAt: stats.mtime,
      readingTime,
      wordCount,
      type,
    };
  } catch (error) {
    console.error(`Error reading markdown writing by slug ${slug}:`, error);
    return null;
  }
}

export async function renderMarkdownContent(content: string): Promise<string> {
  try {
    const result = await remark()
      .use(remarkGfm)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeWrapTables)
      .use(rehypePrettyCode, {
        theme: "github-dark-dimmed",
        keepBackground: true,
        defaultLang: "plaintext",
        onVisitLine(node: { children?: Array<unknown> } | unknown) {
          // Prevent lines from collapsing in `display: grid` mode, and allow empty
          // lines to be copy/pasted
          const n = node as { children?: Array<Record<string, unknown>> };
          if (!n.children) return;

          if (n.children.length === 0) {
            n.children = [{ type: "text", value: " " }];
          }
        },
        onVisitHighlightedLine(node: unknown) {
          const n = node as { properties?: Record<string, unknown> & { className?: unknown } };

          // Ensure properties exists as an object
          if (!n.properties || typeof n.properties !== "object") {
            n.properties = {} as Record<string, unknown> & { className?: unknown };
          }

          // Normalize className to an array of strings
          const props = n.properties as HastProps;
          const rawClass = props.className;
          if (Array.isArray(rawClass)) {
            rawClass.push("highlighted");
          } else if (typeof rawClass === "string") {
            props.className = [rawClass, "highlighted"];
          } else {
            props.className = ["highlighted"];
          }
        },
        onVisitHighlightedChars(node: unknown) {
          const n = node as { properties?: Record<string, unknown> };
          if (!n.properties || typeof n.properties !== "object") {
            n.properties = {} as HastProps;
          }
          (n.properties as HastProps).className = ["word"];
        },
      })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .process(content);

    return result.toString();
  } catch (error) {
    console.error("Error rendering markdown:", error);
    return "";
  }
}
