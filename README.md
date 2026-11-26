# TrailNotes API — documentation portfolio

**Status: learning scaffold, version 0.1.0. Not yet a completed portfolio submission.**

TrailNotes is a fictional, read-only hiking API. This repository combines a working local demo with developer documentation, an OpenAPI contract, a Postman collection and repeatable checks.

The intended reader is a developer who wants to list trails and retrieve one trail's details. Every trail and measurement is synthetic. Nothing here is travel guidance or a production service.

## Start here

- **Learner:** [Projektauftrag](learning/PROJECT_BRIEF.md), then [eight milestones](learning/MILESTONES.md).
- **API consumer:** [documentation overview](docs/index.md) and [quickstart](docs/quickstart.md).
- **Reviewer:** [evidence and authorship](docs/case-study.md), [verification plan](docs/verification.md), [release checklist](learning/PUBLISHING.md).

## Run locally

Requirements: Node.js 22 or newer. PowerShell 7 is needed only to build the documentation website. No npm packages or real API credentials are required.

```sh
node --test
node scripts/check.mjs
pwsh -NoProfile -File scripts/build-docs.ps1
node src/server.mjs
```

Open <http://127.0.0.1:4010/> for the built documentation or <http://127.0.0.1:4010/health> for the API health check. Stop the server with Ctrl+C. If port 4010 is occupied, select another port using the `PORT` environment variable; update your requests and Postman `base_url` accordingly.

On the prepared Windows workstation, the separate `api-doc-kurs/Praxisprojekt-starten.cmd` launcher locates the existing runtimes and builds the preview. That workstation helper is not part of this publishable repository.

## Repository map

| Location | Purpose |
| --- | --- |
| `docs/` | Authoritative Markdown source for the developer guide |
| `api/openapi.json` | Human-editable OpenAPI 3.0.3 contract |
| `postman/` | Importable collection and environment; only a public demo key |
| `src/` | Deterministic local API with synthetic fixtures |
| `test/` | HTTP integration tests, including documented failure paths |
| `learning/` | German learning milestones, review rubric and publication plan |
| `scripts/` | Documentation build and repository consistency checks |
| `.github/workflows/` | CI checks and manually triggered Pages deployment |

`_site/` is generated and ignored by Git. GitHub Pages hosts the documentation only; the API remains a local demo. The reference intentionally uses explicit endpoint documentation rather than depending on an externally hosted API viewer.

## Public learning project

This repository can be shared as a work in progress. Its documentation site retains the learning-scaffold notice and the case study identifies the AI-assisted baseline. Open tasks and missing reader review are intentional and visible.

The Pages workflow uses `node scripts/check.mjs --publish` to require an honest publication status and passing consistency checks. `--release` remains the stricter check for a completed portfolio submission; it is expected to fail while the learning milestones are open.

## What to demonstrate before calling this a completed portfolio

Complete the milestones, rewrite the consumer-facing prose in your own voice, add your own evidence and obtain a fresh-reader review. Keep the learning-scaffold status until that work is complete. Record what you wrote and what the scaffold supplied in the case study. A prepared repository is not evidence that a course has been completed.

The starter was prepared with Codex. It contains original example material and links to Tom Johnson's [Documenting APIs](https://idratherbewriting.com/learnapidoc/) course; it does not reproduce the course. MIT-licensed; review the license and contributor attribution before your first public release.
