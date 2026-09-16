# Logging Standards

Rolevia uses structured, contextual JSON logging across all backend and worker services.

---

## 1. Structured Log Schema

Every log entry outputs single-line JSON conforming to this schema:
```json
{
  "timestamp": "2026-09-16T12:00:00.000Z",
  "level": "info",
  "message": "Application package prepared",
  "service": "api",
  "environment": "production",
  "requestId": "req_01h7x9...",
  "correlationId": "corr_01h7x9...",
  "tenantId": "d3b07384-d113-46fb-9c94-09852f862345",
  "workspaceId": "7e3b92f1-6382-4f2a-8991-3141f2349811",
  "context": "ApplicationStudio",
  "data": {
    "applicationId": "app_98214...",
    "jobId": "job_11902..."
  }
}
```

---

## 2. Redaction & Privacy Invariants
* **Strict Secret Redaction**: Passwords, API keys, JWTs, and session tokens must never be logged.
* **PII Redaction**: Full resume texts, candidate phone numbers, and personal email bodies are masked or logged only as cryptographically hashed identifiers in application traces.
