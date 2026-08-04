# HookSlides AI Backend MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an independent Express/SQLite backend that extracts supported content, generates exactly six validated carousel slides, stores anonymous history, and exposes the approved REST API.

**Architecture:** Layered backend under `/server`: routes perform HTTP wiring, controllers translate requests, services own business logic, providers isolate AI/extraction integrations, and repositories isolate SQLite. Generation is synchronous, uses Groq first with OpenAI fallback, and persists only after fixed-schema validation succeeds.

**Tech Stack:** Node.js, Express.js, SQLite, `better-sqlite3`, Groq API, OpenAI API, Mozilla Readability, JSDOM, YouTube transcript API, Helmet, CORS, rate limiting, dotenv, Zod, Pino.

## Global Constraints

- Backend lives under `/server`; do not modify frontend files.
- Use async/await in application services and controllers.
- Support only `topic`, `article`, and `youtube` source types.
- Support only `viral_hook`, `storytelling`, and `actionable_value` strategies.
- Support only `template_1`, `template_2`, and `template_3`.
- Every carousel contains exactly six ordered slides: `hook`, `context`, `value`, `value`, `takeaway`, `cta`.
- Generation is synchronous.
- Groq is primary; OpenAI is fallback only after Groq provider failure.
- YouTube content must come from a transcript API; never scrape YouTube HTML.
- History is anonymous; no authentication or `user_id` in the MVP.
- Do not implement payments, background jobs, editable layouts, or export rendering.
- Validate all external input and bound input lengths before provider/database work.
- Never expose provider, database, stack, API-key, or raw upstream error details.
- Do not log API keys or full submitted content.
- Environment variables: `GROQ_API_KEY`, `OPENAI_API_KEY`, `GROQ_MODEL`, `DATABASE_PATH`, `PORT`.

---

## File Map

Create:

```text
server/
  app.js
  server.js
  package.json
  .env.example
  config/env.js
  config/logger.js
  constants/errors.js
  constants/values.js
  controllers/extractionController.js
  controllers/generationController.js
  controllers/historyController.js
  database/connection.js
  database/migrate.js
  database/migrations/001_create_carousels.sql
  models/carousel.js
  middleware/errorHandler.js
  middleware/notFound.js
  middleware/requestId.js
  middleware/validate.js
  prompts/generateCarouselPrompt.js
  prompts/summarizePrompt.js
  routes/extractionRoutes.js
  routes/generationRoutes.js
  routes/historyRoutes.js
  services/ai/aiService.js
  services/ai/groqProvider.js
  services/ai/openaiProvider.js
  services/extraction/articleExtractor.js
  services/extraction/contentService.js
  services/extraction/youtubeTranscriptExtractor.js
  services/generation/generationService.js
  services/history/historyRepository.js
  utils/apiResponse.js
  utils/content.js
  utils/ids.js
  utils/url.js
  validators/carousel.js
  validators/requests.js
  tests/carouselValidator.test.js
  tests/apiResponse.test.js
  tests/historyRepository.test.js
```

The implementation may add a narrowly-scoped adapter file if the selected transcript package requires it, but must not add a new abstraction layer without a concrete provider boundary.

---

### Task 1: Bootstrap server package and environment configuration

**Files:**
- Create: `server/package.json`
- Create: `server/.env.example`
- Create: `server/config/env.js`
- Create: `server/config/logger.js`
- Create: `server/utils/ids.js`

**Interfaces:**
- Produces `env` object with `port`, `databasePath`, `groqApiKey`, `openaiApiKey`, and `groqModel`.
- Produces `createId()` returning a UUID string.
- Produces `logger` with `info`, `warn`, `error`, and `debug` methods.

- [ ] **Step 1: Create the package manifest and scripts**

