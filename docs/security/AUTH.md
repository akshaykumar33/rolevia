# Authentication & Session Security

Covers password security, session storage, and token validation.

---

## 1. Password Policy
* Argon2id password hashing with memory and iteration costs tuned to NIST recommendations.
* Rate limiting on login endpoints prevents credential stuffing.

---

## 2. Session Cookies
* Flags: `HttpOnly; Secure; SameSite=Lax`.
* Session invalidation destroys server-side Redis token immediately.
