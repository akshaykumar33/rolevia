# AI Model Routing Strategy

Not all AI tasks require frontier reasoning models. Tasks are dynamically routed based on capability tiers.

---

## Model Capability Tiers

| Tier                           | Typical Models                 | Use Cases                                                            | Latency Target | Cost Target    |
| ------------------------------ | ------------------------------ | -------------------------------------------------------------------- | -------------- | -------------- |
| **Tier 1: Fast Extraction**    | Claude 3.5 Haiku / GPT-4o-mini | Resume text parsing, email classification, JD entity extraction      | < 800ms        | < $0.001 / req |
| **Tier 2: Semantic Synthesis** | GPT-4o / Claude 3.5 Sonnet     | Resume tailoring, STAR interview coaching, gap analysis              | < 3000ms       | < $0.015 / req |
| **Tier 3: Strict Evaluation**  | Deep reasoning models          | Truthfulness audit, hallucination check, complex contract validation | < 8000ms       | < $0.040 / req |
