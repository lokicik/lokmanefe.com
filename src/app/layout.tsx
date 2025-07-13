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
import { Github } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lokmanefe.com";

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
  metadataBase: new URL(baseUrl),
  title: {
    default: "Lokman Efe",
    template: "%s | Lokman Efe",
  },
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
  authors: [{ name: "Lokman Efe" }],
  creator: "Lokman Efe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Lokman Efe",
    description: "Software developer portfolio and personal blog",
    siteName: "Lokman Efe",
    images: [
      {
        url: "/projects/lokmanefe_ss1.png",
        width: 1200,
        height: 630,
        alt: "Lokman Efe's Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokman Efe",
    description: "Software developer portfolio and personal blog",
    creator: "@your_twitter_handle", //
    images: ["/projects/lokmanefe_ss1.png"],
  },
  other: {
    rss: "/rss",
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
          title="Lokman Efe - Blog RSS Feed"
          href="/rss"
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background relative grid grid-rows-[auto_1fr_auto]">
            {/* Scattered decorative elements */}
            <SideSvgs />

            <Navigation />
            <main className="max-w-4xl mx-auto px-4 py-8 relative z-10 pb-16 w-full">
              {children}
            </main>

            {/* Footer */}
            <footer className="border-t bg-background/80 backdrop-blur-sm">
              <div className="max-w-4xl mx-auto px-4 py-6">
                <div className="text-center text-sm text-muted-foreground space-y-2">
                  <div>
                    Built with ❤️ by{" "}
                    <a
                      href="https://github.com/lokicik"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-foreground hover:text-primary transition-colors"
                    >
                      Lokman Efe
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span>© 2025</span>
                    <span>•</span>
                    <a
                      href="https://github.com/lokicik/lokmanefe.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                      title="View Source"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <span>•</span>
                    <a
                      href="/rss"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      RSS Feed
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
