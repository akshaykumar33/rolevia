/**
 * Conventional Commits enforcement for Rolevia.
 * Rules mirror docs/engineering/GIT_WORKFLOW.md §2 — keep the two in sync.
 */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "refactor",
        "perf",
        "test",
        "docs",
        "build",
        "ci",
        "chore",
        "revert",
        "security",
      ],
    ],
    "scope-case": [2, "always", "kebab-case"],
    // Forbid "Add the thing" and "ADD THE THING", but allow acronyms mid-subject
    // (PR, API, CI, UI, JWT, SQL). A flat lower-case rule would reject those.
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100],
    "body-max-line-length": [2, "always", 100],
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [2, "always"],
  },
};