Add runtime dependencies for Express, SQLite, dotenv, Helmet, CORS, rate limiting, Zod, Pino, Readability/JSDOM, OpenAI, and the YouTube transcript client. Add scripts:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js",
    "migrate": "node database/migrate.js",
    "test": "node --test"
  }
}
```

Set the package type to `module`. Keep dependencies limited to the approved stack and one transcript API client.

- [ ] **Step 2: Add environment example and strict config loader**

`server/.env.example` must contain every required variable with safe development examples, never real secrets:

```dotenv
PORT=3000
DATABASE_PATH=./data/hookslides.sqlite
GROQ_API_KEY=
OPENAI_API_KEY=
GROQ_MODEL=llama-3.3-70b-versatile
```

`config/env.js` loads dotenv and validates `PORT`, `DATABASE_PATH`, `GROQ_MODEL`, and optional provider keys. Fail at startup only when neither provider key exists; permit `OPENAI_API_KEY` to be empty when Groq is configured and vice versa.

- [ ] **Step 3: Add UUID and structured logger utilities**

Use Node's built-in `crypto.randomUUID()` in `utils/ids.js`. Configure Pino in `config/logger.js`; default to `info`, write structured fields, and omit request bodies and secrets.

- [ ] **Step 4: Run the bootstrap check**

Run: `cd server && npm install && node -e "import('./config/env.js').then(() => console.log('config ok'))"`

Expected: dependency installation succeeds; config check succeeds when a local `.env` contains a provider key, or fails with a clear missing-provider message otherwise.

- [ ] **Step 5: Commit**

```bash
git add server/package.json server/.env.example server/config server/utils/ids.js
git commit -m "chore: bootstrap backend configuration"
```

If Git metadata is unavailable, record the same boundary as a checkpoint without fabricating a commit.

---

### Task 2: Add SQLite connection, migration, model, and repository

**Files:**
- Create: `server/database/connection.js`
- Create: `server/database/migrate.js`
- Create: `server/database/migrations/001_create_carousels.sql`
- Create: `server/models/carousel.js`
- Create: `server/services/history/historyRepository.js`
- Test: `server/tests/historyRepository.test.js`

**Interfaces:**
- `createDatabase(databasePath)` returns a configured SQLite database with foreign keys enabled.
- `runMigrations(database)` applies migrations once.
- `createCarousel(record)` inserts a record.
- `listCarousels({page, limit})` returns `{items, total}`.
- `findCarouselById(id)` returns a parsed carousel or `null`.
- `deleteCarousel(id)` returns a boolean.

- [ ] **Step 1: Write the failing repository test**

Use a temporary SQLite file. Assert that insertion preserves six slides as JSON, retrieval parses slides, listing returns newest-first records and total count, deletion returns `true` once and `false` thereafter, and an invalid enum cannot be inserted.

```js
const record = {
  id: 'test-id', title: 'Title', sourceType: 'topic', originalInput: 'input',
  extractedContent: null, strategy: 'viral_hook', template: 'template_1',
  summary: 'Summary', slides: validSlides,
  createdAt: '2026-08-04T00:00:00.000Z', updatedAt: '2026-08-04T00:00:00.000Z'
};
const created = repository.createCarousel(record);
assert.equal(repository.findCarouselById(created.id).slides.length, 6);
```

- [ ] **Step 2: Run the test to verify failure**

Run: `cd server && node --test tests/historyRepository.test.js`

Expected: FAIL because the database and repository do not exist.

- [ ] **Step 3: Create the schema and connection**

Create `carousels` with the approved columns and `CHECK` constraints for source type, strategy, and template. Add `created_at DESC` index. Configure SQLite pragmas and ensure the database directory exists.

- [ ] **Step 4: Implement migration runner and repository**

Keep SQL in the migration file. Repository maps snake_case columns to camelCase model objects, serializes `slides` on insert, parses `slides_json` on read, uses parameterized statements, and implements offset pagination.

- [ ] **Step 5: Run the test to verify success**

Run: `cd server && node --test tests/historyRepository.test.js`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add server/database server/models server/services/history server/tests/historyRepository.test.js
git commit -m "feat: add sqlite carousel history"
```

---

### Task 3: Implement fixed carousel contract and request validation

**Files:**
- Create: `server/constants/values.js`
- Create: `server/validators/carousel.js`
- Create: `server/validators/requests.js`
- Create: `server/utils/content.js`
- Test: `server/tests/carouselValidator.test.js`

**Interfaces:**
- `validateCarousel(value)` returns `{success, data, error}`.
- `normalizeContent(text)` returns bounded normalized text.
- Request schemas: `generateRequestSchema`, `extractRequestSchema`, `historyQuerySchema`, and `idParamSchema`.
- Constants export `SOURCE_TYPES`, `STRATEGIES`, `TEMPLATES`, `SLIDE_TYPES`, `SLIDE_COUNT`.

- [ ] **Step 1: Write failing contract tests**

Test acceptance of exactly six ordered slides, rejection of five/seven slides, rejection of wrong slide order, rejection of unknown strategy/template/source type, and trimming/whitespace normalization.

