# API Pagination

Collections support cursor-based pagination as the primary standard, with page-number pagination for static dashboards.

---

## Cursor-Based Response Envelope
```json
{
  "data": [ ... ],
  "meta": {
    "hasMore": true,
    "nextCursor": "eyJpZCI6ImFwcF8wMWg3eDkiLCJjcmVhdGVkQXQiOjE3MjY0OTI4MDB9",
    "limit": 25
  }
}
```

---

## Query Parameters
* `limit`: Number of items per page (default: 20, max: 100).
* `cursor`: Opaque base64-encoded pagination token.
* `sort`: Sort attribute and order (e.g. `-createdAt` for descending).
