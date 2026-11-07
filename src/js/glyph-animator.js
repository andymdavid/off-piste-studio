import { applyGlyphBlock, mapGlyphBlocksSpatially } from './glyph-renderer.js';

const activeAnimations = new WeakMap();
const DEFAULT_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)';

const parseMatrix = (value) => {
  if (!value || value === 'none') return { a: 1, d: 1, e: 0, f: 0 };
  const values = value.match(/matrix\(([^)]+)\)/)?.[1].split(',').map(Number);
  if (!values || values.length !== 6 || values.some(Number.isNaN)) return { a: 1, d: 1, e: 0, f: 0 };
  return { a: values[0], d: values[3], e: values[4], f: values[5] };
};

const attributeBlock = (rect) => ({
  x: Number(rect.getAttribute('x') || 0),
  y: Number(rect.getAttribute('y') || 0),
  width: Number(rect.getAttribute('width') || 0),
  height: Number(rect.getAttribute('height') || 0),
});

export function readVisualGlyphBlock(rect) {
  const block = attributeBlock(rect);
  const getStyles = rect.ownerDocument?.defaultView?.getComputedStyle || globalThis.getComputedStyle;
  if (!getStyles) return block;
  const matrix = parseMatrix(getStyles(rect).transform);
  return {
    x: matrix.a * block.x + matrix.e,
    y: matrix.d * block.y + matrix.f,
    width: Math.abs(matrix.a * block.width),
    height: Math.abs(matrix.d * block.height),
  };
}

const transformFromTo = (from, to) => {
  const scaleX = to.width ? from.width / to.width : 1;
  const scaleY = to.height ? from.height / to.height : 1;
  const translateX = from.x - scaleX * to.x;
  const translateY = from.y - scaleY * to.y;
  return `matrix(${scaleX}, 0, 0, ${scaleY}, ${translateX}, ${translateY})`;
};

const stopAnimation = (rect) => {
  activeAnimations.get(rect)?.cancel();
  activeAnimations.delete(rect);
};

const trackAnimation = (rect, animation) => {
  activeAnimations.set(rect, animation);
  const cleanup = () => {
    if (activeAnimations.get(rect) === animation) activeAnimations.delete(rect);
  };
  animation.addEventListener('finish', cleanup, { once: true });
  animation.addEventListener('cancel', cleanup, { once: true });
};

export function animateGlyphRects(rects, blocks, {
  duration = 260,
  easing = DEFAULT_EASING,
  reducedMotion = false,
} = {}) {
  const assignments = mapGlyphBlocksSpatially(rects, blocks, readVisualGlyphBlock);
  const assignedRects = new Set(assignments.map(({ rect }) => rect));

  assignments.forEach(({ rect, block }) => {
    const from = readVisualGlyphBlock(rect);
    const getStyles = rect.ownerDocument?.defaultView?.getComputedStyle || globalThis.getComputedStyle;
    const fromOpacity = getStyles ? getStyles(rect).opacity : rect.getAttribute('opacity') || '0';
    stopAnimation(rect);
    applyGlyphBlock(rect, block);
    rect.setAttribute('opacity', '1');
    rect.style.transform = 'none';
    rect.style.opacity = '1';

    if (reducedMotion || typeof rect.animate !== 'function') return;
    const animation = rect.animate([
      { transform: transformFromTo(from, block), opacity: fromOpacity },
      { transform: 'none', opacity: 1 },
    ], { duration, easing, fill: 'none' });
    trackAnimation(rect, animation);
  });

  rects.filter((rect) => !assignedRects.has(rect)).forEach((rect) => {
    const getStyles = rect.ownerDocument?.defaultView?.getComputedStyle || globalThis.getComputedStyle;
    const fromOpacity = getStyles ? getStyles(rect).opacity : rect.getAttribute('opacity') || '1';
    stopAnimation(rect);
    rect.setAttribute('opacity', '0');
    rect.style.opacity = '0';
    if (reducedMotion || typeof rect.animate !== 'function') return;
    const animation = rect.animate(
      [{ opacity: fromOpacity }, { opacity: 0 }],
      { duration: Math.min(duration, 180), easing, fill: 'none' },
    );
    trackAnimation(rect, animation);
  });

  return assignments;
}
