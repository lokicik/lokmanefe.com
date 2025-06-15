import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

type Props = {
  filename: string;
};

export async function MDXContent({ filename }: Props) {
  try {
    const filePath = path.join(process.cwd(), filename);
    const source = await fs.readFile(filePath, "utf8");

    const { content } = await compileMDX({
      source,
    });

    return (
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {content}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading MDX content:", error);
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <p className="text-muted-foreground">
            Content not found or failed to load.
          </p>
        </div>
      </div>
    );
  }
}
