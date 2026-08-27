# HookSlides AI — Frontend Integration Guide

This document is everything a frontend developer needs to integrate with the HookSlides AI backend without reading the backend source. It covers the API contract, data shapes, error handling, and recommended UX flows.

---

## 1. Project Overview

### What is HookSlides AI?

HookSlides AI turns a topic, an article URL, or a YouTube video into a ready-to-post **6-slide Instagram carousel**. The user provides input and picks a content strategy and a visual template; the backend extracts/summarizes the source, runs it through a two-pass AI pipeline (editorial planning, then copywriting), and returns structured slide data plus persists it to history.

### MVP features

- Generate a carousel from **topic text**, an **article URL**, or a **YouTube URL** (via transcript, not scraping).
- Three content strategies: `viral_hook`, `storytelling`, `actionable_value`.
- Three visual templates: `template_1`, `template_2`, `template_3` (layout only — the backend does not render images in the MVP).
- History: list, view, and delete previously generated carousels.
- Cookie-based authentication: register/login issue an HTTP-only `sid` session cookie; generation, extraction, and history are scoped to the authenticated user.
- Free and Premium plans: Free users can generate 3 carousels per calendar month; Premium users have unlimited generation. Billing/payment processing is not implemented in the backend.
- No image export in the MVP — the backend returns structured JSON; rendering carousel images is a frontend (or future backend) concern.

### Overall application flow

```text
User enters input (topic / article URL / YouTube URL)
        ↓
User selects strategy + template
        ↓
Frontend calls POST /api/generate
        ↓
Backend: extract → summarize → editorial brief → write slides → validate → save
        ↓
Backend returns the full carousel (title, summary, 6 slides)
        ↓
Frontend renders the carousel using the chosen template
        ↓
Carousel is now in history (GET /api/history)
```

Generation is **synchronous** — the request blocks until the carousel is ready (typically a few seconds, since it involves 2–3 AI calls plus, for article/YouTube sources, network fetch/transcript retrieval). Design the UI for a loading state of several seconds, not instant response.

---

## 2. Backend Architecture

### Folder structure

```text
server/
  app.js                  Express app factory: middleware, route mounting
  server.js                Composition root: wires real DB/AI/extraction, starts listening
  config/                  Environment loading, logger
  constants/                Fixed value lists (errors.js, values.js)
  controllers/              Translate HTTP req/res ↔ service calls (no business logic)
  database/                 SQLite connection + migrations
  middleware/                requestId, validate, errorHandler, notFound
  models/                   Row → API-shape mapping (carousel.js)
  prompts/                   AI prompt templates (not relevant to frontend)
  routes/                    Express routers, one per resource
  services/
    ai/                      Groq/OpenAI providers + fallback orchestration
    extraction/               Article/YouTube/topic content extraction
    generation/                The end-to-end generation pipeline
    history/                   SQLite repository for carousels
  utils/                      apiResponse envelope helpers, content normalization, ids
  validators/                 Zod schemas for requests and AI output
```

### Request flow

```text
Route → validate middleware → Controller → Service → Repository/Provider → Response envelope
```

- **Routes** (`routes/*.js`) only declare `METHOD path → validate(schema) → controller.handler`. No logic lives here.
- **Validate middleware** rejects malformed requests before they reach a controller (see §6).
- **Controllers** (`controllers/*.js`) read the validated `req.body` / `req.params` / `req.query`, call exactly one service method, and format the response using `successResponse()`. They never touch the database or AI providers directly.
- **Services** own the business logic:
  - `generationService` runs the full pipeline (extraction → AI → validation → save).
  - `contentService` dispatches extraction by source type.
  - `aiService` calls the primary AI provider (Groq) and falls back to OpenAI on failure.
  - `historyRepository` is the only thing that touches SQLite.
- Every response — success or error — uses the same JSON envelope shape (see §3 intro).

---

## 3. API Documentation

**Base URL:** `http://localhost:3000` (configurable via `PORT`)
**Base path for all resource endpoints:** `/api`

### Authentication

Auth uses a server-side session stored in an HTTP-only `sid` cookie. Register or log in first; send cookies on every API request (`fetch` requires `credentials: 'include'`). The backend's CORS configuration permits credentialed requests from the configured frontend origin.

