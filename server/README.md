# HookSlides AI server

## Setup

```bash
cd server
cp .env.example .env
npm install
npm run migrate
npm test
npm start
```

Set at least one of `GROQ_API_KEY` or `OPENAI_API_KEY`. Groq is primary when configured; OpenAI is fallback. `DATABASE_PATH` defaults to `./data/hookslides.sqlite`.

## Endpoints

- `POST /api/generate` — `{ input, sourceType, strategy, template }`
- `POST /api/extract` — `{ input, sourceType }`
- `GET /api/history?page=1&limit=20`
- `GET /api/history/:id`
- `DELETE /api/history/:id`
- `GET /health`

Supported source types: `topic`, `article`, `youtube`. YouTube uses a transcript API. Supported strategies: `viral_hook`, `storytelling`, `actionable_value`. Templates: `template_1`, `template_2`, `template_3`.

History is anonymous. Authentication, payments, background jobs, editable layouts, and export rendering are outside this MVP.
