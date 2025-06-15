import { notFound } from "next/navigation";
import { getMDXPage, renderMDXContent } from "@/lib/mdx-utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Lokman Baturay Efe",
  description: "Terms of service for lokmanbaturayefe.com",
  robots: {
    index: false,
    follow: false,
  },
};

// This ensures the page is statically generated at build time
export const dynamic = "force-static";

export default async function TermsPage() {
  const page = await getMDXPage("terms");

  if (!page) {
    notFound();
  }

  const renderedContent = await renderMDXContent(page.content);

  return (
    <div className="max-w-4xl mx-auto">
      <article className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
        {/* Content */}
        <div
          className="prose-headings:scroll-mt-20 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-a:text-primary prose-a:underline hover:prose-a:no-underline prose-strong:font-semibold prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-4"
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />

        {/* Footer */}
        <footer className="not-prose mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            If you have any questions about these Terms of Service, please
            contact us at{" "}
            <a
              href="mailto:lokman@lokmanbaturayefe.com"
              className="text-primary hover:underline"
            >
              lokman@lokmanbaturayefe.com
            </a>
          </p>
        </footer>
      </article>
    </div>
  );
}
