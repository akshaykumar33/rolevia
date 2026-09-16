# Incident Response Procedure

Standardized response procedure for security alerts or data leakage.

---

## 1. Severity Levels
* **SEV-1 (Critical)**: Cross-tenant data breach, remote code execution, database compromise.
* **SEV-2 (High)**: Privilege escalation, prompt injection exposing internal tools.
* **SEV-3 (Medium)**: Transient denial of service, rate limit failure.

---

## 2. Response Phases
1. **Identification**: Triage alert, correlate logs via `correlationId`.
2. **Containment**: Revoke affected session tokens, isolate tenant, or trigger emergency kill switch.
3. **Eradication**: Deploy patch or configuration fix.
4. **Recovery**: Restore verified state and verify security monitors.
5. **Post-Mortem**: Document root cause and add regression tests within 72 hours.
