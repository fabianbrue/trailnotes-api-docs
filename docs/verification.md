---
title: Verification and known limits
---
# Verification and known limits

The repository checks observable HTTP behaviour and links between the supporting artifacts. Run them from the repository root:

```sh
node --test
node scripts/check.mjs
pwsh -NoProfile -File scripts/build-docs.ps1
node scripts/check.mjs --site
```

The HTTP suite starts its own loopback server on an available port and closes it after testing. It checks success responses, filtering, pagination, authentication failures, invalid input, unknown IDs and unsupported methods. It does not require a running manual demo.

The repository checker resolves local OpenAPI references, checks operation IDs and path parameters, checks Postman artifact structure and verifies relative Markdown links. It is a targeted consistency check, not a complete OpenAPI standards validator. Before release, import `api/openapi.json` into the official Swagger Editor and record the result.

The site check inspects generated local links, including links under a GitHub repository subpath. It does not prove that the GitHub-hosted deployment has succeeded. The prepared workflows need their first real GitHub run after publication.

The project may be published as an explicitly labelled learning scaffold. `node scripts/check.mjs --publish` checks this status and attribution. The separate `--release` check requires the recorded learner work and reader review before presenting the project as a completed portfolio. Neither check is a course certificate.

## Manual review before release

1. Follow the quickstart from a clean terminal.
2. Import both Postman files and select the local environment.
3. Run the collection with the local server available. Confirm successful and deliberately failing HTTP requests produce passing assertions.
4. Validate the OpenAPI contract in Swagger Editor; inspect request and response examples.
5. Build the site and test navigation on a narrow browser viewport.
6. Ask a fresh reader to retrieve one trail and recover from a missing key using only these docs. Record observed difficulties and the revisions made.

Record your own results in the case study and the learning evidence file. Do not invent timings, review quotes, completion dates or usability improvements.

## Known limits

The server is a local fixture, with no production security, persistence, write endpoints or external weather service. The site contains no remotely hosted API and makes no claim of external uptime. Live browser console requests are enabled only for the local same-origin preview.
