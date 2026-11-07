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

The homepage now embeds regular-weight subsets of Geist, Geist Serif and Bebas Neue for ASCII, common punctuation, the copyright symbol and booking arrow. They retain the original glyph outlines, kerning and active default ligatures. Full original faces remain available for other weights, styles and characters. Other page families keep their existing font loading. The embedded faces use `font-display: block` because decoding local font data requires no network round trip; external full faces retain `swap`.

The three font binaries total 28,548 bytes and have a separate 30,000-byte budget. CSS rule budgets continue to exclude binary font data, which is counted separately. The compressed homepage document grows from about 38.6 KB to 68 KB (identical local gzip settings); this trades a larger document for stable initial typography without waiting for three external font downloads. Some full font data can still be requested for other weights/content below the hero.

Reproduce the subsets with `scripts/subset-critical-fonts.py` using Python 3, `fonttools==4.68.0` and `brotli==1.2.1`. These are developer tools only; normal build and CI require no Python dependency. Parent-directory OFL licences and full original fonts are retained.

Validation includes an external-font delay regression check, four viewport widths in both themes, and eight full-page screenshot pairs that are pixel-identical to the previous release. Measured mobile hero CLS changed from approximately 0.018 in the controlled delayed-font baseline to zero after the fix. Lab results and the fresh Google report are recorded on the originating task after release; they do not establish real-user Core Web Vitals.
