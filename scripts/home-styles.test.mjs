import { test } from 'node:test';
import assert from 'node:assert/strict';
import { homeStyles } from '../src/lib/home-styles.mjs';
test('homepage removes other route branches without removing shared rules or changing order', () => {
  assert.equal(homeStyles('body[data-page-type="about"] .x, .shared { color: red } body[data-page-type="duplicate-home"] .x { color: blue }'), '.shared{color:red}body[data-page-type="duplicate-home"] .x{color:blue}');
});
test('themes, interaction states, nested conditions and negated page selectors remain', () => {
  const css='@media(max-width:768px){body[data-page-type="about"] .x{color:red}.menu:hover,body[data-theme="light"] .x,body:not([data-page-type="about"]) .x{color:blue}}';
  const result=homeStyles(css);
  assert.ok(!result.includes('color:red'));
  assert.ok(result.includes('.menu:hover'));
  assert.ok(result.includes('body[data-theme="light"]'));
  assert.ok(result.includes('body:not([data-page-type="about"])'));
});

test('handles unquoted page attributes emitted by CSS minification', () => {
  assert.equal(homeStyles('body[data-page-type=about] .x{color:red}body[data-page-type=duplicate-home] .x{color:blue}'), 'body[data-page-type=duplicate-home] .x{color:blue}');
});
