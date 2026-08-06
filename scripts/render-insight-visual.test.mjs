import test from 'node:test';
import assert from 'node:assert/strict';
import { renderInsightVisual } from './render-insight-visual.mjs';

test('renders each supported insight visual type', () => {
  const fixtures = [
    { type: 'metrics', title: 'Metrics', items: [{ value: '1', label: 'One' }, { value: '2', label: 'Two' }] },
    { type: 'process', title: 'Process', items: [{ title: 'One' }, { title: 'Two' }] },
    { type: 'comparison', title: 'Comparison', columns: [{ title: 'One', items: ['A'] }, { title: 'Two', items: ['B'] }] },
    { type: 'matrix', title: 'Matrix', xAxis: 'Exposure', yAxis: 'Impact', items: [{ title: 'One' }, { title: 'Two' }, { title: 'Three' }, { title: 'Four' }] }
  ];

  for (const fixture of fixtures) {
    const html = renderInsightVisual(JSON.stringify(fixture));
    assert.match(html, new RegExp(`insight-visual--${fixture.type}`));
    assert.match(html, new RegExp(`>${fixture.title}<`));
  }
});

test('escapes authored text', () => {
  const html = renderInsightVisual(JSON.stringify({
    type: 'metrics',
    title: '<script>alert(1)</script>',
    items: [{ value: '1', label: '<strong>One</strong>' }, { value: '2', label: 'Two' }]
  }));

  assert.doesNotMatch(html, /<script>|<strong>/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /&lt;strong&gt;/);
});

test('rejects malformed and unsupported visuals', () => {
  assert.throws(() => renderInsightVisual('{'), /Invalid insight-visual JSON/);
  assert.throws(() => renderInsightVisual(JSON.stringify({ type: 'chart', title: 'Nope' })), /Unsupported insight visual type/);
  assert.throws(() => renderInsightVisual(JSON.stringify({ type: 'process', title: 'Too short', items: [{ title: 'One' }] })), /at least 2 items/);
});
