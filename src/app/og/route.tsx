import { createSocialImage } from "@/lib/social-image";

export function GET(request: Request) {
  const title = new URL(request.url).searchParams.get("title");
  return createSocialImage(title ?? undefined);
}
