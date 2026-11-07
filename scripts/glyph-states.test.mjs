import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  GLYPH_STATES,
  GLYPH_STATE_ORDER,
  GLYPH_STATE_LIST,
  glyphStatesForContext,
  resolveGlyphState,
} from '../src/js/glyph-states.js';
import { mapGlyphBlocksSpatially } from '../src/js/glyph-renderer.js';
import { createGlyphStatus } from '../src/js/glyph-status.js';
import { animateGlyphRects } from '../src/js/glyph-animator.js';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

class FakeElement {
  constructor() {
    this.attributes = new Map();
    this.children = [];
    this.dataset = {};
    this.style = {};
    this.textContent = '';
    this.listeners = new Map();
    this.classList = {
      values: new Set(),
      add: (...names) => names.forEach((name) => this.classList.values.add(name)),
      remove: (...names) => names.forEach((name) => this.classList.values.delete(name)),
      contains: (name) => this.classList.values.has(name),
    };
  }

  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.get(name) ?? null; }
  appendChild(child) { this.children.push(child); return child; }
  addEventListener(name, callback) { this.listeners.set(name, callback); }
  getBoundingClientRect() { return {}; }
}

const rectFor = (block, opacity = '1') => {
  const rect = new FakeElement();
  Object.entries(block).forEach(([name, value]) => rect.setAttribute(name, value));
  rect.setAttribute('opacity', opacity);
  return rect;
};

test('registry order contains every glyph exactly once', () => {
  assert.deepEqual(Object.keys(GLYPH_STATES).sort(), [...GLYPH_STATE_ORDER].sort());
  assert.equal(new Set(GLYPH_STATE_ORDER).size, GLYPH_STATE_ORDER.length);
  assert.deepEqual(GLYPH_STATE_LIST.map((state) => state.id), GLYPH_STATE_ORDER);
});

test('glyph blocks remain inside the 64 by 64 viewBox', () => {
  GLYPH_STATE_LIST.forEach((state) => {
    state.blocks.forEach((block) => {
      assert.ok(block.x >= 0 && block.y >= 0, `${state.id} starts outside the viewBox`);
      assert.ok(block.x + block.width <= 64, `${state.id} exceeds the viewBox width`);
      assert.ok(block.y + block.height <= 64, `${state.id} exceeds the viewBox height`);
      assert.ok(block.width > 0 && block.height > 0, `${state.id} contains an empty block`);
    });
  });
});

test('state numbers are unique', () => {
  const numbers = GLYPH_STATE_LIST.map((state) => state.number);
  assert.equal(new Set(numbers).size, numbers.length);
});

test('registry metadata defines production contexts and aliases', () => {
  assert.deepEqual(glyphStatesForContext('brand').map(({ id }) => id), ['base', 'wink']);
  assert.deepEqual(glyphStatesForContext('status').map(({ id }) => id), ['loading', 'sparkle', 'check', 'x', 'focus']);
  assert.equal(resolveGlyphState('error'), GLYPH_STATES.x);
  assert.equal(GLYPH_STATES.sparkle.status, 'Production');
  assert.ok(Object.isFrozen(GLYPH_STATES.base));
  assert.ok(Object.isFrozen(GLYPH_STATES.base.blocks));
});

test('check blocks meet corner to corner without overlap', () => {
  const blocks = GLYPH_STATES.check.blocks;
  blocks.slice(1).forEach((block, index) => {
    const previous = blocks[index];
    assert.equal(Math.abs(block.x - previous.x), 10);
    assert.equal(Math.abs(block.y - previous.y), 10);
  });
});

test('flag pennant tapers from three blocks to one', () => {
  const pennant = GLYPH_STATES.flag.blocks.slice(1);
  const columnCounts = pennant.reduce((counts, block) => {
    counts.set(block.x, (counts.get(block.x) || 0) + 1);
    return counts;
  }, new Map());
  assert.deepEqual([...columnCounts.values()], [3, 2, 1]);
});

test('spatial morphing assigns each block and rectangle once', () => {
  const rects = GLYPH_STATES.base.blocks.map((block) => rectFor(block));
  const assignments = mapGlyphBlocksSpatially(rects, GLYPH_STATES.wink.blocks);

  assert.equal(assignments.length, GLYPH_STATES.wink.blocks.length);
  assert.equal(new Set(assignments.map(({ rect }) => rect)).size, assignments.length);
  assert.equal(new Set(assignments.map(({ block }) => block)).size, assignments.length);
});

