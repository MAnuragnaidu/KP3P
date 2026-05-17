# KP3P Admin

Next.js admin dashboard for patient records, assessments, **KP-3P care sheet generation** (Claude or Gemini), and optional Google Drive uploads. Uses Prisma and PostgreSQL.

Monorepo overview: [`../README.md`](../README.md).

## Prerequisites

- Node.js (LTS) and npm
- PostgreSQL (see [`prisma/schema.prisma`](prisma/schema.prisma))

## Setup

```bash
cd admin
cp .env.example .env
# Set POSTGRES_PRISMA_URL, POSTGRES_URL_NON_POOLING, and LLM keys (see below).

npm ci
npx prisma migrate deploy   # or `prisma migrate dev` locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See [`.env.example`](.env.example). Required for normal operation:

| Variable | Purpose |
|----------|---------|
| `POSTGRES_PRISMA_URL` | Pooled Postgres URL for the app |
| `POSTGRES_URL_NON_POOLING` | Direct URL for `prisma migrate` |
| `LLM_PROVIDER` | `claude` (default) or `gemini` |
| `ANTHROPIC_API_KEY` | Required when `LLM_PROVIDER=claude` |
| `GEMINI_API_KEY` | Required when `LLM_PROVIDER=gemini` |

Optional: `CLAUDE_MODEL`, `GEMINI_MODEL`, Google Drive OAuth fields (`GDRIVE_*`).

After changing env vars, restart `npm run dev`.

## Care sheet generation

- **UI:** Patient assessment → **Download KP-3P Care Sheet** (`src/components/CaresheetButton.tsx`).
- **API:** `POST /api/generate-caresheet` — streams HTML as **`text/plain`** (not JSON). Max duration 300s ([`vercel.json`](vercel.json)).
- **LLM:** [`src/lib/llm/`](src/lib/llm/) — `claudeProvider.ts` / `geminiProvider.ts`, selected in [`index.ts`](src/lib/llm/index.ts).
- **Guidelines:** `medical-doc/IBD_Clinical_Rulebook_Final2.pdf` (text cached to `IBD_Clinical_Rulebook_Final2.txt` on first use; `.txt` is gitignored).

| Provider | Default model |
|----------|---------------|
| Claude | `claude-sonnet-4-6` |
| Gemini | `gemini-2.5-flash` |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (`next dev --webpack`) |
| `npm run build` | `prisma generate` + `next build` |
| `npm run start` | Production server |
| `npm run lint` | ESLint |
| `npm run test:llm` | Smoke test active LLM provider |
| `npm run seed:rulebook-text` | Extract rulebook PDF → `.txt` cache |
| `npm run count:llm-tokens` | Estimate prompt token size for a sample patient |

Legacy/script-only: `test:openrouter`, `test:generate-care-sheet`, `seed:care-sheet-prompt`.

## Deploy on Vercel

1. Set the project **Root Directory** to `admin` (not the monorepo root).
2. Add env vars from `.env.example` in the Vercel dashboard.
3. Build uses [`vercel.json`](vercel.json): `seed:rulebook-text`, `prisma generate`, `next build`.

## Project layout (high level)

| Path | Role |
|------|------|
| `src/app/admin/` | Admin UI (patients, assessments) |
| `src/app/api/generate-caresheet/` | Streaming care sheet API |
| `src/lib/llm/` | LLM provider abstraction |
| `src/lib/load-ibd-rulebook.ts` | PDF / cached text for guidelines |
| `src/lib/kp3p-prompt.ts` | Patient prompt builder |
| `medical-doc/` | IBD clinical rulebook PDF |
| `prisma/` | Schema and migrations |

## Local documentation

Agent notes, prompt exports, and extended care-sheet notes live under **`../medical-lit/admin/`** (gitignored; not required to run the app).
