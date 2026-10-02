"use client";

import {
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type FormEvent,
} from "react";
import { FileText, Trash2, Upload } from "lucide-react";
import { Field, PageHeader, Section } from "../../../ui/primitives";
import {
  newId,
  updateWorkspace,
  useWorkspace,
} from "../../../features/workspace/store";
import {
  formatBytes,
  type DocumentKind,
  type Profile,
} from "../../../features/workspace/model";

const MAX_BYTES = 10 * 1024 * 1024;
const ACCEPT = ".pdf,.doc,.docx,.txt,.md";

const kindLabel: Record<DocumentKind, string> = {
  resume: "Resume",
  "job-description": "Job description",
  other: "Supporting document",
};

export default function ProfilePage() {
  const w = useWorkspace();
  const [draft, setDraft] = useState<Profile>(w.profile);
  const [errors, setErrors] = useState<Partial<Record<keyof Profile, string>>>(
    {},
  );
  const [saved, setSaved] = useState(false);

  // Pick up stored data once it hydrates on the client.
  useEffect(() => setDraft(w.profile), [w.profile]);

  const set = <K extends keyof Profile>(key: K, value: Profile[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setSaved(false);
  };

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!draft.fullName.trim())
      next.fullName = "Enter your name as it appears on your resume.";
    if (!/^\S+@\S+\.\S+$/.test(draft.email))
      next.email = "Enter a valid email, like you@example.com.";
    if (!draft.targetRole.trim())
      next.targetRole = "Tell us which role to look for.";
    setErrors(next);
    if (Object.keys(next).length) return;
    updateWorkspace((ws) => ({ ...ws, profile: draft }));
    setSaved(true);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Profile"
        description="What you are looking for and the documents Rolevia works from. Tailored resumes only use what is in these documents."
      />

      <form onSubmit={onSubmit} noValidate>
        <Section
          title="About you"
          description="Used to find and score jobs."
          footer={
            <>
              {saved && (
                <p className="text-sm text-success" role="status">
                  Saved
                </p>
              )}
              <button type="submit" className="btn-primary">
                Save profile
              </button>
            </>
          }
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="fullName" label="Full name" error={errors.fullName}>
              <input
                id="fullName"
                className="input"
                autoComplete="name"
                value={draft.fullName}
                onChange={(e) => set("fullName", e.target.value)}
                aria-invalid={Boolean(errors.fullName)}
                aria-describedby={
                  errors.fullName ? "fullName-error" : undefined
                }
              />
            </Field>
            <Field id="email" label="Email" error={errors.email}>
              <input
                id="email"
                type="email"
                className="input"
                autoComplete="email"
                value={draft.email}
                onChange={(e) => set("email", e.target.value)}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
            </Field>
            <Field
              id="profession"
              label="Profession"
              hint="For example: Software engineer, Product designer."
            >
              <input
                id="profession"
                className="input"
                value={draft.profession}
                onChange={(e) => set("profession", e.target.value)}
                aria-describedby="profession-hint"
              />
            </Field>
            <Field
              id="targetRole"
              label="Position you want"
              error={errors.targetRole}
            >
              <input
                id="targetRole"
                className="input"
                placeholder="Senior backend engineer"
                value={draft.targetRole}
                onChange={(e) => set("targetRole", e.target.value)}
                aria-invalid={Boolean(errors.targetRole)}
                aria-describedby={
                  errors.targetRole ? "targetRole-error" : undefined
                }
              />
            </Field>
            <Field id="seniority" label="Seniority">
              <select
                id="seniority"
                className="input"
                value={draft.seniority}
                onChange={(e) =>
                  set("seniority", e.target.value as Profile["seniority"])
                }
              >
                <option value="">Any level</option>
                <option value="junior">Junior</option>
                <option value="mid">Mid-level</option>
                <option value="senior">Senior</option>
                <option value="staff">Staff</option>
                <option value="principal">Principal</option>
                <option value="lead">Lead or manager</option>
              </select>
            </Field>
            <Field id="workMode" label="Work arrangement">
              <select
                id="workMode"
                className="input"
                value={draft.workMode}
                onChange={(e) =>
                  set("workMode", e.target.value as Profile["workMode"])
                }
              >
                <option value="any">Any</option>
                <option value="remote">Remote only</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
              </select>
            </Field>
            <Field
              id="location"
              label="Location"
              hint="City or region you can work from."
            >
              <input
                id="location"
                className="input"
                autoComplete="address-level2"
                value={draft.location}
                onChange={(e) => set("location", e.target.value)}
                aria-describedby="location-hint"
              />
            </Field>
            <div className="sm:col-span-2">
              <Field
                id="notes"
                label="Anything else"
                hint="Companies to avoid, industries you prefer, visa needs, notice period."
              >
                <textarea
                  id="notes"
                  className="input"
                  value={draft.notes}
                  onChange={(e) => set("notes", e.target.value)}
                  aria-describedby="notes-hint"
                />
              </Field>
            </div>
          </div>
        </Section>
      </form>

      <Documents />
    </div>
  );
}

