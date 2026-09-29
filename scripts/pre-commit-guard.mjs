#!/usr/bin/env node
/**
 * Rolevia pre-commit guard.
 *
 * Refuses a commit that would put the repository at risk. Cross-platform (no shell
 * dependencies beyond `git`), so it behaves identically on Windows, macOS, and Linux.
 *
 * Gates, in order:
 *   1. Branch guard        — no commits directly on `main`
 *   2. Branch naming       — <type>/<scope>-<slug>
 *   3. Sensitive filenames — keys, certs, .env files, credential dumps
 *   4. Large files         — > 2 MB belongs in object storage or Git LFS
 *   5. Debug residue       — console.log / debugger / .only( in source
 *
 * Secret *content* scanning is handled by secretlint via lint-staged, and by gitleaks
 * across full history in CI. See docs/engineering/GIT_WORKFLOW.md §3.
 *
 * Usage:
 *   node scripts/pre-commit-guard.mjs              # staged files (git hook)
 *   node scripts/pre-commit-guard.mjs --worktree   # tracked working tree (manual audit)
 */

import { execFileSync } from "node:child_process";

const WORKTREE_MODE = process.argv.includes("--worktree");
const MAX_FILE_BYTES = 2 * 1024 * 1024;

const PROTECTED_BRANCHES = ["main", "master"];

const BRANCH_PATTERN =
  /^(feat|fix|refactor|perf|test|docs|build|ci|chore|security|hotfix|revert|release)\/[a-z0-9]+(-[a-z0-9]+)*$/;

