"use client";

import { ThemeProvider } from "./theme-provider";
import { DocumentThemeSync } from "./document-theme-sync";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      enableColorScheme={false}
      disableTransitionOnChange
      themes={["light", "dark", "blue", "sepia", "soft-dark", "system"]}
    >
      <DocumentThemeSync />
      {children}
    </ThemeProvider>
  );
}
