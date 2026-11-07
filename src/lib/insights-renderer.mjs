// Preserve the established Markdown and custom insight-visual rendering.
import { marked } from 'marked';
import { renderInsightModule, renderInsightVisual } from '../../scripts/render-insight-visual.mjs';
const INSIGHT_TOPICS = ['AI & Automation', 'SEO & Search', 'Content & Brand', 'Websites & UX', 'Growth & Leads', 'Small Business'];
function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function parseFrontmatter(fileContents) {
  const match = fileContents.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (!match) {
    throw new Error('Missing frontmatter block.');
  }

  const [, frontmatterBlock, body] = match;
  const data = {};

  frontmatterBlock.split('\n').forEach(line => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    data[key] = value;
  });

  return { data, body: body.trim() };
}

function formatDate(dateValue) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(`${dateValue}T00:00:00`));
}

const renderer = {
  heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    if (depth === 2) return `<h2 class="insight-article__section-title">${text}</h2>\n`;
    if (depth === 3) return `<h3 class="insight-article__sub-title">${text}</h3>\n`;
    return `<h${depth}>${text}</h${depth}>\n`;
  },
  blockquote({ tokens }) {
    const body = this.parser.parse(tokens);
    return `<blockquote class="insight-article__quote">${body}</blockquote>\n`;
  },
  image({ href, title, text }) {
    const titleAttr = title ? ` title="${title}"` : '';
    return `<figure class="insight-article__figure"><img src="${href}" alt="${text}" loading="lazy"${titleAttr}>${text ? `<figcaption>${text}</figcaption>` : ''}</figure>\n`;
  },
  code({ text, lang }) {
    if (lang === 'insight-visual') return renderInsightVisual(text);
    if (lang === 'insight-module') return renderInsightModule(text);

    const languageClass = lang ? ` class="language-${escapeHtml(lang)}"` : '';
    return `<pre><code${languageClass}>${escapeHtml(text)}</code></pre>\n`;
  }
};

marked.use({ renderer });

function renderMarkdown(markdown) {
  return marked.parse(markdown);
}

function parseListValue(value) {
  if (!value) return [];
  return value.split(',').map(item => item.trim()).filter(Boolean);
}

function validateTopics(value, slug) {
  const topics = parseListValue(value);
  if (topics.length < 1 || topics.length > 2) throw new Error(`${slug} requires one or two topics.`);
  const invalid = topics.filter(topic => !INSIGHT_TOPICS.includes(topic));
  if (invalid.length) throw new Error(`${slug} has unsupported topics: ${invalid.join(', ')}.`);
  return topics;
}

function getRelatedPosts(post, allPosts, count = 3) {
  const postsBySlug = new Map(allPosts.map(candidate => [candidate.slug, candidate]));
  const manualPosts = post.relatedPosts
    .map(slug => postsBySlug.get(slug))
    .filter(Boolean)
    .filter(candidate => candidate.slug !== post.slug);
  const manualSlugs = new Set(manualPosts.map(candidate => candidate.slug));
  const currentTags = new Set(post.tags);

  const scoredPosts = allPosts
    .filter(candidate => candidate.slug !== post.slug && !manualSlugs.has(candidate.slug))
    .map(candidate => {
      const sharedTags = candidate.tags.filter(tag => currentTags.has(tag)).length;
      const sameCluster = post.cluster && candidate.cluster === post.cluster ? 1 : 0;

      return {
        post: candidate,
        score: sameCluster * 100 + sharedTags * 10
      };
    })
    .filter(candidate => candidate.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.date) - new Date(a.post.date);
    })
    .map(candidate => candidate.post);

  const selectedSlugs = new Set([...manualSlugs, ...scoredPosts.map(candidate => candidate.slug)]);
  const fallbackPosts = allPosts
    .filter(candidate => candidate.slug !== post.slug && !selectedSlugs.has(candidate.slug))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return [...manualPosts, ...scoredPosts, ...fallbackPosts].slice(0, count);
}

function createRelatedPostCardHtml(post) {
  const tagsHtml = post.topics.map(topic => `<span>${escapeHtml(topic)}</span>`).join('');

  return `<article class="related-posts__card insight-card">
    <a href="/insights/${escapeHtml(post.slug)}" class="insight-card__link" aria-label="Read ${escapeHtml(post.title)}">
      <div class="insight-card__content">
        <div class="insight-card__top">
          <div class="insight-card__meta">
            <span>${escapeHtml(post.readTime)}</span>
          </div>
          <div class="insight-card__tags">
            ${tagsHtml}
          </div>
        </div>
        <h3 class="insight-card__title">${escapeHtml(post.title)}</h3>
        <p class="insight-card__description">${escapeHtml(post.description)}</p>
      </div>
    </a>
  </article>`;
}

