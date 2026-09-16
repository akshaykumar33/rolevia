# AI Platform Architecture

The AI Platform abstracts language model execution, structured output parsing, embeddings, and prompt safety.

---

## Provider Abstraction

```typescript
export interface ModelUsageMetrics {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  estimatedCostUsd: number;
  durationMs: number;
}

export interface LLMProvider {
  readonly providerName: string;
  complete(request: CompletionRequest): Promise<CompletionResponse>;
  generateStructured<T>(request: StructuredRequest<T>): Promise<T>;
}

export interface EmbeddingProvider {
  readonly providerName: string;
  readonly vectorDimensions: number;
  embed(texts: string[]): Promise<number[][]>;
}
```

---

## Telemetry & Cost Control
Every model invocation generates an immutable telemetry record:
* `tenantId` & `workspaceId`
* `modelName` & `providerName`
* `purpose` (e.g. `resume_tailoring`, `fit_evaluation`, `jd_parsing`)
* `tokensIn`, `tokensOut`, `latencyMs`, `costUsd`
* `status` (`SUCCESS`, `FILTERED`, `ERROR`)

Tenants can configure budget thresholds. When approaching limits, workflows gracefully downgrade to smaller models or alert the user.
