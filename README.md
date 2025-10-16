# Abhinav Pandey - Portfolio Website

Personal design portfolio showcasing product design work and case studies. Built with Next.js and Payload CMS. Frontend runs on Cloudflare Pages/Workers, while Payload admin runs on a dedicated Node.js host.

## Tech Stack

- **Frontend**: Next.js 15.5.5, React 19, TypeScript
- **Styling**: CSS Modules with Design Tokens (No Tailwind)
- **CMS**: Payload CMS 3.x with SQLite adapter
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2
- **Hosting**: Cloudflare Pages (frontend) + Node.js platform (Payload admin)
- **Animation**: Framer Motion
- **Testing**: Playwright

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm 10+
- Cloudflare account (for deployment)

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/abhinavpandey27/portfolio-website.git
cd portfolio-website
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your values
```

4. **Run development servers**
```bash
pnpm dev
# In a separate terminal
pnpm cms:dev
```

Open [http://localhost:3000](http://localhost:3000) for the frontend and [http://localhost:4000/admin](http://localhost:4000/admin) for the Payload admin UI.

### Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm typecheck    # TypeScript validation
pnpm lint         # ESLint
pnpm test:e2e     # Playwright E2E tests
pnpm deploy       # Deploy to Cloudflare
pnpm cms:dev      # Run Payload admin locally (Node runtime)
pnpm cms:start    # Start Payload admin in production mode
```

## Design System

All styling uses **design tokens** from `/src/styles/design-tokens.css`. Never hardcode colors, spacing, or fonts.

### Typography Classes
- `.heading-1`, `.heading-2`, `.heading-3`, `.heading-4`
- `.body-large`, `.body-medium`, `.body-small`
- `.button-text-large`, `.button-text-small`
- `.label-large`, `.label-small`

### Design Tokens
```css
/* Colors */
--color-label-primary
--color-label-secondary
--color-bg-shell
--color-bg-system-white

/* Spacing */
--space-24, --space-32, --space-48, --space-64, --space-120

/* Typography */
--font-size-h1, --font-size-h4, --font-size-b2
```

See `/docs/tasks/001-portfolio-website/design-system/design-tokens.md` for complete reference.

## CMS Configuration

### Payload CMS Collections
- **Projects**: Portfolio case studies
- **Media**: Images and files (R2 storage)
- **Users**: Admin authentication

### Payload CMS Globals
- **SiteConfig**: Name, location, social links, CV
- **AboutSection**: Bio and image carousel

### Running the CMS Admin
- Local: `pnpm cms:dev` (http://localhost:4000/admin)
- Production: deploy `cms/server.ts` to a Node.js host (Railway, Render, Fly.io, Vercel, etc.)
- Configure `NEXT_PUBLIC_CMS_URL` (frontend) and `CMS_BASE_URL`/`CMS_ALLOWED_ORIGINS` (admin) using the values listed in `.env.example`

## Deployment

### Cloudflare Pages (Frontend)
```bash
pnpm build
pnpm deploy
```

GitHub Actions automatically deploys on push to `main` branch.

### Payload Admin (Node Host)
1. Provision a Node-compatible host.
2. Set the environment variables described in `CMS_DEPLOYMENT.md`.
3. Deploy with:
   ```bash
   pnpm install --frozen-lockfile
   pnpm cms:start
   ```

## Testing

### Visual Regression
Uses Figma MCP + Playwright MCP workflow for pixel-perfect implementations.

### E2E Tests
```bash
pnpm test:e2e
```

See `TESTING.md` for detailed testing workflow.

## Documentation

- **PRD**: `/docs/tasks/001-portfolio-website/prd/`
- **Specs**: `/docs/tasks/001-portfolio-website/specs/`
- **Tasks**: `/docs/tasks/001-portfolio-website/tasks/`
- **AGENTS.md**: AI development guide

## License

Private - All Rights Reserved
