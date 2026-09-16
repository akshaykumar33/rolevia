# API Standards

Rolevia APIs are resource-oriented, predictable, and strongly typed via OpenAPI / Zod specifications.

---

## 1. URL Conventions
* Lowercase, hyphen-separated path segments.
* Plural nouns for resource collections: `/jobs`, `/applications`, `/documents`.
* Sub-resources indicate ownership: `/workspaces/:workspaceId/applications`.

---

## 2. HTTP Methods
* `GET`: Read resource or collection (idempotent, safe).
* `POST`: Create resource or execute non-idempotent action.
* `PATCH`: Partial entity update.
* `PUT`: Complete resource replacement.
* `DELETE`: Soft-delete or purge resource.
