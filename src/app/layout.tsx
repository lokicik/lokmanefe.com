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
import { SideSvgs } from "@/components/side-svgs";

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
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
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
          <div className="min-h-screen bg-background relative">
            {/* Scattered decorative elements */}
            <SideSvgs />

            <Navigation />
            <main className="max-w-4xl mx-auto px-4 py-8 relative z-10 pb-16">
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
