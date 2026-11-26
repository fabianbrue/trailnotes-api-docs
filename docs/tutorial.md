---
title: Retrieve every trail with pagination
---
# Retrieve every trail with pagination

Use this tutorial when one page is not enough. You will retrieve all three fixtures and stop when `next_offset` becomes `null`.

Prerequisite: the server is running as described in the [quickstart](quickstart.md). The example uses Node.js 22 or newer, whose `fetch` implementation is built in.

Save the following as `list-all.mjs` outside the repository, or run the provided `examples/list-all.mjs` from the repository root:

```js
const baseUrl = 'http://127.0.0.1:4010';
let offset = 0;
const all = [];
do {
  const response = await fetch(`${baseUrl}/v1/trails?limit=2&offset=${offset}`, {
    headers: { 'X-Demo-Key': 'trailnotes-demo' }
  });
  if (!response.ok) throw new Error(`Request failed: HTTP ${response.status}`);
  const page = await response.json();
  all.push(...page.items);
  offset = page.next_offset;
} while (offset !== null);
console.log(all.map(trail => trail.id));
```

```sh
node examples/list-all.mjs
```

Expected IDs, in order: `pine-loop`, `ridge-path`, `summit-track`.

The loop uses the server's `next_offset` instead of guessing when the result set ends. It checks the HTTP status before interpreting a successful response schema. The explicit `null` check also keeps offset `0` distinct from the end-of-pagination marker.

This compact example is designed for immutable local fixtures. A production client would also need policies for timeouts, retries, cancellation and data changing between requests. This server does not implement those scenarios.
