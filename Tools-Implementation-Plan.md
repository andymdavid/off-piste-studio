# Tools Implementation Plan — Off Piste Studio

## Strategic Goal

Build a suite of free, client-side design tools that:
1. Drive top-of-funnel organic traffic via high-volume "do" queries
2. Build domain authority through backlinks and shares
3. Funnel users toward Off Piste services with contextual CTAs
4. Position Off Piste as a design/web authority for SMBs

All tools are client-side (zero running cost), interconnected (users flow between them), and framed for business owners — not just designers.

---

## Architecture

### URL Structure

```
/tools                          ← hub page listing all tools
/tools/contrast-checker         ← individual tool pages
/tools/color-converter
/tools/brand-color-extractor
/tools/palette-preview
/tools/color-palette
/tools/gradient-generator
```

### Build System Integration

- Add `content/tools/` directory for tool metadata (title, description, SEO content, FAQ)
- Add `tools/` directory for generated HTML pages
- Add `...discoverPages('tools', 'tool-')` to `vite.config.js` input
- Each tool page follows the same generation pipeline as industries/locations/services

### Page Template (Every Tool Page)

```
<head>
  Title: Free [Tool Name] — [What It Does] | Off Piste Studio
  Meta description: [Action-oriented, keyword-rich, under 155 chars]
  Canonical URL
  Open Graph + Twitter Card meta
  JSON-LD: SoftwareApplication schema + FAQPage schema + BreadcrumbList
</head>

<body>
  Navigation (same as site-wide)
  Breadcrumbs: Home > Tools > [Tool Name]

  H1: [Tool Name]
  Subheading: [One-line description of what it does]

  [Interactive Tool UI — the actual functional tool]

  H2: How to Use This Tool
  [2-3 short paragraphs with step-by-step]

  H2: Why [Topic] Matters for Your Website
  [Ties tool to Off Piste services — e.g., why contrast matters, why brand colors matter]
  [CTA: "Need help with your website's [topic]? →"]

  H2: Related Tools
  [Links to other tools in the suite]

  H2: Frequently Asked Questions
  [4-6 FAQs with FAQPage schema markup]

  Footer CTA: "Get a free website mockup" / "Talk to us about your project"
  Footer (same as site-wide)
</body>
```

### Shared Components

All tools share a common set of JS modules:

```
src/js/tools/
  color-utils.js        ← hex↔rgb↔hsl conversion, color naming, luminance calculation
  color-picker.js       ← reusable color picker UI (hex input, visual picker, eyedropper API)
  canvas-utils.js       ← image loading, pixel sampling, color quantisation (median cut)
  export-utils.js       ← copy to clipboard, download as file (CSS, JSON, PNG, SVG)
  wcag-utils.js         ← contrast ratio calculation, WCAG AA/AAA pass/fail evaluation
  palette-utils.js      ← complementary/analogous/triadic generation, color harmony logic
```

---

## Tool Specifications

### Tool 1: Contrast Checker

**URL:** `/tools/contrast-checker`
**SEO targets:** "color contrast checker", "WCAG contrast ratio", "accessibility color checker", "text background contrast"
**Estimated search volume:** 100k+/mo globally

**Inputs:**
- Text color (hex input + color picker)
- Background color (hex input + color picker)
- Swap button to reverse text/background

**Outputs:**
- Contrast ratio (e.g., "4.52:1")
- WCAG AA pass/fail for normal text (4.5:1 threshold)
- WCAG AA pass/fail for large text (3:1 threshold)
- WCAG AAA pass/fail for normal text (7:1 threshold)
- WCAG AAA pass/fail for large text (4.5:1 threshold)
- Live preview: rendered text on background at multiple sizes
- "Fix it" suggestion: nearest accessible color if the pair fails

**Technical approach:**
- Relative luminance calculation per WCAG 2.1 formula
- Contrast ratio = (L1 + 0.05) / (L2 + 0.05)
- Nearest accessible color: binary search along lightness axis until ratio passes

**Internal links:**
- "Extract colors from your logo first →" (Brand Color Extractor)
- "Check all your brand colors at once →" (Color Palette)
- Links to `/insights/website-accessibility-and-seo` insight article
- CTA: "We build accessible websites. Get a free audit →" (`/contact`)

