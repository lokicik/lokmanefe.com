"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  Download,
  FileDown,
  FileUp,
  LoaderCircle,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CvPreview, useCvPdf } from "@/components/cv-preview";
import {
  CV_DRAFT_STORAGE_KEY,
  createId,
  cvFileName,
  cvTemplate,
  exportableCv,
  parseCv,
  type Cv,
  type CvEntry,
  type CvSection,
  type CvSkill,
} from "@/lib/cv";

function replaceAt<T>(items: T[], index: number, item: T) {
  return items.map((current, i) => (i === index ? item : current));
}

function moveAt<T>(items: T[], index: number, offset: number) {
  const target = index + offset;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

function saveFile(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function readDraft() {
  try {
    const saved = window.localStorage.getItem(CV_DRAFT_STORAGE_KEY);
    return saved ? parseCv(JSON.parse(saved)) : null;
  } catch {
    return null;
  }
}

function writeDraft(cv: Cv) {
  try {
    window.localStorage.setItem(CV_DRAFT_STORAGE_KEY, JSON.stringify(cv));
    return true;
  } catch {
    return false;
  }
}

function Field({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
  return (
    <label className={`grid gap-1.5 text-xs font-medium text-muted-foreground ${className ?? ""}`}>
      {label}
      {children}
    </label>
  );
}

function AddButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <Button type="button" variant="ghost" size="sm" onClick={onClick} className="justify-self-start">
      <Plus aria-hidden="true" />
      {children}
    </Button>
  );
}

/** Edits a list of items with move and remove controls beside each one. */
function ItemList<T extends { id: string }>({
  items,
  onChange,
  noun,
  confirmRemove,
  children,
  className,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  noun: string;
  confirmRemove?: (item: T) => string | null;
  children: (item: T, update: (item: T) => void, controls: ReactNode) => ReactNode;
  className?: string;
}) {
  return items.map((item, index) => {
    const remove = () => {
      const question = confirmRemove?.(item);
      if (question && !window.confirm(question)) return;
      onChange(items.filter((_, i) => i !== index));
    };
    const controls = (
      <div className="flex shrink-0 items-center">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Move ${noun} up`}
          disabled={index === 0}
          onClick={() => onChange(moveAt(items, index, -1))}
        >
          <ArrowUp aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Move ${noun} down`}
          disabled={index === items.length - 1}
          onClick={() => onChange(moveAt(items, index, 1))}
        >
          <ArrowDown aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Remove ${noun}`}
          onClick={remove}
          className="hover:text-destructive"
        >
          <Trash2 aria-hidden="true" />
        </Button>
      </div>
    );

    return (
      <div key={item.id} className={className}>
        {children(item, (next) => onChange(replaceAt(items, index, next)), controls)}
      </div>
    );
  });
}

function EntryFields({ entry, onChange, controls }: { entry: CvEntry; onChange: (entry: CvEntry) => void; controls: ReactNode }) {
  return (
    <div className="grid gap-3">
      <div className="flex items-end gap-2">
        <div className="grid min-w-0 flex-1 gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,11rem)]">
          <Field label="Title (bold)">
            <Input value={entry.title} onChange={(event) => onChange({ ...entry, title: event.target.value })} />
          </Field>
          <Field label="Dates or link">
            <Input value={entry.meta} onChange={(event) => onChange({ ...entry, meta: event.target.value })} />
          </Field>
        </div>
        {controls}
      </div>
      <Field label="Detail after the dash">
        <Input
          value={entry.subtitle}
          placeholder="Remote"
          onChange={(event) => onChange({ ...entry, subtitle: event.target.value })}
        />
      </Field>
      <Field label="Bullets, one per line">
        <Textarea
          value={entry.bullets.join("\n")}
          rows={Math.max(2, entry.bullets.length + 1)}
          onChange={(event) => onChange({ ...entry, bullets: event.target.value.split("\n") })}
          className="leading-relaxed"
        />
      </Field>
    </div>
  );
}

function SkillFields({ skill, onChange, controls }: { skill: CvSkill; onChange: (skill: CvSkill) => void; controls: ReactNode }) {
  return (
    <div className="flex items-start gap-2">
      <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-[minmax(0,12rem)_minmax(0,1fr)]">
        <Input
          aria-label="Skill group"
          placeholder="Languages"
          value={skill.label}
          onChange={(event) => onChange({ ...skill, label: event.target.value })}
          className="font-semibold"
        />
        <Input
          aria-label={`${skill.label || "Skill group"} items`}
          placeholder="TypeScript, Python, Go"
          value={skill.value}
          onChange={(event) => onChange({ ...skill, value: event.target.value })}
        />
      </div>
      {controls}
    </div>
  );
}

function SectionCard({ section, onChange, controls }: { section: CvSection; onChange: (section: CvSection) => void; controls: ReactNode }) {
  return (
    <div className="grid gap-4 rounded-xl border bg-card p-4 shadow-xs sm:p-5">
      <div className="flex items-end gap-2">
        <Field label={section.kind === "skills" ? "Skills section" : "Section"} className="min-w-0 flex-1">
          <Input
            value={section.title}
            onChange={(event) => onChange({ ...section, title: event.target.value })}
            className="text-base font-semibold md:text-base"
          />
        </Field>
        {controls}
      </div>

      {section.kind === "skills" ? (
        <div className="grid gap-2">
          <ItemList
            items={section.skills}
            noun="skill row"
            onChange={(skills) => onChange({ ...section, skills })}
          >
            {(skill, update, rowControls) => <SkillFields skill={skill} onChange={update} controls={rowControls} />}
          </ItemList>
          <AddButton
            onClick={() =>
              onChange({ ...section, skills: [...section.skills, { id: createId(), label: "", value: "" }] })
            }
          >
            Add skill row
          </AddButton>
        </div>
      ) : (
        <div className="grid gap-4">
          <ItemList
            items={section.entries}
            noun="entry"
            className="border-t pt-4"
            confirmRemove={(entry) =>
              entry.title.trim() || entry.bullets.some((bullet) => bullet.trim())
                ? `Remove "${entry.title.trim() || "this entry"}"?`
                : null
            }
            onChange={(entries) => onChange({ ...section, entries })}
          >
            {(entry, update, entryControls) => (
              <EntryFields entry={entry} onChange={update} controls={entryControls} />
            )}
          </ItemList>
          <AddButton
            onClick={() =>
              onChange({
                ...section,
                entries: [
                  ...section.entries,
                  { id: createId(), title: "", subtitle: "", meta: "", bullets: [""] },
                ],
              })
            }
          >
            Add entry
          </AddButton>
        </div>
      )}
    </div>
  );
}

export function CvEditor() {
  const [cv, setCv] = useState<Cv>(cvTemplate);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const importInput = useRef<HTMLInputElement>(null);
  const pdfState = useCvPdf(cv, ready);

  useEffect(() => {
    const draft = readDraft();
    if (draft) setCv(draft);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const timer = window.setTimeout(() => setSaved(writeDraft(cv)), 300);
    return () => window.clearTimeout(timer);
  }, [cv, ready]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 5000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const downloadPdf = async () => {
    setDownloading(true);
    setNotice(null);
    try {
      const { renderCvPdf } = await import("@/components/cv-pdf");
      const { blob } = await renderCvPdf(cv);
      saveFile(blob, cvFileName(cv, "pdf"));
    } catch (error) {
      console.error(error);
      setNotice("The PDF could not be created. Check the console for details.");
    } finally {
      setDownloading(false);
    }
  };

  const exportJson = () => {
    const json = `${JSON.stringify(exportableCv(cv), null, 2)}\n`;
    saveFile(new Blob([json], { type: "application/json" }), cvFileName(cv, "json"));
  };

  const importJson = async (file: File | undefined) => {
    if (!file) return;
    try {
      const imported = parseCv(JSON.parse(await file.text()));
      if (!imported) throw new Error("Not a CV export");
      setCv(imported);
      setNotice(`Loaded ${file.name}.`);
    } catch {
      setNotice(`${file.name} is not a CV exported from this editor.`);
    }
  };

  const reset = () => {
    if (!window.confirm("Replace your draft with the original template?")) return;
    setCv(cvTemplate);
    setNotice("Draft reset to the template.");
  };

  return (
    // Wider than the article column so the form and preview sit side by side;
    // the background covers the decorative side birds it now overlaps.
    <div className="w-full bg-background lg:relative lg:left-1/2 lg:w-[min(84rem,calc(100vw-3rem))] lg:-translate-x-1/2">
      <header className="max-w-3xl">
        <h1 className="text-4xl font-bold">CV editor</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Edit the résumé, check the live preview, and download the PDF. Everything stays in this
          browser: the draft saves to local storage and the PDF is generated on this device.
        </p>
      </header>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <Button type="button" onClick={downloadPdf} disabled={downloading}>
          {downloading ? <LoaderCircle aria-hidden="true" className="animate-spin" /> : <Download aria-hidden="true" />}
          Download PDF
        </Button>
        <Button type="button" variant="outline" onClick={exportJson}>
          <FileDown aria-hidden="true" />
          Export JSON
        </Button>
        <Button type="button" variant="outline" onClick={() => importInput.current?.click()}>
          <FileUp aria-hidden="true" />
          Import JSON
        </Button>
        <input
          ref={importInput}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(event) => {
            void importJson(event.target.files?.[0]);
            event.target.value = "";
          }}
        />
        <Button type="button" variant="ghost" onClick={reset}>
          <RotateCcw aria-hidden="true" />
          Reset
        </Button>
        <p className="text-sm text-muted-foreground sm:ml-auto" aria-live="polite">
          {notice ?? (saved ? "Draft saved in this browser" : "Draft could not be saved in this browser")}
        </p>
      </div>

      {/* Hidden until the saved draft loads, so the template doesn't flash first. */}
      <div
        className={`mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start ${ready ? "" : "invisible"}`}
      >
        <form className="grid gap-4" onSubmit={(event) => event.preventDefault()} aria-label="Résumé content">
          <div className="grid gap-4 rounded-xl border bg-card p-4 shadow-xs sm:p-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Name">
                <Input value={cv.name} onChange={(event) => setCv({ ...cv, name: event.target.value })} />
              </Field>
              <Field label="PDF file name">
                <Input
                  value={cv.fileName}
                  placeholder="Resume"
                  onChange={(event) => setCv({ ...cv, fileName: event.target.value })}
                />
              </Field>
            </div>
            <div className="grid gap-2">
              <p className="text-xs font-medium text-muted-foreground">
                Contact line (emails and domains become links)
              </p>
              <ItemList
                items={cv.contacts}
                noun="contact"
                onChange={(contacts) => setCv({ ...cv, contacts })}
              >
                {(contact, update, controls) => (
                  <div className="flex items-center gap-2">
                    <Input
                      aria-label="Contact"
                      value={contact.text}
                      onChange={(event) => update({ ...contact, text: event.target.value })}
                      className="min-w-0 flex-1"
                    />
                    {controls}
                  </div>
                )}
              </ItemList>
              <AddButton onClick={() => setCv({ ...cv, contacts: [...cv.contacts, { id: createId(), text: "" }] })}>
                Add contact
              </AddButton>
            </div>
          </div>

          <ItemList
            items={cv.sections}
            noun="section"
            confirmRemove={(section) => `Remove the "${section.title.trim() || "untitled"}" section?`}
            onChange={(sections) => setCv({ ...cv, sections })}
          >
            {(section, update, controls) => (
              <SectionCard section={section} onChange={update} controls={controls} />
            )}
          </ItemList>

          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setCv({
                  ...cv,
                  sections: [...cv.sections, { id: createId(), kind: "entries", title: "", entries: [] }],
                })
              }
            >
              <Plus aria-hidden="true" />
              Add section
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setCv({
                  ...cv,
                  sections: [...cv.sections, { id: createId(), kind: "skills", title: "Skills", skills: [] }],
                })
              }
            >
              <Plus aria-hidden="true" />
              Add skills section
            </Button>
          </div>
        </form>

        <div className="lg:sticky lg:top-20 lg:h-[calc(100dvh-6rem)]">
          <CvPreview state={pdfState} />
        </div>
      </div>
    </div>
  );
}
