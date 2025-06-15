"use client";

import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      themes={["light", "dark", "blue", "sepia", "soft-dark", "system"]}
    >
      {children}
    </ThemeProvider>
  );
}
