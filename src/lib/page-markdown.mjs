function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function renderMarkdown(markdown) {
  const lines = markdown.split('\n');
  const html = [];
  let paragraph = [];
  let listItems = [];
  let quote = [];

  const renderInline = (value) => {
    const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
    let result = '';
    let lastIndex = 0;
    let match;

    while ((match = linkPattern.exec(value)) !== null) {
      const [fullMatch, text, href] = match;
      result += escapeHtml(value.slice(lastIndex, match.index));
      result += `<a href="${escapeHtml(href)}">${escapeHtml(text)}</a>`;
      lastIndex = match.index + fullMatch.length;
    }

    result += escapeHtml(value.slice(lastIndex));
    return result;
  };

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${renderInline(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    html.push(`<ul>${listItems.map(item => `<li>${renderInline(item)}</li>`).join('')}</ul>`);
    listItems = [];
  };

  const flushQuote = () => {
    if (!quote.length) return;
    html.push(`<blockquote>${renderInline(quote.join(' '))}</blockquote>`);
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
      flushParagraph(); flushList(); flushQuote();
      html.push(`<h2>${escapeHtml(trimmed.slice(3))}</h2>`);
      return;
    }

    if (trimmed.startsWith('### ')) {
      flushParagraph(); flushList(); flushQuote();
      html.push(`<h3>${escapeHtml(trimmed.slice(4))}</h3>`);
      return;
    }

    if (trimmed.startsWith('- ')) {
      flushParagraph(); flushQuote();
      listItems.push(trimmed.slice(2));
      return;
    }

    if (trimmed.startsWith('> ')) {
      flushParagraph(); flushList();
      quote.push(trimmed.slice(2));
      return;
    }

    flushList(); flushQuote();
    paragraph.push(trimmed);
  });

  flushParagraph(); flushList(); flushQuote();
  return html.join('\n');
}

export { renderMarkdown };
