# User Flows

The core candidate journey follows the continuous 14-stage product loop.

---

## The Master Product Loop

```text
DISCOVER → UNDERSTAND → MATCH → RESEARCH → TAILOR → VALIDATE → APPROVE → APPLY → TRACK → INTERVIEW → OUTCOME → REMEMBER → ANALYZE → IMPROVE
```

---

## Detailed Step-by-Step Flow

### Stage 1: Onboarding & Understanding
1. Candidate uploads primary resume(s), LinkedIn export, and project portfolios.
2. System extracts structured achievements, skills, and timeline into the Career Intelligence Vault.
3. Candidate confirms or adjusts extracted facts:
   * System marks verified items as `CONFIRMED_BY_USER`.
   * Precedence rule applied: `User-confirmed facts > extracted facts > AI inference`.

### Stage 2: Discovery & Matching
1. Candidate defines career preferences (roles, compensation, location, culture, remote preferences).
2. Job Discovery ingests postings across active connectors.
3. Job Matching generates a fit breakdown:
   * Strengths: Demonstrated experience directly aligned with JD requirements.
   * Gaps: Missing or unevidenced skills.
   * Positioning Angle: Strategy to highlight transferable achievements.

### Stage 3: Tailoring & Validation
1. Candidate initiates application tailoring for a selected job.
2. AI synthesizes relevant verified bullet points matching JD keywords truthfully.
3. Validation Engine inspects output:
   * Grounding check against Career Vault.
   * Hallucination detection flags any unsourced claims.
   * Candidate reviews, edits, and explicitly clicks **Approve Application Package**.

### Stage 4: Execution & Tracking
1. Application is submitted via supported connector or exported for manual submission.
2. System logs immutable application record and initiates status monitoring.
3. Inbound emails and interview invitations are recognized and mapped to the timeline.

### Stage 5: Interview Prep & Reflection
1. System generates customized behavioral & technical mock questions based on the candidate's actual projects and the company's tech stack.
2. Outcome is recorded (offer, rejection, withdrawal) alongside interview feedback.
3. Career Vault updates to reflect new skills and strategic learnings.
