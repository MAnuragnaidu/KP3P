# KP3P

Monorepo for the **KP3P** system: an **admin** dashboard (Next.js, Prisma, PostgreSQL) and a **patient intake** web app (Next.js) that talks to the admin APIs.

## Clone

```bash
git clone https://github.com/gopi-mygastroai/KP3P.git
cd KP3P
```

## Repository layout

| Directory | Description |
|-----------|-------------|
| [`admin/`](admin/) | Admin app — authentication, patients, assessments, **KP-3P care sheet generation** (Claude or Gemini via `src/lib/llm`), optional Google Drive uploads. Default dev URL: [http://localhost:3000](http://localhost:3000). See [`admin/README.md`](admin/README.md). |
| [`Patient-intake-form/`](Patient-intake-form/) | Patient-facing intake flow. Default dev URL: [http://localhost:3001](http://localhost:3001). See [`Patient-intake-form/README.md`](Patient-intake-form/README.md). |
| `medical-lit/` | **Local only** (gitignored) — agent notes, prompt exports, and other docs not needed to build or run the apps. |

## Prerequisites

- **Node.js** (LTS recommended) and **npm**
- **PostgreSQL** database for the admin app (see Prisma `datasource` in [`admin/prisma/schema.prisma`](admin/prisma/schema.prisma))

## Quick start

### 1. Admin (`admin/`)

```bash
cd admin
cp .env.example .env
# Edit .env: POSTGRES_PRISMA_URL, POSTGRES_URL_NON_POOLING, LLM keys, etc.

npm ci
npx prisma migrate deploy   # or `prisma migrate dev` in development
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 2. Patient intake (`Patient-intake-form/`)

```bash
cd Patient-intake-form
cp .env.example .env.local
# NEXT_PUBLIC_API_URL → running admin app (default: http://localhost:3000)

npm ci
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

Run the **admin** app first so intake API calls (`/api/patients`, `/api/drive/upload`, etc.) resolve.

## Environment variables

Details and comments live in each app’s template files:

- **Admin:** [`admin/.env.example`](admin/.env.example) — database URLs, **LLM provider** (`LLM_PROVIDER`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`), optional Google Drive OAuth, script-only keys.
- **Intake:** [`Patient-intake-form/.env.example`](Patient-intake-form/.env.example) — `NEXT_PUBLIC_API_URL`.

Never commit real `.env` or `.env.local` files; only the `*.example` templates belong in Git.

### LLM provider (care sheet generation)

Configure in `admin/.env` or `admin/.env.local`:

```env
# claude (default) | gemini
LLM_PROVIDER=claude

ANTHROPIC_API_KEY=your_anthropic_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

| Provider | Default model | Implementation |
|----------|---------------|----------------|
| Claude | `claude-sonnet-4-6` | [`admin/src/lib/llm/claudeProvider.ts`](admin/src/lib/llm/claudeProvider.ts) |
| Gemini | `gemini-2.5-flash` | [`admin/src/lib/llm/geminiProvider.ts`](admin/src/lib/llm/geminiProvider.ts) |

Selection and lazy env validation: [`admin/src/lib/llm/index.ts`](admin/src/lib/llm/index.ts). The route [`admin/src/app/api/generate-caresheet/route.ts`](admin/src/app/api/generate-caresheet/route.ts) streams HTML as **`text/plain`** via `generateCarePlan()` (chunked response for long generations on Vercel).

After changing `LLM_PROVIDER` or keys, **restart** `npm run dev`.

## Scripts (admin)

From `admin/`:

| Command | Purpose |
|---------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build (`prisma generate` + `next build`) |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run test:llm` | Smoke test active LLM provider |
| `npm run seed:rulebook-text` | Extract IBD rulebook PDF to cached `.txt` |
| `npm run count:llm-tokens` | Estimate care-sheet prompt size |

See [`admin/package.json`](admin/package.json) for additional script entries (OpenRouter / legacy test utilities).

## Deploy on Vercel

| App | Root Directory | Notes |
|-----|----------------|-------|
| Admin | `admin` | Set all env vars from `admin/.env.example`. Build runs `seed:rulebook-text` per [`admin/vercel.json`](admin/vercel.json). Care sheet API `maxDuration` = 300s. |
| Patient intake | `Patient-intake-form` | Set `NEXT_PUBLIC_API_URL` to production admin URL. |

## Tech stack

- [Next.js](https://nextjs.org/) (App Router), React, TypeScript (intake) / mixed TS+JS (admin)
- [Prisma](https://www.prisma.io/) + PostgreSQL (admin)
- **LLM (care sheets):** Anthropic Claude and/or Google Gemini via [`admin/src/lib/llm/`](admin/src/lib/llm/)
- IBD guidelines: `admin/medical-doc/IBD_Clinical_Rulebook_Final2.pdf`
- Optional: Google Drive API (admin)

## Contributing

1. Create a branch for your change.
2. Keep secrets out of commits; use `.env.example` for new configuration knobs.
3. Run lint/build in the app(s) you touch before opening a pull request.
4. Only **`README.md`** files are tracked for Markdown; put non-essential docs in `medical-lit/` locally.

## License

Specify your license here (e.g. MIT, proprietary). Until a `LICENSE` file is added, all rights are reserved unless stated otherwise.
