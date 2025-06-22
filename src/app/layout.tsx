import type { Metadata } from "next";
import {
  Inter,
  Space_Grotesk,
  Merriweather,
  Source_Code_Pro,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/navigation";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
});
const sourceCode = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Lokman Baturay Efe - Portfolio & Blog",
  description: "Software developer portfolio and personal blog",
  keywords: [
    "developer",
    "software",
    "portfolio",
    "blog",
    "Next.js",
    "React",
    "AI",
    "machine learning",
  ],
  authors: [{ name: "Lokman Baturay Efe" }],
  creator: "Lokman Baturay Efe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lokmanbaturayefe.com",
    title: "Lokman Baturay Efe - Portfolio & Blog",
    description: "Software developer portfolio and personal blog",
    siteName: "Lokman Baturay Efe",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokman Baturay Efe - Portfolio & Blog",
    description: "Software developer portfolio and personal blog",
  },
  other: {
    rss: "/blog/rss",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${merriweather.variable} ${sourceCode.variable} ${playfair.variable}`}
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Lokman Baturay Efe - Blog RSS Feed"
          href="/blog/rss"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background relative overflow-hidden">
            {/* Scattered decorative elements */}
            <div className="fixed inset-0 z-0 pointer-events-none hidden lg:block">
              {/* Top left area */}
              <img
                src="/bird-svgrepo-com.svg"
                alt=""
                className="absolute opacity-15 dark:opacity-10"
                style={{
                  top: "8%",
                  left: "5%",
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  filter: "invert(0.7)",
                }}
              />

              {/* Top right */}
              <img
                src="/parrot-head-svgrepo-com.svg"
                alt=""
                className="absolute opacity-15 dark:opacity-10"
                style={{
                  top: "12%",
                  right: "8%",
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  filter: "invert(0.7)",
                }}
              />

              {/* Left side middle */}
              <img
                src="/bird-svgrepo-com (1).svg"
                alt=""
                className="absolute opacity-15 dark:opacity-10"
                style={{
                  top: "25%",
                  left: "3%",
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  filter: "invert(0.7)",
                }}
              />

              {/* Right side upper */}
              <img
                src="/bird-svgrepo-com (2).svg"
                alt=""
                className="absolute opacity-15 dark:opacity-10"
                style={{
                  top: "30%",
                  right: "4%",
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  filter: "invert(0.7)",
                }}
              />

              {/* Left side lower */}
              <img
                src="/bird-svgrepo-com (3).svg"
                alt=""
                className="absolute opacity-15 dark:opacity-10"
                style={{
                  top: "45%",
                  left: "6%",
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  filter: "invert(0.7)",
                }}
              />

              {/* Right side middle */}
              <img
                src="/bird-svgrepo-com (4).svg"
                alt=""
                className="absolute opacity-15 dark:opacity-10"
                style={{
                  top: "48%",
                  right: "7%",
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  filter: "invert(0.7)",
                }}
              />

              {/* Bottom left */}
              <img
                src="/bird-svgrepo-com (5).svg"
                alt=""
                className="absolute opacity-15 dark:opacity-10"
                style={{
                  bottom: "25%",
                  left: "4%",
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  filter: "invert(0.7)",
                }}
              />

              {/* Bottom right */}
              <img
                src="/bird-svgrepo-com (6).svg"
                alt=""
                className="absolute opacity-15 dark:opacity-10"
                style={{
                  bottom: "20%",
                  right: "5%",
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  filter: "invert(0.7)",
                }}
              />

              {/* Far left middle */}
              <img
                src="/bird-svgrepo-com (7).svg"
                alt=""
                className="absolute opacity-15 dark:opacity-10"
                style={{
                  top: "60%",
                  left: "2%",
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  filter: "invert(0.7)",
                }}
              />

              {/* Far right */}
              <img
                src="/bird-svgrepo-com (8).svg"
                alt=""
                className="absolute opacity-15 dark:opacity-10"
                style={{
                  top: "65%",
                  right: "3%",
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  filter: "invert(0.7)",
                }}
              />

              {/* Bottom left corner */}
              <img
                src="/bird-svgrepo-com (9).svg"
                alt=""
                className="absolute opacity-15 dark:opacity-10"
                style={{
                  bottom: "8%",
                  left: "7%",
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  filter: "invert(0.7)",
                }}
              />

              {/* Bottom right corner */}
              <img
                src="/moai-2-svgrepo-com.svg"
                alt=""
                className="absolute opacity-15 dark:opacity-10"
                style={{
                  bottom: "10%",
                  right: "8%",
                  width: "64px",
                  height: "64px",
                  objectFit: "contain",
                  filter: "invert(0.7)",
                }}
              />
            </div>

            <Navigation />
            <main className="max-w-4xl mx-auto px-4 py-8 relative z-10">
              {children}
            </main>
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
