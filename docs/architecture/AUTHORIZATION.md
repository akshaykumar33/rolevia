# Authorization Architecture (RBAC & ABAC)

Rolevia combines Role-Based Access Control (RBAC) with Attribute-Based Access Control (ABAC) to support candidate workflows and organization requirements.

---

## 1. Platform & Workspace Roles

| Role              | Scope     | Description                                                                                                 |
| ----------------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| `platform:owner`  | Global    | System administration, infrastructure management                                                            |
| `platform:admin`  | Global    | Operational management, support escalation                                                                  |
| `org:admin`       | Tenant    | Organization-level configuration, billing, user provisioning                                                |
| `org:mentor`      | Workspace | Reviews candidate materials, provides feedback, cannot apply on candidate's behalf without explicit consent |
| `candidate:owner` | Workspace | Complete ownership over personal career profile, materials, and approvals                                   |

---

## 2. ABAC Evaluation Model

RBAC determines basic capabilities; ABAC evaluates context-specific attributes:

- **Resource Ownership**: Does `request.user.id == resource.ownerId`?
- **Consent Grant**: Has the candidate explicitly granted permission for an automated action or mentor review?
- **Action Sensitivity**: Does the requested action require dual confirmation (e.g. permanent career data purge or automated submission)?

---

## 3. Policy Enforcement Point (PEP)

Every API endpoint evaluates authorization using a unified guard:

```typescript
// Conceptual Enforcement Guard
@UseGuards(TenantContextGuard, PermissionsGuard)
@RequirePermissions('application:submit')
@RequireConsent('external_application_submission')
async submitApplication(@Param('id') applicationId: string) { ... }
```

Stack traces or entity existence details must never be leaked when authorization fails; standard `403 Forbidden` or `404 Not Found` responses are returned per security policy.
