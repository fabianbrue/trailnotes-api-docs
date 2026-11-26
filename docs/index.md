---
title: TrailNotes API
---
# Find a trail. Understand the API.

TrailNotes lets you list hiking trails, filter them by difficulty and retrieve a trail's details. This read-only API is a fictional service built for a documentation portfolio. All names, descriptions and measurements are synthetic.

This guide is for developers who understand HTTP requests and want to make their first successful call with curl or Postman.

## Make your first call

Start the local server, then follow the [quickstart](quickstart.md). You will retrieve two trails and inspect the `next_offset` value for the next page.

| You want to… | Read |
| --- | --- |
| Make a successful request | [Quickstart](quickstart.md) |
| Understand the sample header | [Authentication](authentication.md) |
| Look up a path or parameter | [API reference](reference.md) |
| Diagnose an error response | [Errors](errors.md) |
| Retrieve every page | [Pagination tutorial](tutorial.md) |
| Review this project's evidence | [Verification](verification.md) and [case study](case-study.md) |

## Scope and limits

- Local base URL: `http://127.0.0.1:4010`.
- The demo contains three immutable trails. Restarting does not change their data.
- The list endpoint uses offset pagination and returns two items by default.
- Supported API methods: GET. There are no write operations, user accounts, production credentials or rate-limit simulation.
- Distances are kilometres; ascent is metres. Difficulty labels are synthetic classifications for this project.
- GitHub Pages can host this guide, but cannot run the Node.js API. Readers run the demo on their own computer.

## Download the supporting files

- [OpenAPI 3.0.3 contract](../api/openapi.json)
- [Postman collection](../postman/trailnotes.postman_collection.json)
- [Postman environment](../postman/trailnotes.postman_environment.json)

The editable Markdown pages are the source of truth for the narrative guide. The OpenAPI document describes the machine-readable contract. Both must match the server's observed behaviour.
