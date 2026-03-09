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
