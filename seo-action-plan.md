# SEO Action Plan — Off Piste Studio

**Date:** 2026-03-26
**Based on:** Google Search Console data (March 15–24, 2026)

## Current State

| Metric | Value |
|--------|-------|
| Indexed pages | 28 |
| Not indexed | 44 |
| Peak daily impressions | 61 |
| 404 errors | 3 |
| Discovered, not indexed | 29 |
| Crawled, not indexed | 11 |
| Canonical issues | 1 |
| Total sitemap URLs | 56 |
| Index rate | ~50% |

---

## Priority 1 — Fix Crawl Errors & Blockers

### 1.1 Identify and fix 404 errors (3 pages)
- [ ] Check GSC for the specific URLs returning 404
- [ ] Likely candidates: `/keyword-strategy-report.md`, `/sitemap.xml` (both deleted from root)
- [ ] Set up 301 redirects or remove all references to dead URLs
- [ ] Re-validate in GSC once fixed

### 1.2 Investigate canonical issue (1 page)
- [ ] Check GSC for the URL flagged as "Alternative page with proper canonical tag"
- [ ] Confirm the canonical target is correct and the page should indeed be consolidated
- [ ] If unintentional, fix the canonical tag

---

## Priority 2 — Create Hub/Index Pages

These are missing entirely and are critical for funnelling link equity to the 35 industry + location pages.

### 2.1 Create `/industries` hub page
- [ ] List all 20 industries with unique 1-2 sentence descriptions
- [ ] Include H1: "Website Design by Industry" (or similar)
- [ ] Add JSON-LD (CollectionPage + BreadcrumbList)
- [ ] Add to main navigation (under Services or as top-level)
- [ ] Add to sitemap at priority 0.8
- [ ] Internal link from homepage, service page, and about page

### 2.2 Create `/locations` hub page
- [ ] List all 15 locations with unique 1-2 sentence descriptions
- [ ] Include H1: "Web Design Across Australia" (or similar)
- [ ] Add JSON-LD (CollectionPage + BreadcrumbList)
- [ ] Add to navigation
- [ ] Add to sitemap at priority 0.8
- [ ] Internal link from homepage, service page, and contact page

### 2.3 Add `/tools` landing page to sitemap
- [ ] The page exists but is missing from sitemap.xml
- [ ] Add at priority 0.7

---

## Priority 3 — Expand Thin Content

The 11 "crawled but not indexed" pages are almost certainly template-generated pages that Google deemed too thin or too similar.

### 3.1 Expand industry page content (20 pages)
- [ ] Current average: ~385 words — target: 600–800 words
- [ ] Add unique content per page:
  - Industry-specific statistics or data points
  - A mini case study or project example relevant to the trade
  - Unique problem statements (not just keyword-swapped versions)
  - Industry-specific design considerations (e.g. "electricians need emergency callout CTAs above the fold")
- [ ] Vary section structure — not every page should have the same 6 sections in the same order
- [ ] Add unique opening paragraphs that don't follow a template pattern

### 3.2 Expand location page content (15 pages)
- [ ] Current average: ~460 words — target: 700–900 words
- [ ] Add unique content per page:
  - Local business statistics or market context
  - Specific suburbs, commercial precincts, or business districts
  - Local competitors or market positioning
  - References to local events, councils, or business networks
- [ ] Perth suburb pages (Joondalup, Armadale, etc.) should reference proximity to Perth CBD and local character

### 3.3 Expand service page content
- [ ] Current: ~437 words — target: 800–1000 words
- [ ] Add: process detail, comparison to DIY/template builders, pricing context, tech stack benefits

---

## Priority 4 — Add Missing Service Pages

Only 1 service page exists (`/services/website-design`). These are high-intent keyword targets:

### 4.1 Create new service pages
- [ ] `/services/branding` — Brand identity, logo design, style guides
- [ ] `/services/seo` — Local SEO, on-page optimisation, Google Business Profile
- [ ] `/services/website-maintenance` — Hosting, updates, security, support plans
- [ ] Each page: 800+ words, unique FAQs, JSON-LD Service schema, BreadcrumbList
- [ ] Add all to sitemap at priority 0.9
- [ ] Cross-link from industry and location pages

