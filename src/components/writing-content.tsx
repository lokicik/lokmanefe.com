"use client";

import {
  ImageLightbox,
  useBlogImageLightbox,
} from "@/components/image-lightbox";
import { WritingComments } from "@/components/giscus-comments";

interface WritingContentProps {
  content: string;
  showComments?: boolean;
}

export function WritingContent({
  content,
  showComments = true,
}: WritingContentProps) {
  const { isOpen, imageSrc, imageAlt, closeLightbox } = useBlogImageLightbox();

  return (
    <>
      {/* Content */}
      <div
        className="prose prose-lg prose-neutral dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-pre:bg-muted prose-pre:border prose-img:rounded-lg prose-img:shadow-lg prose-img:cursor-pointer"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Image Lightbox */}
      <ImageLightbox
        isOpen={isOpen}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        onClose={closeLightbox}
      />

      {/* Comments */}
      {showComments && <WritingComments />}
    </>
  );
}
