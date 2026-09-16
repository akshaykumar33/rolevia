# Performance Standards

Performance engineering in Rolevia is strictly evidence-driven.

---

## Performance Workflow
1. **Measure Baseline**: Capture latency percentiles (p50, p95, p99), memory usage, and query count.
2. **Identify Bottleneck**: Profile using Node.js diagnostic tools, Chrome DevTools, or PostgreSQL `EXPLAIN (ANALYZE, BUFFERS)`.
3. **Formulate Hypothesis**: Pinpoint specific index, N+1 query, or compute loop.
4. **Implement Change**: Smallest targeted refactoring.
5. **Verify Improvement**: Retest under identical load and compare results.

Do NOT introduce premature caches or speculative background queues without measurement evidence.
