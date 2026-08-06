function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function requireText(value, field) {
  if (typeof value !== 'string' || !value.trim()) {
    throw new Error(`Insight visual requires a non-empty ${field}.`);
  }
  return value.trim();
}

function requireItems(value, type, minimum = 2) {
  if (!Array.isArray(value) || value.length < minimum) {
    throw new Error(`${type} insight visual requires at least ${minimum} items.`);
  }
  return value;
}

function renderHeader(spec) {
  const eyebrow = spec.eyebrow
    ? `<p class="insight-visual__eyebrow">${escapeHtml(spec.eyebrow)}</p>`
    : '';
  const summary = spec.summary
    ? `<p class="insight-visual__summary">${escapeHtml(spec.summary)}</p>`
    : '';

  return `<header class="insight-visual__header">${eyebrow}<h3 class="insight-visual__title">${escapeHtml(spec.title)}</h3>${summary}</header>`;
}

function renderMetrics(spec) {
  const items = requireItems(spec.items, 'metrics').map(item => {
    const value = requireText(item.value, 'metric value');
    const label = requireText(item.label, 'metric label');
    const detail = item.detail ? `<p class="insight-visual__detail">${escapeHtml(item.detail)}</p>` : '';
    return `<li class="insight-visual__metric"><strong class="insight-visual__value">${escapeHtml(value)}</strong><p class="insight-visual__label">${escapeHtml(label)}</p>${detail}</li>`;
  }).join('');

  return `<ul class="insight-visual__metrics">${items}</ul>`;
}

function renderProcess(spec) {
  const items = requireItems(spec.items, 'process').map((item, index) => {
    const title = requireText(item.title, 'process item title');
    const description = item.description ? `<p>${escapeHtml(item.description)}</p>` : '';
    return `<li class="insight-visual__step"><span class="insight-visual__number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><div><h4>${escapeHtml(title)}</h4>${description}</div></li>`;
  }).join('');

  return `<ol class="insight-visual__process">${items}</ol>`;
}

function renderComparison(spec) {
  const columns = requireItems(spec.columns, 'comparison').map(column => {
    const title = requireText(column.title, 'comparison column title');
    const items = requireItems(column.items, 'comparison column', 1)
      .map(item => `<li>${escapeHtml(item)}</li>`)
      .join('');
    return `<section class="insight-visual__column"><h4>${escapeHtml(title)}</h4><ul>${items}</ul></section>`;
  }).join('');

  return `<div class="insight-visual__comparison">${columns}</div>`;
}

function renderMatrix(spec) {
  const items = requireItems(spec.items, 'matrix', 4).slice(0, 4).map((item, index) => {
    const title = requireText(item.title, 'matrix item title');
    const description = item.description ? `<p>${escapeHtml(item.description)}</p>` : '';
    return `<section class="insight-visual__quadrant" data-quadrant="${index + 1}"><span class="insight-visual__number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span><h4>${escapeHtml(title)}</h4>${description}</section>`;
  }).join('');
  const xAxis = requireText(spec.xAxis, 'matrix xAxis');
  const yAxis = requireText(spec.yAxis, 'matrix yAxis');

  return `<div class="insight-visual__matrix-wrap"><p class="insight-visual__axis insight-visual__axis--y">${escapeHtml(yAxis)}</p><div class="insight-visual__matrix">${items}</div><p class="insight-visual__axis insight-visual__axis--x">${escapeHtml(xAxis)}</p></div>`;
}

const visualRenderers = {
  metrics: renderMetrics,
  process: renderProcess,
  comparison: renderComparison,
  matrix: renderMatrix
};

export function renderInsightVisual(source) {
  let spec;

  try {
    spec = JSON.parse(source);
  } catch (error) {
    throw new Error(`Invalid insight-visual JSON: ${error.message}`);
  }

  const type = requireText(spec.type, 'type');
  const title = requireText(spec.title, 'title');
  const renderBody = visualRenderers[type];

  if (!renderBody) {
    throw new Error(`Unsupported insight visual type "${type}". Use metrics, process, comparison, or matrix.`);
  }

  const sourceLine = spec.source
    ? `<p class="insight-visual__source">Source: ${escapeHtml(spec.source)}</p>`
    : '';
  const caption = spec.caption
    ? `<figcaption class="insight-visual__caption">${escapeHtml(spec.caption)}</figcaption>`
    : '';

  return `<figure class="insight-visual insight-visual--${type}" aria-label="${escapeHtml(title)}">${renderHeader({ ...spec, title })}<div class="insight-visual__body">${renderBody(spec)}</div>${sourceLine}${caption}</figure>\n`;
}
