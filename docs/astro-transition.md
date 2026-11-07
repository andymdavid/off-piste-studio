# Astro transition and local design handoff

This branch migrates the site to static Astro while preserving the existing page layouts, content and both themes. Hero and work-overview redesigns are optional future work and do not block this release. Dark remains the existing default until the final design decision.

## Local development

Use Node >=22.23.4 (the existing Docker build uses Node 24), then:

```sh
npm ci
npm run dev
```

Development runs on port 5173. Build and validate with:

```sh
npm run build
npm run check:site
npm run test:insight-visuals
node scripts/check-publishing.mjs
npx playwright install chromium
npm run test:browser
```

Playwright needs Chromium's operating-system libraries installed. In this managed workspace the browser checks were run with the existing UI Atlas library directory in `LD_LIBRARY_PATH`; that workaround is environment-specific and is not needed on a normally configured local machine.

## Where to edit

- `src/pages/index.astro`: homepage, including its simple static hero. Work overview markup remains here for the operator's redesign.
- `src/pages/{about,work,pricing,resources,tools}.astro`: editable core pages.
- `src/components/{Header,Footer}.astro`: shared site chrome.
- `src/layouts/SiteLayout.astro`: shared document, early saved-theme restoration and common behaviour.
- `src/styles/main.css`: existing design and complete theme variants.
- `src/styles/fonts.css`: self-hosted Geist Sans and Geist Serif from geist 1.9.2 (license included); Serif is limited to large display text. The Next.js font wrapper is not installed.
- `src/pages/tools/*.astro` and `src/js/tools/`: individual tool pages and behaviour. Tool CSS loads only on tool pages.
- `content/{insights,services,industries,locations}/*.md`: publishing sources; validated by `src/content.config.ts` and rendered through dynamic static routes.
- `src/lib/*-renderer.mjs`: preserved content rendering, including custom article visuals and service, industry and location FAQ markup. These keep the established markup stable during migration.
- `src/components/LatestInsights.astro`: homepage cards computed at build time from the content collection.

`Fragment is:raw` protects inherited literal HTML from Astro expression parsing; close/reopen that fragment when inserting a component or expression. Astro components and processed scripts belong outside raw fragments.

The old root HTML files and HTML generators remain as compatibility references for publishing scripts and validation. They are **not** the source for the editable core Astro pages. Do not edit root `index.html` for the redesign. The build still runs the existing sync commands to maintain catalogue and sitemap compatibility; Astro renders articles and services directly from their content collections. `dist/` is generated and is no longer tracked.

## Branch coordination

Start the design branch from `feat/astro-transition` after fetching it:

```sh
 git fetch origin
 git switch -c feat/homepage-design origin/feat/astro-transition
 npm ci
 npm run dev
```

Design changes are optional. The migration PR can be merged once release checks pass. Bring subsequent migration changes into the design branch through normal Git merges; avoid rewriting shared branch history. The original workspace's uncommitted changes were not included. Reconcile any intended unpublished content separately before release.

## Performance changes

- Removed the homepage WebGL loop and its 5.8 MB texture request.
- Replaced external font stylesheets and OTF preloads with bundled WOFF2 assets.
- Added responsive, build-optimised homepage case-study imagery.
- Rendered latest and related article cards at build time.
- Lazy-loaded the article catalogue only where client filtering needs it.
- Preserved .html output, all published industry/location routes, the industry hub redirect and extensionless nginx routing.
- Removed unsupported robots directives and the redirected industry hub from the sitemap; included service and contact routes.

## Release validation

Release is independent of a redesign. Validate against the current published site and keep dark as the current default. Production deploy follows the existing GitHub `deployed` branch webhook, after PR checks and merge. The old dirty checkout remains untouched; its unpublished changes are outside this release. Do not reset or switch that checkout.

Local Nginx validation exercises the actual site configuration, including status codes, query-preserving redirects, gzip, HTML revalidation and cache policies. The test wrapper changes only the listening port, document root and temporary paths. CapRover tracking tools returned HTTP 403 in this session; direct version-record verification is unavailable. `/release.json` exposes a deterministic source digest so the actual public deployment can be matched to this release without claiming an unavailable CapRover version.

Field Core Web Vitals need real-user data after release. Legacy HTML generator commands remain intentionally available for existing publishing automation; the production renderer uses Astro collections and shared templates. Removing every compatibility file or restyling the whole CSS file is not a requirement for a completed migration.

## Recorded validation (7 November 2026)

- Release candidate: 171 static pages, 169 sitemap URLs; all existing industry and location pages restored. The industry hub retains its existing noindex/meta-refresh behaviour.
- Output audit covers local assets, valid JSON-LD and internal links. `MIGRATION_PARITY=1 npm run check:site` also checks original titles, descriptions, canonical URLs and primary headings against the legacy references.
- Five article-visual unit tests and build-time article visual verification pass.
- 28 browser checks pass on mobile and desktop through Nginx: both themes and layout widths, every tool loading, colour conversion, locked palettes and clipboard output, template selection, font preview and snippets, SVG/gradient/favicon downloads with PNG dimension checks, image colour extraction, contact fallback and booking links without JavaScript.
- Publishing smoke test creates a temporary article, checks its rendered page, homepage card and sitemap entry, removes it, rebuilds, and confirms removal from all three outputs. No fixture is released.
- Cache validation: HTML revalidates; hashed Astro assets are immutable for a year; unhashed public images use seven-day caching. The colour-palette HTML alias retains its query string through a 301. Unknown paths return 404.
- Source content changes remove five links to an already-missing article while retaining their text. A real `/contact` page now backs the existing JavaScript enquiry modal links.
- GitHub Actions runs build/output validation, publishing round trip, article-visual tests and browser checks on PRs and main.

Initial measurements from the first foundation were local lab results, not production evidence. Production source digest, HTTP checks and final performance measurements are recorded in the release report/PR after rollout. CapRover version data is unavailable because its tracking API denies this session access.