```js
assert.equal(validateCarousel({ ...validCarousel, slides: validSlides }).success, true);
assert.equal(validateCarousel({ ...validCarousel, slides: validSlides.slice(0, 5) }).success, false);
assert.equal(validateCarousel({ ...validCarousel, slides: [validSlides[1], ...validSlides.slice(1)] }).success, false);
```

- [ ] **Step 2: Run the test to verify failure**

Run: `cd server && node --test tests/carouselValidator.test.js`

Expected: FAIL because the validator is missing.

- [ ] **Step 3: Implement constants, content normalization, and Zod schemas**

Define the exact six slide types and enforce each slide's nonempty bounded `heading` and `body`. Set concrete limits: input 10,000 characters; extracted content 50,000; heading 160; body 1,000; summary 2,000. URL schemas must accept only `http` and `https` URLs. Reject unknown request keys with Zod strict objects.

- [ ] **Step 4: Run the test to verify success**

Run: `cd server && node --test tests/carouselValidator.test.js`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add server/constants server/validators server/utils/content.js server/tests/carouselValidator.test.js
git commit -m "feat: validate fixed carousel contract"
```

---

### Task 4: Add security middleware, response helpers, and centralized errors

**Files:**
- Create: `server/constants/errors.js`
- Create: `server/utils/apiResponse.js`
- Create: `server/middleware/requestId.js`
- Create: `server/middleware/errorHandler.js`
- Create: `server/middleware/notFound.js`
- Create: `server/middleware/validate.js`
- Create: `server/app.js`
- Create: `server/server.js`
- Test: `server/tests/apiResponse.test.js`

**Interfaces:**
- `successResponse(res, status, message, data)` sends the approved envelope.
- `errorResponse(res, status, message, code, details)` sends the approved error envelope.
- `createApp({database, services})` returns an Express app.
- `validate(schema, source)` returns Express middleware.
- `AppError` carries public `status`, `code`, and optional `details`.

- [ ] **Step 1: Write failing response-helper tests**

Assert success and error envelopes have exactly the expected top-level fields and status codes. Assert internal errors become a generic `INTERNAL_ERROR` response without stack details.

- [ ] **Step 2: Run the test to verify failure**

Run: `cd server && node --test tests/apiResponse.test.js`

Expected: FAIL because response helpers and app middleware do not exist.

- [ ] **Step 3: Implement middleware and app factory**

Apply Helmet, CORS, JSON body parsing with a bounded payload, rate limiting, request IDs, not-found handling, and centralized error handling. Categorize logs using error codes. Map validation to 400, not found to 404, oversized payload to 413, rate limit to 429, provider/extraction failures to 502, and unknown errors to 500.

Mount route modules at `/api`; route modules are added in later tasks. Keep `server.js` responsible only for loading config, migrating, creating the app, and listening.

- [ ] **Step 4: Run response and startup checks**

Run: `cd server && node --test tests/apiResponse.test.js && npm run migrate`

Expected: PASS; migration creates the configured database.

- [ ] **Step 5: Commit**

```bash
git add server/constants/errors.js server/utils/apiResponse.js server/middleware server/app.js server/server.js server/tests/apiResponse.test.js
git commit -m "feat: add api security and error handling"
```

---

### Task 5: Implement article and YouTube extraction adapters

**Files:**
- Create: `server/services/extraction/articleExtractor.js`
- Create: `server/services/extraction/youtubeTranscriptExtractor.js`
- Create: `server/services/extraction/contentService.js`
- Create: `server/utils/url.js`

**Interfaces:**
- `extractArticle(url)` returns `{sourceType: 'article', title, content, author, publishedAt}`.
- `extractYouTubeTranscript(url)` returns `{sourceType: 'youtube', title, content}`.
- `extractContent({sourceType, input})` dispatches to topic/article/YouTube and returns normalized content.
- `isAllowedRemoteUrl(url)` rejects non-HTTP(S), localhost, loopback, link-local, and private-network destinations.

- [ ] **Step 1: Write focused adapter tests with injected fetch/client seams**

Test article extraction against a local fixture HTML string containing title, author, date, and readable body; assert navigation text is removed. Test malformed/empty article failure. Test YouTube ID parsing for watch, short, and embed URLs and transcript failure. Test topic input returns the original normalized text without network calls.

- [ ] **Step 2: Run tests to verify failure**

Run: `cd server && node --test tests/extraction*.test.js`

Expected: FAIL because adapters are missing.

- [ ] **Step 3: Implement URL validation and article extraction**

Use `URL`, `fetch`, JSDOM, and Mozilla Readability. Enforce remote URL restrictions before fetching, set an explicit timeout with `AbortController`, reject non-success responses, bound response size, and normalize extracted text. Do not scrape unsupported pages through browser automation.

- [ ] **Step 4: Implement transcript extraction**

Parse only recognized YouTube URL forms. Pass the video ID to the selected transcript API client. Convert transcript segments to bounded plain text. Do not issue HTML requests to YouTube.

- [ ] **Step 5: Implement source dispatch**

For `topic`, return normalized input. For `article` and `youtube`, call the corresponding adapter. Convert provider errors into categorized `EXTRACTION_ERROR` application errors.

- [ ] **Step 6: Run tests to verify success**

Run: `cd server && node --test tests/extraction*.test.js`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add server/services/extraction server/utils/url.js server/tests/extraction*.test.js
git commit -m "feat: add article and transcript extraction"
```