function createArticleHtml(post, allPosts) {
  const tagsHtml = post.topics.map(topic => `<span>${escapeHtml(topic)}</span>`).join('');
  const updatedDateHtml = post.displayUpdatedDate
    ? ` <span class="insight-article__updated-date">(Updated ${escapeHtml(post.displayUpdatedDate)})</span>`
    : '';
  const relatedPostsHtml = getRelatedPosts(post, allPosts)
    .map(createRelatedPostCardHtml)
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/favicon.ico" sizes="any">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <meta name="description" content="${escapeHtml(post.description)}">
  <title>${escapeHtml(post.title)} | Off Piste Studio</title>
  <link rel="canonical" href="https://offpistestudio.com/insights/${escapeHtml(post.slug)}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": ${JSON.stringify(post.title)},
        "description": ${JSON.stringify(post.description)},
${post.image ? `        "image": "https://offpistestudio.com${escapeHtml(post.image)}",\n` : ''}\
        "datePublished": "${escapeHtml(post.date)}",
        "dateModified": "${escapeHtml(post.updatedDate || post.date)}",
        "author": { "@type": "Person", "name": "Lara" },
        "publisher": {
          "@type": "Organization",
          "name": "Off Piste Studio",
          "logo": { "@type": "ImageObject", "url": "https://offpistestudio.com/images/off-piste-mark-transparent.png" }
        },
        "url": "https://offpistestudio.com/insights/${escapeHtml(post.slug)}"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://offpistestudio.com/" },
          { "@type": "ListItem", "position": 2, "name": "Insights", "item": "https://offpistestudio.com/resources" },
          { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(post.title)}, "item": "https://offpistestudio.com/insights/${escapeHtml(post.slug)}" }
        ]
      }
    ]
  }
  </script>
  <link rel="stylesheet" href="/src/styles/main.css?v=20260717-about-logo-scale-v76">
  <link rel="preload" href="/public/fonts/fonnts.com-Alfabet_Regular.otf" as="font" type="font/otf" crossorigin>
  <link rel="preload" href="/public/fonts/fonnts.com-Alfabet_Black.otf" as="font" type="font/otf" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
</head>
<body data-page-type="insight" data-insight-slug="${escapeHtml(post.slug)}">

  <main>
    <article class="insight-article">
      <div class="insight-article__frame">
        <section class="insight-article__hero"><div class="insight-article__hero-inner">
          <div class="insight-article__meta"><div class="insight-row__tags">${tagsHtml}</div><p class="insight-article__read-time">${escapeHtml(post.readTime)}</p></div>
          <h1 class="insight-article__title">${escapeHtml(post.title)}</h1>
          <p class="insight-article__intro">${escapeHtml(post.intro)}</p>
        </div></section>
        <section class="insight-article__byline"><div class="insight-article__byline-inner">
          <div class="insight-article__author"><img src="/images/Lara.webp" alt="Lara" loading="lazy"><div><p class="insight-article__author-name">Lara at Off Piste Studio</p><p class="insight-article__author-date">${escapeHtml(post.displayDate)}${updatedDateHtml}</p></div></div>
          <div class="insight-article__share">
            <p class="insight-article__share-label">Share</p>
            <div class="insight-article__share-buttons">
              <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://offpistestudio.com/insights/${escapeHtml(post.slug)}" target="_blank" rel="noopener" aria-label="Share on LinkedIn" class="insight-article__share-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></a>
              <a href="https://twitter.com/intent/tweet?url=https://offpistestudio.com/insights/${escapeHtml(post.slug)}&text=${encodeURIComponent(post.title)}" target="_blank" rel="noopener" aria-label="Share on X" class="insight-article__share-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
              <button type="button" aria-label="Copy link" class="insight-article__share-btn" data-copy-url="https://offpistestudio.com/insights/${escapeHtml(post.slug)}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></button>
            </div>
          </div>
        </div></section>
        <section class="insight-article__body"><div class="insight-article__body-inner">
          ${post.html}
        </div></section>
      </div>
    </article>
    <section class="related-posts"><div class="container"><h2 class="related-posts__heading">Related posts</h2><div class="related-posts__grid" data-related-posts>${relatedPostsHtml}</div><div class="related-posts__blank" aria-hidden="true"></div></div></section>
  </main>

  <script type="module" src="/src/js/main.js?v=20260709-logo-preload-v1"></script>
</body>
</html>
`;
}


export { renderMarkdown, createArticleHtml };