function Documents() {
  const { documents } = useWorkspace();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function addFiles(files: FileList | null) {
    if (!files?.length) return;
    const rejected: string[] = [];
    const accepted = Array.from(files).filter((f) => {
      const ok = f.size <= MAX_BYTES && /\.(pdf|docx?|txt|md)$/i.test(f.name);
      if (!ok) rejected.push(f.name);
      return ok;
    });
    setError(
      rejected.length
        ? `Could not add ${rejected.join(", ")}. Use PDF, Word, or text files up to 10 MB.`
        : null,
    );
    if (!accepted.length) return;
    updateWorkspace((ws) => {
      const hasResume = ws.documents.some((d) => d.kind === "resume");
      return {
        ...ws,
        documents: [
          ...ws.documents,
          ...accepted.map((f, i) => ({
            id: newId(),
            name: f.name,
            sizeBytes: f.size,
            addedAt: new Date().toISOString(),
            // The first file uploaded is most likely the resume.
            kind: (!hasResume && i === 0 ? "resume" : "other") as DocumentKind,
          })),
        ],
      };
    });
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  }

  return (
    <div id="documents" className="scroll-mt-24">
      <Section
        title="Documents"
        description="Your resume is required. Add a job description you like and any supporting material."
      >
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`flex flex-col items-center rounded-card border border-dashed px-6 py-10 text-center transition-colors ${
            dragging
              ? "border-accent bg-accent-soft"
              : "border-line-strong bg-surface-2/40"
          }`}
        >
          <Upload size={22} className="text-fg-2" aria-hidden />
          <p className="mt-3 text-sm font-medium">Drop files here</p>
          <p className="mt-1 text-sm text-fg-3">
            PDF, Word or text, up to 10 MB each
          </p>
          <button
            type="button"
            className="btn-secondary btn-sm mt-4"
            onClick={() => inputRef.current?.click()}
          >
            Choose files
          </button>
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPT}
            multiple
            className="sr-only"
            tabIndex={-1}
            aria-hidden
            onChange={(e) => {
              addFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>
        {error && (
          <p className="field-error mt-3" role="alert">
            {error}
          </p>
        )}

        {documents.length > 0 && (
          <ul className="mt-5 divide-y divide-line rounded-card border border-line">
            {documents.map((d) => (
              <li
                key={d.id}
                className="flex flex-wrap items-center gap-3 px-4 py-3"
              >
                <FileText
                  size={18}
                  className="shrink-0 text-fg-3"
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{d.name}</p>
                  <p className="text-xs text-fg-3">
                    {formatBytes(d.sizeBytes)}
                  </p>
                </div>
                <label className="sr-only" htmlFor={`kind-${d.id}`}>
                  Document type for {d.name}
                </label>
                <select
                  id={`kind-${d.id}`}
                  className="input h-8 w-auto py-0 text-sm"
                  value={d.kind}
                  onChange={(e) =>
                    updateWorkspace((ws) => ({
                      ...ws,
                      documents: ws.documents.map((x) =>
                        x.id === d.id
                          ? { ...x, kind: e.target.value as DocumentKind }
                          : x,
                      ),
                    }))
                  }
                >
                  {(Object.keys(kindLabel) as DocumentKind[]).map((k) => (
                    <option key={k} value={k}>
                      {kindLabel[k]}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="btn-ghost size-8 px-0"
                  aria-label={`Remove ${d.name}`}
                  onClick={() =>
                    updateWorkspace((ws) => ({
                      ...ws,
                      documents: ws.documents.filter((x) => x.id !== d.id),
                    }))
                  }
                >
                  <Trash2 size={16} aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  );
}
