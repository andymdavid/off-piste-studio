import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve, basename } from 'path';
import { marked } from 'marked';

const rootDir = resolve('.');
const contentDir = resolve(rootDir, 'content/insights');
const insightsDir = resolve(rootDir, 'insights');
const generatedDir = resolve(rootDir, 'src/generated');

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
  }
};

marked.use({ renderer });

function renderMarkdown(markdown) {
  return marked.parse(markdown);
}

const headerHtml = `
  <header class="duplicate-header" data-duplicate-header data-navigation-status="not-active">
    <div class="duplicate-header__layout">
      <nav class="duplicate-header__nav" aria-label="Primary">
        <div class="duplicate-header__row">
          <a href="/" class="duplicate-header__brand" data-duplicate-nav-close><img src="/public/images/Icon.webp" alt="" class="duplicate-header__mark" aria-hidden="true"><span class="duplicate-header__brand-text">Off Piste Studio</span></a>
          <div class="duplicate-header__links"><a href="/work" class="duplicate-header__link">Work</a><a href="/pricing" class="duplicate-header__link">Pricing</a><a href="/about" class="duplicate-header__link">About</a><a href="/resources" class="duplicate-header__link">Insights</a></div>
          <button class="duplicate-header__menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="duplicate-site-menu" data-duplicate-nav-toggle><span class="duplicate-header__menu-lines" aria-hidden="true"><span></span><span></span></span></button>
        </div>
        <div class="duplicate-header__menu" id="duplicate-site-menu"><div class="duplicate-header__menu-clip"><div class="duplicate-header__menu-inner"><a href="/work" class="duplicate-header__menu-link" style="--item-delay: 120ms" data-duplicate-nav-close><span class="duplicate-header__menu-label">Work</span></a><a href="/pricing" class="duplicate-header__menu-link" style="--item-delay: 185ms" data-duplicate-nav-close><span class="duplicate-header__menu-label">Pricing</span></a><a href="/about" class="duplicate-header__menu-link" style="--item-delay: 250ms" data-duplicate-nav-close><span class="duplicate-header__menu-label">About</span></a><a href="/resources" class="duplicate-header__menu-link" style="--item-delay: 315ms" data-duplicate-nav-close><span class="duplicate-header__menu-label">Insights</span></a><a href="/tools" class="duplicate-header__menu-link" style="--item-delay: 380ms" data-duplicate-nav-close><span class="duplicate-header__menu-label">Tools</span></a><a href="https://cal.com/off-piste-studio/discovery" class="duplicate-header__menu-link" style="--item-delay: 445ms" data-duplicate-nav-close><span class="duplicate-header__menu-label">Book a call</span></a></div></div></div>
      </nav>
      <a href="https://cal.com/off-piste-studio/discovery" class="duplicate-header__side-link">Book a call<svg class="duplicate-header__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7 17L17 7M17 7H8M17 7V16" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
    </div>
  </header>`;

const footerHtml = `
  <footer class="footer footer--current">
    <div class="container">
      <div class="footer__intro-grid"><h2 class="footer__statement">Your expertise deserves a sharper digital presence.</h2><p class="footer__description">Off Piste Studio builds the websites, brand systems and content foundations that help the right people understand what you do, trust your expertise and take the next step.</p></div>
      <div class="footer__sections">
        <div class="footer__section footer__section--sitemap"><h3 class="footer__section-title">Sitemap</h3><div class="footer__link-columns"><nav class="footer__nav" aria-label="Footer sitemap primary"><a href="/work" class="footer__nav-link">Work</a><a href="/about" class="footer__nav-link">About</a><a href="/pricing" class="footer__nav-link">Pricing</a><a href="/resources" class="footer__nav-link">Insights</a></nav><nav class="footer__nav" aria-label="Footer sitemap resources"><a href="/tools" class="footer__nav-link">Tools</a><a href="/industries" class="footer__nav-link">Industries</a><a href="/locations" class="footer__nav-link">Locations</a><a href="https://www.linkedin.com/company/off-piste-studio" class="footer__nav-link" target="_blank" rel="noopener">LinkedIn</a></nav></div></div>
        <div class="footer__section footer__section--tools"><h3 class="footer__section-title">Tools</h3><div class="footer__link-columns"><nav class="footer__nav" aria-label="Footer tools primary"><a href="/tools" class="footer__nav-link">All Tools</a><a href="/tools/color-palette" class="footer__nav-link">Palette Generator</a><a href="/tools/contrast-checker" class="footer__nav-link">Contrast Checker</a><a href="/tools/color-converter" class="footer__nav-link">Colour Converter</a><a href="/tools/brand-color-extractor" class="footer__nav-link">Brand Colour Extractor</a></nav><nav class="footer__nav" aria-label="Footer tools secondary"><a href="/tools/palette-preview" class="footer__nav-link">Palette Previewer</a><a href="/tools/gradient-generator" class="footer__nav-link">Gradient Generator</a><a href="/tools/font-pairing" class="footer__nav-link">Font Pairing</a><a href="/tools/favicon-generator" class="footer__nav-link">Favicon Generator</a><a href="/tools/svg-to-png" class="footer__nav-link">SVG to PNG</a></nav></div></div>
        <div class="footer__section footer__section--contact"><h3 class="footer__section-title">Work with us</h3><div class="footer__contact"><a href="https://cal.com/off-piste-studio/discovery" class="footer__contact-link">Book a Discovery Call</a><a href="mailto:hello@offpistestudio.com" class="footer__contact-link">hello@offpistestudio.com</a></div></div>
      </div>
    </div>
    <div class="footer__brand-wrap"><div class="container footer__bottom"><p class="footer__copyright">&copy; Off Piste Studio 2026 All Rights Reserved</p><p class="footer__location">City Beach, WA</p></div><div class="footer__brand" aria-label="Off Piste Studio"><span class="footer__brand-text" aria-hidden="true">Off Piste Studio</span></div></div>
  </footer>`;

