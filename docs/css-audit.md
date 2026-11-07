# CSS audit and optimisation

The site now delivers shared styles plus the current page's CSS. Each tool also loads its own UI styles. This pass preserves the existing design, both themes, original logo fonts, archived homepage and interactive states.

## Findings and changes

Before this audit, every page loaded one 358,854-byte minified stylesheet; tools added another 49,644 bytes. The shared source contained homepage-specific rules, article visuals, retired page variants and styles for every tool. Astro already minified and fingerprinted these assets, but minification alone did not make them page-specific.

The source was checked against Astro templates, content, all existing built pages, JavaScript-created UI and the Markdown visual renderer. The audit removed 430 selector branches requiring classes absent from those sources, 11 earlier exact duplicate rules and 31 earlier duplicate declarations. Runtime state classes, the full article visual vocabulary and dynamically assembled font-pairing mood classes were retained. This was a source audit; there is no automatic production purge that could silently remove future interactive styles.

Styles now live in:

- `src/styles/site/shared.css`: reset, tokens, shared layout, header/footer, modal and other genuinely shared rules.
- `src/styles/site/home.css`: the current homepage. Its existing `duplicate-home` body identifier remains for theme/interaction compatibility.
- `src/styles/site/{about,work,pricing,resources,locations,tools,tool,insight,archived-home}.css`: page-family styles.
- `src/styles/tools/shared.css`: reusable tool controls and layouts.
- `src/styles/tools/<slug>.css`: each tool's specific UI, including dynamically created elements.
- `src/styles/fonts.css`: the existing self-hosted font definitions and display typography.

`SiteLayout.astro` selects styles from body page type and tool slug. Native Vite CSS URL imports compile/minify/fingerprint the files and rewrite font asset URLs. Only the selected links are emitted into each HTML page; the server-side import map does not ship a browser catalogue or download every CSS file. Shared files cache across navigation. Font definitions are imported into the shared CSS bundle to preserve predictable font loading. There are one or two CSS requests on normal pages and four on tools.

The split retains specificity, media queries, theme variants and fallback values. Different-value overrides and `!important` declarations were not blanket-deleted. Two cascade dependencies were resolved explicitly: the tools filters retain their original centred alignment, and the archived hero inherits the later shared typography instead of resurrecting older values. Comments naming old “final override” positions were replaced by page-local ownership; rule order within each file still matters.

## Measured CSS payload

Bytes below are minified external CSS plus inline style blocks, before transport compression. The reference is main commit `c8fa0274a3b090425034b12d606f824396e2405e`.

| Page | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Homepage | 361,966 | 175,905 | 51.4% |
| About | 358,854 | 92,922 | 74.1% |
| Work | 358,854 | 85,096 | 76.3% |
| Pricing | 358,854 | 93,865 | 73.8% |
| Resources | 358,854 | 85,114 | 76.3% |
| Article with visuals | 358,854 | 106,642 | 70.3% |
| Service page | 358,854 | 70,882 | 80.2% |
| Colour converter | 408,498 | 103,057 | 74.8% |
| Font pairing | 408,498 | 107,780 | 73.6% |

For example, the external homepage CSS gzip size falls from 41,186 to 22,301 bytes (45.9%); the colour converter falls from 49,019 to 16,827 bytes (65.7%). Gzip figures use the same local compression settings for both builds.

Gzip also reduces the transferred bytes; use the audit script's report for per-file compressed figures. Inline CSS compresses together with its HTML, so its independent gzip size is not presented as a network measurement. These are CSS payload measurements, not a claim about field Core Web Vitals or conversions. GitHub's language percentages describe source size and are not a performance target.

## Checks and maintenance

`npm run build` now runs `npm run check:css`. It checks every site page's CSS byte budget, stylesheet count, referenced CSS assets and page/tool bundle ownership. The preserved industry redirect has no site CSS. Budgets have headroom for normal changes; investigate growth rather than automatically raising them.

To compare two running builds:

```sh
CSS_REFERENCE_URL=http://localhost:8088 \
CSS_CANDIDATE_URL=http://localhost:8087 \
npm run check:css:parity
```

`check:css:parity` compares computed layout/typography/colour/border styles for every body element and its `::before`/`::after` at 390, 768, 1024 and 1440 pixels, in both themes. Defaults cover all page families, every tool and articles with editorial modules/charts. It waits for fonts/images, fixes randomised content, disables smooth scrolling/transitions/animations for stable comparison and synchronises scroll state. It reports differences and fails if any are found. Set `CSS_CASES`, `CSS_WIDTHS`, `CSS_STATE` and `CSS_OUTPUT` to target a route/state or save the JSON evidence. Available states are default, menu, lead, faq, hover, focus and scrolled. Both servers must be isolated builds of the same content; do not compare against an evolving live site.

Optional payload comparison:

```sh
CSS_BASELINE_DIR=/path/to/reference/dist \
CSS_REPORT_PATH=/tmp/off-piste-css-report.json \
npm run check:css
```

Keep common controls/chrome in shared files. Add page-only rules to their page module and tool-only UI to its slug module. If a component is reused on another family, move its rules into shared CSS or explicitly add the relevant stylesheet; do not silently copy declarations between files. Preserve both themes, responsive breakpoints and dynamic UI states. Use the browser/tool suite and parity comparison for structural CSS changes.

The existing production Nginx rules give these fingerprinted assets immutable caching. No JavaScript rewrite or redesign is part of this CSS pass. Release validation and the final deployed source digest are recorded on the Flight Deck CSS audit task and pull request.

## Validation evidence

- Build/output verification passes: 171 HTML pages, 169 sitemap routes and 170 styled pages passing CSS ownership/size/request/asset checks.
- 200 before/after computed-style comparisons across 25 routes, four widths and both themes pass with no differences.
- 68 additional comparisons of open menu, enquiry/modal, expanded FAQ, hover, keyboard focus and scrolled states pass with no differences.
- After combining fonts into shared CSS, 24 targeted computed-style comparisons and 24 full-page screenshot pairs match exactly. Screenshot captures disable smooth scrolling, motion and rotating client logos, synchronise fonts/header/footer sizing and compare identical viewport/scroll states.
- All 38 functional mobile/desktop Playwright tests pass through production Nginx, including tool calculations/downloads, both themes, original logos, resources and native menu/FAQ/modal interaction.
- Publishing creation/edit/deletion in all four content collections, local dev publishing and all five article-visual unit tests pass. Temporary fixtures are removed.
- Development CSS is also checked in a real browser on the home, about and colour-converter routes, including logo/display fonts and missing-asset/JavaScript errors.

The PR and Flight Deck task record CI and live-release verification separately after rollout.
