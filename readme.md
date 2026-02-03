# ofolio

Single-owner, open-source portfolio with live-configurable content and "Background Packs".
Packs are uploaded as zip files and rendered behind the site in a sandboxed iframe (client-side only).

Primary hosting target: Vercel (recommended).
The Next.js app lives in `frontend/`.

## Vercel-first setup workflow (recommended)

This workflow is optimized for new users:
import -> deploy (expected failure) -> attach storage -> pull env -> set auth/public URL vars -> pull env again -> migrate -> redeploy.

### 1) Import the repo into Vercel

1. Create a new Vercel Project from this repo.
2. In **Project Settings -> General**, set **Root Directory** to `frontend`.
3. Click **Deploy**.

The first deploy is expected to fail until DB/Auth/Blob env vars exist.

### 2) Attach Postgres (Neon) and Blob to the project

1. In Vercel, open your project.
2. Go to **Storage**:
   - Add **Postgres** (Vercel Postgres / Neon-backed) to the project.
   - Add **Blob** to the project.

Vercel will populate Postgres env vars and Blob credentials for the project.

### 3) Pull env vars locally (after adding Postgres + Blob)

After storage is attached, pull env so you get DB + Blob variables locally:

```bash
npx vercel link
npx vercel env pull
```

This creates/updates a repo-root `.env.local`. Copy it to `frontend/.env.local` so Next.js picks it up:

```sh
# macOS / Linux
cp .env.local frontend/.env.local

# Windows (PowerShell)
Copy-Item .env.local frontend\\.env.local -Force
```

### 4) Configure admin auth (single-user GitHub login)

Admin routes (`/admin`) are protected by NextAuth and restricted to a single GitHub username.

Fast path (recommended): run the helper to write your local env file:

```bash
yarn setup:nextauth
```

The script prompts for your site URL and GitHub username, generates `NEXTAUTH_SECRET`, and updates both:
- `.env.local`
- `frontend/.env.local`

You still must create a GitHub OAuth App once to obtain `GITHUB_ID` and `GITHUB_SECRET`:

1. In GitHub: **Settings -> Developer settings -> OAuth Apps -> New OAuth App**
2. Set:
   - **Homepage URL** = your site URL including protocol (e.g. `https://your-project.vercel.app`)
   - **Authorization callback URL** = `https://your-project.vercel.app/api/auth/callback/github-vercel`
3. Copy **Client ID** into `GITHUB_ID`
4. Click **Generate a new client secret**, then copy it into `GITHUB_SECRET`

Notes:
- You do **not** need to run `yarn add next-auth`. `next-auth` is already a dependency of `frontend/`. Just run `yarn install`.
- This repo currently expects two GitHub credential pairs. For quickstart, set `GITHUB_ID_PERSONAL`=`GITHUB_ID` and `GITHUB_SECRET_PERSONAL`=`GITHUB_SECRET`.
- If GitHub shows "Url must be a valid URL", it usually means the URL is missing the `https://` prefix or includes quotes/spaces. A Vercel URL is valid even if the deployment currently shows an error page.
- Workaround if you are blocked: create the OAuth app using `http://localhost:3000` as both URLs, grab the Client ID/Secret, then edit the OAuth app later to your Vercel URL once your deployment is live.
- A failed deployment does not prevent you from using the Vercel URL for the OAuth app. GitHub just requires a syntactically valid URL (must start with `https://` or `http://`).

Push your local env vars to Vercel (recommended):

```bash
npx vercel link
yarn vercel:env:push
```

This pushes the auth/public URL env vars from `.env.local` (or `frontend/.env.local`) into your Vercel project (defaults to production).

### 5) Pull env again (after pushing auth/public URL vars)

After you push auth/public URL env vars, pull again so your local files match what Vercel has:

```bash
npx vercel env pull
```

Then copy it into the Next app folder:

```sh
# macOS / Linux
cp .env.local frontend/.env.local

# Windows (PowerShell)
Copy-Item .env.local frontend\\.env.local -Force
```

### 6) Initialize the database schema (Prisma)

The Prisma schema lives at `packages/database/prisma/schema.prisma`.
Once `DATABASE_URL` is present (from Vercel/Neon), run migrations locally against the provisioned database:

```bash
yarn install
yarn workspace database migrate:dev
```

Optional seed (creates example projects):

```bash
yarn workspace database seed
```

### 7) Redeploy

After storage + env vars + migrations are in place, redeploy from Vercel.

## What to do next (based on your current repo-root `.env.local`)

Your current repo-root `.env.local` already has DB/Blob variables, but the Next app reads env from `frontend/.env.local`.

1. Copy/move your repo-root `.env.local` to `frontend/.env.local`.
2. Run `yarn setup:nextauth` to update `frontend/.env.local`.
3. Run `yarn vercel:env:push` to push those auth/public URL vars into Vercel.
4. Pull env again into `frontend/.env.local`.
5. Run `yarn workspace database migrate:dev`.
6. Redeploy, then sign in at `/admin` with your GitHub user.

## Local development (after env is set)

```bash
yarn install
yarn dev
```

Default dev URL: `http://localhost:3000`.

## Environment variables (summary)

See `.env.example` for a complete list. Minimal required for a fully working deploy:
- `DATABASE_URL`
- `BLOB_READ_WRITE_TOKEN`
- `NEXTAUTH_URL`, `NEXTAUTH_URL_INTERNAL`, `NEXTAUTH_SECRET`
- `GITHUB_ID`, `GITHUB_SECRET`, `GITHUB_ID_PERSONAL`, `GITHUB_SECRET_PERSONAL`
- `ALLOWED_GITHUB_USERS`
- `NEXT_PUBLIC_BASE_URL`

Optional integrations (can be left unset):
- `OPENAI_API_KEY` (chatbot/TTS)
- `RESEND_API_KEY`, `CONTACT_EMAIL` (contact form)
- `CORS_ALLOWED_ORIGINS` (API CORS allowlist)

## Live-configurable vs code-only

Live-configurable (DB-backed, no redeploy):
- Background packs (upload, activate) and background config.
- About content, avatar/logo, site title/tagline.
- Feature toggles (background, chatbot, contact).

Code-only (build-time):
- Favicon and some static metadata/icon assets.
- OAuth app creation/provider wiring (credentials are always env-only).
