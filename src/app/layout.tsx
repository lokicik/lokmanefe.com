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
import { AppearanceScript } from "@/components/appearance-script";
import { CONTACT_EMAIL } from "@/lib/home-content";
import { absoluteUrl, site, socialImage } from "@/lib/seo";

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
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | Lokman Efe",
  },
  description: site.description,
  keywords: [
    "software engineer",
    "full-stack engineer",
    "AI engineer",
    "SaaS",
    "RAG",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: site.fullName, url: absoluteUrl("/#about") }],
  creator: site.fullName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: absoluteUrl(),
    title: site.title,
    description: site.description,
    siteName: site.name,
    images: [socialImage(site.name)],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [socialImage(site.name)],
  },
  other: {
    rss: "/rss",
  },
  icons: {
    icon: [
      { url: "/icon.png?v=parrot-1", type: "image/png", sizes: "48x48" },
      { url: "/favicon.svg?v=parrot-1", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/favicon.ico?v=parrot-1",
    apple: { url: "/apple-icon.png?v=parrot-1", sizes: "180x180", type: "image/png" },
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
        <AppearanceScript />
        <meta name="theme-color" content="#0a0a0a" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Lokman Efe - Blog RSS Feed"
          href="/rss"
        />
      </head>
      <body>
        <Providers>
          <a
            href="#main-content"
            className="skip-link fixed left-4 top-3 z-[60] -translate-y-20 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition-transform focus:translate-y-0"
          >
            Skip to content
          </a>
          <div className="relative grid min-h-dvh grid-rows-[auto_1fr_auto] bg-background">
            <Navigation />
            <div className="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,56rem)_minmax(0,1fr)]">
              <SideSvgs />
              <main
                id="main-content"
                tabIndex={-1}
                className="content-area relative z-10 col-start-2 row-start-1 w-full min-w-0 px-4 py-8 pb-16 focus:outline-none"
              >
                {children}
              </main>
            </div>

            <footer className="site-footer relative z-0 border-t bg-background/80 backdrop-blur-sm">
              <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-1 px-4 py-5 text-sm text-muted-foreground sm:flex-row">
                <span className="px-2">© {new Date().getFullYear()} Lokman Efe</span>
                <span aria-hidden="true" className="hidden sm:inline">·</span>
                <div className="flex items-center gap-x-1">
                  <a
                    href="https://github.com/lokicik/lokmanefe.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Source
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href="/rss"
                    className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    RSS
                  </a>
                  <span aria-hidden="true">·</span>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex min-h-11 items-center px-2 transition-colors hover:text-primary focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Email
                  </a>
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
