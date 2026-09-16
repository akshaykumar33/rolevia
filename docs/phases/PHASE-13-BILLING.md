# Phase 13 — Billing

## 1. Objective
Implement subscription plans, entitlement checks, usage metering (AI tokens, active applications), and payment provider abstraction.

## 2. User Value
Allows individual candidates and enterprise organizations to subscribe to paid tiers, unlock advanced matching features, and monitor usage limits.

## 3. Scope
* Subscription tiers (Free, Pro, Enterprise/Cohort).
* Entitlement enforcement service (checking active plan limits before initiating costly AI jobs or applications).
* Usage metering and alert thresholds.
* Payment gateway provider abstraction (Stripe implementation).

## 4. Out of Scope
* Embedding proprietary Stripe logic directly throughout domain entities.
* Complex multi-currency marketplace invoicing.

## 5. Dependencies
* Phase 01 (Identity & Tenancy)
* Payment provider account (Stripe)

## 6. Architecture Impact
Guards resource-heavy AI operations behind central entitlement and quota verification.

## 7. Database Changes
* Tables: `subscription_plans`, `tenant_subscriptions`, `usage_records`, `invoices`.

## 8. API Changes
* `POST /billing/checkout`, `POST /billing/portal`, `POST /billing/webhook`, `GET /billing/entitlements`

## 9. UI Changes
* Pricing table, Subscription management portal, Usage meter progress bars.

## 10. Security Considerations
* Webhook signatures cryptographically validated (Stripe webhook secrets).
* Idempotent webhook processing to prevent double-crediting quotas.
* Payment card data never touches Rolevia servers (PCI-DSS compliant redirect/elements).

## 11. Observability
* Webhook delivery latency, failed payment alert metrics, MRR and churn telemetry.

## 12. Testing
* Stripe mock webhook test harness covering upgrades, downgrades, cancellations, and past-due dunning cycles.

## 13. Migration Considerations
* Grace period handling when modifying plan entitlement limits.

## 14. Tasks
* [ ] Implement BillingProvider abstraction and Stripe adapter.
* [ ] Build EntitlementService and authorization middleware guards.
* [ ] Implement usage metering accumulator in Redis/PostgreSQL.
* [ ] Create billing customer portal integration.

## 15. Acceptance Criteria
* User can upgrade to Pro via Stripe checkout and immediately access higher application quotas.
* Over-quota requests return clear `402 Payment Required` or upgrade prompt.

## 16. Exit Criteria
* Automated subscription lifecycle tests pass 100%.

## 17. Risks
* Race conditions on simultaneous quota consumption (mitigated by atomic Redis increment operations).

## 18. Rollback Considerations
* Subscription cancelation reverts tenant to Free tier at period end.

## 19. Documentation Updates
* Update `docs/architecture/BOUNDED_CONTEXTS.md`.