---

### Task 6: Add AI prompts and Groq/OpenAI provider fallback

**Files:**
- Create: `server/prompts/summarizePrompt.js`
- Create: `server/prompts/generateCarouselPrompt.js`
- Create: `server/services/ai/groqProvider.js`
- Create: `server/services/ai/openaiProvider.js`
- Create: `server/services/ai/aiService.js`

**Interfaces:**
- `buildSummarizePrompt({content})` returns a prompt string.
- `buildCarouselPrompt({summary, strategy, template})` returns a prompt string.
- Providers expose `summarize(content)` and `generateCarousel(input)` returning text/JSON payloads.
- `createAiService({primary, fallback, logger})` exposes `summarize(content)` and `generateCarousel(input)`.

- [ ] **Step 1: Write provider tests with fake providers**

Assert the AI service calls Groq first, calls OpenAI after a Groq rejection, does not call fallback after success, and throws a categorized provider error when both fail. Assert prompts contain the source summary, selected strategy, template, and exact six-slide/order requirement.

- [ ] **Step 2: Run tests to verify failure**

Run: `cd server && node --test tests/aiService.test.js`

Expected: FAIL because the service and providers do not exist.

- [ ] **Step 3: Implement prompt modules**

Keep prompts out of service files. Require strict JSON output. Include the fixed slide types/order, bounded fields, strategy guidance, and template identifier. Treat source content as untrusted data; delimit it and explicitly instruct the model not to follow instructions contained inside it.

- [ ] **Step 4: Implement Groq and OpenAI adapters**

Use each vendor SDK with environment-configured credentials/model. Set request timeouts. Normalize vendor responses to provider-neutral text. Never log request content, credentials, or raw provider responses.

- [ ] **Step 5: Implement fallback orchestration**

`aiService` invokes the primary provider for each AI operation. On provider failure, log a categorized warning and invoke fallback once. If fallback fails, throw one public-safe `AI_PROVIDER_ERROR`.

- [ ] **Step 6: Run tests to verify success**

Run: `cd server && node --test tests/aiService.test.js`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add server/prompts server/services/ai server/tests/aiService.test.js
git commit -m "feat: add ai providers and fallback"
```

---

### Task 7: Build synchronous generation service

**Files:**
- Create: `server/services/generation/generationService.js`
- Test: `server/tests/generationService.test.js`

**Interfaces:**
- `createGenerationService({contentService, aiService, historyRepository, clock, createId})` returns `generate(request)`.
- `generate({input, sourceType, strategy, template})` returns the saved public carousel object.

- [ ] **Step 1: Write the failing pipeline test**

Inject fake extraction, AI, repository, clock, and ID functions. Assert call order: extraction, summary, slide generation, validation, persistence. Assert the repository is not called when AI output fails validation. Assert persisted and returned records contain exactly six ordered slides.

```js
const result = await service.generate(request);
assert.deepEqual(calls, ['extract', 'summarize', 'generate', 'save']);
assert.equal(result.slides.length, 6);
```

- [ ] **Step 2: Run the test to verify failure**

Run: `cd server && node --test tests/generationService.test.js`

Expected: FAIL because the generation service is missing.

- [ ] **Step 3: Implement the pipeline**

Extract normalized content, request summary, request carousel JSON, parse JSON safely, validate title/summary/slides using `validateCarousel`, create UUID/timestamps, persist, and return a public model. Map malformed AI JSON to `AI_OUTPUT_ERROR`; never persist invalid output.

- [ ] **Step 4: Run the test to verify success**

Run: `cd server && node --test tests/generationService.test.js`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add server/services/generation server/tests/generationService.test.js
git commit -m "feat: add carousel generation pipeline"
```

