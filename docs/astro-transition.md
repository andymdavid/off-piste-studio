# Astro migration audit and completion

The production build uses native Astro pages and layouts, validated Markdown collections and shared components. There are no tracked HTML pages, duplicate document generators or committed generated catalogues. The source of truth is `src/` plus `content/`; generated release files exist only in ignored `dist/`.

## Audit findings, 7 November 2026

The first release used Astro to produce all 171 pages, but retained 173 tracked legacy HTML files. Every build still ran three legacy generators to create duplicate HTML, catalogue JavaScript and a sitemap. Articles and business pages generated full HTML strings in JavaScript, parsed them with Cheerio, then injected extracted sections into Astro. Services bypassed collection validation when reading related industries and locations. The resources index was empty until its generated JavaScript catalogue loaded. Location hub links and schema were hard-coded. The article-visual check read the legacy HTML rather than deployed output. Publishing verification covered only article creation/deletion, and metadata parity relied on the retained legacy files. A redundant Vite 6 peer dependency also remained in the lockfile; deduplication now uses Astro’s existing Vite 8 dependency and npm audit reports zero vulnerabilities. Old OTF font families remained in public output although the site used WOFF2.

These were real maintenance and publishing gaps. GitHub language percentages counted the duplicate source; they did not measure how much of the live site used Astro. No Linguist overrides were added.

## Completion checklist

- [x] Audit tracked source, imports, generators, npm commands, content validation, public assets, browser behaviour, CI and deployment.
- [x] Replace article HTML generation/parsing with `src/pages/insights/[slug].astro`, `ContentHead` and `RelatedPost`.
- [x] Replace industry/service/location HTML generation with `BusinessPage.astro`, shared client/slideshow components and collection-backed routes.
- [x] Keep Markdown rendering and custom insight visuals in focused rendering helpers; remove full-document renderers and duplicate frontmatter parsers.
- [x] Render all resources cards in Astro; progressively enhance filtering and Show More without a catalogue download.
- [x] Generate sitemap from Astro static routes and validated collections; derive location links and schema from collections.
- [x] Remove legacy tracked HTML, generator scripts, generated catalogues, committed sitemap and unused OTF fonts and the unused former WebGL texture.
- [x] Verify custom visuals against `dist/insights`, following frontmatter slugs rather than assuming filenames match.
- [x] Reject duplicate content slugs and validate required industry/location labels.
- [x] Watch content changes in local development, including additions, edits, slug changes and deletion.
- [x] Update publishing commands and repository documentation.
- [x] Validate clean install/build, semantic output parity and publishing create/edit/delete in all collections.
- [x] Validate mobile/desktop browser behaviour, themes, original logo typography, resources filtering and all tools.

Release gate: pass PR CI, merge, deploy and verify the actual live release. Final rollout evidence and release status are tracked in Flight Deck task `103978e7-5452-4818-82a0-7357bff29b1c`, rather than pre-claiming deployment in this source document.

Check the linked PR and Flight Deck task for final commit/deployment evidence. The implementation checks above passed before PR creation.

## Source structure

- `src/pages/`: editable core pages, tools and static dynamic routes.
- `src/layouts/SiteLayout.astro`: shared document, self-hosted fonts, saved-theme restoration and common behaviour.
- `src/layouts/BusinessPage.astro`: service/industry/location content, FAQ, schema and layout.
- `src/components/`: header/footer, metadata, latest/related/resource article cards, client bar and project slideshow.
- `src/content.config.ts` and `src/lib/markdown-loader.ts`: validated collections with development file watching; preserves established line-based frontmatter used by publishing.
- `src/lib/insights.mjs`: Markdown/custom visual rendering and related-post selection.
- `src/lib/page-markdown.mjs`: established business-page Markdown rendering.
- `src/lib/page-links.mjs`: deterministic related-industry/location selection, without HTML document generation.
- `src/pages/sitemap.xml.ts`: collection-backed sitemap endpoint, prerendered during static builds.
- `content/{insights,services,industries,locations}/`: publishing sources.
- `src/js/tools/`, `src/styles/`: existing tools, styles and both complete themes.

Literal `Fragment is:raw` sections in core pages preserve existing HTML/CSS/inline JSON without changing the design. They are inside actual Astro source files, not loaded from legacy HTML. Article Markdown/custom visuals are rendered as HTML fragments at build time. No React, client framework hydration or WebGL is required.

