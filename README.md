# Off Piste Studio

Static Astro website. All deployed pages are rendered from `src/pages/` and validated Markdown collections in `content/`. Build output lives only in ignored `dist/`.

## Develop

Use Node >=22.23.4 (Docker and CI use Node 24.22.1):

```sh
npm ci
npm run dev
```

## Validate

```sh
npm run build
npm run test:insight-visuals
npm run test:publishing
npm run test:publishing:dev
npx playwright install --with-deps chromium
npm run test:browser
```

`build` compiles Astro, verifies article visuals against the final output, writes the release manifest, and checks routes, assets, metadata, JSON-LD, internal links and sitemap coverage. `test:publishing` temporarily creates, edits and deletes content in all four collections and leaves a clean final build. Run it in an isolated working copy, without concurrent builds.

## Edit and publish

- Pages: `src/pages/**/*.astro`.
- Shared header/footer: `src/components/{Header,Footer}.astro`.
- Shared document and business-page layout: `src/layouts/`.
- Articles, services, industries, locations: `content/<collection>/*.md`.
- Typography: `src/styles/fonts.css`; logos retain Bebas Neue, site text uses Geist/Geist Serif.
- Tools: `src/pages/tools/` and `src/js/tools/`.

Publishing changes Markdown sources, then runs `npm run build`. Do not create or commit HTML, catalogue JavaScript or a sitemap. Astro derives the pages, article cards, resources index, location hub and sitemap from source. Frontmatter remains the existing unquoted, one-key-per-line format; see [publishing conventions](content/insights/README.md).

Open a PR into `main`; GitHub Actions validates the build and publishing/browser tests. The existing CapRover webhook watches GitHub `deployed`, which is fast-forwarded from validated `main`. Check the live `/release.json` source digest and run `node scripts/check-host.mjs https://offpistestudio.com` after deployment.

See [migration audit and completion checklist](docs/astro-transition.md) for implementation details and constraints.

See the [CSS audit](docs/css-audit.md) for stylesheet ownership, measured payload reductions, CSS budgets and before/after comparison commands.
