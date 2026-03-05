import { CV_URL } from "@/lib/utils";

export async function GET() {
  const response = await fetch(CV_URL);
  const pdf = await response.arrayBuffer();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=\"Lokman-Efe-Resume.pdf\"",
    },
  });
}
