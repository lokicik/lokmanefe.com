"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, LoaderCircle } from "lucide-react";
import type { Cv } from "@/lib/cv";
import { cn } from "@/lib/utils";

type CvPdfState = {
  url: string | null;
  pages: number;
  rendering: boolean;
  error: boolean;
};

/** Renders the résumé PDF in the browser shortly after edits pause. */
export function useCvPdf(cv: Cv, enabled: boolean) {
  const [state, setState] = useState<CvPdfState>({
    url: null,
    pages: 0,
    rendering: true,
    error: false,
  });
  const urls = useRef<string[]>([]);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    const timer = window.setTimeout(async () => {
      setState((current) => ({ ...current, rendering: true }));
      try {
        const { renderCvPdf } = await import("@/components/cv-pdf");
        const { blob, pages } = await renderCvPdf(cv);
        if (cancelled) return;

        const url = URL.createObjectURL(blob);
        urls.current.push(url);
        // Keep the PDF on screen and the one loading behind it.
        while (urls.current.length > 2) URL.revokeObjectURL(urls.current.shift()!);
        setState({ url, pages, rendering: false, error: false });
      } catch (error) {
        console.error(error);
        if (!cancelled) setState((current) => ({ ...current, rendering: false, error: true }));
      }
    }, 350);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [cv, enabled]);

  useEffect(() => {
    const created = urls.current;
    return () => created.forEach((url) => URL.revokeObjectURL(url));
  }, []);

  return state;
}

/**
 * Loads each new PDF behind the current one and swaps once it has loaded, so
 * the preview does not flash blank on every edit.
 */
function PdfFrame({ url }: { url: string }) {
  const [shown, setShown] = useState<string | null>(null);
  const frames = shown && shown !== url ? [shown, url] : [url];

  useEffect(() => {
    // Some viewers never fire `load` for PDFs.
    const timer = window.setTimeout(() => setShown(url), 1500);
    return () => window.clearTimeout(timer);
  }, [url]);

  return (
    <div className="relative h-full w-full">
      {frames.map((src) => (
        <iframe
          key={src}
          // `view` is Chrome's fit-to-width hint, `zoom` is Firefox's.
          src={`${src}#toolbar=0&navpanes=0&view=FitH&zoom=page-width`}
          title="Résumé PDF preview"
          onLoad={() => setShown(src)}
          className={cn(
            "absolute inset-0 h-full w-full bg-white",
            src !== (shown ?? url) && "invisible"
          )}
        />
      ))}
    </div>
  );
}

export function CvPreview({ state }: { state: CvPdfState }) {
  const [inlinePdf, setInlinePdf] = useState(true);

  useEffect(() => {
    // Android browsers cannot show PDFs inside a page.
    setInlinePdf(navigator.pdfViewerEnabled !== false);
  }, []);

  const overflow = state.pages > 1;

  return (
    <section aria-labelledby="cv-preview-heading" className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex min-h-11 flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <h2 id="cv-preview-heading" className="text-lg font-semibold">
          Preview
        </h2>
        <p
          className={cn(
            "flex items-center gap-2 text-sm tabular-nums",
            overflow ? "font-medium text-amber-700 dark:text-amber-400" : "text-muted-foreground"
          )}
          aria-live="polite"
        >
          {state.rendering ? (
            <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
          ) : null}
          {state.error
            ? "Preview failed. Check the console."
            : state.pages > 0
              ? `${state.pages} ${state.pages === 1 ? "page" : "pages"}${overflow ? ", over one page" : ""}`
              : "Rendering"}
        </p>
      </div>

      <div className="aspect-[8.5/11] w-full overflow-hidden rounded-lg border bg-muted lg:aspect-auto lg:min-h-0 lg:flex-1">
        {state.url && inlinePdf ? <PdfFrame url={state.url} /> : null}
        {state.url && !inlinePdf ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center text-sm text-muted-foreground">
            <p>This browser can&apos;t show the PDF inside the page.</p>
            <a
              href={state.url}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Open preview
              <ExternalLink aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        ) : null}
      </div>
    </section>
  );
}
