import { CV_URL } from "@/lib/utils";
import { readFile } from "node:fs/promises";
import path from "node:path";

// Always read and stream the current PDF; never serve a build-time/CDN-cached copy.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const pdfPath = path.join(process.cwd(), "public", CV_URL.replace(/^\//, ""));
    const pdf = await readFile(pdfPath);

    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=\"Lokman-Efe-Software-Engineer-Resume.pdf\"",
        "Cache-Control": "no-store, no-cache, max-age=0, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0",
      },
    });
  } catch {
    return new Response("CV file not found", {
      status: 404,
      headers: { "Cache-Control": "no-store, max-age=0, must-revalidate" },
    });
  }
}
