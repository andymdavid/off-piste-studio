# Homepage performance and restored navigation

This pass ports the existing glyph/navigation work from local `main` at `4e344d1` into the native Astro application. It does not merge the old Vite application, generated HTML, content edits or WebGL hero.

## Changes

- Header and hero marks use the shared SVG block registry. Header hover/focus and occasional idle winks use cancellable animations, respect reduced motion and suspend while the document is hidden. No raster mark request is required.
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
