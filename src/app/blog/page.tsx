import { getMarkdownPosts, getPostsArchive } from "@/lib/markdown-posts";
import { BlogPageContent } from "@/components/blog-page-content";

export default async function BlogPage() {
  const posts = await getMarkdownPosts();
  const archive = getPostsArchive(posts);

  return <BlogPageContent initialPosts={posts} archive={archive} />;
}