**Dependencies:** `color-utils.js`, `color-picker.js`, `wcag-utils.js`

---

### Tool 2: Color Converter

**URL:** `/tools/color-converter`
**SEO targets:** "hex to rgb", "rgb to hsl", "color converter", "hex color converter"
**Estimated search volume:** 50k+/mo globally

**Inputs:**
- Single color input via any format: hex, RGB, HSL
- Color picker for visual selection
- Named CSS color dropdown/search

**Outputs:**
- All three formats displayed simultaneously (hex, RGB, HSL)
- CSS variable format: `--color: #hex;`
- Tailwind class suggestion (nearest Tailwind color)
- Color name (nearest named CSS color)
- Copy button for each format
- Visual swatch preview

**Technical approach:**
- Pure math conversions, no libraries needed
- Named color lookup from a static map of CSS named colors

**Internal links:**
- "Build a full palette around this color →" (Color Palette)
- "Check this color's contrast →" (Contrast Checker)

**Dependencies:** `color-utils.js`, `color-picker.js`, `export-utils.js`

---

### Tool 3: Brand Color Extractor

**URL:** `/tools/brand-color-extractor`
**SEO targets:** "extract colors from image", "color palette from logo", "brand color extractor", "get hex from image"
**Estimated search volume:** 80k+/mo globally

**Inputs:**
- Image upload (drag-and-drop or file picker)
- Accepted formats: PNG, JPG, WebP, SVG
- Max file size: 10MB

**Outputs:**
- 4-6 dominant colors extracted, displayed as swatches
- Hex code + RGB + HSL for each color
- Color name for each
- Copy all as CSS variables
- Copy all as hex list
- "Refine this palette →" link (pre-loads colors into Color Palette tool)
- "Check contrast →" link (pre-loads colors into Contrast Checker)

**Technical approach:**
- Load image onto hidden Canvas element
- Sample pixels using `getImageData()`
- Median cut algorithm for color quantisation (reduce to dominant clusters)
- Sort by dominance (pixel count per cluster)
- Ignore near-white and near-black unless they're genuinely dominant
- Return top 6 colors

**Algorithm — Median Cut (simplified):**
1. Get all pixels as RGB arrays
2. Find the color channel with the greatest range
3. Sort pixels by that channel, split at median
4. Repeat recursively until desired number of buckets reached
5. Average each bucket to get the representative color

**Internal links:**
- "Refine this palette →" (Color Palette)
- "Check if these colors are accessible →" (Contrast Checker)
- "Preview these on a website →" (Palette Preview)
- CTA: "Want a professional brand identity? →" (`/services/brand-identity`)

**Dependencies:** `color-utils.js`, `canvas-utils.js`, `export-utils.js`

---

### Tool 4: Palette Previewer

**URL:** `/tools/palette-preview`
**SEO targets:** "preview color palette on website", "website color scheme preview", "color palette visualizer"
**Estimated search volume:** 10-20k/mo globally

**Inputs:**
- 3-6 colors (manual hex input or pre-loaded from another tool via URL params)
- Color role assignment: primary, secondary, accent, background, text, muted

**Outputs:**
- Live preview of colors applied to 3-4 website mockup templates
- Templates are specific to Off Piste's audience:
  1. **Tradie/service business** — hero section, service cards, contact CTA
  2. **Professional services** (clinic/law/accounting) — clean layout, trust elements
  3. **Creative/portfolio** — bold layout, image-heavy
  4. **Landing page** — single CTA, testimonial, features
- Tab or carousel to switch between templates
- Each template is pure HTML/CSS using CSS custom properties for colors

**Technical approach:**
- Templates are static HTML blocks styled with CSS variables
- JS updates `--primary`, `--secondary`, `--accent`, `--bg`, `--text`, `--muted` on the preview container
- No iframe needed — just styled divs within the page
- Templates should look like real websites Off Piste would build

**This is the key differentiator vs Coolors.** Coolors shows generic UI mockups. Off Piste shows business website mockups — the exact type of sites your ICP wants built. The CTA writes itself: "Like what you see? We'll build it for real."

