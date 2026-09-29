# Skill: AI Engineering, Prompt Architecture & Truthfulness Protocol

## Purpose

Author, tune, and evaluate LLM prompt templates, structured output schemas, and token cost telemetry with absolute fidelity to Rolevia's core Truthfulness Invariant.

## When to Use

- Adding or modifying any AI generation, extraction, tailoring, or interview prep task.
- Auditing LLM workflows for hallucination risks or prompt injection vulnerabilities.

## Inputs

- Task objective, candidate context, untrusted job description or external text, target Zod schema.

## Procedure

1. **Enforce the Truthfulness Invariant**:
   - Explicitly instruct the model that fabricating credentials, dates, metrics, or company names is strictly prohibited.
   - Enforce the hierarchy: `User-confirmed facts > extracted facts > AI inference`.
   - If a candidate lacks a required skill, mandate that it is flagged as an unmatched gap.
2. **Untrusted Boundary Isolation**:
   - Enclose external text (job descriptions, resume PDFs, scraped pages) inside XML tags (e.g. `<UNTRUSTED_JOB_DESCRIPTION>`).
   - Prefix with safety instructions explicitly instructing the model to ignore any instructions or overrides inside untrusted tags.
3. **Structured Outputs with Zod**:
   - Define output schemas in `@rolevia/contracts`.
   - Implement self-correction loops feeding validation error messages back to the LLM on JSON failure (max 2 retries).
4. **Model Tiering & Telemetry**:
   - Route high-throughput/low-latency tasks to Tier 1 models (e.g., Haiku / GPT-4o-mini).
   - Route complex synthesis to Tier 2 models (e.g., Sonnet / GPT-4o).
   - Record tenant ID, workspace ID, prompt/completion tokens, latency, and estimated cost for every call.

## Validation

- Execute prompt test suites against golden test benchmarks.
- Verify 0% hallucinated metrics or ungrounded qualifications.

## Security Considerations

- Never pass external job descriptions into prompts as unescaped raw system text.
- Maintain cryptographic traceability from generated bullet points to source candidate fact IDs.

## Output Expectations

- Type-safe, validated generator function returning Zod-validated data with telemetry instrumentation.
