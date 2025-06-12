import { useMemo } from "react";

// Eagerly import all mdx modules in posts directory
const modules = import.meta.glob("../posts/*.mdx", { eager: true });

export function usePosts() {
  return useMemo(() => {
    return Object.entries(modules).map(([path, mod]) => {
      const slugMatch = path.match(/..\/posts\/(.*)\.mdx$/);
      const slug = slugMatch ? slugMatch[1] : path;
      const meta = mod.meta || mod.frontmatter || mod.attributes || {};
      return { slug, Component: mod.default, ...meta };
    });
  }, []);
}
