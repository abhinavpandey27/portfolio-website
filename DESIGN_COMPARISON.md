# Design Comparison: Figma vs Implementation

## NavHeader Component Analysis

### Figma Design (Source of Truth)
![Figma NavHeader](figma-navheader-reference.png)

### Current Implementation
![Implementation Screenshot](navheader-implementation-desktop.png)

---

## ❌ Critical Differences Found

### 1. **Location Text** 
- **Figma**: "Now in Mumbai, India"
- **Implementation**: "Mumbai, India" ❌
- **Fix**: Add "Now in" prefix

### 2. **Navigation Links Icons**
- **Figma**: "☩ Work" and "☩ About" (with symbols)
- **Implementation**: "WORK" and "ABOUT" (plain text, uppercase) ❌
- **Fix**: Add ☩ symbol prefix, remove uppercase transform

### 3. **Social Links Layout**
- **Figma**: 2x2 grid layout (Twitter/E-Mail | LinkedIn/Resume) with arrows (↗ and ↓)
- **Implementation**: Horizontal row (LinkedIn | Twitter | GitHub) without arrows ❌
- **Fix**: Restructure to 2-column grid, add arrow symbols

### 4. **Menu Button**
- **Figma**: Black button with "MENU" text + arrow icon, uppercase
- **Implementation**: Black button with "CV" text ❌
- **Fix**: Change to "MENU" with icon

### 5. **Typography & Styling**
- **Figma**: 
  - Name: Instrument Sans Medium, 16px, -0.2px letter-spacing
  - Location: rgba(11,12,17,0.6) color
  - Nav: Instrument Sans Medium, 16px
- **Implementation**: Using correct fonts but need to verify exact weights

---

## ✅ Correct Elements

1. ✅ **Overall Layout**: Flex layout with left/center/right sections
2. ✅ **Spacing**: 24px padding
3. ✅ **Font Family**: Instrument Sans used
4. ✅ **Color Scheme**: Label primary and secondary colors match
5. ✅ **Background**: Shell color correct

---

## 🔧 Required Fixes

### Priority 1: Critical Visual Differences
1. Update location text to "Now in Mumbai, India"
2. Add ☩ symbols to nav links
3. Restructure social links to 2x2 grid
4. Add arrow symbols (↗ for external, ↓ for download)
5. Change CV button to MENU button with icon

### Priority 2: Fine-tuning
6. Verify font weights match exactly
7. Verify letter-spacing values
8. Verify color opacity values
9. Test hover states
10. Test scrolled state backdrop blur

---

## Next Steps

1. **Fix NavHeader.tsx** with correct text and symbols
2. **Update NavHeader.module.css** for 2x2 social grid
3. **Re-test with Playwright** to capture updated screenshot
4. **Compare again** with Figma to ensure pixel-perfect match

---

## Testing Commands

```bash
# Start dev server (in separate terminal)
pnpm dev

# Use Playwright MCP to test
mcp__playwright__browser_navigate(url: "http://localhost:3000")
mcp__playwright__browser_take_screenshot(filename: "navheader-v2.png")

# Use Figma MCP to verify design
mcp__figma__get_screenshot(nodeId: "37-10048")
```
