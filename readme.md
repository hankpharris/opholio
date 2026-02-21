# Opholio

Opholio is an open source portfolio platform built to serve as a strong but flexible base for development enthusiasts and prgramming noobs alike. It makes use of dynamic page and content generation from stuctured database input as well as generous cloud hosting policies to enable a simplified onboarding and usage experience requiring zero coding knowledge or cost overhead. Furthermore it supports dynamic code execution from background "packs" as well as sporting a flexible AGPL-3.0 license to support aesthetic and functional development from intermediate and seasoned developers. 

SPDX-License-Identifier: AGPL-3.0-only
Copyright (C) 2026 Henry Pharris

## Setup workflow (recommended)

This program has been configured with a simplified deployment in mind, its been built with "serverless" cloud host Vercel in mind. You'll need accounts on github and vercel, both of which are free with functionality far beyond the scope of this project.
Both **yarn** and **npm** are supported. The examples below show both variants; pick whichever you prefer.

### 1) Import the repo into Vercel

1. Create a new Vercel Project from this repo.
2. In **Project Settings -> General**, set **Root Directory** to `frontend`.
3. Click **Deploy**.

The first deploy is expected to fail until DB/Auth/Blob env vars exist.

### 2) Attach Postgres (Neon) and Blob to the project

1. In Vercel, open your project.
2. Go to **Storage**:
   - Add **PostgreSQL via Neon**  to the project.
   - Add **Blob Storage** to the project.

Vercel will populate Postgres env vars and Blob credentials for the project.

### 3) Pull env vars locally (after adding Postgres + Blob)

After storage is attached, pull env so you get DB + Blob variables locally:

```bash
npx vercel link
npx vercel env pull
```

This creates/updates a repo-root `.env.local`. Next.js is configured to load env vars from this root file automatically.

### 4) Configure admin auth (single-user GitHub login)

Admin routes (`/admin`) are protected by NextAuth and restricted to a single GitHub username.

Fast path (recommended): run the helper to write your local env file:

```bash
# yarn
yarn setup:nextauth

# npm
npm run setup:nextauth
```

The script prompts for your site URL and GitHub username, generates `NEXTAUTH_SECRET`, and updates:
- `.env.local` (repo root)

You must create a GitHub OAuth App once to obtain `GITHUB_ID` and `GITHUB_SECRET`:

1. In GitHub: **Settings -> Developer settings (ottom most option, easy to miss) -> OAuth Apps -> New OAuth App**
2. Set:
   - **Homepage URL** = your site URL including protocol (e.g. `https://your-project.vercel.app`), if posting directly from vercel youll need to manually append "https://"
   - **Authorization callback URL** = `https://your-project.vercel.app`
3. Copy **Client ID** into `GITHUB_ID`
4. Click **Generate a new client secret**, then copy it into `GITHUB_SECRET`

Notes:
- Workaround if you are blocked or deployment fails: create the OAuth app using `http://localhost:3000` as both URLs, grab the Client ID/Secret, then edit the OAuth app later to your Vercel URL once your deployment is live. Once your site is live on main, make sure to update these urls.


Push your local env vars to Vercel:

Input manually by dragging your .env from your file explorer to Vercel's input in Repo>Settings>Environment Variables

or use:

```bash
# yarn
yarn vercel:env:push

# npm
npm run vercel:env:push
```
This pushes auth, public URL, and optional add-on vars (e.g. `OPENAI_API_KEY`) from `.env.local` into your Vercel project (defaults to all environments: production, preview, and development).

### 5) Pull env again (after pushing auth/public URL vars)

After you push auth/public URL env vars, pull again so your local files match what Vercel has. This isn't strictly necessary but ensures your local version matches. Helpful for debugging or local development.:

```bash
npx vercel env pull
```

### 6) Initialize the database schema (Prisma)

The Prisma schema lives at `packages/database/prisma/schema.prisma`.
Once `DATABASE_URL` is present (from Vercel/Neon), run migrations locally against the provisioned database:

```bash
# yarn
yarn install
yarn workspace database migrate:dev

# npm
npm install
npm run -w database migrate:dev
```


### 7) Redeploy

After storage + env vars + migrations are in place, redeploy from Vercel and visit your admin page by apedning your base url with /admin. From here you can login and create your site content!

