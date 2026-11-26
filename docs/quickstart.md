---
title: Quickstart
---
# Your first TrailNotes request

By the end of this guide, you will retrieve a page of trail data and identify its continuation offset.

## Prerequisites

- Node.js 22 or newer.
- A terminal with curl, or the Postman desktop app.
- A local checkout of this repository.

For the documentation preview, build the site with PowerShell 7. The API itself has no build step or npm dependencies.

## 1. Start the local server

From the repository root, run:

```sh
node src/server.mjs
```

Leave this terminal running. In a second terminal, verify the server:

```sh
curl "http://127.0.0.1:4010/health"
```

In Windows PowerShell, use `curl.exe` in place of `curl`. The health response has HTTP status `200`:

```json
{"status":"ok","api":"TrailNotes","version":"0.1.0","synthetic":true}
```

Connection refused means the server is not running on that address. A port-in-use error requires you to stop your earlier demo process or select a different `PORT`; use that same port in every subsequent request.

## 2. Retrieve the first page

```sh
curl "http://127.0.0.1:4010/v1/trails?limit=2" -H "X-Demo-Key: trailnotes-demo"
```

The server returns HTTP `200`. `items` contains Pine Loop and Ridge Path, `total` is `3` and `next_offset` is `2`. The key is a published demo value; no registration is needed. See [authentication](authentication.md).

## 3. Retrieve the next page

```sh
curl "http://127.0.0.1:4010/v1/trails?limit=2&offset=2" -H "X-Demo-Key: trailnotes-demo"
```

This page contains Summit Track. `next_offset` is `null`, so there are no further pages. `total` still counts all three matching trails, not just the items in this response.

## Use Postman instead

1. Import the [collection](../postman/trailnotes.postman_collection.json) and [environment](../postman/trailnotes.postman_environment.json).
2. Select **TrailNotes — local demo** as the active environment.
3. Keep the Node.js server running, then send **01 Health** and **02 List trails**.
4. Review the response and Postman test results. The negative examples deliberately expect `401`, `400` and `404`.

The Postman desktop app can reach your local server. In the Postman web app, use a connected Desktop Agent. A cloud agent cannot reach `127.0.0.1` on your computer.

## Try the local preview

This small console sends predefined GET requests to the same local server. On a published documentation website, it shows local-run instructions instead.

<form data-demo-console>
<label for="request-case">Example request</label>
<select id="request-case" name="request"><option value="list">List trails</option><option value="easy">Filter easy trails</option><option value="detail">Get Pine Loop</option><option value="unauthorized">Missing demo key (401)</option><option value="missing">Unknown trail (404)</option></select>
<button type="submit">Send local request</button>
<p data-console-status role="status">Start the local API to try a request.</p>
<pre data-console-output aria-live="polite">No request sent yet.</pre>
</form>

Next: read the [API reference](reference.md) or follow the [pagination tutorial](tutorial.md).
