/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useEffect, useState } from "react";
import { RotateCw, X, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

interface ImageLightboxProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  triggerElement: HTMLImageElement | null;
  onClose: () => void;
}

export function ImageLightbox({
  isOpen,
  imageSrc,
  imageAlt,
  triggerElement,
  onClose,
}: ImageLightboxProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const resolveTrigger = useCallback(() => {
    if (triggerElement?.isConnected) return triggerElement;
    return (
      Array.from(document.querySelectorAll<HTMLImageElement>(".prose img")).find(
        (image) => (image.currentSrc || image.src) === imageSrc
      ) ?? null
    );
  }, [imageSrc, triggerElement]);

  useEffect(() => {
    if (!isOpen) return;
    setScale(1);
    setRotation(0);
  }, [isOpen, imageSrc]);

  useEffect(() => {
    if (isOpen || !triggerElement) return;
    const timeout = window.setTimeout(() => resolveTrigger()?.focus(), 250);
    return () => window.clearTimeout(timeout);
  }, [isOpen, resolveTrigger, triggerElement]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        showCloseButton={false}
        onCloseAutoFocus={(event) => {
          event.preventDefault();
          resolveTrigger()?.focus();
        }}
        className="h-[calc(100dvh-1rem)] max-w-[calc(100vw-1rem)] grid-rows-[auto_minmax(0,1fr)_auto] gap-3 overflow-hidden border-white/20 bg-black/95 p-3 text-white shadow-2xl sm:max-w-[calc(100vw-2rem)] sm:p-4"
      >
        <DialogTitle className="sr-only">Image preview</DialogTitle>
        <DialogDescription className="sr-only">
          Zoom, rotate, or close the selected article image.
        </DialogDescription>

        <div className="flex flex-wrap items-center justify-end gap-1">
          <Button
            variant="secondary"
            size="icon"
            aria-label="Zoom out"
            onClick={() => setScale((value) => Math.max(value - 0.25, 0.5))}
            disabled={scale <= 0.5}
          >
            <ZoomOut aria-hidden="true" className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            aria-label="Zoom in"
            onClick={() => setScale((value) => Math.min(value + 0.25, 3))}
            disabled={scale >= 3}
          >
            <ZoomIn aria-hidden="true" className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            aria-label="Rotate image clockwise"
            onClick={() => setRotation((value) => (value + 90) % 360)}
          >
            <RotateCw aria-hidden="true" className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setScale(1);
              setRotation(0);
            }}
          >
            Reset
          </Button>
          <Button
            variant="secondary"
            size="icon"
            aria-label="Close image preview"
            onClick={onClose}
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex min-h-0 items-center justify-center overflow-auto rounded-md bg-black/40 p-2">
          {imageSrc && (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="max-h-full max-w-full object-contain transition-transform duration-200 ease-out"
              style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}
              draggable={false}
            />
          )}
        </div>

        <p className="min-h-5 truncate text-center text-sm text-white/80">
          {imageAlt || "Article image"}
        </p>
      </DialogContent>
    </Dialog>
  );
}

export function useBlogImageLightbox() {
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    imageSrc: string;
    imageAlt: string;
    triggerElement: HTMLImageElement | null;
  }>({
    isOpen: false,
    imageSrc: "",
    imageAlt: "",
    triggerElement: null,
  });

  useEffect(() => {
    const openImage = (image: HTMLImageElement) => {
      setLightbox({
        isOpen: true,
        imageSrc: image.currentSrc || image.src,
        imageAlt: image.alt || "",
        triggerElement: image,
      });
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement) || !target.closest(".prose")) {
        return;
      }
      event.preventDefault();
      openImage(target);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement) || !target.closest(".prose")) {
        return;
      }
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      openImage(target);
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeLightbox = () => {
    setLightbox((current) => ({ ...current, isOpen: false }));
  };

  return { ...lightbox, closeLightbox };
}
