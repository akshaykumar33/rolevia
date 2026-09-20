# API Versioning

API versions are specified directly in the URL path prefix:
`/api/v1/...`

---

## Evolution Strategy

- **Non-Breaking Changes**: Adding optional query parameters, optional request body fields, or new response attributes does NOT require a new API version.
- **Breaking Changes**: Changing field types, removing fields, or altering state transition preconditions requires incrementing the API version (`/api/v2/...`).
- **Deprecation Notice**: Deprecated endpoints return a `Sunset` and `Deprecation` HTTP header giving a minimum 6-month migration window.
