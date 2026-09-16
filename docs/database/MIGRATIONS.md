# Database Migration Procedure

Every schema modification must follow an Expand-Migrate-Contract zero-downtime lifecycle.

---

## 1. Zero-Downtime Migration Pattern
1. **Expand**: Add new columns or tables as nullable or with safe defaults. Deploy code that reads from both old and new.
2. **Migrate**: Run background asynchronous data backfills.
3. **Contract**: Deploy code that uses only the new schema. Drop legacy columns and constraints in a subsequent migration.

---

## 2. Migration Invariants
* **Transactionality**: All DDL must run within transactions where supported.
* **Concurrent Indexes**: Large production tables must build indexes using `CREATE INDEX CONCURRENTLY`.
* **Lock Timeouts**: Every migration script sets `SET lock_timeout = '3s';` to avoid blocking live queries.
