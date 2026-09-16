# AI Cost Control & Quotas

Manages AI operational costs and token expenditure.

---

## 1. Cost Tracking
Every AI model request logs `promptTokens`, `completionTokens`, and calculated USD cost.

---

## 2. Quotas & Limits
* Tier-based token budgets per billing cycle.
* Workflows check remaining tenant budget before invoking frontier models.
* Token budgets fail gracefully, offering smaller models or asking user to upgrade.
