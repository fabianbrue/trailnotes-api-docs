---
title: API reference
---
# API reference

Base URL: `http://127.0.0.1:4010`. All API responses, including failures, are JSON. The server sends `Cache-Control: no-store`. Paths are case-sensitive.

The [OpenAPI contract](../api/openapi.json) contains response schemas and representative examples. Request bodies are not used.

## GET /health

Check whether the local demo is running. Authentication is not required.

```sh
curl "http://127.0.0.1:4010/health"
```

Response: `200`, with `status`, `api`, `version` and `synthetic`. A healthy response does not mean the site was built; the API and the documentation build are separate steps.

## GET /v1/trails

Return trails in stable fixture order, optionally filtered by difficulty. Authentication is required.

| Query parameter | Type | Required | Default | Meaning |
| --- | --- | --- | --- | --- |
| `difficulty` | string | no | all difficulties | One of `easy`, `moderate`, `hard`; case-sensitive |
| `limit` | integer | no | `2` | Page size, from `1` to `3` |
| `offset` | integer | no | `0` | Number of matching items to skip, from `0` to `1000` |

Unknown parameter names, repeated parameters, empty values and values outside these constraints return `400`. Filtering happens before pagination. Offset values beyond the matching data return an empty `items` array with status `200`.

```sh
curl "http://127.0.0.1:4010/v1/trails?difficulty=easy&limit=2" -H "X-Demo-Key: trailnotes-demo"
```

```json
{
  "items": [{"id":"pine-loop","name":"Pine Loop","difficulty":"easy","distance_km":4.2,"ascent_m":90,"description":"A fictional loop through a quiet pine forest."}],
  "total": 1,
  "limit": 2,
  "offset": 0,
  "next_offset": null
}
```

| Response field | Type | Meaning |
| --- | --- | --- |
| `items` | array of Trail | Trails on this page |
| `total` | integer | Number of matching trails before pagination |
| `limit` | integer | Applied page size |
| `offset` | integer | Applied starting offset |
| `next_offset` | integer or null | Offset for the next page, or `null` when complete |

Responses: `200`, `400`, `401`. Unsupported API methods return `405` with `Allow: GET`.

## GET /v1/trails/{trailId}

Return one trail. Authentication is required. Detail requests do not accept query parameters.

| Path parameter | Type | Required | Meaning |
| --- | --- | --- | --- |
| `trailId` | string | yes | A fixture ID: `pine-loop`, `ridge-path`, or `summit-track` |

```sh
curl "http://127.0.0.1:4010/v1/trails/pine-loop" -H "X-Demo-Key: trailnotes-demo"
```

```json
{
  "id": "pine-loop",
  "name": "Pine Loop",
  "difficulty": "easy",
  "distance_km": 4.2,
  "ascent_m": 90,
  "description": "A fictional loop through a quiet pine forest."
}
```

| Trail field | Type | Unit or allowed values |
| --- | --- | --- |
| `id` | string | Stable fixture identifier |
| `name` | string | Display name |
| `difficulty` | string | `easy`, `moderate`, `hard` |
| `distance_km` | number | Kilometres |
| `ascent_m` | integer | Metres of ascent |
| `description` | string | Synthetic description |

All six fields are required and non-null. Responses: `200`, `400` for query parameters on an existing trail, `401`, and `404` for an unknown trail. For an unknown ID with extra query parameters, `404` takes precedence after authentication.

See [errors](errors.md) for failure bodies and recovery steps.
