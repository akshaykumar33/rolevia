# Changelog

All notable changes to the Rolevia project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Phase 1: Identity, multi-tenant workspace isolation, and RBAC runtime.
- Phase 2: Career Intelligence Vault and verified document parsing pipeline.

---

## [0.1.0-bootstrap] - 2026-09-16

### Added
- **Repository Governance**: Root governance, editor config, licensing decisions, security policy, and contributing guide.
- **Documentation Architecture**: Complete system architecture, bounded contexts, API standards, database standards, AI guidelines, and 16 phased implementation roadmaps.
- **Architecture Decision Records**: Initial ADR framework and records 0001 through 0010.
- **AI Context System**: Persistent project memory (`.ai/`), agent roles (`.agents/`), and 14 executable engineering skills (`.skills/`).
- **Monorepo Foundation**: pnpm workspace, Turborepo orchestration, and root TypeScript configurations.
- **Domain Packages**:
  - `@rolevia/contracts`: Core domain types, events, and validation schemas.
  - `@rolevia/config`: Central brand codename abstraction and environment schemas.
  - `@rolevia/ui`: Semantic design tokens and theme primitives.
- **Application Shell**: Next.js minimal branded application shell displaying system status, tokens, and theme toggle.
- **CI Workflows**: GitHub Actions workflows for continuous integration and security scanning.
