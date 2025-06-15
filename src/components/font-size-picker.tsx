"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const fontSizes = [
  { name: "Small", value: "14px", scale: "0.875" },
  { name: "Normal", value: "16px", scale: "1" },
  { name: "Large", value: "18px", scale: "1.125" },
  { name: "Extra Large", value: "20px", scale: "1.25" },
];

export function FontSizePicker() {
  const [selectedSize, setSelectedSize] = React.useState(fontSizes[1]); // Default to Normal

  React.useEffect(() => {
    // Load saved font size preference
    const saved = localStorage.getItem("selected-font-size");
    if (saved) {
      const size = fontSizes.find((s) => s.value === saved);
      if (size) setSelectedSize(size);
    }
  }, []);

  React.useEffect(() => {
    // Apply font size to entire site
    document.documentElement.style.fontSize = selectedSize.value;

    // Save preference
    localStorage.setItem("selected-font-size", selectedSize.value);
  }, [selectedSize]);

  const decreaseSize = () => {
    const currentIndex = fontSizes.findIndex(
      (s) => s.value === selectedSize.value
    );
    if (currentIndex > 0) {
      setSelectedSize(fontSizes[currentIndex - 1]);
    }
  };

  const increaseSize = () => {
    const currentIndex = fontSizes.findIndex(
      (s) => s.value === selectedSize.value
    );
    if (currentIndex < fontSizes.length - 1) {
      setSelectedSize(fontSizes[currentIndex + 1]);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={decreaseSize}
        disabled={
          fontSizes.findIndex((s) => s.value === selectedSize.value) === 0
        }
        className="h-8 w-8 p-0"
      >
        <Minus className="h-4 w-4" />
      </Button>

      <span className="text-xs px-2 min-w-[3rem] text-center">
        {selectedSize.name}
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={increaseSize}
        disabled={
          fontSizes.findIndex((s) => s.value === selectedSize.value) ===
          fontSizes.length - 1
        }
        className="h-8 w-8 p-0"
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
