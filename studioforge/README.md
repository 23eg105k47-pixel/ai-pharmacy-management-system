# StudioForge

StudioForge is a production-ready AI SaaS app builder for salon operations built with Next.js App Router, Supabase Auth/Postgres, and the OpenAI API.

## What is included

- Multi-tenant Postgres schema with `user_id` on every domain table
- Supabase email/password authentication with protected dashboard routes
- AI prompt to salon-app blueprint generation through the OpenAI API
- Tenant-safe CRUD flows for customers, bookings, and billing
- Input validation with Zod and row-level security policies in Supabase
- Typed environment configuration, error handling, and scalable folder structure

## Project structure

```text
app/
  (auth)/
  (dashboard)/
  api/
components/
  auth/
  dashboard/
  generator/
lib/
  ai/
  db/
  supabase/
supabase/
  schema.sql
types/
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
OPENAI_API_KEY=your-openai-api-key
OPENAI_MODEL=gpt-4.1-mini
```

## Setup steps

1. Create a new Supabase project.
2. In Supabase, open the SQL editor and run `supabase/schema.sql`.
3. In Supabase Auth settings, enable email/password sign-in.
4. Set the site URL to `http://localhost:3000`.
5. Add `http://localhost:3000/api/auth/callback` to the redirect URLs list.
6. Create `.env.local` from `.env.example`.
7. Install dependencies with `npm install`.
8. Start the app with `npm run dev`.
9. Open `http://localhost:3000`, create an account, and generate your first salon app blueprint.

## How the app works

1. A user signs up or logs in through Supabase Auth.
2. Middleware protects `/dashboard` and keeps auth pages away from signed-in users.
3. The dashboard sends a validated prompt to `/api/generate`.
4. The server calls OpenAI, validates the returned JSON blueprint, and stores it in `app_projects`.
5. Customer, booking, and invoice forms write to tenant-scoped tables protected by RLS.

## Security model

- Every business table includes `user_id`.
- All writes go through server actions or route handlers.
- Every payload is validated with Zod before hitting the database.
- Supabase row-level security policies restrict reads and writes to `auth.uid() = user_id`.
- The browser only receives the Supabase anon key; privileged operations stay on the server.
