# Site Inspo — Small Business Website Gallery

## What this is

A standalone website gallery showcasing the best small business and local service business websites on the internet. Think [saaslandingpage.com](https://saaslandingpage.com/) but for the SMB/trades/local business market instead of SaaS.

The site is built and maintained by Off Piste Studio. It serves two purposes:

1. **Traffic and authority** — capture high-volume searches like "best small business websites," "website design inspiration," and "[industry] website examples" and funnel relevant visitors back to the agency
2. **Revenue** — monetise through sponsorships, boosted listings, and affiliate links to tools/hosting

## Why this niche

The SaaS gallery space is crowded (Awwwards, Godly, SaaS Landing Page, Landingfolio, etc.). The small business / local service business space has virtually no curated galleries. The audience — business owners, marketers, and designers working with SMBs — is large, underserved, and directly overlaps with Off Piste Studio's ICP.

Target keywords include:
- "best small business websites" (~2,400/mo)
- "website design inspiration" (~6,600/mo)
- "plumber website examples" (~480/mo)
- "best restaurant websites" (~1,900/mo)
- "dentist website design" (~590/mo)
- "tradie website examples" (~320/mo)
- "[industry] website design ideas" (long-tail, hundreds of variations)
- "small business website examples" (~1,600/mo)

---

## Site structure

### Domain

Choose a brandable, short domain. Examples:
- siteinspo.com / siteinspo.com.au
- localwebinspo.com
- smbsites.com
- bestsmbsites.com

The domain should feel like a standalone product, not a subdomain or subfolder of offpistestudio.com. Off Piste Studio attribution goes in the footer and "about" page.

### URL patterns

```
/                                    Homepage — latest + featured entries
/site/[slug]                         Individual site profile page
/industry/[industry]                 Industry listing (e.g. /industry/plumbers)
/category/[category]                 Page type listing (e.g. /category/pricing-pages)
/style/[style]                       Design style listing (e.g. /style/minimal)
/platform/[platform]                 Platform listing (e.g. /platform/squarespace)
/colour/[colour]                     Colour-dominant listing (e.g. /colour/blue)
/about                               About page — who builds this, link to Off Piste Studio
/submit                              Submit a site form
/advertise                           Sponsorship info + contact
/blog                                Blog — articles about small business web design
/blog/[slug]                         Individual blog post
```

### Taxonomy

Every entry is tagged across multiple dimensions. This is critical for SEO — each taxonomy page becomes a rankable landing page.

**Industry** (primary taxonomy — this is the differentiator)
- Plumbers
- Electricians
- Dentists
- Restaurants / Cafes
- Accountants
- Lawyers
- Real Estate Agents
- Cleaners
- Landscapers
- Photographers
- Gyms / Fitness
- Physiotherapy
- Builders
- Mortgage Brokers
- Veterinarians
- Hair / Beauty Salons
- Pest Control
- Roofers
- HVAC
- Auto Mechanics
- Coaches
- Bookkeepers
- Architects
- Interior Designers
- Pet Services
- (expandable over time)

**Category** (page type)
- Homepage designs
- Pricing pages
- About pages
- Services pages
- Contact pages
- Portfolio / Work pages
- Blog layouts
- Landing pages
- Booking pages
- Testimonial sections

**Style**
- Minimal
- Bold / High contrast
- Dark mode
- Colourful
- Classic / Traditional
- Modern / Trendy
- Illustration-heavy
- Photo-heavy
- Typography-focused

**Platform / Technology**
- Squarespace
- Wix
- WordPress
- Webflow
- Shopify
- Custom / Hand-coded
- Framer
- Other

**Colour** (dominant colour)
- Blue
- Green
- Red / Orange
- Black / Dark
- White / Light
- Neutral / Earth tones
- Purple
- Multi-colour

---

## Page layouts

### Homepage

```
┌─────────────────────────────────────────────────┐
│  Header: Logo | Industries | Categories | Styles│
│           | Submit a Site | Search | Dark Mode   │
├─────────────────────────────────────────────────┤
│  Hero                                            │
│  "The best small business websites on the web"   │
│  Brief description + entry count                 │
│  [Browse by industry ▾]  [Submit a site]         │
├─────────────────────────────────────────────────┤
│  Off Piste Studio ad block                       │
│  "Need a website like these? We build them."     │
│  [Get a free mockup →]                           │
├─────────────────────────────────────────────────┤
│  Featured / Boosted entry (full width)           │
├─────────────────────────────────────────────────┤
│  Gallery grid — latest entries                   │
│  ┌─────┐ ┌─────┐ ┌─────┐                       │
│  │     │ │     │ │     │   3-col desktop         │
│  │     │ │     │ │     │   2-col tablet           │
│  └─────┘ └─────┘ └─────┘   1-col mobile          │
│  ┌─────┐ ┌─────┐ ┌─────┐                       │
│  │     │ │BOOST│ │     │   Boosted entries        │
│  │     │ │     │ │     │   interspersed            │
│  └─────┘ └─────┘ └─────┘                         │
│                                                   │
│  [Load more]                                      │
├─────────────────────────────────────────────────┤
│  Browse by industry (pill links)                 │
│  Browse by style (pill links)                    │
├─────────────────────────────────────────────────┤
│  Footer                                          │
│  Col 1: Industries (links)                       │
│  Col 2: Categories (links)                       │
│  Col 3: Styles (links)                           │
│  Col 4: Platforms (links)                        │
│  Col 5: Resources — Blog, Advertise, Submit      │
│  Bottom: "A project by Off Piste Studio" + link  │
└─────────────────────────────────────────────────┘
```

### Gallery card

Each card in the grid shows:

```
┌─────────────────────────┐
│                         │
│   Full-page screenshot  │
│   (16:10 or 3:4 ratio)  │
│                         │
├─────────────────────────┤
│ Business Name            │
│ Industry tag  •  Style   │
│ [Visit site →]           │
└─────────────────────────┘
```

- Screenshot is a full-page capture, cropped to a consistent aspect ratio
- Hover effect: subtle scale or overlay with "View details" prompt
- Boosted cards get a small "Boosted" label in the top corner
- Cards link to the individual site profile page

### Individual site profile page (`/site/[slug]`)

```
┌─────────────────────────────────────────────────┐
│  Header                                          │
├─────────────────────────────────────────────────┤
│  Breadcrumb: Home > Industry > [Business Name]   │
├─────────────────────────────────────────────────┤
│  Hero section                                    │
│  Business Name         [Visit Website →]         │
│  Industry  •  Style  •  Platform                 │
│  Brief description of the site / business        │
├─────────────────────────────────────────────────┤
│                                                   │
│  Full-page screenshot (large, scrollable or       │
│  multiple screenshots: desktop + mobile)          │
│                                                   │
├─────────────────────────────────────────────────┤
│  Details sidebar / section:                      │
│  - Industry: Plumbing                            │
│  - Style: Minimal                                │
│  - Platform: Squarespace                         │
│  - Colours: #1a1a2e, #F37021, #ffffff            │
│  - Fonts: Inter, Instrument Serif                │
│  - Page type: Homepage                           │
├─────────────────────────────────────────────────┤
│  Off Piste Studio ad block                       │
│  "Want a site like this? We design websites for  │
│   [industry] businesses."                        │
│  [Get a free mockup →]                           │
├─────────────────────────────────────────────────┤
│  Related sites (same industry or style)          │
│  ┌─────┐ ┌─────┐ ┌─────┐                       │
│  │     │ │     │ │     │                         │
│  └─────┘ └─────┘ └─────┘                         │
├─────────────────────────────────────────────────┤
│  Footer                                          │
└─────────────────────────────────────────────────┘
```

### Industry / category / style listing page

Same layout as homepage but:
- Hero is customised for the taxonomy (e.g. "Best Plumber Website Designs" with a short intro paragraph)
- Gallery grid is filtered to that taxonomy
- Off Piste Studio ad block is contextual ("We build websites for plumbers — see our work")
- Browse section at bottom shows related industries/styles
- Unique meta title and description targeting "[industry] website design examples"

### Submit a site page

Simple form:
- Website URL (required)
- Business name
- Industry (dropdown)
- Your email (for notifications)
- Optional: brief description
- Submit button

Submissions go to a moderation queue. Not auto-published.

### Advertise page

Simple info page explaining sponsorship options:
- **Boosted listing** — site appears with "Boosted" label, placed higher in relevant category grids
- **Banner ad** — horizontal ad block between gallery rows (limited to 2 per page)
- **Featured homepage slot** — full-width featured entry at top of homepage
- Contact email or form for enquiries

---

## Visual design

### Design direction

Match the reference site's approach: clean, dark-mode-first, content-focused. The screenshots are the product — everything else should recede.

- **Background:** Dark (#0f0e0d or similar — can match Off Piste Studio's palette)
- **Cards:** Slight border or subtle elevation, rounded corners (0.5rem)
- **Typography:** Clean sans-serif for UI (Inter), serif for headings (Instrument Serif) — can share Off Piste Studio's type system
- **Accent colour:** #F37021 (Off Piste Studio's orange) for CTAs, active states, and the ad blocks
- **Dark/light mode toggle:** Include from launch — gallery sites benefit from both modes
- **Grid spacing:** Generous gaps between cards, let the screenshots breathe

### Responsive breakpoints

- Desktop: 3-column grid
- Tablet (< 1024px): 2-column grid
- Mobile (< 640px): 1-column grid

---

## Technical architecture

### Stack

- **Static site generator** — build as a Vite + vanilla JS project (same stack as Off Piste Studio for consistency) OR consider a lightweight framework like Astro for content-heavy pages
- **Content** — Markdown files or JSON for site entries, processed at build time. Each entry is a .md or .json file in a content directory
- **Screenshots** — automated full-page captures using Puppeteer or Playwright, stored as optimised WebP images. Run as a script, not at build time
- **Hosting** — CapRover on the same VPS as Off Piste Studio (near-zero marginal cost)
- **Search** — client-side search using a pre-built JSON index (Fuse.js or similar). No backend needed until scale demands it

### Content entry format

```yaml
# content/sites/jims-plumbing.md
---
name: Jim's Plumbing
slug: jims-plumbing
url: https://jimsplumbing.com.au
description: Clean, conversion-focused homepage for Australia's largest plumbing franchise. Strong CTA hierarchy, trust signals, and mobile-first layout.
industry: plumbers
category:
  - homepage
  - services-page
style: modern
platform: custom
colours:
  - "#1a3a5c"
  - "#ffffff"
  - "#f5a623"
fonts:
  - Inter
  - System UI
featured: false
boosted: false
date_added: 2026-03-24
screenshots:
  desktop: /screenshots/jims-plumbing-desktop.webp
  mobile: /screenshots/jims-plumbing-mobile.webp
---
```

### Screenshot pipeline

The gallery cards use a tall cropped screenshot showing the top portion of each site — similar to how saaslandingpage.com presents their entries. These are not manually captured. They are automated.

**How it works:**

The capture script (`scripts/capture-screenshot.mjs`) takes a URL and slug as input and produces two card-ready images (desktop and mobile) plus a full-page capture for the profile page.

**Technical approach:**

1. Launch a headless Chromium browser via Puppeteer
2. Navigate to the target URL with a fixed viewport:
   - Desktop: 1440 x 900px viewport
   - Mobile: 390 x 844px viewport
3. Wait for the page to fully load (networkidle0 — wait until no network requests for 500ms). This ensures hero images, fonts, and above-the-fold content are rendered
4. Capture a full-page screenshot (the entire scrollable page)
5. Use Sharp to process the raw screenshot into three outputs:
   - **Card image (desktop):** Crop from top to 3:4 aspect ratio (1440 x 1920px from top of page), then resize to 720 x 960px for 2x retina card display. This gives the "tall preview" look used on the gallery grid
   - **Card image (mobile):** Same approach at mobile viewport — crop top portion at 3:4, resize to 390 x 520px
   - **Full-page image:** Resize full-page capture to max 1440px wide, keep full height, for the individual profile page
6. Convert all outputs to WebP (quality 85, effort 6) via Sharp
7. Save to `/public/screenshots/[slug]-desktop.webp`, `[slug]-mobile.webp`, and `[slug]-full.webp`

**Script interface:**

```bash
# Single site
node scripts/capture-screenshot.mjs --url https://example.com --slug example-business

# Batch from content directory (reads all .md entries missing screenshots)
node scripts/capture-screenshot.mjs --batch

# Re-capture all (refresh existing screenshots)
node scripts/capture-screenshot.mjs --batch --force
```

**Dependencies:**

```json
{
  "puppeteer": "^22.0.0",
  "sharp": "^0.34.0"
}
```

Puppeteer bundles its own Chromium, so no system browser dependency is needed. The script runs locally or in CI — not at build time, since captures are slow (~5-10 seconds per site). Screenshots are committed to the repo (or stored in external storage at scale).

**Edge cases to handle:**

- Cookie consent banners: dismiss common ones before capture (look for common selectors like `[data-cookie-accept]`, `.cookie-banner button`, etc.) or inject CSS to hide them
- Lazy-loaded images: scroll the page once before capture to trigger lazy loading
- SPAs that render client-side: increase the wait time or use `waitForSelector` on a known element
- Sites that block headless browsers: set a realistic user-agent string
- Failed captures: log the error, skip the entry, and flag it for manual review

**Output structure:**

```
public/screenshots/
├── jims-plumbing-desktop.webp    (720 x 960px — gallery card)
├── jims-plumbing-mobile.webp     (390 x 520px — mobile card)
├── jims-plumbing-full.webp       (1440px wide, full height — profile page)
├── ace-electrical-desktop.webp
├── ace-electrical-mobile.webp
├── ace-electrical-full.webp
└── ...
```

### Build pipeline

1. Read all content entries from `/content/sites/`
2. Generate taxonomy indexes (which entries belong to which industry, style, etc.)
3. Generate HTML for: homepage, each site profile, each taxonomy listing page, static pages
4. Output to `/dist/` for deployment via CapRover

---

## Off Piste Studio integration

### Attribution

- Footer on every page: "A project by [Off Piste Studio](https://offpistestudio.com)" with logo
- About page: full explanation of who Off Piste Studio is and why this gallery exists
- No attempt to hide the connection — the authority transfer is the point

### Ad blocks (internal promotion)

Two types of ad blocks, placed strategically:

**Horizontal banner** (appears between gallery rows, max 2 per page):
```
┌─────────────────────────────────────────────────┐
│  Need a website like these?                      │
│  Off Piste Studio designs websites for small     │
│  businesses — from $3,500 AUD.                   │
│  [Get a free mockup →]                           │
└─────────────────────────────────────────────────┘
```

**Contextual sidebar/section** (on individual site profiles):
```
┌─────────────────────────────────────────────────┐
│  We build websites for [industry] businesses     │
│  See our work → | Get a quote →                  │
└─────────────────────────────────────────────────┘
```

The industry is pulled dynamically from the entry's taxonomy. Links go to the corresponding industry page on offpistestudio.com (e.g. `/industries/plumbers`).

### Backlinks

- Every industry listing page links to the corresponding Off Piste Studio industry page
- Blog posts on the gallery site can reference Off Piste Studio's insights articles
- These are owned-site backlinks so they carry limited SEO weight, but they do drive referral traffic and brand awareness

---

## SEO strategy

### On-page

- Every taxonomy page has a unique H1, meta title, and meta description targeting the relevant keyword
- Title pattern: "Best [Industry] Website Designs — [Site Name]"
- Meta description pattern: "Browse the best [industry] websites for design inspiration. Curated examples of [industry] websites with screenshots, colour palettes, and platform details."
- Schema markup: CollectionPage on listings, WebPage on profiles, BreadcrumbList on all subpages
- Sitemap auto-generated from content entries

### Content volume targets

- **Launch:** 50 curated entries across 10-15 industries
- **Month 1-3:** Grow to 200 entries, covering all target industries
- **Month 6:** 500+ entries
- **Ongoing:** Add 10-20 new entries per week

Each new entry generates: 1 profile page + contributes to multiple taxonomy pages. At 200 entries across 25 industries, 10 categories, 8 styles, and 8 platforms, you have 200 + 25 + 10 + 8 + 8 = **251 indexable pages** — all from structured data, not manual content creation.

### Blog

Publish 1-2 articles per month on the gallery site:
- "10 Best Plumber Websites in 2026"
- "Website Design Trends for Small Businesses"
- "What Makes a Great Restaurant Website"
- "How to Design a Dental Practice Website That Converts"

These target long-tail keywords and link internally to the relevant taxonomy pages + externally to Off Piste Studio's service/industry pages.

---

## Monetisation

### Phase 1 — Launch (free, build traffic)

No monetisation. Focus on building content volume and organic traffic. All ad slots are used for Off Piste Studio promotion.

### Phase 2 — Traction (1,000+ monthly visits)

- Open "Submit a site" to designers and agencies
- Offer **boosted listings** — $50-100/month for a "Boosted" label and priority placement in relevant taxonomy grids
- Add affiliate links for platforms (Squarespace, Wix, Webflow all have affiliate programs with $100-200 per referral)

### Phase 3 — Scale (5,000+ monthly visits)

- Sell banner ad slots to web design tools, hosting companies, and complementary SaaS products
- Offer **featured homepage slot** — premium placement for $200-500/month
- Newsletter sponsorships (if a newsletter is established)

---

## Implementation phases

### Phase 1 — MVP (build in 1-2 days)

- [ ] Register domain
- [ ] Set up project (Vite + vanilla JS, same conventions as Off Piste Studio)
- [ ] Build content schema and entry format
- [ ] Build screenshot capture script (Puppeteer + Sharp)
- [ ] Seed 30-50 entries across 10 industries
- [ ] Build homepage with gallery grid and "load more"
- [ ] Build individual site profile page
- [ ] Build industry listing pages
- [ ] Build static pages (about, submit, advertise)
- [ ] Add Off Piste Studio ad blocks
- [ ] Add schema markup (CollectionPage, BreadcrumbList)
- [ ] Generate sitemap
- [ ] Deploy to CapRover
- [ ] Submit to Google Search Console

### Phase 2 — Taxonomy expansion (week 2-3)

- [ ] Add category, style, platform, and colour taxonomy pages
- [ ] Build search functionality (client-side, Fuse.js)
- [ ] Add dark/light mode toggle
- [ ] Grow to 100 entries
- [ ] Add blog section with first 2-3 articles
- [ ] Add footer with full taxonomy navigation

### Phase 3 — Growth features (month 2+)

- [ ] Add submit form with moderation queue
- [ ] Add boosted listing infrastructure
- [ ] Add banner ad slot system
- [ ] Add newsletter signup
- [ ] Integrate affiliate links for platforms
- [ ] Grow to 200+ entries
- [ ] Begin outreach to designers/agencies for submissions

---

## Key decisions to make before building

1. **Domain name** — needs to be chosen and registered
2. **Separate repo or monorepo** — recommend separate repo for clean separation
3. **Astro vs Vite + vanilla** — Astro would make the content/taxonomy system easier; vanilla keeps consistency with Off Piste Studio. Recommend Astro for this project given the content volume
4. **Initial seed list** — need to curate the first 30-50 sites to screenshot and catalogue. Focus on Australian small businesses first, then expand internationally
5. **Screenshot hosting** — store in the repo (simple) or external storage like S3/R2 (scalable). Start with repo, move to external when it gets large
