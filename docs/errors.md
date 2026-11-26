---
title: Errors and troubleshooting
---
# Errors and troubleshooting

Every failure body follows this shape:

```json
{"error":{"code":"UNAUTHORIZED","message":"Provide the public X-Demo-Key value: trailnotes-demo."}}
```

Use the HTTP status and `error.code` to identify the failure. Messages explain this demo's current behaviour; avoid treating their exact text as a long-term production contract.

| HTTP status | Code | Typical cause | Next action |
| --- | --- | --- | --- |
| `400` | `INVALID_QUERY` | Invalid difficulty, page limit, offset, unknown/repeated parameter or a query on an existing detail request | Compare the query with the reference; remove unsupported values |
| `401` | `UNAUTHORIZED` | Missing or incorrect `X-Demo-Key` | Send `trailnotes-demo` as the header value |
| `404` | `TRAIL_NOT_FOUND` | Unknown trail ID | Select an ID from a list response |
| `404` | `NOT_FOUND` | Unknown path or missing documentation page | Check the path; build the site for documentation URLs |
| `405` | `METHOD_NOT_ALLOWED` | A method other than GET | Use GET; the response includes `Allow: GET` |

## Reproduce a failure

```sh
curl -i "http://127.0.0.1:4010/v1/trails"
```

Expected: `401` with `UNAUTHORIZED`. Add the demo header to recover:

```sh
curl -i "http://127.0.0.1:4010/v1/trails" -H "X-Demo-Key: trailnotes-demo"
```

Expected: `200` with two items. In Windows PowerShell, use `curl.exe`.

## No HTTP response

Connection refused is a transport problem, not an API error response. Confirm the server is still running and that the port matches `base_url`. In Postman's web app, a Cloud Agent cannot contact your loopback address; use the desktop app or Desktop Agent.

The fixture has no rate limiter and never deliberately returns `429`. It does not simulate token expiry, network outages or upstream-provider failures.
