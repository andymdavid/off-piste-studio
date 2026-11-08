# Homepage performance and restored navigation

This pass ports the existing glyph/navigation work from local `main` at `4e344d1` into the native Astro application. It does not merge the old Vite application, generated HTML, content edits or WebGL hero.

## Changes

- Header and hero marks use the shared SVG block registry. Header hover/focus and occasional idle winks use cancellable animations, respect reduced motion and suspend while the document is hidden. No raster mark request is required. The controller reuses the server-rendered initial geometry, measures the studio wordmark only when its panel opens, and batches glyph layout reads before writes during morphs.
- Restored the centred expandable header, wordmark home link, studio-information overlay and glyph feedback in the nine existing tools. Both theme palettes and original Bebas Neue wordmarks are retained; body typography remains Geist/Geist Serif. Closed menus and the information dialog are inert; keyboard focus returns to the menu control when a utility becomes hidden.
- Client bars use Astro-generated, fingerprinted responsive WebP variants at 120/240/360 pixels. Intrinsic dimensions come from the image metadata instead of approximated dimensions. Full-size originals remain available to other uses.
- Rotating testimonial logos have intrinsic dimensions from their actual files; source changes update dimensions atomically and failed downloads leave the current logo intact.
- Preload upright Geist and Bebas Neue, plus Geist Serif on the homepage. Italic fonts are not preloaded.
- The homepage embeds its minified styles in its head. This deliberately trades cache reuse of CSS on repeat home visits for zero blocking stylesheet round trips on initial visits. All homepage content is styled immediately; there is no deferred stylesheet flash. Other page families keep their cacheable external bundles. The shared navigation styles follow page styles to retain the source header's cascade.

## What the supplied PageSpeed report establishes

Report `e5aydcbzjg` (7 November 2026, mobile) scored 98/100. Speed Index was 4.3 seconds, accounting for the remaining two displayed points. FCP/LCP were 1.1 seconds, TBT 0 ms, CLS 0.024.

Its opportunities were image delivery (about 108 KiB), blocking CSS (estimated 600 ms), caching (about 12 KiB), unsized testimonial images and font/image-related layout shifts. These estimates are not additive promises of saved wall-clock time. The header raster alone was 768×768 for a reported display size near 55×55, with about 63 KiB avoidable transfer. The new SVG eliminates it rather than recompressing it.

All client-bar and testimonial raster sources on the homepage are WebP. The repository also contains PNG/JPEG assets; vector icons and the new glyph are SVG, which should remain vector.

## Animation findings

Browser inspection found no entrance fade/slide on the hero heading, copy or booking action: their computed opacity is 1 from the first rendered state. The active initial animations are the small scroll-arrow bounce and the client marquee. Existing footer and testimonial effects are further down the page. No evidence currently justifies deleting these interactions to improve initial rendering.

Three cold local mobile baseline Lighthouse runs already scored 100, with Speed Index near 1.20 seconds. Consequently local scores alone cannot establish that the changes improve Google's remote test, or guarantee a score of 100 for every network/test run. Compare repeated production runs and actual metrics rather than a single score.

## Validation

The automated browser suite covers navigation, utility controls, both themes, responsive geometry, reduced motion, glyph error/success feedback, all nine tools and publishing behaviour. Registry tests cover geometry, cancellation/retargeting, aliases and compiled Astro fallbacks. Static checks retain URL, asset, schema, CSS ownership and payload-budget validation.

Measurements and release evidence are recorded on the originating Flight Deck task; no field Core Web Vitals claim is made from lab measurements.

## Follow-up: late web fonts in the Google mobile report

