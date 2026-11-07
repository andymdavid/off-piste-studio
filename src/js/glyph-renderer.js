import { resolveGlyphState } from './glyph-states.js';

export const GLYPH_VIEWBOX = '0 0 64 64';
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const BRAND_BLOCK_CLASSES = [
  'brand-glyph__block brand-glyph__eye brand-glyph__eye--left',
  'brand-glyph__block brand-glyph__eye brand-glyph__eye--right',
  'brand-glyph__block brand-glyph__cheek',
  'brand-glyph__block brand-glyph__cheek',
  'brand-glyph__block brand-glyph__mouth',
];

export const brandGlyphBlockClass = (index) => BRAND_BLOCK_CLASSES[index] || 'brand-glyph__block';

export function glyphBlocksMarkup(stateId, { blockClassName } = {}) {
  const glyphState = resolveGlyphState(stateId);
  if (!glyphState) return '';
  return glyphState.blocks.map((block, index) => {
    const className = typeof blockClassName === 'function' ? blockClassName(index) : blockClassName;
    const classAttribute = className ? ` class="${className}"` : '';
    return `<rect${classAttribute} x="${block.x}" y="${block.y}" width="${block.width}" height="${block.height}" />`;
  }).join('');
}

export function applyGlyphBlock(rect, block) {
  Object.entries(block).forEach(([name, value]) => rect.setAttribute(name, value));
}

const rectBlock = (rect) => ({
  x: Number(rect.getAttribute('x') || 0),
  y: Number(rect.getAttribute('y') || 0),
  width: Number(rect.getAttribute('width') || 0),
  height: Number(rect.getAttribute('height') || 0),
});

const centre = (block) => ({
  x: block.x + block.width / 2,
  y: block.y + block.height / 2,
});

export function mapGlyphBlocksSpatially(rects, blocks, readBlock = rectBlock) {
  const visibleRects = rects.filter((rect) => rect.getAttribute('opacity') !== '0');
  if (!visibleRects.length) {
    return blocks.map((block, index) => ({ rect: rects[index], block }));
  }

  const availableRects = new Set(visibleRects);
  const availableBlocks = new Set(blocks);
  const assignments = [];
  const candidates = [];

  visibleRects.forEach((rect) => {
    const from = readBlock(rect);
    const fromCentre = centre(from);
    blocks.forEach((block) => {
      const toCentre = centre(block);
      const distance = Math.hypot(fromCentre.x - toCentre.x, fromCentre.y - toCentre.y);
      const sizeChange = Math.abs((from.width * from.height) - (block.width * block.height)) * 0.015;
      candidates.push({ rect, block, cost: distance + sizeChange });
    });
  });

  candidates.sort((a, b) => a.cost - b.cost).forEach((candidate) => {
    if (!availableRects.has(candidate.rect) || !availableBlocks.has(candidate.block)) return;
    assignments.push(candidate);
    availableRects.delete(candidate.rect);
    availableBlocks.delete(candidate.block);
  });

  const assignedRects = new Set(assignments.map(({ rect }) => rect));
  const inactiveRects = rects.filter((rect) => !assignedRects.has(rect));
  [...availableBlocks].forEach((block, index) => {
    const rect = inactiveRects[index];
    if (!rect) return;
    const targetCentre = centre(block);
    applyGlyphBlock(rect, { x: targetCentre.x, y: targetCentre.y, width: 0, height: 0 });
    rect.setAttribute('opacity', '0');
    assignments.push({ rect, block });
  });

  return assignments;
}

export function createGlyphSvg(stateId, { className = '', blockClassName } = {}) {
  const glyphState = resolveGlyphState(stateId);
  if (!glyphState) return null;

  const svg = document.createElementNS(SVG_NAMESPACE, 'svg');
  svg.setAttribute('viewBox', GLYPH_VIEWBOX);
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  if (className) svg.setAttribute('class', className);

  glyphState.blocks.forEach((block, index) => {
    const rect = document.createElementNS(SVG_NAMESPACE, 'rect');
    applyGlyphBlock(rect, block);
    const rectClassName = typeof blockClassName === 'function' ? blockClassName(index) : blockClassName;
    if (rectClassName) rect.setAttribute('class', rectClassName);
    svg.appendChild(rect);
  });
  return svg;
}

export function renderGlyphInto(target, stateId, options) {
  const svg = createGlyphSvg(stateId, options);
  if (!target || !svg) return null;
  target.replaceChildren(svg);
  return svg;
}