#### `POST /api/auth/register`

```json
{ "username": "creator_name", "password": "at-least-12-characters" }
```

Creates an account and sets `sid`. Usernames are normalized and must be valid; passwords must contain at least 12 characters. Returns `409 USERNAME_TAKEN` when the username already exists.

#### `POST /api/auth/login`

Accepts the same body, authenticates the user, and sets `sid`. Returns `401 INVALID_CREDENTIALS` for invalid credentials.

#### `GET /api/auth/me`

Returns the authenticated user:

```json
{ "success": true, "message": "Authenticated user.", "data": { "id": "user-uuid", "username": "creator_name", "plan": "free" } }
```

`plan` is `free` by default for new users. Premium users receive `plan: "premium"`.

#### Usage limits

- `free`: 3 carousel generations per calendar month
- `premium`: unlimited generations

When a free user hits the cap, `POST /api/generate` returns `429` with `error.code = "GENERATION_LIMIT_REACHED"`, plus `error.usage` (e.g. `3/3`) and `error.resetsAt` (ISO timestamp for the next month boundary).

Example:

```json
{
  "success": false,
  "message": "Monthly carousel generation limit reached.",
  "error": {
    "code": "GENERATION_LIMIT_REACHED",
    "usage": "3/3",
    "resetsAt": "2026-09-01T00:00:00.000Z"
  }
}
```

The limit resets automatically at the start of each calendar month.

`/api/generate`, `/api/extract`, and all `/api/history*` endpoints require authentication and return `401 UNAUTHORIZED` without a valid, unexpired `sid` cookie.

### Response envelope

#### `POST /api/auth/logout`

Clears the current session cookie. Safe to call when no session exists.

`/api/generate`, `/api/extract`, and all `/api/history*` endpoints require authentication and return `401 UNAUTHORIZED` without a valid, unexpired `sid` cookie.

### Response envelope

> Note: the top-level `error` object may include extra fields for specific failures. The monthly generation limit error adds `usage` and `resetsAt`.

Every endpoint, including errors, returns this shape:

```json
{
```json
{
  "success": true,
  "message": "Human-readable message.",
  "data": { }
}
```

Errors:

```json
{
  "success": false,
  "message": "Human-readable error message.",
  "error": {
    "code": "ERROR_CODE",
    "details": []
  }
}
```

`error.details` is only present for `400 VALIDATION_ERROR` responses (it carries the Zod issue list). All other errors omit `details`.

---

### `GET /health`

Simple liveness check. Not under `/api`.

**Response `200`:**
```json
{ "success": true, "message": "OK", "data": { "status": "ok" } }
```

---

### `POST /api/generate`

Runs the full pipeline and persists the result. **This is the main endpoint.**

**Request body:**

| Field | Type | Required | Allowed values |
|---|---|---|---|
| `input` | string | yes | 1–10,000 characters. Topic text, or an `http(s)` article URL, or a YouTube URL, depending on `sourceType`. |
| `sourceType` | string | yes | `"topic"` \| `"article"` \| `"youtube"` |
| `strategy` | string | yes | `"viral_hook"` \| `"storytelling"` \| `"actionable_value"` |
| `template` | string | yes | `"template_1"` \| `"template_2"` \| `"template_3"` |

No other fields are accepted — the request body is validated strictly; unknown fields cause a `400`.

**Example request:**

```json
POST /api/generate
Content-Type: application/json