Google report [bb4rjbi5ei](https://pagespeed.web.dev/analysis/https-offpistestudio-com/bb4rjbi5ei?form_factor=mobile) scored 99 with FCP/LCP 1.1 seconds, TBT 0 ms, Speed Index 2.8 seconds and CLS 0.025. A controlled font-delay test reproduced movement of the centred hero: late Geist changed the copy line count/height. Delaying logos alone did not reproduce it.

The homepage now embeds subsets of Geist (retaining variable weights), Geist Serif and Bebas Neue for ASCII, common punctuation, the copyright symbol and both interface arrows. They retain the original glyph outlines, kerning and active default ligatures. Full original faces remain available for other styles and characters. Other page families keep their existing font loading. The embedded faces use `font-display: block` because decoding local font data requires no network round trip. A small head script starts decoding the subset faces before the first body layout; external full faces retain `swap`.

The three font binaries total 38,752 bytes and have a separate 40,000-byte budget. CSS rule budgets continue to exclude binary font data, which is counted separately. The compressed homepage document grows from about 38.6 KB to 78.3 KB (identical local gzip settings); this trades a larger document for stable initial typography without waiting for three external font downloads. The current homepage needs no external font request; full fonts remain available if future content introduces characters outside the subsets.

Reproduce the subsets with `scripts/subset-critical-fonts.py` using Python 3, `fonttools==4.68.0` and `brotli==1.2.1`. These are developer tools only; normal build and CI require no Python dependency. Parent-directory OFL licences and full original fonts are retained.

Validation includes an external-font delay regression check, four viewport widths in both themes, and eight full-page screenshot pairs that are pixel-identical to the previous release. Measured mobile hero CLS changed from approximately 0.018 in the controlled delayed-font baseline to zero after the fix. Lab results and the fresh Google report are recorded on the originating task after release; they do not establish real-user Core Web Vitals.

## Follow-up: transport compression

Google report [ul4gkw0j40](https://pagespeed.web.dev/analysis/https-offpistestudio-com/ul4gkw0j40?form_factor=mobile) confirms CLS 0 and TBT 0 after the font fix. FCP/LCP are 1.3 seconds and Speed Index remains 2.7 seconds. The document transfers 90.65 KiB including response overhead. Its unused-CSS estimate includes offscreen styles and embedded-font rules; rendered-font and screenshot checks confirm the embedded fonts are used, so the font warning does not establish that those faces can be deleted.

The Nginx server had no explicit compression level and therefore used the default level 1. Level 6 was tested against exactly the same built files: homepage gzip body 92,586 to 78,847 bytes (14.8% smaller), shared CSS 15,035 to 11,033 (26.6%), main JS 8,669 to 7,445 (14.1%). Decompressed SHA-256 hashes match for every pair. This reduces transfer without changing typography, layout, resource order or caching rules. These measurements describe response bodies; PageSpeed also includes protocol overhead in its transfer figures.

A controlled four-second controller delay produced zero differing pixels in the initial mobile viewport with incidental animation disabled. The module chain can delay interaction readiness, but this experiment does not identify it as the cause of the slower visual completion. Cache savings were estimated at 0 KiB and the remaining image opportunity was approximately 9 KiB, making document/CSS delivery the stronger lead. A Google-hosted 100 still requires a fresh report; independent local 100s are not substituted for that acceptance criterion.

## Follow-up: desktop and GTmetrix

Google report `x1mtrc9b8g` confirms mobile Performance 100; its desktop result is 99 with FCP/LCP 0.4 s, TBT/CLS 0 and Speed Index 1.2 s. The GTmetrix PDF generated 2026-11-08 02:36 -0700 (Seattle, Chrome 154, Lighthouse 12.6.1) scores Performance 97 / Structure 98, LCP 1.0 s, TBT 0, CLS 0 and Speed Index 1.1 s. Its connection time is 347 ms versus 163 ms backend processing. Different locations and lab configurations mean a local score does not establish either hosted result.

The work overview previously declared the same `sizes` for both grid rows, including `100vw` at tablet widths where the cards are much narrower. Responsive sizes now follow the actual grid. Bottom-row assets are cropped to the existing centred square framing at build time, retaining WebP quality and the original source files. Measured transfer for the five images at DPR 1 falls from 161,560 to 67,944 bytes at 390 px, from 296,816 to 41,054 at 768 px, and from 161,560 to 117,654 at 1366 px. The 1440 px comparison is 161,560 to 133,186 bytes. These are image-transfer measurements, not promised score gains.

The homepage now removes shared CSS selector branches explicitly restricted to another body page type. A build-time CSS AST transformation handles quoted and minified unquoted attributes, preserving order, media queries, both themes, interactive states and generic rules. It deliberately retains nested/negated selectors. Other page stylesheets are unchanged. Homepage CSS rules fall from about 195 KB to 178 KB, with an enforced 185 KB ceiling; embedded font binaries remain separately budgeted.

Validation: three stylesheet transformation tests, 46 browser tests, default computed layout comparisons at seven viewport widths in both themes, and open-menu comparisons on mobile and desktop. Images retain the existing layout/framing, with expected pixel differences from resampling. Local candidate Lighthouse scores 100 on mobile and desktop with CLS 0; fresh production and hosted reports remain acceptance checks rather than substituting these local runs.
