# HookSlides AI Backend MVP Design

Date: 2026-08-04

## Scope

Build an independent Node.js/Express backend under `/server`. The MVP accepts topic text, article URLs, or YouTube URLs; extracts and normalizes content; summarizes it; generates a six-slide carousel; stores history in SQLite; and exposes REST APIs. Frontend remains untouched.

Out of scope: authentication, background jobs, real payments, editable layouts, export rendering, and user accounts.

## Decisions

- History is anonymous/local. No `user_id` yet.
- Generation is synchronous.
- Groq is the primary AI provider. OpenAI is the fallback after provider failure.
- AI output uses one fixed validated JSON contract.
- Every carousel has exactly six slides in this order: `hook`, `context`, `value`, `value`, `takeaway`, `cta`.
- Strategies: `viral_hook`, `storytelling`, `actionable_value`.
- Templates: `template_1`, `template_2`, `template_3`.
- YouTube content comes from a transcript API, never HTML scraping.

## Architecture

Use a layered structure with feature-oriented services:

```text
server/
  config/
  constants/
  controllers/
  database/
    migrations/
  extraction/
  middleware/
  models/
  prompts/
  routes/
  services/
    ai/
    extraction/
    generation/
    history/
  utils/
  validators/
  app.js
  server.js
```

Request flow:

```text
route → validation middleware → controller → service → repository/provider
```

Routes only map HTTP requests. Controllers translate request/response concerns. Services contain business logic. Providers isolate external APIs. Database repositories isolate SQLite.

Generation pipeline:

```text
validate input
→ detect/confirm source type
→ extract content
→ normalize content
→ summarize
→ generate six slides
→ validate slide schema/order
→ persist history
→ return response
```

Prompts live in separate files. AI providers implement one shared adapter contract, allowing Groq/OpenAI replacement without changing generation logic.

## Database

Use one `carousels` table for the MVP. Store slides as validated JSON to avoid premature normalization.

Columns:

- `id TEXT PRIMARY KEY`
- `title TEXT NOT NULL`
- `source_type TEXT NOT NULL CHECK (...)`
- `original_input TEXT NOT NULL`
- `extracted_content TEXT`
- `strategy TEXT NOT NULL CHECK (...)`
- `template TEXT NOT NULL CHECK (...)`
- `slides_json TEXT NOT NULL`
- `summary TEXT`
- `created_at TEXT NOT NULL`
- `updated_at TEXT NOT NULL`

Enable foreign keys. Add a newest-first `created_at` index. Validate JSON and exactly six ordered slides in application code before insertion.

## API

Base path: `/api`.

All responses use:

```json
{ "success": true, "message": "...", "data": {} }
```

Errors use `success: false`, a safe `message`, an error `code`, and optional validation details.

### `POST /api/generate`

Request fields: `input`, `sourceType`, `strategy`, `template`. Runs the synchronous pipeline and returns `201` with the saved carousel.

### `POST /api/extract`

Request fields: `input`, `sourceType`. Extracts and normalizes content without AI generation or persistence. Returns `200`.

### `GET /api/history`

Returns newest-first records. Supports `page` (default 1) and `limit` (default 20, maximum 50).

### `GET /api/history/:id`

Returns one saved carousel with parsed slides. Unknown IDs return `404`.

### `DELETE /api/history/:id`

Deletes one saved carousel. Unknown IDs return `404`.

Status mapping: `201` creation; `200` success; `400` malformed input; `404` missing record; `413` oversized input; `429` rate limit; `502` upstream provider failure; `500` safe internal error.

## Security and errors

Use Helmet, CORS, rate limiting, environment configuration, request validation, URL validation, bounded inputs, and centralized error middleware. Do not expose provider/database internals. Categorize logs as API, AI, extraction, or database errors. Avoid logging secrets or full user content.

## Testing

Leave one runnable self-check for the fixed carousel validation and repository serialization path. Add focused tests for validation, source extraction boundaries, provider fallback, generation ordering, and API status envelopes as implementation grows. Run the project test/lint commands after each implementation phase.

## Future seams

Future authentication can add `user_id`; background jobs can add generation status; payment integration can add billing tables/services; export rendering can consume the fixed slide contract. None belongs in this MVP implementation.
