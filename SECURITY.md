# Security Policy

Security is a primary design consideration for Rolevia. As a multi-tenant platform managing sensitive candidate career data and AI workflows, we enforce rigorous security controls at all layers.

---

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.0.x   | :white_check_mark: |

---

## Reporting a Vulnerability

If you discover a security vulnerability within Rolevia, please disclose it responsibly.

**DO NOT submit public GitHub issues for security vulnerabilities.**

### Reporting Procedure

1. Email details of the vulnerability to the project maintainers:
   - **Security Contact Placeholder**: `security-team@rolevia.internal` _(Maintainer note: replace with designated production security mailbox prior to launch)_
2. Please include:
   - A description of the issue and potential impact
   - Step-by-step instructions or proof-of-concept scripts to reproduce
   - Any affected components, APIs, or data models
3. The maintainers will acknowledge receipt within 48 hours and provide status updates as investigation and remediation progress.

### What NOT to Disclose Publicly

- Potential cross-tenant data leakage or isolation bypasses
- Privilege escalation vectors
- Authentication or token manipulation bugs
- Unfiltered prompt injection vulnerabilities that access internal system tools

---

## Security Invariants

- **Tenant Isolation**: No database query, vector search, or cache key may resolve across tenant boundaries without cryptographically verified authorization.
- **Human in the Loop**: Autonomous actions affecting third-party platforms (e.g. submitting applications or sending emails) must require explicit, authenticated user consent.
- **Zero Credential Bypass**: We strictly forbid any CAPTCHA bypass, credential stuffing, or anti-bot circumvention mechanisms.
