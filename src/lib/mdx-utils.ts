import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

export type MDXPage = {
  slug: string;
  title: string;
  date: string;
  content: string;
  meta?: {
    title: string;
    date: string;
  };
};

export async function getMDXPage(fileName: string): Promise<MDXPage | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "content",
      "legal",
      `${fileName}.mdx`
    );

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // Extract meta from the content if it exists
    const metaMatch = content.match(/export const meta = \{[\s\S]*?\};/);
    let meta: { title: string; date: string } | undefined = undefined;
    let cleanContent = content;

    if (metaMatch) {
      // Remove the export statement from content
      cleanContent = content.replace(metaMatch[0], "").trim();

      // Extract meta data from frontmatter or data
      meta = {
        title: data.title || fileName,
        date: data.date || new Date().toISOString().split("T")[0],
      };
    }

    return {
      slug: fileName,
      title: meta?.title || data.title || fileName,
      date: meta?.date || data.date || new Date().toISOString().split("T")[0],
      content: cleanContent,
      meta,
    };
  } catch (error) {
    console.error(`Error reading MDX file ${fileName}:`, error);
    return null;
  }
}

export async function renderMDXContent(content: string): Promise<string> {
  try {
    const result = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(content);

    return result.toString();
  } catch (error) {
    console.error("Error rendering MDX content:", error);
    return "";
  }
}
