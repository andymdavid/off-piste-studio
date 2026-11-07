import { Marked } from 'marked';
import { renderInsightModule, renderInsightVisual } from '../../scripts/render-insight-visual.mjs';
const escapeHtml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
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

const parser = new Marked({ renderer });

function renderMarkdown(markdown) {
  return parser.parse(markdown);
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

export { renderMarkdown, getRelatedPosts };
