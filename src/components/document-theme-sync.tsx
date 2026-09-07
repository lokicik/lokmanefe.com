"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

const themeColors: Record<string, string> = {
  light: "#ffffff",
  dark: "#0a0a0a",
  blue: "#153f50",
  sepia: "#f1ead7",
  "soft-dark": "#222529",
};

const darkThemes = new Set(["dark", "blue", "soft-dark"]);

export function DocumentThemeSync() {
  const { theme, resolvedTheme } = useTheme();

  useEffect(() => {
    const activeTheme = theme === "system" ? resolvedTheme : theme;
    if (!activeTheme) return;

    const colorScheme = darkThemes.has(activeTheme) ? "dark" : "light";
    document.documentElement.style.colorScheme = colorScheme;

    const themeColor = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );
    themeColor?.setAttribute(
      "content",
      themeColors[activeTheme] ?? themeColors[colorScheme]
    );
  }, [resolvedTheme, theme]);

  return null;
}
