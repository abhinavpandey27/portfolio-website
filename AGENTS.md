# AGENTS.md - AI Development Guide

## Project Overview
Personal design portfolio website built with Next.js, Payload CMS, and Cloudflare Workers.

## Tech Stack
- **Frontend**: Next.js 15.5.5, React 19, TypeScript
- **Styling**: CSS Modules (NO Tailwind)
- **CMS**: Payload CMS 3.x with SQLite adapter
- **Hosting**: Cloudflare Workers + Pages
- **Database**: Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2
- **Animation**: Framer Motion
- **Testing**: Playwright

## Commands

### Development
```bash
pnpm dev          # Start dev server (port 3000)
pnpm build        # Build for production
pnpm start        # Start production server
```

### Quality Checks
```bash
pnpm typecheck    # TypeScript type checking
pnpm lint         # ESLint
pnpm format       # Prettier formatting
```

### Testing
```bash
pnpm test         # Unit tests (Vitest)
pnpm test:e2e     # E2E tests (Playwright)
pnpm test:e2e:ui  # Playwright UI mode
```

### Deployment
```bash
pnpm deploy       # Deploy to Cloudflare Workers
```

## Code Conventions

### Styling System
- **NO TAILWIND** - Use CSS Modules only
- All design values MUST come from design tokens (`/src/styles/design-tokens.css`)
- Typography classes from `/src/styles/typography.css`
- Never hardcode colors, spacing, fonts, or sizes

### Design Tokens Usage
```tsx
// ❌ WRONG
<div style={{ padding: '24px', color: '#0b0c11' }}>

// ✅ CORRECT
<div style={{ padding: 'var(--space-24)', color: 'var(--color-label-primary)' }}>

// ✅ BETTER - Use typography classes
<p className="body-medium">Text</p>
```

### Component Structure
- All components in `/src/components/[ComponentName]/`
- Each component has `.tsx` + `.module.css` files
- Use TypeScript interfaces for props
- Client components need `'use client'` directive

### File Organization
```
src/
├── app/                    # Next.js app router
├── components/             # React components
├── styles/                 # Global styles & tokens
├── lib/                    # Utilities
├── hooks/                  # Custom hooks
└── payload/                # CMS configuration
    ├── collections/        # Content types
    └── globals/            # Singletons
```

## Design System

### Fonts
- **Headings & Body**: Instrument Sans (400, 500, 600, 700)
- **UI & Labels**: Geist Mono (400)
- Font loading: `next/font/google` with `display: 'swap'`

### Breakpoints
- **Mobile**: < 767px
- **Desktop**: >= 768px
- Mobile-first approach with `@media (max-width: 767px)` overrides

### Key Design Tokens
```css
/* Colors */
--color-label-primary: #0b0c11
--color-label-secondary: rgba(11, 12, 17, 0.6)
--color-bg-shell: #fdfcfb
--color-bg-system-white: #ffffff

/* Spacing */
--space-4, --space-8, --space-12, --space-16
--space-24, --space-32, --space-48, --space-64
--space-80, --space-120, --space-160

/* Typography */
--font-size-h1: 48px (desktop), 40px (mobile)
--font-size-h4: 28px (desktop), 22px (mobile)
--font-size-b2: 16px (desktop), 14px (mobile)

/* Transitions */
--transition-base: 300ms
--transition-smooth: 800ms (for background color changes)
```

## Testing Workflow (MANDATORY)

### For Every Component:
1. **Review Figma**: Use Figma MCP to fetch design
2. **Implement**: Follow design tokens strictly
3. **Test with Playwright MCP**: Screenshot and compare
4. **Fix Differences**: Iterate until pixel-perfect
5. **Commit**: Only when verified

### Figma Links
- Home Desktop: https://www.figma.com/design/AzVxiCyRgc3uVWW9IaxkSk/Folio-Website?node-id=36-8459
- Home Mobile: https://www.figma.com/design/AzVxiCyRgc3uVWW9IaxkSk/Folio-Website?node-id=36-8787
- Components: https://www.figma.com/design/AzVxiCyRgc3uVWW9IaxkSk/Folio-Website?node-id=42-8879

## CMS Collections

### Projects
- Fields: title, subtitle, slug, description, role, team, timeline, categories, outcomes, heroImage, backgroundColor, carouselImages, featured, order, status
- Slug auto-generated from title
- Only one project can be featured
- backgroundColor must be valid hex color

### Media
- Image formats: JPEG, PNG, WebP, PDF
- Variants: thumbnail (400w), card (800w), large (1920w)
- Upload to Cloudflare R2

### Globals
- **SiteConfig**: name, location, email, socialLinks, cvFile
- **AboutSection**: bio (richText), imageCarousel

## Performance Requirements
- LCP < 2s
- FCP < 1.2s
- CLS < 0.1
- Initial bundle < 200KB gzipped

## Accessibility Requirements
- WCAG AA compliance
- Keyboard navigation for all interactive elements
- Skip to content link
- ARIA labels on icon buttons
- Reduced motion support (prefers-reduced-motion)
- All touch targets >= 44x44px on mobile

## Common Issues

### TypeScript Errors
- Run `pnpm typecheck` before committing
- Fix all type errors - no `any` or `@ts-expect-error`

### Build Failures
- Check Turbopack warnings
- Verify all imports are correct
- Ensure CSS Modules imported properly

### Styling Issues
- Always check design tokens file first
- Verify responsive behavior at 767px breakpoint
- Test both light and dark modes

## Git Workflow
- Main branch: `main`
- Commit messages: Conventional Commits format
- Push after completing each major task
- CI/CD runs on push to main

## Documentation
- PRD: `/docs/tasks/001-portfolio-website/prd/001-prd-portfolio-website.md`
- Specs: `/docs/tasks/001-portfolio-website/specs/`
- Tasks: `/docs/tasks/001-portfolio-website/tasks/tasks-portfolio-website.md`
- Design Tokens: `/docs/tasks/001-portfolio-website/design-system/design-tokens.md`