**Target keywords:**
- "branding agency perth"
- "small business branding australia"
- "local seo services perth"
- "website maintenance plans small business"

---

## Priority 5 — Publish More Insights

5 articles is a start but 15–20+ are needed for topical authority.

### 5.1 High-priority article topics (targeting long-tail, bottom-of-funnel keywords)
- [ ] "How Much Does a Website Cost for a Small Business in Australia?"
- [ ] "Best Website Features for Tradies That Actually Get Leads"
- [ ] "DIY Website vs Professional Web Design: What's the Real Cost?"
- [ ] "How to Get Your Small Business on the First Page of Google"
- [ ] "What Makes a Good Plumber/Electrician/Builder Website?" (series)
- [ ] "Website Redesign Checklist for Small Businesses"
- [ ] "Google Business Profile Optimisation Guide for Local Businesses"
- [ ] "How to Choose a Web Designer in Perth"
- [ ] "Website Speed and Why It Matters for Lead Generation"
- [ ] "The Small Business Owner's Guide to SEO in 2026"

### 5.2 Content requirements per article
- [ ] 1000–1500 words minimum
- [ ] 2–3 inline links to relevant industry pages
- [ ] 1–2 inline links to relevant location pages
- [ ] 1 link to a service page
- [ ] FAQ section with 3–5 questions (for FAQPage schema)
- [ ] Proper Article schema (already implemented)

---

## Priority 6 — Improve Internal Linking

### 6.1 Switch from random to deterministic internal linking
- [ ] Update `generate-pages.mjs` to use related/semantic links instead of random selection
- [ ] Group related industries:
  - Trades: electricians, plumbers, builders, HVAC, roofers, painters, landscapers, pest control, property maintenance, cleaners
  - Professional services: accountants, bookkeepers, lawyers, mortgage brokers, buyers agents, real estate, coaches
  - Health & creative: dentists, physiotherapy, photographers
- [ ] Each industry page links to 4 related industries from its group
- [ ] Each location page links to its 6 most relevant industries

### 6.2 Add contextual links from core pages
- [ ] Homepage: add links to top 5 industries and Perth + 2 other key locations
- [ ] About page: link to service pages and 2–3 industry pages
- [ ] Pricing page: link to service pages and relevant insights
- [ ] Contact page: link to locations hub

### 6.3 Cross-link insights to commercial pages
- [ ] Every existing insight article should include 2–3 inline links to industry/service/location pages
- [ ] Review and update the 5 existing articles with internal links

---

## Priority 7 — Technical SEO Tweaks

### 7.1 Sitemap improvements
- [ ] Add `/tools` landing page to sitemap
- [ ] Add `/industries` hub page once created
- [ ] Add `/locations` hub page once created
- [ ] Verify all URLs resolve with 200 status

### 7.2 Page speed & Core Web Vitals
- [ ] Audit LCP, CLS, INP across page types
- [ ] Ensure images use proper width/height attributes and lazy loading
- [ ] Check font loading isn't blocking render (currently preloading 2 custom fonts + Google Fonts)

### 7.3 Structured data audit
- [ ] Verify all JSON-LD validates in Google's Rich Results Test
- [ ] Ensure AggregateRating (5 stars, 3 reviews) is backed by real reviews
- [ ] Add review/testimonial schema to industry pages with client quotes

---

## Tracking & Milestones

| Week | Target |
|------|--------|
| Week 1 | Fix 404s, canonical issue. Create hub pages. Add /tools to sitemap |
| Week 2 | Expand 10 industry pages to 600+ words. Publish 2 new insights |
| Week 3 | Expand remaining 10 industry pages + 8 location pages. Create 1 new service page |
| Week 4 | Expand remaining 7 location pages. Publish 3 more insights. Create 2nd service page |
| Week 5 | Implement deterministic internal linking. Add contextual links to core pages |
| Week 6 | Full audit — recheck GSC index rate, impressions, and crawl errors |

**Goal:** 90%+ index rate and 200+ daily impressions within 6 weeks.
