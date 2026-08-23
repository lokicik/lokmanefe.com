"use client";

import * as React from "react";
import { Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const fonts = [
  { name: "Inter", label: "Inter", value: "inter", cssVar: "--font-inter" },
  {
    name: "Space Grotesk",
    label: "Space",
    value: "space-grotesk",
    cssVar: "--font-space-grotesk",
  },
  {
    name: "Merriweather",
    label: "Merri",
    value: "merriweather",
    cssVar: "--font-merriweather",
  },
  {
    name: "Source Code Pro",
    label: "Code",
    value: "source-code",
    cssVar: "--font-source-code",
  },
  {
    name: "Playfair Display",
    label: "Playfair",
    value: "playfair",
    cssVar: "--font-playfair",
  },
];

const fontSizes = [
  { name: "Small", value: "14px", scale: 0.875 },
  { name: "Normal", value: "16px", scale: 1 },
  { name: "Large", value: "18px", scale: 1.125 },
  { name: "Extra large", value: "20px", scale: 1.25 },
];

export function AppearancePicker() {
  const [selectedFont, setSelectedFont] = React.useState(fonts[0]);
  const [selectedSize, setSelectedSize] = React.useState(fontSizes[1]);
  const [usesDefaultPairing, setUsesDefaultPairing] = React.useState(true);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const savedFont = localStorage.getItem("selected-font");
    const savedSize = localStorage.getItem("selected-font-size");

    const font = fonts.find((option) => option.value === savedFont);
    const size = fontSizes.find((option) => option.value === savedSize);

    if (font) {
      setSelectedFont(font);
      setUsesDefaultPairing(false);
    }
    if (size) setSelectedSize(size);
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!mounted) return;

    document.body.style.fontFamily = `var(${selectedFont.cssVar}), ui-sans-serif, system-ui, sans-serif`;
    if (usesDefaultPairing) {
      document.documentElement.style.removeProperty("--font-heading");
    } else {
      document.documentElement.style.setProperty(
        "--font-heading",
        `var(${selectedFont.cssVar})`
      );
      localStorage.setItem("selected-font", selectedFont.value);
    }
  }, [mounted, selectedFont, usesDefaultPairing]);

  React.useEffect(() => {
    if (!mounted) return;

    document.documentElement.style.removeProperty("font-size");
    document.documentElement.style.setProperty(
      "--text-scale",
      selectedSize.scale.toString()
    );
    localStorage.setItem("selected-font-size", selectedSize.value);
  }, [mounted, selectedSize]);

  const selectedSizeIndex = fontSizes.findIndex(
    (option) => option.value === selectedSize.value
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-10 w-10 p-0 transition-transform active:scale-[0.96]"
        >
          <span aria-hidden className="text-sm font-semibold tracking-tight">
            Aa
          </span>
          <span className="sr-only">Text appearance</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        collisionPadding={8}
        className="z-[51] w-72 rounded-lg p-3 shadow-lg"
      >
        <div className="mb-3">
          <p className="text-sm font-semibold">Appearance</p>
          <p className="text-xs text-muted-foreground">Typeface and text size</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Typeface</p>
          <div className="grid grid-cols-2 gap-2">
            {fonts.map((font) => {
              const isSelected = selectedFont.value === font.value;

              return (
                <button
                  key={font.value}
                  type="button"
                  aria-label={font.name}
                  aria-pressed={isSelected}
                  onClick={() => {
                    setUsesDefaultPairing(false);
                    setSelectedFont(font);
                  }}
                  style={{ fontFamily: `var(${font.cssVar})` }}
                  className={`flex min-h-10 items-center justify-between rounded-md border px-3 text-left text-sm transition-[background-color,border-color,transform] active:scale-[0.96] ${
                    isSelected
                      ? "border-primary/40 bg-accent"
                      : "border-border/70 hover:bg-accent/60"
                  }`}
                >
                  <span>{font.label}</span>
                  <Check
                    className={`ml-2 h-3.5 w-3.5 shrink-0 transition-opacity ${
                      isSelected ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Text size</p>
          <div className="flex items-center justify-between rounded-md border border-border/70 p-1">
            <Button
              variant="ghost"
              size="sm"
              aria-label="Decrease text size"
              onClick={() => setSelectedSize(fontSizes[selectedSizeIndex - 1])}
              disabled={selectedSizeIndex === 0}
              className="h-10 w-10 p-0 transition-transform active:scale-[0.96]"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span
              aria-live="polite"
              className="min-w-20 text-center text-sm font-medium tabular-nums"
            >
              {selectedSize.name}
            </span>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Increase text size"
              onClick={() => setSelectedSize(fontSizes[selectedSizeIndex + 1])}
              disabled={selectedSizeIndex === fontSizes.length - 1}
              className="h-10 w-10 p-0 transition-transform active:scale-[0.96]"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