**Internal links:**
- "Extract colors from your logo first →" (Brand Color Extractor)
- "Check accessibility before committing →" (Contrast Checker)
- CTA: "Want this as a real website? Get a free mockup →" (`/contact`)

**Dependencies:** `color-utils.js`, `color-picker.js`

---

### Tool 5: Color Palette Generator

**URL:** `/tools/color-palette`
**SEO targets:** "color palette generator", "color scheme generator", "complementary colors"
**Estimated search volume:** 80k+/mo globally

**Inputs:**
- Start with 1-2 base colors (manual entry, or pre-loaded from extractor)
- Harmony mode selector: complementary, analogous, triadic, split-complementary, monochromatic
- Lock individual colors and regenerate others
- Spacebar to randomise unlocked colors (like Coolors)

**Outputs:**
- 5-color palette display with large swatches
- Hex + RGB + HSL for each color
- Export options:
  - Copy as CSS variables
  - Copy as Tailwind config
  - Copy as hex list
  - Download as SVG palette file
- "Preview on a website →" link
- "Check contrast →" link

**Technical approach:**
- Color harmony calculations on the HSL color wheel
- Complementary: H + 180°
- Analogous: H ± 30°
- Triadic: H + 120°, H + 240°
- Split-complementary: H + 150°, H + 210°
- Monochromatic: same H, vary S and L
- Random generation: random H, constrained S (40-80%) and L (30-70%) for pleasant defaults
- Lock mechanism: store locked colors, regenerate only unlocked slots

**Internal links:**
- "Start from your logo →" (Brand Color Extractor)
- "Preview this palette →" (Palette Preview)
- "Check accessibility →" (Contrast Checker)
- CTA: "Need a full brand identity? →" (`/services/brand-identity`)

**Dependencies:** `color-utils.js`, `color-picker.js`, `palette-utils.js`, `export-utils.js`

---

### Tool 6: Gradient Generator

**URL:** `/tools/gradient-generator`
**SEO targets:** "css gradient generator", "gradient maker", "linear gradient generator"
**Estimated search volume:** 40k+/mo globally

**Inputs:**
- 2-5 color stops (add/remove)
- Gradient type: linear, radial, conic
- Angle/direction control (for linear)
- Position slider for each color stop

**Outputs:**
- Live gradient preview (large swatch)
- CSS code output (ready to copy)
- Tailwind arbitrary value format
- "Randomise" button for inspiration
- Export as SVG or PNG

**Technical approach:**
- Pure CSS rendering using `background: linear-gradient(...)` on a preview div
- JS generates the CSS string from color stops + angle
- Drag handles for stop positions on a gradient bar

**Internal links:**
- "Build a palette first →" (Color Palette)
- "Check gradient text contrast →" (Contrast Checker)

**Dependencies:** `color-utils.js`, `color-picker.js`, `export-utils.js`

---

## Tools Hub Page

**URL:** `/tools`
**SEO targets:** "free design tools", "free web design tools", "color tools for designers"

**Content:**
- H1: "Free Design Tools"
- Subheading: "Tools for designers and business owners. No signup required."
- Grid layout: card per tool with icon, name, one-line description, link
- Organised in two sections:
  - **Color Tools** — Palette Generator, Color Extractor, Contrast Checker, Converter, Gradient Generator
  - **Preview Tools** — Palette Previewer (expandable as more tools are added)
- Below the grid: brief paragraph about Off Piste + CTA
- JSON-LD: `ItemList` schema listing all tools

---

## SEO Considerations

