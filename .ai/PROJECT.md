# Project Vision & Invariants — Rolevia

## 1. Product Mission
Rolevia is a secure, multi-tenant AI Career Operating System that understands a candidate, maintains persistent career intelligence, discovers relevant jobs, evaluates fit, generates truthful tailored application material, assists or automates permitted application workflows, tracks outcomes, prepares candidates for interviews, and continuously improves the user's career strategy.

---

## 2. Invariant Rules
* **Truthfulness Invariant**: AI must NEVER fabricate candidate qualifications, job titles, companies, dates, or metrics.
* **Precedence Rule**: `User-confirmed facts > extracted facts > AI inference`.
* **Human-in-the-Loop**: Consequential actions (submitting external job applications, sending emails, deleting data) require explicit authenticated user policy and approval.

---

## 3. Product Boundaries & Non-Goals
* Rolevia is NOT a mass shotgun job-spamming engine.
* Rolevia will NEVER implement CAPTCHA circumvention, anti-bot bypasses, or credential theft.
* Rolevia is candidate-first, not an employer ATS or headhunter aggregator.

---

## 4. Platform Roles & Core Users
* Individual Candidate (Primary)
* Organization Candidate
* Mentor / Career Advisor
* Organization Admin
* Platform Admin & Platform Owner

---

## 5. Security, Privacy & Control Principles
* Strict logical multi-tenancy enforced at application and database kernel levels.
* Encryption at rest (AES-256 / KMS) and in transit (TLS 1.3).
* Candidate owns their career data and can purge it at any time.
