# CMS Deployment Strategy

## Current Setup

### Payload CMS Configuration
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2
- **Collections**: Projects, Media, Users
- **Globals**: SiteConfig, AboutSection

## Deployment Options

### Option 1: Separate Admin Server (Recommended)
Deploy Payload CMS admin panel separately from the frontend.

**Architecture:**
```
Frontend (Cloudflare Pages) → API (Cloudflare Workers) → D1 + R2
Admin Panel (Vercel/Railway) → API (Cloudflare Workers) → D1 + R2
```

**Steps:**
1. Create separate `admin` directory with Payload standalone server
2. Deploy admin to Vercel/Railway/Render
3. Use Cloudflare D1 HTTP API for database access
4. Frontend queries published data via API routes

### Option 2: Embedded in Next.js (Current)
Run Payload admin within Next.js app.

**Limitations with Cloudflare Workers:**
- Node.js runtime incompatibility
- Payload requires full Node.js APIs
- Cloudflare Workers uses V8 isolates (limited Node.js support)

**Workaround:**
- Use Payload Local API for builds (SSG)
- Deploy admin panel separately for content management
- Frontend reads from D1 directly via Drizzle ORM

## Recommended Approach

### For Now (Development):
1. **Local CMS**: Run Payload locally during development
2. **Seed Data**: Create sample projects via local CMS
3. **Export Data**: Export to JSON for initial deployment
4. **Static Generation**: Use exported data for SSG builds

### For Production:
1. **Deploy Admin Separately**: Use Vercel/Railway for Payload admin
2. **API Routes**: Create Cloudflare Workers API endpoints
3. **Webhook**: Trigger rebuild on content updates
4. **ISR**: Use Incremental Static Regeneration

## Next Steps

1. **Run Payload locally**:
```bash
# Create Payload server file
touch src/payload-server.ts

# Run Payload standalone
pnpm payload dev
```

2. **Access admin panel**: `http://localhost:3000/admin`

3. **Create first user**: Via OAuth (Google/GitHub)

4. **Add seed data**: Projects, media, site config

5. **Test data fetching**: Verify `getPublishedProjects()` works

## Current Status

✅ Payload CMS configured (collections + globals)
✅ Cloudflare D1 database created
✅ Cloudflare R2 bucket created
✅ Data utilities created (`src/lib/payload.ts`)
⏳ Need to run migrations and seed data
⏳ Need to test admin panel locally

## Action Items

- [ ] Create Payload standalone server for local testing
- [ ] Run database migrations (`pnpm payload migrate`)
- [ ] Test admin panel login
- [ ] Create sample project data
- [ ] Verify frontend data fetching works
- [ ] Plan production admin deployment strategy
