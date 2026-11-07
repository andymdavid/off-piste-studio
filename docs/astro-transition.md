# Astro transition and local design handoff

This branch migrates the site to static Astro while preserving the existing page layouts, content and both themes. Hero and work-overview redesigns belong in the operator's design branch. Dark remains the existing default until the final design decision.

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
- `content/insights/*.md`, `content/services/*.md`: publishing sources; validated by `src/content.config.ts` and rendered through dynamic static routes.
- `src/lib/*-renderer.mjs`: preserved content rendering, including custom article visuals and service FAQ markup. These keep the established markup stable during migration.
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

Keep the migration PR open until design changes and release checks are reviewed. Bring subsequent migration changes into the design branch through normal Git merges; avoid rewriting shared branch history. The original workspace's uncommitted changes were not included. Reconcile any intended unpublished content separately before release.

## Performance changes

- Removed the homepage WebGL loop and its 5.8 MB texture request.
- Replaced external font stylesheets and OTF preloads with bundled WOFF2 assets.
- Added responsive, build-optimised homepage case-study imagery.
- Rendered latest and related article cards at build time.
- Lazy-loaded the article catalogue only where client filtering needs it.
- Preserved .html output and extensionless nginx routing; retained retired-page redirects.
- Removed unsupported robots directives and retired URLs from the sitemap; included service routes.

## Release checks still required

Review responsive typography and both themes with the design changes. Check all tool interactions and publishing automation in the intended preview environment. Repeat mobile Lighthouse on the production-like host; local preview scores are directional and do not establish production or field Core Web Vitals. Verify redirect HTTP status codes through nginx/hosting, because Astro preview does not use nginx.conf. Confirm any intentional unpublished work from other checkouts is reconciled. No deployment or managed-service restart is part of this branch preparation.

## Recorded validation (7 November 2026)

- Production build: 133 static HTML pages, including the existing archived homepage route.
- Output audit: 132 sitemap URLs resolve to generated pages; titles, canonical URLs, descriptions and main headings match the legacy page sources. Local script/stylesheet/image assets exist and JSON-LD parses.
- Five existing article-visual unit tests pass; article visual verification passes during build.
- Eight Playwright checks pass across mobile and desktop: theme persistence, representative pages and all nine tools loading without JS errors or missing local assets, contrast-calculator updates, and homepage asset/font invariants.
- Initial local mobile Lighthouse: homepage performance 100, LCP 0.9s, TBT 0–10ms; responsive-image iteration transferred about 543 KiB. Article performance 100, LCP 0.9s, TBT 20ms; contrast tool performance 100, LCP 1.1s, TBT 0ms. These are local-host lab measurements, not a controlled production comparison. Homepage accessibility still has inherited contrast findings; article and sampled tool scored 100 for accessibility in these runs.

Production deployment, hosted redirect verification, full interaction coverage for every tool, and field performance remain release checks. No new production performance claim is made by this handoff.