{
  "input": "How compound interest makes small habits worth more than big one-time efforts",
  "sourceType": "topic",
  "strategy": "actionable_value",
  "template": "template_1"
}
```

**Response `201`:**

```json
{
  "success": true,
  "message": "Carousel generated successfully.",
  "data": {
    "id": "3018f864-a133-442b-9762-6bb4bdb926e7",
    "title": "Unlock the Power of Compound Interest",
    "summary": "Discover how small habits can lead to significant results over time",
    "captionIdeas": ["Small habits compound into remarkable results.", "Consistency beats intensity."],
    "hashtags": ["#compoundinterest", "#personalgrowth"],
    "slides": [
      { "type": "hook", "heading": "The Secret to Achieving Big Goals", "body": "..." },
      { "type": "context", "heading": "Compound Interest in Everyday Life", "body": "..." },
      { "type": "value", "heading": "Build a Savings Habit", "body": "..." },
      { "type": "value", "heading": "Create a Daily Routine for Growth", "body": "..." },
      { "type": "takeaway", "heading": "The Power of Consistency", "body": "..." },
      { "type": "cta", "heading": "Start Your Journey Today", "body": "..." }
    ],
    "sourceType": "topic",
    "strategy": "actionable_value",
    "template": "template_1",
    "originalInput": "How compound interest makes small habits worth more than big one-time efforts",
    "extractedContent": "How compound interest makes small habits worth more than big one-time efforts",
    "createdAt": "2026-08-05T03:15:35.270Z",
    "updatedAt": "2026-08-05T03:15:35.270Z"
  }
}
```

`slides` is **always exactly 6 items**, always in this fixed order: `hook`, `context`, `value`, `value`, `takeaway`, `cta`. Build the carousel UI around this fixed structure — it will never be shorter, longer, or reordered.

**Possible error responses:**

| Status | `error.code` | Cause |
|---|---|---|
| `400` | `VALIDATION_ERROR` | Missing/invalid field, bad enum value, input too long |
| `400` | `INVALID_URL` | `sourceType` is `article`/`youtube` but the URL is malformed, not http(s), or points to a disallowed host (localhost/private network) |
| `502` | `EXTRACTION_ERROR` | Article fetch failed, page wasn't readable, or YouTube transcript is disabled/unavailable |
| `502` | `AI_OUTPUT_ERROR` | AI returned malformed or invalid JSON at either the planning or writing stage |
| `502` | `AI_PROVIDER_ERROR` | Both Groq and OpenAI failed (or the only configured provider failed) |
| `500` | `INTERNAL_ERROR` | Unexpected server error |

---

### `POST /api/extract`

Extracts and normalizes source content **without** running AI generation or saving anything. Useful for a "preview the source" step before committing to a full generation, or for debugging a bad URL.

**Request body:**

| Field | Type | Required | Allowed values |
|---|---|---|---|
| `input` | string | yes | 1–10,000 characters |
| `sourceType` | string | yes | `"topic"` \| `"article"` \| `"youtube"` |

**Example request:**

```json
POST /api/extract
Content-Type: application/json