## Publishing contract

Add/edit/delete Markdown under the appropriate collection. `slug` determines the URL and must be unique within that collection. Required fields are validated at build time. Articles require a published date, one or two supported topics and read time; business pages use JSON FAQ arrays. The existing frontmatter syntax is intentionally retained; this migration does not silently reinterpret it as YAML.

Run `npm run build`. Astro regenerates routes, latest/related cards, the resources index, location hub and sitemap. A deleted document disappears from output on the next build. Do not run removed `scripts/generate-*.mjs` files or commit generated files.

The old npm aliases `sync`, `sync:insights`, `sync:pages` and `sync:sitemap` remain as compatibility entry points to the same native build. They write only `dist/`; there is no separate legacy pipeline. External automation must publish Markdown and consume `dist/`, rather than stage root-level HTML. Repository CI exercises this contract; external scheduled runs have not been triggered as part of this migration.

`npm run test:publishing` exercises creation, edit and deletion across all four content families, including a slug different from the filename, special characters in metadata/schema, homepage/resources/location-hub updates, last-modified dates, sitemap cleanup and duplicate-slug rejection. Fixtures are removed in `finally` and a final release rebuild follows. Do not run it concurrently with another build.

## Behaviour preserved

The migration retains current layouts, content, 171 HTML pages, 169 sitemap URLs, extensionless and existing HTML-file access, tool query-string redirects, dark default, full light mode and saved preference. Header/footer logos use self-hosted Bebas Neue independently of Geist Sans/Geist Serif site typography. Optional hero/work-overview redesigns are separate work. The homepage hero remains simple and has no WebGL or large texture request.

The archived homepage and industry hub retain their existing URLs and indexability/redirect behaviour. Existing service-page `noindex` directives are preserved rather than silently changing an editorial/search decision. Their presence deserves a separate SEO decision; it is not caused by Astro. Native JSON serialization corrects the old HTML entity encoding inside the website-maintenance service schema.

## Deployment and coordination

Use a branch from current `origin/main` for design work. Do not reset/switch the original dirty `/workspace/off-piste-studio` checkout or include its unpublished changes. This migration uses the isolated `/workspace/lara/mycode/off-piste-astro` working copy.

GitHub Actions validates PRs/main. Merge validated source, fast-forward GitHub `deployed`, then verify the live site. Nginx serves only `dist/`, with HTML revalidation, one-year immutable hashed Astro assets, seven-day unhashed image caching and relative query-preserving redirects behind the TLS proxy. `/release.json` identifies the deployed source digest. CapRover's tracking API denies this session access, so do not claim a CapRover version from unavailable records. Actual public routes and release digest provide deployment evidence.

Field Core Web Vitals need real-user data. Local or Lighthouse lab results do not prove field performance or conversions.

## Validation evidence before PR

- `npm ci`: clean install, zero audit vulnerabilities after deduplicating the redundant Vite peer.
- `npm run build`: 171 HTML pages, 169 sitemap URLs, final-output visuals, metadata, assets, internal links and schema checks pass.
- Previous-release comparison: all 169 sitemap URLs preserved exactly. Across all 171 pages, titles/descriptions/canonicals/robots/H1s, main headings/links/images and schema preserved, except the deliberately added server-rendered resources catalogue and corrected literal ampersand in one service schema. Main text was compared with insignificant HTML whitespace normalised.
- `npm run test:publishing`: all four collections create/edit/delete correctly; special-character schema, frontmatter slugs, cards, location hub, sitemap/lastmod and duplicate-slug rejection pass.
- `npm run test:publishing:dev`: add/edit/slug-rename/delete updates without restarting Astro; fixture and temporary server removed.
- Five custom article-visual unit tests pass.
- 34 mobile/desktop Playwright tests pass through the production Nginx configuration, including all nine tools, both themes, brand fonts, no-JS resources and resources filter/Show More.
- `check-host` against local Nginx passes actual source digest, 169 routes, 301 scheme/query preservation, unknown 404 and HTML/hashed asset caching.

Legacy HTML removal does not require changing content or chasing a particular GitHub language percentage. Normal HTML generated into `dist/` is the intended output of a static Astro website.
