# KP3P Patient intake

Patient-facing Next.js app for the KP3P intake flow. Submits data to the **admin** app APIs; does not host its own database or LLM logic.

Monorepo overview: [`../README.md`](../README.md). Admin setup: [`../admin/README.md`](../admin/README.md).

## Prerequisites

- Node.js (LTS) and npm
- **Admin app running** at the URL you configure (default [http://localhost:3000](http://localhost:3000))

## Setup

```bash
cd Patient-intake-form
cp .env.example .env.local
# NEXT_PUBLIC_API_URL must point at the admin app.

npm ci
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) (dev server uses port **3001**).

## Environment variables

See [`.env.example`](.env.example).

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_API_URL` | Base URL of the admin app (e.g. `http://localhost:3000`) |

Intake calls admin endpoints such as `POST ${NEXT_PUBLIC_API_URL}/api/patients` and drive upload routes when configured on the admin side.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server on port 3001 |
| `npm run build` | Production build |
| `npm run start` | Production server |

## Deploy on Vercel

Deploy as a separate Vercel project with **Root Directory** `Patient-intake-form`. Set `NEXT_PUBLIC_API_URL` to your production admin URL.

## Project layout (high level)

| Path | Role |
|------|------|
| `src/app/` | Intake pages and routes |
| `src/app/form/` | Main intake form (posts to admin API) |

## Local documentation

Agent notes and scratch files for this app are under **`../medical-lit/Patient-intake-form/`** (gitignored; not required to run the app).