---

### Task 8: Add controllers and REST routes

**Files:**
- Create: `server/controllers/generationController.js`
- Create: `server/controllers/extractionController.js`
- Create: `server/controllers/historyController.js`
- Create: `server/routes/generationRoutes.js`
- Create: `server/routes/extractionRoutes.js`
- Create: `server/routes/historyRoutes.js`
- Modify: `server/app.js`

**Interfaces:**
- `POST /api/generate` returns `201` and saved carousel.
- `POST /api/extract` returns `200` and extracted content.
- `GET /api/history` returns `{items, pagination}`.
- `GET /api/history/:id` returns one carousel or `404`.
- `DELETE /api/history/:id` returns `200` or `404`.

- [ ] **Step 1: Write route integration tests**

Use an app factory with fake services. Assert valid generate/extract requests reach services, invalid bodies return 400 without service calls, history pagination is passed as numbers, missing IDs return 404, and every response uses the approved envelope.

- [ ] **Step 2: Run tests to verify failure**

Run: `cd server && node --test tests/routes*.test.js`

Expected: FAIL because controllers/routes are missing.

- [ ] **Step 3: Implement controllers**

Controllers read validated `req.body`, `req.params`, and `req.query`; call injected services; use response helpers; and pass errors to Express. No extraction, AI, or SQL logic belongs in controllers.

- [ ] **Step 4: Implement routes and mount them**

Add strict validation middleware to each endpoint. Mount `/generate`, `/extract`, and `/history` beneath `/api`. Keep DELETE idempotency out of the controller by returning 404 when the repository reports no record.

- [ ] **Step 5: Run integration tests to verify success**

Run: `cd server && node --test tests/routes*.test.js`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add server/controllers server/routes server/app.js server/tests/routes*.test.js
git commit -m "feat: expose generation extraction and history api"
```

---

### Task 9: Wire production dependencies and add end-to-end smoke check

**Files:**
- Modify: `server/app.js`
- Modify: `server/server.js`
- Create: `server/tests/smoke.test.js`
- Modify: `server/README.md`

**Interfaces:**
- App startup constructs the database, runs migrations, creates provider adapters, creates services, and mounts controllers without embedding business logic in startup code.
- README documents setup, environment variables, migration, start, test, endpoint examples, and explicit MVP exclusions.

- [ ] **Step 1: Write the smoke test**

Use a temporary database and fake AI/extraction clients. Start the app on an ephemeral port, POST a topic generation request, GET its history, GET the generated ID, then DELETE it. Assert statuses `201`, `200`, `200`, and `200`, plus six returned slides.

- [ ] **Step 2: Run the smoke test to verify failure**

Run: `cd server && node --test tests/smoke.test.js`

Expected: FAIL until real dependency wiring and app construction are complete.

- [ ] **Step 3: Wire dependencies**

Create concrete repositories/providers once at startup and inject them into services/controllers. Run migrations before listening. Ensure app tests can still inject fakes without network access.

- [ ] **Step 4: Add README and safe operational defaults**

Document:

```bash
cd server
cp .env.example .env
npm install
npm run migrate
npm test
npm start
```

Document that provider keys are required for generation, article/YouTube extraction requires network access, history is anonymous, and frontend/export/payment/auth are not implemented.

- [ ] **Step 5: Run the full verification suite**

Run:

```bash
cd server
npm test
npm run migrate
node --check app.js
node --check server.js
```

Expected: all tests pass, migration exits successfully, syntax checks pass.

- [ ] **Step 6: Commit**

```bash
git add server
 git commit -m "feat: complete hookslides backend mvp"
```

If Git metadata remains unavailable, report the skipped commit plainly.

---

## Final Verification Checklist

- [ ] `POST /api/generate` validates input and returns exactly six ordered slides.
- [ ] Groq is attempted first; OpenAI fallback occurs only after provider failure.
- [ ] Article extraction uses Readability/JSDOM and bounded HTTP fetching.
- [ ] YouTube extraction uses transcript API only.
- [ ] Invalid AI JSON is rejected and never persisted.
- [ ] SQLite history survives process restart.
- [ ] Pagination is newest-first and capped at 50.
- [ ] Error envelopes never expose internal details.
- [ ] Helmet, CORS, rate limiting, request IDs, and payload limits are active.
- [ ] No frontend files changed.
- [ ] No auth, payments, jobs, editor, or export renderer added.
