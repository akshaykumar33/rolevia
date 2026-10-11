"use client";

import { useSyncExternalStore } from "react";
import { EMPTY_WORKSPACE, type Workspace } from "./model";

// Browser-local workspace until the accounts API exists. One key, versioned,
// so a schema change can discard stale data instead of crashing.
const STORAGE_KEY = "rolevia.workspace.v2";

let state: Workspace = EMPTY_WORKSPACE;
let hydrated = false;
const listeners = new Set<() => void>();

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Partial<Workspace>;
    state = {
      ...EMPTY_WORKSPACE,
      ...parsed,
      profile: { ...EMPTY_WORKSPACE.profile, ...parsed.profile },
      campaign: { ...EMPTY_WORKSPACE.campaign, ...parsed.campaign },
    };
  } catch {
    state = EMPTY_WORKSPACE;
  }
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage full or blocked: keep working in memory for this session.
  }
}

export function updateWorkspace(fn: (w: Workspace) => Workspace) {
  hydrate();
  state = fn(state);
  persist();
  listeners.forEach((l) => l());
}

export function resetWorkspace() {
  updateWorkspace(() => EMPTY_WORKSPACE);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  hydrate();
  return state;
}

function getServerSnapshot() {
  return EMPTY_WORKSPACE;
}

export function useWorkspace(): Workspace {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2);
}
