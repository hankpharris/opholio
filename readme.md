# ofolio

Single-owner, open-source portfolio with live-configurable content and background packs.
The Next.js app lives in `frontend/` and is run via the monorepo root.

## Quick start

1. Install dependencies:
   - `yarn install`
2. Create `.env` from `.env.example` and fill required values.
3. Run the dev server:
   - `yarn dev`

The default dev app runs at `http://localhost:3000`.

## Required vs optional features

- **Required core**: background packs (upload, activate, render in a sandboxed iframe).
- **Optional**:
  - Chatbot / TTS (OpenAI).
  - Contact form (Resend).

Optional features are safe to leave disabled when their env vars are missing.

## Environment variables

Required:
- `DATABASE_URL` — Prisma/Postgres connection string.
- `NEXTAUTH_URL`, `NEXTAUTH_URL_INTERNAL`, `NEXTAUTH_SECRET` — NextAuth config.
- `GITHUB_ID`, `GITHUB_SECRET`, `GITHUB_ID_PERSONAL`, `GITHUB_SECRET_PERSONAL` — GitHub OAuth clients.
- `ALLOWED_GITHUB_USERS` — comma-separated GitHub usernames allowed into admin.
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob upload/delete access.

Optional:
- `OPENAI_API_KEY` (and `NEXT_PUBLIC_OPENAI_API_KEY` if you need it in client code).
- `RESEND_API_KEY`, `CONTACT_EMAIL` (contact form).
- `NEXT_PUBLIC_RESEND_API_KEY`, `NEXT_PUBLIC_CONTACT_EMAIL` (legacy client contact form).

Missing required env vars will break auth, database, or uploads. Optional envs simply
disable the related feature.

## Database and Prisma

- Prisma schema lives in `packages/database/prisma/schema.prisma`.
- Generate the client: `yarn workspace database generate`
- Create migrations: `yarn workspace database migrate:dev --name init`

Migrations should be committed for reproducible OSS setup.

## Admin UI

Admin routes live under `/admin` and are protected by NextAuth. This is a single-owner
app: any allowed GitHub login is treated as admin.

## Live-configurable vs code-only

Live-configurable (DB-backed, no redeploy):
- Background packs, active selection, and background config.
- About content, avatar/logo, site title/tagline.
- Feature toggles (background, chatbot, contact).

Code-only (build-time):
- Favicon and static metadata/icons.
- NextAuth provider wiring and OAuth app setup.
- All provider secrets (always env-only).
