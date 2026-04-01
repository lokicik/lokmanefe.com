import { CV_URL } from "@/lib/utils";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  try {
    const pdfPath = path.join(process.cwd(), "public", CV_URL.replace(/^\//, ""));
    const pdf = await readFile(pdfPath);

    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "inline; filename=\"Lokman-Efe-Resume.pdf\"",
      },
    });
  } catch {
    return new Response("CV file not found", { status: 404 });
  }
}
