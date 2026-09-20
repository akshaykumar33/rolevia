# Data Classification Quick Reference — Rolevia

- **Confidential (Encrypted KMS)**: Candidate resumes, work histories, email addresses, interview transcripts.
- **Restricted (Hashed/Secrets Vault)**: Passwords, session tokens, connector API keys, Stripe webhook secrets.
- **Internal (Encrypted at rest)**: Placement aggregates, error metrics, LLM token expenditures.
- **Public (TLS)**: Marketing pages, public job listings, documentation.
