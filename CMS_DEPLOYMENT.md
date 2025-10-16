# CMS Deployment Strategy

## 1. Root Cause & Decision

Payload CMS requires full Node.js APIs (`fs`, `path`, `child_process`, binary modules, etc.) during boot and while serving the admin UI. Cloudflare Workers expose only a subset of the Node standard library via `nodejs_compat`; file system access and dynamic module loading remain unavailable. Attempting to deploy Payload on Workers consistently fails during `payload.init()`, which is why the Worker-based admin deploy broke.

**Decision:** Run Payload on a dedicated Node.js runtime (Railway, Render, Fly.io, Vercel, DigitalOcean App Platform, etc.) and keep the portfolio frontend on Cloudflare Pages/Workers. The Worker stub now simply returns a guidance message. Published content is consumed via Payload’s REST API so the frontend still works from Cloudflare’s edge.

## 2. Updated Architecture

```
┌─────────────────────────────────────┐      ┌───────────────────────────┐
│  Cloudflare Pages (Next.js Frontend)│◀────▶│Payload REST API (Node host)│
│  - Static generation + Edge runtime │      │- Express + Payload Admin   │
│  - Fetches published data via REST  │      │- Connects to D1 + R2       │
└─────────────────────────────────────┘      └───────────────────────────┘
              ▲                                         │
              │                                         │
     Cloudflare D1 (SQLite) ◀────────────────────────────┘
           Cloudflare R2 (media assets)
```

- **Frontend:** Deploy with `pnpm deploy` → Cloudflare Pages. Set `NEXT_PUBLIC_CMS_URL` to the public URL of the Payload admin.
- **Admin:** Deploy `cms/server.ts` to a Node host. Run with `pnpm cms:start`.
- **Database:** Use Cloudflare D1 via the LibSQL-compatible HTTP endpoint.
- **Storage:** Cloudflare R2 credentials supplied to the Node host.

You can keep everything in this monorepo—one repo, two deploy targets (Pages + Node host).

## 3. Local Development

```bash
# 1. Load env vars (copy .env.example first)
cp .env.example .env

# 2. Run Payload admin locally (Node runtime)
pnpm cms:dev   # http://localhost:4000/admin

# 3. Start Next.js frontend
pnpm dev       # http://localhost:3000
```

Set the following in `.env` for local dev:

```
PAYLOAD_SECRET=dev-secret
DATABASE_URL=file:./dev.db
CMS_BASE_URL=http://localhost:4000
NEXT_PUBLIC_CMS_URL=http://localhost:4000
CMS_ALLOWED_ORIGINS=http://localhost:3000
```

Media uploads go to the local file system unless Cloudflare credentials are supplied.

## 4. Production Deployment Checklist

1. **Choose Node host** (Railway/Render/Fly.io). Ensure it supports persistent Node processes.
2. **Configure environment variables** on the host:

   | Variable | Description |
   |----------|-------------|
   | `PAYLOAD_SECRET` | Same secret used by frontend (required). |
   | `DATABASE_URL` | D1 HTTP endpoint (e.g. `libsql://...`) |
   | `DATABASE_AUTH_TOKEN` | D1 access token for LibSQL client. |
   | `DATABASE_SYNC_URL` | Optional D1 sync URL for replicas. |
   | `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` | Cloudflare R2 credentials. |
   | `CLOUDFLARE_ACCOUNT_ID` | Required by Payload R2 adapter. |
   | `CMS_BASE_URL` | Public URL of the admin host (e.g. `https://cms.example.com`). |
   | `CMS_ALLOWED_ORIGINS` | Comma-separated list of frontend origins allowed to call REST API. |
   | `PAYLOAD_REST_API_KEY` (optional) | If you protect REST endpoints with API keys. |

3. **Deploy Payload admin:**
   ```bash
   pnpm install --frozen-lockfile
   pnpm cms:start
   ```
4. **Expose REST endpoint:** Ensure the platform routes requests to the Node process (default Express port `4000`).
5. **Frontend configuration:**
   - Set `NEXT_PUBLIC_CMS_URL` in Cloudflare Pages Project → Settings → Environment variables.
   - Optionally set `CMS_REST_URL` for server-side access during build.

## 5. D1 Configuration Notes

- Retrieve the LibSQL endpoint and token from `wrangler d1 info <database-name> --json`.
- In production, `DATABASE_URL` should look like: `libsql://<account-id>-<db-id>.d1.turso.io`.
- `DATABASE_AUTH_TOKEN` corresponds to the generated D1 access token.
- Leave `DATABASE_SYNC_URL` unset unless you have a replica.

## 6. R2 Configuration Notes

Provide these env vars on the Node host:

```
R2_ACCESS_KEY_ID=...
R2_SECRET_ACCESS_KEY=...
CLOUDFLARE_ACCOUNT_ID=...
R2_BUCKET=portfolio-media (optional, defaults to config)
```

The existing Payload upload adapter already expects these values.

## 7. Frontend Consumption

`src/lib/payload.ts` now:
- Uses Payload Local API when building on Node (CI/local dev).
- Falls back to REST requests (`NEXT_PUBLIC_CMS_URL` / `CMS_REST_URL`) when running on Cloudflare’s edge.

Ensure CORS on the admin host allows:
- `https://<your-pages-host>` (production)
- `http://localhost:3000` (development)

## 8. Monorepo Strategy

Single repo is sufficient:
- `pnpm deploy` → Cloudflare Pages (Next.js app).
- `pnpm cms:start` (or Dockerfile) → Node host for Payload.

If you ever decide to split repos, keep a shared package for types to avoid drift, but it is not required.

## 9. Deprecated Worker Scripts

`setup-cms.sh`, `setup-oauth.sh`, and `wrangler-admin.toml` remain for reference but are no longer used for deployment. The Worker now returns a 501 response explaining that Payload must run on Node.
