import { glyphStatesForContext, resolveGlyphState } from './glyph-states.js';
import { animateGlyphRects } from './glyph-animator.js';

const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const STATUS_STATES = glyphStatesForContext('status');
const STATUS_STATE_IDS = new Set(STATUS_STATES.map((state) => state.id));

export function createGlyphStatus({ container, svg, label }) {
  if (!container || !svg || !label) return null;

  container.setAttribute('role', 'status');
  container.setAttribute('aria-live', 'polite');
  container.setAttribute('aria-atomic', 'true');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const view = svg.ownerDocument?.defaultView || globalThis.window;
  const reducedMotion = view?.matchMedia?.('(prefers-reduced-motion: reduce)') || { matches: false };

  const maximumBlocks = Math.max(...STATUS_STATES.map((state) => state.blocks.length));
  const rects = Array.from({ length: maximumBlocks }, () => {
    const rect = document.createElementNS(SVG_NAMESPACE, 'rect');
    rect.setAttribute('opacity', '0');
    svg.appendChild(rect);
    return rect;
  });

  const setState = (state, accessibleLabel) => {
    const glyphState = resolveGlyphState(state);
    if (!glyphState || !STATUS_STATE_IDS.has(glyphState.id)) return;

    container.dataset.state = state;
    label.textContent = accessibleLabel;
    animateGlyphRects(rects, glyphState.blocks, {
      duration: 260,
      reducedMotion: reducedMotion.matches,
    });
  };

  const activateState = (state, accessibleLabel) => {
    setState(state, accessibleLabel);
    container.classList.remove('is-activated');
    void svg.getBoundingClientRect();
    container.classList.add('is-activated');
  };

  svg.addEventListener('animationend', (event) => {
    if (event.animationName === 'toolGlyphSparkle') {
      container.classList.remove('is-activated');
    }
  });

  return { setState, activateState };
}