### JSON-LD Per Tool Page

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "[Tool Name]",
  "description": "[Tool description]",
  "url": "https://offpistestudio.com/tools/[slug]",
  "applicationCategory": "DesignApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "AUD"
  },
  "author": {
    "@type": "Organization",
    "name": "Off Piste Studio",
    "url": "https://offpistestudio.com"
  }
}
```

### Internal Linking Strategy

- Every tool page links to 2-3 related tools
- Every tool page links to 1 relevant service page
- Every tool page links to 1 relevant insight/blog post
- Tools hub linked from main navigation
- Existing insight pages link to relevant tools (e.g., accessibility article → contrast checker)
- Industry/service pages get a "Free Tools" callout section

### URL Parameters for Tool Interconnection

Tools pass state to each other via URL params:
- `/tools/contrast-checker?text=1a1a2e&bg=f5f5f5`
- `/tools/palette-preview?colors=1a1a2e,e94560,0f3460,16213e,f5f5f5`
- `/tools/color-palette?base=1a1a2e&mode=complementary`

This allows "Check contrast →" and "Preview this palette →" links to pre-load the user's colors.

### Update llms.txt

Add a Tools section to `llms.txt`:

```markdown
## Free Tools
- [Contrast Checker](/tools/contrast-checker): Check if text and background colors meet WCAG accessibility standards.
- [Color Converter](/tools/color-converter): Convert between hex, RGB, and HSL color formats.
- [Brand Color Extractor](/tools/brand-color-extractor): Upload a logo or image and extract brand colors with hex codes.
- [Palette Preview](/tools/palette-preview): Preview a color palette on real website mockup templates.
- [Color Palette Generator](/tools/color-palette): Generate harmonious color schemes from a base color.
- [Gradient Generator](/tools/gradient-generator): Create CSS gradients with a visual editor.
```

### Update Sitemap

Add all tool pages to the auto-generated sitemap with high priority.

---

## Implementation Order

### Phase 1 — Foundation + First Tools (Week 1)

1. **Shared infrastructure:**
   - Create `src/js/tools/color-utils.js` — hex↔rgb↔hsl, luminance, color naming
   - Create `src/js/tools/color-picker.js` — reusable color picker component
   - Create `src/js/tools/wcag-utils.js` — contrast ratio, pass/fail checks
   - Create `src/js/tools/export-utils.js` — clipboard copy, file download
   - Create tool page HTML template (matches site design, includes SEO structure)
   - Add `tools/` directory to vite config

2. **Contrast Checker** — build and ship
3. **Color Converter** — build and ship

### Phase 2 — Color Extraction (Week 2)

4. Create `src/js/tools/canvas-utils.js` — image loading, median cut algorithm
5. **Brand Color Extractor** — build and ship
6. Wire up URL param passing between tools

### Phase 3 — Preview + Palette (Week 3)

7. **Palette Previewer** — build mockup templates + color variable system
8. Create `src/js/tools/palette-utils.js` — harmony calculations
9. **Color Palette Generator** — build and ship

### Phase 4 — Polish + Hub (Week 4)

10. **Gradient Generator** — build and ship
11. **Tools Hub Page** — build and ship
12. Add JSON-LD `SoftwareApplication` schema to all tool pages
13. Add FAQ sections with `FAQPage` schema
14. Internal linking: update existing service/insight pages to reference tools
15. Update `llms.txt` with tools section
16. Update sitemap generation to include tools
17. Submit new pages to Search Console

### Phase 5 — Optimise (Week 5+)

18. Add Open Graph images for each tool (auto-generated or designed)
19. Monitor Search Console for indexing and initial rankings
20. A/B test CTAs on tool pages
21. Add more mockup templates to Palette Previewer based on traffic
22. Consider adding: meta tag checker, favicon generator, image resizer (next wave of tools)

---

## Design Notes

- Tool UIs should match the existing Off Piste site design (dark theme, Bebas Neue headings, Inter body text)
- Tools should feel premium — not like a quick hack. Clean spacing, smooth interactions, subtle animations
- Mobile-first: all tools must work well on mobile (colour pickers especially need touch-friendly controls)
- Instant feedback: no "submit" buttons where possible — update outputs in real time as inputs change
- Accessibility: the tools themselves must be accessible (keyboard navigable, screen reader friendly, sufficient contrast on the tool UI itself)

## What We're Not Building

- User accounts / saved palettes — unnecessary complexity, no login wall
- Figma/Adobe plugins — wrong audience
- AI chat / color bot — distraction
- Browse/explore community palettes — can't compete with Coolors' volume
- Logo background remover — needs ML inference, dominated by remove.bg
- Brand voice analyser — needs LLM inference per use, ongoing cost
