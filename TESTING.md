# Testing Workflow

## Visual Regression Testing with Playwright MCP

### Setup
1. Start the development server in a separate terminal:
   ```bash
   pnpm dev
   ```

2. Use Playwright MCP browser tools to navigate and test

### Testing Process for Each Component

#### Step 1: Review Figma Design
Before implementing, review the Figma design:
- **Home Desktop**: https://www.figma.com/design/AzVxiCyRgc3uVWW9IaxkSk/Folio-Website?node-id=36-8459&m=dev
- **Home Mobile**: https://www.figma.com/design/AzVxiCyRgc3uVWW9IaxkSk/Folio-Website?node-id=36-8787&m=dev
- **Components**: https://www.figma.com/design/AzVxiCyRgc3uVWW9IaxkSk/Folio-Website?node-id=42-8879&m=dev

#### Step 2: Implement Component
- Follow design specifications exactly
- Use design tokens from `/src/styles/design-tokens.css`
- Apply typography classes from `/src/styles/typography.css`

#### Step 3: Test with Playwright MCP
1. Navigate to page: `browser_navigate(url)`
2. Take snapshot: `browser_snapshot()`
3. Take screenshot: `browser_take_screenshot()`
4. Test interactions: `browser_click()`, `browser_hover()`
5. Verify responsiveness: `browser_resize()`

#### Step 4: Compare with Figma
- Export design from Figma for comparison
- Use screenshot to verify visual accuracy
- Check spacing, typography, colors, interactions

### Example Test Flow for NavHeader

```typescript
// 1. Navigate
await browser_navigate('http://localhost:3000');

// 2. Verify structure
await browser_snapshot();

// 3. Take desktop screenshot
await browser_take_screenshot({ 
  filename: 'nav-header-desktop.png',
  fullPage: false 
});

// 4. Test scrolled state
await browser_evaluate({ 
  function: '() => window.scrollTo(0, 200)' 
});
await browser_take_screenshot({ 
  filename: 'nav-header-scrolled.png' 
});

// 5. Test mobile
await browser_resize({ width: 375, height: 667 });
await browser_take_screenshot({ 
  filename: 'nav-header-mobile.png' 
});

// 6. Test interactions
await browser_click({ 
  element: 'Work link', 
  ref: '[data-nav-item="work"]' 
});

// 7. Verify smooth scroll
await browser_snapshot();
```

### Manual Verification Checklist

After automated tests, manually verify:

#### NavHeader Component
- [ ] **Desktop Layout (>768px)**
  - [ ] Padding: 24px
  - [ ] Gap between sections: 64px
  - [ ] Name font: body-medium-bold (16px, -0.2px)
  - [ ] Location font: body-small (14px, -0.2px)
  - [ ] Nav links font: label-large (14px, 1px, uppercase)
  
- [ ] **Mobile Layout (<767px)**
  - [ ] Height: 72px
  - [ ] Padding: 16px
  - [ ] Gap: 20px
  - [ ] Social links hidden
  
- [ ] **Scrolled State**
  - [ ] Background: rgba(255,255,255,0.4)
  - [ ] Backdrop blur: 25px
  - [ ] Triggers at: 50px scroll
  
- [ ] **Interactions**
  - [ ] Smooth scroll to sections
  - [ ] URL hash updates
  - [ ] Hover states work
  - [ ] Keyboard navigation works
  
- [ ] **Accessibility**
  - [ ] Focus visible on all interactive elements
  - [ ] ARIA labels present
  - [ ] Keyboard navigation complete

### Test Files
- Smoke tests: `tests/smoke.spec.ts`
- Visual tests: `tests/visual/*.spec.ts`
- README: `tests/visual/README.md`

### Running Tests (Alternative)
If Playwright MCP is unavailable, use CLI:
```bash
# Run all tests
pnpm test:e2e

# Run specific test file
pnpm playwright test tests/visual/nav-header.spec.ts

# Update screenshots
pnpm playwright test --update-snapshots

# View report
pnpm playwright show-report
```

## Design Token Validation

### Colors
- Primary text: #0b0c11 (label-primary)
- Secondary text: rgba(11,12,17,0.6) (label-secondary)
- Background: #fdfcfb (bg-shell)
- Material regular: rgba(255,255,255,0.4) with blur(25px)

### Typography
- Instrument Sans: Headings & Body
- Geist Mono: UI labels & Buttons
- Font loading: swap strategy
- Responsive: Desktop >768px, Mobile <767px

### Spacing
- Desktop: 4, 8, 12, 16, 20, 24, 32, 48, 64, 80, 120, 160px
- Mobile: Scales down (e.g., 120px → 80px)
- Container padding: 120px desktop, 16px mobile

### Radius
- radius-1: 24px desktop, 16px mobile
- radius-button: 32px (fixed)
- radius-6: 4px (fixed)
