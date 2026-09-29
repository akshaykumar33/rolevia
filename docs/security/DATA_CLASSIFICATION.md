# Data Classification

Classifies all data types handled within the platform.

---

## Classification Tiers

| Tier                   | Examples                                            | Storage                               | Encryption                           |
| ---------------------- | --------------------------------------------------- | ------------------------------------- | ------------------------------------ |
| **Confidential / PII** | Candidate resumes, contact details, email addresses | PostgreSQL / S3                       | At rest (KMS) & in transit (TLS 1.3) |
| **Restricted**         | Passwords, session tokens, API credentials          | Argon2id hashes / AWS Secrets Manager | Envelope encryption                  |
| **Internal Business**  | Aggregated placement stats, usage metrics           | PostgreSQL / Redis                    | Standard encryption at rest          |
| **Public**             | Public job postings, marketing pages                | Edge CDN                              | TLS                                  |
