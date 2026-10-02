"use client";

import { useState, type FormEvent } from "react";
import { Check, KeyRound } from "lucide-react";
import { Badge, Field, PageHeader, Section } from "../../../ui/primitives";
import {
  updateWorkspace,
  useWorkspace,
} from "../../../features/workspace/store";
import {
  AI_PROVIDERS,
  PORTALS,
  type AiProvider,
} from "../../../features/workspace/model";
import { formatDate } from "../../../features/workspace/format";

export default function ConnectionsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Connections"
        description="Your AI key powers tailoring. Your portal sessions let Rolevia apply as you."
      />
      <AiKeySection />
      <PortalsSection />
    </div>
  );
}

function AiKeySection() {
  const { aiKey } = useWorkspace();
  const [editing, setEditing] = useState(false);
  const [provider, setProvider] = useState<AiProvider>("anthropic");
  const [key, setKey] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = key.trim();
    const expected = AI_PROVIDERS.find((p) => p.id === provider)!;
    if (trimmed.length < 20) {
      setError(
        "That key looks too short. Paste the full key from your provider's dashboard.",
      );
      return;
    }
    if (expected.prefix && !trimmed.startsWith(expected.prefix)) {
      setError(
        `${expected.name} keys start with "${expected.prefix}". Check you picked the right provider.`,
      );
      return;
    }
    // Only a masked hint is stored; the plaintext key leaves memory with this form.
    updateWorkspace((ws) => ({
      ...ws,
      aiKey: {
        provider,
        hint: `••••${trimmed.slice(-4)}`,
        addedAt: new Date().toISOString(),
      },
    }));
    setKey("");
    setError(null);
    setEditing(false);
  }

  const showForm = editing || !aiKey;
  const providerName = AI_PROVIDERS.find((p) => p.id === aiKey?.provider)?.name;

  return (
    <Section
      title="AI provider"
      description="Bring your own key. You pay your provider directly for what you use."
    >
      {!showForm && aiKey ? (
        <div className="flex flex-wrap items-center gap-4">
          <span className="grid size-10 place-items-center rounded-control bg-accent-soft text-accent">
            <KeyRound size={18} aria-hidden />
          </span>
          <div className="flex-1">
            <p className="text-sm font-medium">{providerName}</p>
            <p className="font-mono text-xs text-fg-3">
              {aiKey.hint}, added {formatDate(aiKey.addedAt)}
            </p>
          </div>
          <button
            type="button"
            className="btn-secondary btn-sm"
            onClick={() => setEditing(true)}
          >
            Replace key
          </button>
          <button
            type="button"
            className="btn-danger btn-sm"
            onClick={() => updateWorkspace((ws) => ({ ...ws, aiKey: null }))}
          >
            Remove
          </button>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          noValidate
          className="grid gap-5 sm:grid-cols-[220px_1fr]"
        >
          <Field id="provider" label="Provider">
            <select
              id="provider"
              className="input"
              value={provider}
              onChange={(e) => setProvider(e.target.value as AiProvider)}
            >
              {AI_PROVIDERS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </Field>
          <Field
            id="apiKey"
            label="API key"
            hint="Shown once, then stored encrypted. We only ever display the last four characters."
            error={error ?? undefined}
          >
            <input
              id="apiKey"
              type="password"
              className="input font-mono"
              autoComplete="off"
              spellCheck={false}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "apiKey-error" : "apiKey-hint"}
            />
          </Field>
          <div className="flex justify-end gap-2 sm:col-span-2">
            {aiKey && (
              <button
                type="button"
                className="btn-ghost"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>
            )}
            <button type="submit" className="btn-primary" disabled={!key}>
              Save key
            </button>
          </div>
        </form>
      )}
    </Section>
  );
}

function PortalsSection() {
  const { portals } = useWorkspace();

  function toggle(id: (typeof PORTALS)[number]["id"]) {
    updateWorkspace((ws) => {
      const next = { ...ws.portals };
      if (next[id]) {
        delete next[id];
        return {
          ...ws,
          portals: next,
          campaign: {
            ...ws.campaign,
            portals: ws.campaign.portals.filter((p) => p !== id),
          },
        };
      }
      next[id] = { connectedAt: new Date().toISOString() };
      return { ...ws, portals: next };
    });
  }

  return (
    <div id="portals" className="scroll-mt-24">
      <Section
        title="Job portals"
        description="Sign in to each site in your own Chrome first. Rolevia applies through that session, so it never sees your password."
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {PORTALS.map((p) => {
            const conn = portals[p.id];
            return (
              <li
                key={p.id}
                className={`flex items-center gap-3 rounded-card border p-4 transition-colors ${
                  conn ? "border-accent/40 bg-accent-soft/40" : "border-line"
                }`}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-control bg-surface-2 text-sm font-semibold text-fg-2">
                  {p.name[0]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-fg-3">
                    {conn
                      ? `Connected ${formatDate(conn.connectedAt)}`
                      : p.kind}
                  </p>
                </div>
                {conn ? (
                  <>
                    <Badge tone="success">
                      <Check size={12} aria-hidden />
                      <span className="sr-only">Connected</span>
                    </Badge>
                    <button
                      type="button"
                      className="btn-ghost btn-sm"
                      onClick={() => toggle(p.id)}
                      aria-label={`Disconnect ${p.name}`}
                    >
                      Disconnect
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="btn-secondary btn-sm"
                    onClick={() => toggle(p.id)}
                  >
                    Connect
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </Section>
    </div>
  );
}