test('interrupted glyph animations cancel before retargeting', () => {
  const originalGetComputedStyle = globalThis.getComputedStyle;
  globalThis.getComputedStyle = (element) => ({
    transform: element.style.transform || 'none',
    opacity: element.style.opacity ?? element.getAttribute('opacity') ?? '1',
  });

  try {
    const rects = GLYPH_STATES.base.blocks.map((block) => rectFor(block));
    const animations = [];
    rects.forEach((rect) => {
      rect.animate = (frames, options) => {
        const listeners = new Map();
        const animation = {
          frames,
          options,
          cancelled: false,
          addEventListener: (name, callback) => listeners.set(name, callback),
          cancel() {
            this.cancelled = true;
            listeners.get('cancel')?.();
          },
        };
        animations.push(animation);
        return animation;
      };
    });

    animateGlyphRects(rects, GLYPH_STATES.wink.blocks, { duration: 180 });
    const firstPass = [...animations];
    animateGlyphRects(rects, GLYPH_STATES.base.blocks, { duration: 180 });

    assert.ok(firstPass.every((animation) => animation.cancelled));
    assert.equal(animations.length, GLYPH_STATES.base.blocks.length * 2);
    assert.ok(animations.slice(-5).every((animation) => animation.options.duration === 180));
    assert.deepEqual(
      rects.map((rect) => ({
        x: Number(rect.getAttribute('x')),
        y: Number(rect.getAttribute('y')),
        width: Number(rect.getAttribute('width')),
        height: Number(rect.getAttribute('height')),
      })),
      GLYPH_STATES.base.blocks,
    );
  } finally {
    globalThis.getComputedStyle = originalGetComputedStyle;
  }
});

test('tool status resolves aliases and maintains an atomic live region', () => {
  const originalDocument = globalThis.document;
  const originalRequestAnimationFrame = globalThis.requestAnimationFrame;
  globalThis.document = { createElementNS: () => new FakeElement() };
  globalThis.requestAnimationFrame = (callback) => callback();

  try {
    const container = new FakeElement();
    const svg = new FakeElement();
    const label = new FakeElement();
    const status = createGlyphStatus({ container, svg, label });
    status.setState('error', 'Invalid colour');

    assert.equal(container.dataset.state, 'error');
    assert.equal(container.getAttribute('aria-atomic'), 'true');
    assert.equal(label.textContent, 'Invalid colour');
    assert.equal(svg.children.filter((rect) => rect.getAttribute('opacity') === '1').length, GLYPH_STATES.x.blocks.length);

    status.activateState('sparkle', 'Palette generated');
    assert.ok(container.classList.contains('is-activated'));
    svg.listeners.get('animationend')({ animationName: 'toolGlyphSparkle' });
    assert.ok(!container.classList.contains('is-activated'));
  } finally {
    globalThis.document = originalDocument;
    globalThis.requestAnimationFrame = originalRequestAnimationFrame;
  }
});

test('inline header fallbacks match the base registry geometry', () => {
  const excludedDirectories = new Set(['.git', 'dist', 'node_modules']);
  const htmlFiles = [];
  const collectHtml = (directory) => {
    readdirSync(directory, { withFileTypes: true }).forEach((entry) => {
      if (entry.name.startsWith('.') || excludedDirectories.has(entry.name)) return;
      const path = join(directory, entry.name);
      if (entry.isDirectory()) collectHtml(path);
      else if (extname(entry.name) === '.html') htmlFiles.push(path);
    });
  };
  collectHtml(join(repositoryRoot, "dist"));

  let fallbackCount = 0;
  htmlFiles.forEach((path) => {
    const source = readFileSync(path, 'utf8');
    const glyphs = source.match(/<svg[^>]*data-brand-glyph[^>]*>[\s\S]*?<\/svg>/g) || [];
    glyphs.forEach((glyph) => {
      fallbackCount += 1;
      const blocks = [...glyph.matchAll(/<rect[^>]*\bx="([\d.]+)"[^>]*\by="([\d.]+)"[^>]*\bwidth="([\d.]+)"[^>]*\bheight="([\d.]+)"/g)]
        .map((match) => ({ x: Number(match[1]), y: Number(match[2]), width: Number(match[3]), height: Number(match[4]) }));
      assert.deepEqual(blocks, GLYPH_STATES.base.blocks, `${path} has stale header glyph geometry`);
    });
  });
  assert.ok(fallbackCount > 0, 'expected at least one inline header fallback');
});
