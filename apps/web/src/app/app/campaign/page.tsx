"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Field, PageHeader, Section, Switch } from "../../../ui/primitives";
import { Slider } from "../../../ui/controls";
import {
  updateWorkspace,
  useWorkspace,
} from "../../../features/workspace/store";
import {
  PORTALS,
  type Campaign,
  type Schedule,
} from "../../../features/workspace/model";
import { scheduleLabel } from "../../../features/workspace/format";

const schedules: { id: Schedule; label: string; hint: string }[] = [
  { id: "manual", label: "Manually", hint: "When you start it" },
  { id: "daily", label: "Every day", hint: "Including weekends" },
  { id: "weekdays", label: "Weekdays", hint: "Monday to Friday" },
  { id: "weekly", label: "Weekly", hint: "Every Monday" },
];

export default function CampaignPage() {
  const w = useWorkspace();
  const [draft, setDraft] = useState<Campaign>(w.campaign);
  const [saved, setSaved] = useState(false);

  useEffect(() => setDraft(w.campaign), [w.campaign]);

  const set = <K extends keyof Campaign>(key: K, value: Campaign[K]) => {
    setDraft((d) => ({ ...d, [key]: value }));
    setSaved(false);
  };

  const connected = PORTALS.filter((p) => w.portals[p.id]);
  const dirty = JSON.stringify(draft) !== JSON.stringify(w.campaign);
  const perPortal = draft.portals.length
    ? Math.ceil(draft.jobsPerRun / draft.portals.length)
    : 0;

  function save() {
    updateWorkspace((ws) => ({ ...ws, campaign: draft }));
    setSaved(true);
  }

  return (
    <div className="space-y-8 pb-20">
      <PageHeader
        title="Campaign"
        description="How many jobs, where, and when. Changes apply from the next run."
      />

      <Section
        title="Where to apply"
        description="Only connected portals can be used."
      >
        {connected.length === 0 ? (
          <p className="text-sm text-fg-2">
            No portals connected yet.{" "}
            <Link
              href="/app/connections#portals"
              className="font-medium text-accent hover:underline"
            >
              Connect a portal
            </Link>{" "}
            to choose it here.
          </p>
        ) : (
          <fieldset>
            <legend className="sr-only">Portals</legend>
            <div className="flex flex-wrap gap-2">
              {connected.map((p) => {
                const on = draft.portals.includes(p.id);
                return (
                  <label
                    key={p.id}
                    className={`inline-flex h-9 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                      on
                        ? "border-accent bg-accent-soft text-accent"
                        : "border-line-strong text-fg-2 hover:bg-surface-2"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={on}
                      onChange={() =>
                        set(
                          "portals",
                          on
                            ? draft.portals.filter((x) => x !== p.id)
                            : [...draft.portals, p.id],
                        )
                      }
                    />
                    {p.name}
                  </label>
                );
              })}
            </div>
          </fieldset>
        )}
      </Section>

      <Section
        title="How much"
        description="Rolevia spreads applications evenly across your portals."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            id="jobsPerRun"
            label={`Jobs per run: ${draft.jobsPerRun}`}
            hint={
              perPortal
                ? `About ${perPortal} per portal. Keeping this under 25 a day is gentler on job sites.`
                : "Pick at least one portal above."
            }
          >
            <Slider
              id="jobsPerRun"
              ariaLabel="Jobs per run"
              min={1}
              max={50}
              value={draft.jobsPerRun}
              onChange={(v) => set("jobsPerRun", v)}
            />
          </Field>
          <Field
            id="minMatch"
            label={`Minimum match: ${draft.minMatch}%`}
            hint="Jobs that fit less than this are skipped and listed in your report."
          >
            <Slider
              id="minMatch"
              ariaLabel="Minimum match"
              min={50}
              max={100}
              step={5}
              value={draft.minMatch}
              onChange={(v) => set("minMatch", v)}
              format={(v) => `${v}%`}
            />
          </Field>
        </div>
      </Section>

      <Section title="When" description={scheduleLabel(draft)}>
        <fieldset>
          <legend className="sr-only">Schedule</legend>
          <div className="grid gap-3 sm:grid-cols-4">
            {schedules.map((s) => {
              const on = draft.schedule === s.id;
              return (
                <label
                  key={s.id}
                  className={`cursor-pointer rounded-card border p-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                    on
                      ? "border-accent bg-accent-soft/50"
                      : "border-line hover:bg-surface-2/60"
                  }`}
                >
                  <input
                    type="radio"
                    name="schedule"
                    className="sr-only"
                    checked={on}
                    onChange={() => set("schedule", s.id)}
                  />
                  <span className="block text-sm font-medium">{s.label}</span>
                  <span className="mt-0.5 block text-xs text-fg-3">
                    {s.hint}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
        {draft.schedule !== "manual" && (
          <div className="mt-5 max-w-[200px]">
            <Field id="runAt" label="Start time">
              <input
                id="runAt"
                type="time"
                className="input"
                value={draft.runAt}
                onChange={(e) => set("runAt", e.target.value)}
              />
            </Field>
          </div>
        )}
      </Section>

      <Section title="Control">
        <div className="space-y-6">
          <Switch
            id="reviewFirst"
            checked={draft.reviewFirst}
            onChange={(v) => set("reviewFirst", v)}
            label="Review before sending"
            description="Applications wait in Activity until you approve them. Recommended for your first few runs."
          />
          <Switch
            id="paused"
            checked={draft.paused}
            onChange={(v) => set("paused", v)}
            label="Pause campaign"
            description="Stops all scheduled runs until you turn this off."
          />
        </div>
      </Section>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-surface/95 backdrop-blur-md lg:left-[240px]">
        <div className="mx-auto flex max-w-4xl items-center justify-end gap-3 px-4 py-3 sm:px-6 lg:px-10">
          <p className="mr-auto text-sm text-fg-2" role="status">
            {dirty ? "Unsaved changes" : saved ? "Saved" : ""}
          </p>
          <button
            type="button"
            className="btn-ghost"
            disabled={!dirty}
            onClick={() => setDraft(w.campaign)}
          >
            Discard
          </button>
          <button
            type="button"
            className="btn-primary"
            disabled={!dirty}
            onClick={save}
          >
            Save campaign
          </button>
        </div>
      </div>
    </div>
  );
}