/** Files that must never be committed, matched against the repo-relative path. */
const SENSITIVE_PATHS = [
  {
    re: /(^|\/)\.env($|\.)(?!example)/i,
    why: "environment file with real values",
  },
  {
    re: /\.(pem|key|ppk|p12|pfx|jks|keystore|asc|gpg)$/i,
    why: "private key or certificate",
  },
  { re: /(^|\/)id_(rsa|dsa|ecdsa|ed25519)(\.|$)/i, why: "SSH private key" },
  { re: /(^|\/)credentials(\.json)?$/i, why: "credentials file" },
  { re: /(^|\/)serviceAccount.*\.json$/i, why: "cloud service-account key" },
  {
    re: /(^|\/)\.(npmrc|pypirc|netrc|htpasswd)$/i,
    why: "registry or auth config (often holds tokens)",
  },
  { re: /(^|\/)\.aws\//i, why: "AWS credential directory" },
  {
    re: /\.kubeconfig$|(^|\/)kubeconfig$/i,
    why: "Kubernetes cluster credentials",
  },
  {
    re: /(^|\/)terraform\.tfstate/i,
    why: "Terraform state (contains resolved secrets)",
  },
  {
    re: /\.(sqlite|sqlite3|db|dump|sql\.gz|bak)$/i,
    why: "database dump (may contain production PII)",
  },
  { re: /(^|\/)secrets?\.(ya?ml|json|toml)$/i, why: "secrets manifest" },
];

/** Allowed despite matching a rule above. */
const SENSITIVE_ALLOWLIST = [
  /(^|\/)\.env\.example$/i,
  /(^|\/)\.secretlintrc\.json$/i,
];

const SOURCE_EXT = /\.(ts|tsx|js|jsx|mjs|cjs)$/i;
// Paths are repo-relative with no leading slash, so anchor on start-or-slash.
const SOURCE_EXEMPT =
  /(\.(test|spec)\.|(^|\/)(scripts|tools|__tests__|__mocks__|e2e|tests)\/|\.config\.)/i;

const DEBUG_PATTERNS = [
  {
    re: /\bconsole\.(log|debug|dir|trace)\s*\(/,
    why: "console.* — use the structured logger",
  },
  { re: /\bdebugger\b/, why: "debugger statement" },
  {
    re: /\b(?:describe|it|test)\.only\s*\(/,
    why: ".only( — would silently skip the rest of the suite",
  },
];

const ANSI = {
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  off: "\x1b[0m",
};
const c = (color, s) => `${ANSI[color]}${s}${ANSI.off}`;

const failures = [];
const fail = (gate, detail, hint) => failures.push({ gate, detail, hint });

function git(args, opts = {}) {
  return execFileSync("git", args, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
    ...opts,
  });
}

function currentBranch() {
  try {
    return git(["rev-parse", "--abbrev-ref", "HEAD"]).trim();
  } catch {
    return "";
  }
}

function targetFiles() {
  const args = WORKTREE_MODE
    ? ["ls-files"]
    : ["diff", "--cached", "--name-only", "--diff-filter=ACM"];
  return git(args)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

/** Staged blob contents (mode-aware), so we check what is actually being committed. */
function readContent(file) {
  try {
    const buf = WORKTREE_MODE
      ? execFileSync("git", ["show", `HEAD:${file}`], {
          maxBuffer: 64 * 1024 * 1024,
        })
      : execFileSync("git", ["show", `:${file}`], {
          maxBuffer: 64 * 1024 * 1024,
        });
    return buf;
  } catch {
    return null;
  }
}

function isBinary(buf) {
  return buf.subarray(0, 8000).includes(0);
}

// ---------------------------------------------------------------- gate 1 & 2

const branch = currentBranch();

if (!WORKTREE_MODE) {
  if (PROTECTED_BRANCHES.includes(branch)) {
    fail(
      "Branch guard",
      `You are committing directly to "${branch}".`,
      `Move your work to a branch:\n      git switch -c feat/<scope>-<slug>\n      (then commit again — your staged changes carry over)`,
    );
  } else if (branch && branch !== "HEAD" && !BRANCH_PATTERN.test(branch)) {
    fail(
      "Branch naming",
      `"${branch}" does not match <type>/<scope>-<slug>.`,
      `Types: feat fix refactor perf test docs build ci chore security hotfix revert\n      Example: feat/jobs-match-explanation\n      Rename:  git branch -m feat/<scope>-<slug>`,
    );
  } else if (branch.length > 60) {
    fail(
      "Branch naming",
      `"${branch}" exceeds 60 characters.`,
      "Shorten the slug.",
    );
  }
}

// ---------------------------------------------------------- gates 3, 4, 5

const files = targetFiles();

for (const file of files) {
  const allowed = SENSITIVE_ALLOWLIST.some((re) => re.test(file));

  if (!allowed) {
    const hit = SENSITIVE_PATHS.find(({ re }) => re.test(file));
    if (hit) {
      fail(
        "Sensitive file",
        `${file} — ${hit.why}`,
        `Unstage it and keep it out of git:\n      git restore --staged "${file}"\n      echo "${file}" >> .gitignore\n      If it held a real credential, ROTATE IT NOW — see docs/security/SECRETS.md`,
      );
      continue;
    }
  }

  const content = readContent(file);
  if (!content) continue;

  if (content.length > MAX_FILE_BYTES) {
    const mb = (content.length / 1024 / 1024).toFixed(1);
    fail(
      "Large file",
      `${file} is ${mb} MB (limit 2 MB).`,
      "Use object storage or Git LFS. Large blobs are permanent in history.",
    );
    continue;
  }

  if (isBinary(content)) continue;

  if (SOURCE_EXT.test(file) && !SOURCE_EXEMPT.test(file)) {
    const lines = content.toString("utf8").split("\n");
    lines.forEach((line, i) => {
      if (/(^|\s)(\/\/|\*)\s*allow-debug\b/.test(line)) return;
      for (const { re, why } of DEBUG_PATTERNS) {
        if (re.test(line)) {
          fail(
            "Debug residue",
            `${file}:${i + 1} — ${why}`,
            'Remove it, or append "// allow-debug" on that line with a reason.',
          );
          break;
        }
      }
    });
  }
}

// ---------------------------------------------------------------- report

const scope = WORKTREE_MODE ? "tracked files" : "staged files";

if (failures.length === 0) {
  console.log(
    c("green", `✓ pre-commit guard passed`) +
      c("dim", ` (${files.length} ${scope})`),
  );
  process.exit(0);
}

const byGate = failures.reduce(
  (acc, f) => ((acc[f.gate] ??= []).push(f), acc),
  {},
);

console.error("");
console.error(
  c("red", c("bold", "  ✖ COMMIT BLOCKED — Rolevia pre-commit guard")),
);
console.error("");

for (const [gate, items] of Object.entries(byGate)) {
  console.error(`  ${c("yellow", gate)}`);
  const seen = new Set();
  for (const item of items.slice(0, 10)) {
    console.error(`    • ${item.detail}`);
    if (item.hint && !seen.has(item.hint)) {
      console.error(c("dim", `      ${item.hint}`));
      seen.add(item.hint);
    }
  }
  if (items.length > 10)
    console.error(c("dim", `    … and ${items.length - 10} more`));
  console.error("");
}

console.error(c("dim", "  Rules: docs/engineering/GIT_WORKFLOW.md §3"));
console.error(
  c(
    "dim",
    "  Do NOT bypass with --no-verify. Fix the cause, or fix the rule in its own PR.",
  ),
);
console.error("");

process.exit(1);