function createArticleHtml(post) {
  const tagsHtml = post.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
        "author": { "@type": "Organization", "name": "Off Piste Studio" },
        "publisher": {
          "@type": "Organization",
          "name": "Off Piste Studio",
          "logo": { "@type": "ImageObject", "url": "https://offpistestudio.com/images/Icon.png" }
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
  <link rel="stylesheet" href="/src/styles/main.css?v=20260614-preview-cursor-replace">
  <link rel="preload" href="/public/fonts/fonnts.com-Alfabet_Regular.otf" as="font" type="font/otf" crossorigin>
  <link rel="preload" href="/public/fonts/fonnts.com-Alfabet_Black.otf" as="font" type="font/otf" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
</head>
<body data-insight-slug="${escapeHtml(post.slug)}">
${headerHtml}
  <main>
    <article class="insight-article">
      <div class="insight-article__frame">
        <section class="insight-article__hero"><div class="insight-article__hero-inner">
          <div class="insight-article__meta"><div class="insight-row__tags">${tagsHtml}</div><p class="insight-article__read-time">${escapeHtml(post.readTime)}</p></div>
          <h1 class="insight-article__title">${escapeHtml(post.title)}</h1>
          <p class="insight-article__intro">${escapeHtml(post.intro)}</p>
        </div></section>
        <section class="insight-article__byline"><div class="insight-article__byline-inner">
          <div class="insight-article__author"><img src="/public/images/Lara.webp" alt="Lara" loading="lazy"><div><p class="insight-article__author-name">Lara at Off Piste Studio</p><p class="insight-article__author-date">${escapeHtml(post.displayDate)}</p></div></div>
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
    <section class="related-posts"><div class="container"><h2 class="related-posts__heading">Related posts</h2><div class="projects__list" data-related-posts></div></div></section>
  </main>
${footerHtml}
  <script type="module" src="/src/js/main.js?v=20260614-preview-cursor-replace"></script>
</body>
</html>
`;
}

mkdirSync(insightsDir, { recursive: true });
mkdirSync(generatedDir, { recursive: true });

const posts = readdirSync(contentDir)
  .filter(file => file.endsWith('.md') && file !== 'README.md')
  .map(file => {
    const { data, body } = parseFrontmatter(readFileSync(resolve(contentDir, file), 'utf8'));
    const tags = data.tags.split(',').map(tag => tag.trim()).filter(Boolean);

    return {
      slug: data.slug || basename(file, '.md'),
      title: data.title,
      description: data.description,
      intro: data.intro,
      date: data.date,
      displayDate: formatDate(data.date),
      readTime: data.readTime,
      tags,
      image: data.image || undefined,
      imageAlt: data.imageAlt || data.title,
      html: renderMarkdown(body)
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

posts.forEach(post => {
  writeFileSync(resolve(insightsDir, `${post.slug}.html`), createArticleHtml(post));
});

const clientPosts = posts.map(({ html, ...post }) => ({
  ...post,
  url: `/insights/${post.slug}`
}));

writeFileSync(
  resolve(generatedDir, 'insights-data.js'),
  `export const INSIGHT_POSTS = ${JSON.stringify(clientPosts, null, 2)};\n`
);
