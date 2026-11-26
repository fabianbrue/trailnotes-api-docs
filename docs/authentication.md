---
title: Authentication
---
# The public demo key

Requests to `/v1/trails` and `/v1/trails/{trailId}` require this header:

```http
X-Demo-Key: trailnotes-demo
```

`/health` does not require a key.

This fixed value demonstrates where a credential belongs in a request. It is public fixture data, has no privileges outside this local example and is not a production authentication system. There is no sign-up, key generation or key rotation workflow.

## In Postman

The collection uses API Key authorization. It reads `demo_key` from the active **TrailNotes — local demo** environment and puts it in the `X-Demo-Key` header. The `base_url` variable points to `http://127.0.0.1:4010`.

The negative request **06 Missing key** deliberately overrides the collection authorization to send no header.

## Diagnose a rejected request

Missing, empty or incorrect values return HTTP `401`, with error code `UNAUTHORIZED`. Confirm the header name, the value and the active Postman environment.

Real services need a different design, including appropriate transport security, secret storage and authorization checks. They are outside this fixture's scope. Never replace this demo value with a company credential in public examples.
