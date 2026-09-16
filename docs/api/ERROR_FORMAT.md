# API Error Response Format

All error responses return a standardized JSON error envelope adhering to RFC 7807 principles.

---

## Standard Error Payload

```json
{
  "error": {
    "code": "APPLICATION_NOT_READY",
    "message": "The application package requires factual verification before submission.",
    "requestId": "req_01h7x9ab42...",
    "details": [
      {
        "field": "resumeVersionId",
        "issue": "Unverified claim: 'Led migration of Kubernetes cluster'"
      }
    ]
  }
}
```

---

## HTTP Status Code Mapping
* `400 Bad Request`: Schema validation failure.
* `401 Unauthorized`: Authentication missing or expired.
* `403 Forbidden`: Insufficient role or absent user consent.
* `404 Not Found`: Resource not found within tenant workspace.
* `409 Conflict`: Concurrency conflict or duplicate idempotency key.
* `429 Too Many Requests`: Rate limit exceeded.
* `500 Internal Server Error`: Masked internal failure (logged with `requestId`).
