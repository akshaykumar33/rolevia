# Skill: Git & Version Control Operations

## Purpose

Guide the execution of atomic, verified commits, clean branch management, and standard pull requests.

## When to use

- Staging changes, authoring commits, creating PRs.

## Inputs

- Changed files, change rationale, issue references.

## Procedure

1. Verify working directory status: `git status`.
2. Ensure formatting, lint, and typecheck pass cleanly before staging.
3. Stage logical atomic group of files: `git add <files>`.
4. Author commit message following Conventional Commits (`type(scope): message`).
5. Verify commit with `git log -1`.

## Validation

- Check that commit message accurately explains WHAT changed and why.

## Common mistakes

- Bundling unrelated changes (e.g. refactor + new feature) into a single giant commit.
- Committing temporary debug files or `.env.local`.

## Security considerations

- Verify no credentials or private test certificates are included in the commit diff.

## Output expectations

- Clean, linear git history with meaningful semantic checkpoints.
