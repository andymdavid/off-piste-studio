import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve, basename } from 'path';

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

function renderMarkdown(markdown) {
  const lines = markdown.split('\n');
  const html = [];
  let paragraph = [];
  let listItems = [];
  let quote = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${escapeHtml(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    html.push(`<ul>${listItems.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`);
    listItems = [];
  };

  const flushQuote = () => {
    if (!quote.length) return;
    html.push(`<blockquote class="insight-article__quote">${escapeHtml(quote.join(' '))}</blockquote>`);
    quote = [];
  };

  lines.forEach(line => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      flushQuote();
      return;
    }

    if (trimmed.startsWith('## ')) {
      flushParagraph();
      flushList();
      flushQuote();
      html.push(`<h2 class="insight-article__section-title">${escapeHtml(trimmed.slice(3))}</h2>`);
      return;
    }

    if (trimmed.startsWith('- ')) {
      flushParagraph();
      flushQuote();
      listItems.push(trimmed.slice(2));
      return;
    }

    if (trimmed.startsWith('> ')) {
      flushParagraph();
      flushList();
      quote.push(trimmed.slice(2));
      return;
    }

    flushList();
    flushQuote();
    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();
  flushQuote();

  return html.join('\n');
}

function createArticleHtml(post) {
  const tagsHtml = post.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${escapeHtml(post.description)}">
  <title>${escapeHtml(post.title)} | Off Piste Studio</title>
  <link rel="stylesheet" href="/src/styles/main.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</head>
<body data-insight-slug="${escapeHtml(post.slug)}">
  <header class="header">
    <div class="header__inner">
      <button class="header__menu-toggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav class="header__nav">
        <a href="/work.html" class="header__nav-link">Work</a>
        <a href="/about.html" class="header__nav-link">About</a>
        <div class="header__nav-item header__nav-item--dropdown is-active"><button class="header__nav-link header__nav-toggle" type="button" aria-expanded="false" aria-haspopup="true">Resources</button></div>
      </nav>
      <a href="/" class="header__logo"><span class="header__logo-letter">O</span><span class="header__logo-letter">f</span><span class="header__logo-letter">f</span><span class="header__logo-space"> </span><span class="header__logo-letter">P</span><span class="header__logo-letter">i</span><span class="header__logo-letter">s</span><span class="header__logo-letter">t</span><span class="header__logo-letter">e</span><span class="header__logo-space"> </span><span class="header__logo-letter">S</span><span class="header__logo-letter">t</span><span class="header__logo-letter">u</span><span class="header__logo-letter">d</span><span class="header__logo-letter">i</span><span class="header__logo-letter">o</span></a>
      <a href="/contact.html" class="header__cta">Let's Chat</a>
    </div>
    <div class="header__dropdown"><a href="/resources.html" class="header__dropdown-link active">Insights</a></div>
  </header>
  <main>
    <article class="insight-article">
      <div class="insight-article__frame">
        <section class="insight-article__hero"><div class="insight-article__hero-inner">
          <div class="insight-article__meta"><div class="insight-row__tags">${tagsHtml}</div><p class="insight-article__read-time">${escapeHtml(post.readTime)}</p></div>
          <h1 class="insight-article__title">${escapeHtml(post.title)}</h1>
          <p class="insight-article__intro">${escapeHtml(post.intro)}</p>
        </div></section>
        <section class="insight-article__body"><div class="insight-article__body-inner">
          ${post.html}
        </div></section>
        <section class="insight-article__footer"><div class="insight-article__footer-inner">
          <div class="insight-article__author"><img src="/public/images/Icon.png" alt="Off Piste Studio"><div><p class="insight-article__author-name">By Off Piste Studio</p><p class="insight-article__author-date">${escapeHtml(post.displayDate)}</p></div></div>
        </div></section>
      </div>
    </article>
    <section class="related-posts"><div class="container"><h2 class="related-posts__heading">Related posts</h2><div class="projects__list" data-related-posts></div></div></section>
  </main>
  <footer class="footer">
    <div class="footer__divider"></div>
    <div class="container"><div class="footer__top"><div class="footer__lead"><img src="/public/images/Icon.png" alt="" class="footer__icon" aria-hidden="true"><h3 class="footer__heading">Interested in working with us?</h3><a href="/contact.html" class="footer__cta">Let's Chat</a></div><div class="footer__navs"><nav class="footer__nav" aria-label="Footer sitemap"><a href="/work.html" class="footer__nav-link">Work</a><a href="/about.html" class="footer__nav-link">About</a><a href="/resources.html" class="footer__nav-link">Resources</a></nav><nav class="footer__nav" aria-label="Footer social links"><a href="https://twitter.com" class="footer__nav-link" target="_blank" rel="noopener">Twitter</a><a href="https://linkedin.com" class="footer__nav-link" target="_blank" rel="noopener">LinkedIn</a></nav></div></div></div>
    <div class="footer__brand-wrap"><div class="footer__brand">Off-Piste Studio</div><div class="container footer__bottom"><p class="footer__copyright">&copy; Off Piste Studio 2025 All Rights Reserved</p><p class="footer__location">City Beach, WA</p></div></div>
  </footer>
  <script type="module" src="/src/js/main.js"></script>
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
      html: renderMarkdown(body)
    };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

posts.forEach(post => {
  writeFileSync(resolve(insightsDir, `${post.slug}.html`), createArticleHtml(post));
});

const clientPosts = posts.map(({ html, ...post }) => ({
  ...post,
  url: `/insights/${post.slug}.html`
}));

writeFileSync(
  resolve(generatedDir, 'insights-data.js'),
  `export const INSIGHT_POSTS = ${JSON.stringify(clientPosts, null, 2)};\n`
);
