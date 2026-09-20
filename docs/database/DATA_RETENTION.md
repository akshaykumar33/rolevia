# Data Retention & Deletion Policy

Candidates retain sovereign ownership over their personal career records.

---

## 1. Candidate Account Purge (Right to be Forgotten)

When a candidate requests account deletion:

1. All personal records in `candidate_profiles`, `experiences`, and `documents` are hard deleted or cryptographically scrubbed within 30 days.
2. S3 document objects and generated resume PDFs are deleted immediately.
3. Vector embeddings in `context_embeddings` are dropped via cascade.
4. Security audit logs retain immutable user ID records stripped of identifiable personal names/emails for compliance.

---

## 2. Ephemeral State Retention

- Redis cache entries expire via TTL (default 1 to 24 hours).
- Telemetry records retained for 90 days before aggregation.
