# Phase 15 — Scale

## 1. Objective
Introduce targeted scaling optimizations (OpenSearch, Kafka, dedicated Go microservices, database partitioning) strictly driven by measured operational bottlenecks.

## 2. User Value
Maintains rapid response times, instant search, and flawless reliability as platform usage scales to millions of active candidates and job postings.

## 3. Scope
* Selective introduction of OpenSearch for multi-terabyte job catalog search if PostgreSQL reaches limits.
* Migration of high-throughput event buses from SQS to Apache Kafka if stream processing dictates.
* Specialized Go microservices for high-concurrency connector polling and headless browser workers.
* Database horizontal partitioning and read-replica routing.

## 4. Out of Scope
* Premature deployment of Kafka or OpenSearch before real metrics justify them.
* Re-architecting stable low-traffic services.

## 5. Dependencies
* Phase 14 (Hardening) completed and measured telemetry baselines established.

## 6. Architecture Impact
Extracts specific high-throughput components from the core modular monolith into independently scalable services.

## 7. Database Changes
* PostgreSQL table partitioning on high-cardinality tables (`job_listings`, `audit_logs`).
* Read replica connection pooling.

## 8. API Changes
* Asynchronous streaming endpoints for bulk search queries.

## 9. UI Changes
* Sub-100ms instant search experience over massive job catalogs.

## 10. Security Considerations
* Cross-service mTLS authentication between core API and specialized Go services.
* Partition-aware tenant isolation in OpenSearch indices.

## 11. Observability
* Distributed tracing across multi-language microservices, broker lag monitoring.

## 12. Testing
* Distributed benchmark testing with millions of simulated jobs and candidates.

## 13. Migration Considerations
* Dual-writing and zero-downtime backfilling from PostgreSQL to OpenSearch.

## 14. Tasks
* [ ] Evaluate telemetry against Phase 15 triggers.
* [ ] Deploy OpenSearch cluster with dual-write synchronization if search latency exceeds targets.
* [ ] Extract Go connector worker if CPU/memory efficiency warrants.
* [ ] Implement database table partitioning.

## 15. Acceptance Criteria
* Search queries over 10M+ job listings return in < 100ms.
* Zero downtime during data store synchronization.

## 16. Exit Criteria
* Scaled architecture operating stably under peak production load.

## 17. Risks
* Distributed state synchronization inconsistency (mitigated by transactional outbox pattern).

## 18. Rollback Considerations
* Ability to route search queries back to primary PostgreSQL database.

## 19. Documentation Updates
* Update `docs/architecture/SYSTEM_OVERVIEW.md` and `docs/architecture/DEPLOYMENT.md`.
