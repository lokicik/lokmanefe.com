import { createSocialImage } from "@/lib/social-image";

// Preserve already-shared query URLs and arbitrary titles, with the existing
// CDN cache headers. New metadata uses the build-time /og/[title] route.
export function GET(request: Request) {
  const title = new URL(request.url).searchParams.get("title");
  return createSocialImage(title ?? undefined);
}
