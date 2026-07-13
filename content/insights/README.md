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
---
```

Optional frontmatter:

```md
updatedDate: 2026-07-12
image: /images/insights/your-post-image.webp
imageAlt: Short description of the image
```

When provided, `updatedDate` appears subtly beside the original publish date on the article page and is used as `dateModified` in Article schema.

When provided, `image` is used as the primary image for homepage/blog feeds before any fallback image mapping.

Supported markdown in the body:

- `## Heading`
- plain paragraphs
- `- list items`
- `> blockquotes`

Then run:

```bash
npm run sync:insights
```

Or just run `npm run dev` / `npm run build`, which now regenerate insights automatically first.
