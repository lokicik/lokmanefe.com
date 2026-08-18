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

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
  preload: true,
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: 'swap',
  preload: true,
});
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
  display: 'swap',
  preload: true,
});
const sourceCode = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code",
  display: 'swap',
  preload: false, // Less critical font
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
  preload: false, // Less critical font
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Lokman Efe",
    template: "%s | Lokman Efe",
  },
  description:
    "Full-stack software engineer building production SaaS products, AI/RAG workflows, and the integrations behind them.",
  keywords: [
    "software engineer",
    "full-stack engineer",
    "AI engineer",
    "SaaS",
    "RAG",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Lokman Efe" }],
  creator: "Lokman Efe",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Lokman Efe | Software Engineer",
    description:
      "Full-stack software engineer building production SaaS products, AI/RAG workflows, and the integrations behind them.",
    siteName: "Lokman Efe",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lokman Efe | Software Engineer",
    description:
      "Full-stack software engineer building production SaaS products, AI/RAG workflows, and the integrations behind them.",
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
            <footer className="border-t bg-background/80 backdrop-blur-sm relative z-0">
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
                    <span>© {new Date().getFullYear()}</span>
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
        {/* Only load analytics in production */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <Analytics mode="production" />
            <SpeedInsights sampleRate={0.1} />
          </>
        )}
      </body>
    </html>
  );
}