{
  "input": "https://www.youtube.com/watch?v=aircAruvnKk",
  "sourceType": "youtube"
}
```

**Response `200`:**

```json
{
  "success": true,
  "message": "Content extracted successfully.",
  "data": {
    "sourceType": "youtube",
    "title": "YouTube transcript",
    "content": "Full transcript text..."
  }
}
```

For `sourceType: "article"`, `data` additionally includes `author` (string or `null`) and `publishedAt` (currently always `null` — not extracted in the MVP). For `sourceType: "topic"`, `data.title` is `"Topic"` and `data.content` is the normalized input text.

**Possible error responses:** same `VALIDATION_ERROR`, `INVALID_URL`, `EXTRACTION_ERROR` as above (this endpoint never returns `AI_OUTPUT_ERROR`/`AI_PROVIDER_ERROR` since no AI is involved).

---

### `GET /api/history`

Lists saved carousels, newest first.

**Query parameters:**

| Param | Type | Default | Constraints |
|---|---|---|---|
| `page` | integer | `1` | ≥ 1 |
| `limit` | integer | `20` | 1–50 |

**Example request:**

```http
GET /api/history?page=1&limit=20
```

**Response `200`:**

```json
{
  "success": true,
  "message": "History retrieved successfully.",
  "data": {
    "items": [
      {
        "id": "3018f864-a133-442b-9762-6bb4bdb926e7",
        "title": "Unlock the Power of Compound Interest",
        "sourceType": "topic",
        "originalInput": "How compound interest...",
        "extractedContent": "How compound interest...",
        "strategy": "actionable_value",
        "template": "template_1",
        "slides": [ /* 6 slide objects, same shape as /api/generate */ ],
        "summary": "Discover how small habits...",
        "captionIdeas": ["Small habits compound into remarkable results."],
        "hashtags": ["#compoundinterest"],
        "createdAt": "2026-08-05T03:15:35.270Z",
        "updatedAt": "2026-08-05T03:15:35.270Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1,
      "totalPages": 1
    }
  }
}
```

Each item in `items` has the **exact same carousel shape** returned by `POST /api/generate`'s `data`. `pagination.total` is the total row count across all pages; use it to render "Page X of Y" or infinite-scroll logic.

**Possible error responses:** `400 VALIDATION_ERROR` if `page`/`limit` are out of range or non-numeric.

---

### `GET /api/history/:id`

Fetches one saved carousel by ID.

**Path parameter:** `id` — must be a valid UUID.

**Response `200`:** same single-carousel shape as one item in `/api/history`'s `items` array.

**Possible error responses:**

| Status | `error.code` | Cause |
|---|---|---|
| `400` | `VALIDATION_ERROR` | `id` is not a valid UUID |
| `404` | `NOT_FOUND` | No carousel with that ID exists |

---

### `DELETE /api/history/:id`

Deletes one saved carousel.

**Path parameter:** `id` — must be a valid UUID.

**Response `200`:**

```json
{ "success": true, "message": "Carousel deleted successfully.", "data": null }
```

**Possible error responses:** same as `GET /api/history/:id` (`VALIDATION_ERROR` / `NOT_FOUND`).

---

## 4. Database Models

There is one table, `carousels`. The frontend never queries it directly — this is for understanding what persists.

| Column | Type | Constraints | Notes |
|---|---|---|---|
| `id` | TEXT | PRIMARY KEY | UUID |
| `title` | TEXT | NOT NULL | AI-generated carousel title |
| `source_type` | TEXT | NOT NULL, CHECK IN (`topic`, `article`, `youtube`) | |
| `original_input` | TEXT | NOT NULL | The raw input the user submitted (topic text or URL) |
| `extracted_content` | TEXT | nullable | Normalized extracted/source text used for generation |
| `strategy` | TEXT | NOT NULL, CHECK IN (`viral_hook`, `storytelling`, `actionable_value`) | |
| `template` | TEXT | NOT NULL, CHECK IN (`template_1`, `template_2`, `template_3`) | |
| `slides_json` | TEXT | NOT NULL | JSON-serialized array of exactly 6 slide objects |
| `summary` | TEXT | nullable | AI-generated short summary |
| `created_at` | TEXT | NOT NULL | ISO-8601 timestamp |
| `updated_at` | TEXT | NOT NULL | ISO-8601 timestamp |

Indexed on `created_at DESC` for fast newest-first pagination.

When the API returns a carousel, `slides_json` is deserialized into `slides` (an array) and all column names are converted to camelCase (`source_type` → `sourceType`, etc.) — the frontend always receives the camelCase API shape shown in §3, never raw column names.

### Slide object shape

```json
{ "type": "hook" | "context" | "value" | "takeaway" | "cta", "heading": "string", "body": "string" }
```

The `slides` array is always length 6, always in this fixed type order: `hook`, `context`, `value`, `value`, `takeaway`, `cta`. `heading` is ≤160 characters, `body` is ≤1,000 characters.

---

## 5. Frontend Flow

### Generate carousel

1. Render a form: input (text/URL depending on a source-type selector), strategy picker (3 options), template picker (3 options).
2. On submit, show a loading state (see §7 — this can take several seconds).
3. Call `POST /api/generate`.
4. On `201`, render the returned carousel using the chosen `template` — slide `type` tells you which visual role each of the 6 slides plays.
5. On error, show the appropriate message per §6.
6. The generated carousel is now saved — no separate "save" call needed.

### View history

1. On the history page/tab, call `GET /api/history?page=1&limit=20` on load.
2. Render `data.items` as a list (e.g. title + strategy + template + created date).
3. Use `data.pagination` to drive "Load more" or page navigation.
4. On item click, either use the data already in the list item (it's the full carousel) or call `GET /api/history/:id` if you need a fresh fetch.
5. Provide a delete action calling `DELETE /api/history/:id`; on success, remove the item from local state (no need to refetch the whole list).

### Export carousel

**Not implemented in the backend MVP.** The API returns structured slide JSON only — no image rendering or export endpoint exists yet. Any "export as image" or "download" feature must be built entirely in the frontend (e.g. render the template to a canvas/DOM node and rasterize client-side), or is a future backend feature. Do not build UI that calls a `/api/export` endpoint — it does not exist.

### Other available features

There are no other endpoints. Specifically **not available** in this MVP: authentication/login, per-user history scoping, payments/billing, template editing, or regenerating a single slide within an existing carousel (regeneration means calling `/api/generate` again from scratch).

---

## 6. Validation & Error Handling

### Validation rules summary

| Field | Rule |
|---|---|
| `input` | Required string, 1–10,000 chars |
| `sourceType` | One of `topic`, `article`, `youtube` |
| `strategy` | One of `viral_hook`, `storytelling`, `actionable_value` |
| `template` | One of `template_1`, `template_2`, `template_3` |
| `page` (history) | Integer ≥ 1 |
| `limit` (history) | Integer 1–50 |
| `id` (path param) | Valid UUID |
| Article/YouTube `input` | Must be `http`/`https`; localhost and private-network hosts are rejected |

Requests with **unknown extra fields** are rejected — don't send anything beyond what's documented per endpoint.

### How the frontend should handle errors

1. Always check `response.data.success`. If `false`, read `error.code` to decide behavior — don't rely on `message` alone, since it's meant for humans and may change wording.
2. For `VALIDATION_ERROR` (`400`): highlight the offending field(s) using `error.details` (an array of Zod issues with `path` and `message`) if you want field-level messages; otherwise show a generic "check your input" message.
3. For `INVALID_URL` (`400`): tell the user the URL isn't usable — suggest checking the link is public and correctly formatted.
4. For `EXTRACTION_ERROR` (`502`): tell the user the source couldn't be read (e.g. "This video has no transcript available" or "We couldn't read that article") — this is not a bug, it's a property of the source content.
5. For `AI_OUTPUT_ERROR` / `AI_PROVIDER_ERROR` (`502`): show a generic "Generation failed, please try again" — these are retryable; a second attempt often succeeds since AI output varies per call.
6. For `NOT_FOUND` (`404`): on history detail/delete, treat as "this item no longer exists" — refresh the list.
7. For `INTERNAL_ERROR` (`500`) or any unexpected shape: show a generic error and avoid exposing raw error text to the user.
8. **Rate limiting**: the API allows 60 requests/minute per client. A `429` response from this layer does **not** use the standard envelope (it's produced by the rate-limiter directly) — handle `429` defensively (e.g. `if (response.status === 429)`) rather than only checking `error.code`.
9. Every response includes an `x-request-id` response header — log it alongside any error report to make backend debugging easier.

---

## 7. Development Notes

### Loading states

- `POST /api/generate` is the slowest call (network fetch/transcript + 2–3 sequential AI calls). Expect **2–10 seconds**. Show a distinct, reassuring loading state (e.g. "Reading your source...", "Writing your carousel...") rather than a bare spinner, since users may assume a hang.
- `POST /api/extract` is faster (single fetch, no AI) but still I/O-bound — show a lightweight loading indicator.
- `GET /api/history*` and `DELETE /api/history/:id` are fast local DB calls — a brief inline spinner is enough.

### Empty states

- History list with zero items: show a clear "No carousels yet — generate your first one" call-to-action, not a blank list.
- Don't render an empty slide array as a broken/empty carousel — this should never happen from `/api/generate` (always 6 slides), but guard defensively when reading from history in case of future data changes.

### Success messages

- Use the `message` field from the response envelope directly for toast/snackbar text where appropriate (e.g. "Carousel generated successfully.", "Carousel deleted successfully.") — it's already written for end users.

### Error messages

- Prefer mapping `error.code` to your own localized/branded copy (per §6) over displaying `message` raw, except as a fallback for unmapped codes.
- Never surface `error.details` (raw Zod issues) directly to end users — it's developer-facing; use it only to highlight fields, not as display text.

### Best practices

- Treat every carousel object (from `/api/generate` or any `/api/history*` endpoint) as having the identical shape — write one carousel-rendering component and reuse it everywhere.
- Don't assume `summary` is always non-empty — it's nullable in the schema; render conditionally.
- Cache/store the full carousel object from the history list rather than always re-fetching by ID on click — reduces redundant requests.
- Because generation has no idempotency key, a duplicate double-click on "Generate" will create two separate history entries — disable the submit button while the request is in flight.
- The backend does zero client-side rate limiting/debouncing — implement submit-button disabling and input debouncing in the frontend.
