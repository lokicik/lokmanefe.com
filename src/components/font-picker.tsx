"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const fonts = [
  { name: "Inter", value: "inter", cssVar: "--font-inter" },
  {
    name: "Space Grotesk",
    value: "space-grotesk",
    cssVar: "--font-space-grotesk",
  },
  {
    name: "Merriweather",
    value: "merriweather",
    cssVar: "--font-merriweather",
  },
  {
    name: "Source Code Pro",
    value: "source-code",
    cssVar: "--font-source-code",
  },
  { name: "Playfair Display", value: "playfair", cssVar: "--font-playfair" },
];

export function FontPicker() {
  const [selectedFont, setSelectedFont] = React.useState(fonts[0]);
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // Initialize with default font
    document.body.style.fontFamily = `var(--font-inter), ui-sans-serif, system-ui, sans-serif`;

    // Load saved font preference
    const saved = localStorage.getItem("selected-font");
    if (saved) {
      const font = fonts.find((f) => f.value === saved);
      if (font) setSelectedFont(font);
    }
  }, []);

  React.useEffect(() => {
    // Apply font directly to body
    document.body.style.fontFamily = `var(${selectedFont.cssVar}), ui-sans-serif, system-ui, sans-serif`;

    // Save preference
    localStorage.setItem("selected-font", selectedFont.value);
  }, [selectedFont]);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <span className="text-sm">{selectedFont.name}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-popover border rounded-md shadow-lg z-[60] max-h-60 overflow-y-auto">
          {fonts.map((font) => (
            <button
              key={font.value}
              onClick={() => {
                setSelectedFont(font);
                setIsOpen(false);
              }}
              style={{ fontFamily: `var(${font.cssVar})` }}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors ${
                selectedFont.value === font.value ? "bg-muted" : ""
              }`}
            >
              {font.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