## What to do next (based on your current repo-root `.env.local`)


## Local development (after env is set)

```bash
# yarn
yarn install
yarn dev

# npm
npm install
npm run dev
```

Default dev URL: `http://localhost:3000`.

## Environment variables (summary)

See `.env.example` for a complete list. Minimal required for a fully working deploy:
- `DATABASE_URL`
- `BLOB_READ_WRITE_TOKEN`
- `NEXTAUTH_URL`, `NEXTAUTH_URL_INTERNAL`, `NEXTAUTH_SECRET`
- `GITHUB_ID`, `GITHUB_SECRET`
- `ALLOWED_GITHUB_USERS`
- `NEXT_PUBLIC_BASE_URL`

Optional integrations (can be left unset):
- `OPENAI_API_KEY` (chatbot/TTS)
- `RESEND_API_KEY`, `CONTACT_EMAIL` (contact form)
- `CORS_ALLOWED_ORIGINS` (API CORS allowlist)

## Add-Ons

Optional features that extend the portfolio with additional capabilities.

### Chatbot (OpenAI)

The chatbot provides an AI assistant that helps visitors navigate the site, answer questions about projects, and guide users to relevant pages. It uses OpenAI's GPT models for chat and TTS (text-to-speech) for voice output.

**Prerequisites:** A deployed site with database and admin auth configured. The chatbot is disabled by default and must be enabled in Admin.

**1. Get an OpenAI API key**

1. Go to [platform.openai.com](https://platform.openai.com) and sign in (or create an account).
2. Navigate to **API keys** (under your profile or [platform.openai.com/api-keys](https://platform.openai.com/api-keys)).
3. Click **Create new secret key**, name it (e.g. "Opholio"), and copy the key. Store it securely—you won't see it again.

**2. Add the key to your environment**

Add to your repo-root `.env.local`:

```
OPENAI_API_KEY="sk-..."
```

**3. Push to Vercel (for deployed sites)**

```bash
# yarn
yarn vercel:env:push

# npm
npm run vercel:env:push
```

The script will push `OPENAI_API_KEY` along with other env vars. When prompted for environment, choose `all` (or `production`/`preview` as needed). The key is treated as sensitive and is not pushed to the development environment.

**4. Enable the chatbot**

1. Sign in to Admin (`/admin`).
2. Go to **Feature settings** (or the settings page where feature toggles live).
3. Enable **Chatbot**.

The chatbot will appear in the navigation. If `OPENAI_API_KEY` is missing, the chat API returns 503 and the chatbot will not function.

## Live-configurable vs code-only

Live-configurable (DB-backed, no redeploy):
- Background packs (upload, activate) and background config.
- About content, avatar/logo, site title/tagline.
- Feature toggles (background, chatbot, contact).

Code-only (build-time):
- Favicon and some static metadata/icon assets.
- OAuth app creation/provider wiring (credentials are always env-only).

## Developer Notes

- `.env.local` remains the canonical Vercel-sync file.
- `yarn vercel:env:push` / `npm run vercel:env:push` reads from `.env.local` only and ignores `.env.dev`.
- `.env.dev` is intentionally separate from `.env.example` to avoid quickstart confusion for quickstart users.
- `.env.dev` is loaded only in development mode and only if the file exists.
- `.env.dev` should contain control flags only (not duplicate deploy env values).

### Local auth bypass (optional)

For local troubleshooting, you can bypass GitHub OAuth without changing `.env.local`:

1. Set these in repo-root `.env.dev`:
   - `ENABLE_DEV_AUTH_BYPASS="1"`
2. Run `yarn dev` (or `npm run dev`).
3. Open `/auth/signin`; bypass runs automatically and redirects to `/admin`.

Safety guards:
- Bypass is only active when `NODE_ENV=development`.
- Bypass is disabled automatically on Vercel (`VERCEL` is present).
- When bypass is enabled, local dev forces `NEXTAUTH_URL` and `NEXTAUTH_URL_INTERNAL` to `http://localhost:<PORT>` to avoid redirecting through deployed auth callbacks.
- `yarn vercel:env:push` / `npm run vercel:env:push` does not read `.env.dev`.
