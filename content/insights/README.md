# Insights Markdown Conventions

Add one `.md` file per post in this folder.

Required frontmatter:

```md
---
title: Your post title
slug: your-post-slug
description: One sentence used on the insights index and meta description
intro: Intro paragraph shown under the article title
date: 2026-03-09
readTime: 6 min read
tags: SEO, AI
cluster: AI Search Visibility
---
```

Optional frontmatter:

```md
updatedDate: 2026-07-12
relatedPosts: building-your-website-for-llms, google-sge-and-seo
image: /images/insights/your-post-image.webp
imageAlt: Short description of the image
```

When provided, `updatedDate` appears subtly beside the original publish date on the article page and is used as `dateModified` in Article schema.

When provided, `cluster` is used to choose related posts and strengthen internal linking around the topical map.

When provided, `relatedPosts` pins specific insight slugs ahead of the automatic cluster and tag matching.

When provided, `image` is used as the primary image for homepage/blog feeds before any fallback image mapping.

Supported markdown in the body:

- `## Heading`
- plain paragraphs
- `- list items` only when the point genuinely works better as a sequence, checklist, taxonomy, or parallel set
- markdown tables when comparison is useful and every column has a short, scannable label
- `> blockquotes`

Editorial pass before publishing:

- cut filler sentences, throat-clearing, repeated ideas, vague intensifiers, and generic transitions
- keep a detail only when it changes the reader's understanding or decision
- prefer concrete nouns, active verbs, and specific evidence over expansive explanation
- if a paragraph says the same thing twice, keep the sharper version

Then run:

```bash
npm run sync:insights
```

Or just run `npm run dev` / `npm run build`, which now regenerate insights automatically first.
