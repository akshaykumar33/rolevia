# Secrets Management

Secrets must never be stored in plaintext or checked into version control.

---

## 1. Secrets Handling
* Production secrets stored in AWS Secrets Manager or KMS.
* Injected into container runtime via secure environment variables.
* Secrets rotated regularly; automated scanning blocks commits containing credentials.
