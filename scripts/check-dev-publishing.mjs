import { spawn } from 'node:child_process';
import { existsSync,writeFileSync,unlinkSync } from 'node:fs';
import { once } from 'node:events';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const require = createRequire(import.meta.url);
const astroBin = fileURLToPath(new URL('../node_modules/astro/' + require('astro/package.json').bin.astro, import.meta.url));
import assert from 'node:assert/strict';

const source = 'content/insights/astro-dev-publishing-fixture.md';
assert.ok(!existsSync(source),'Dev fixture must not overwrite existing content');
const base = 'http://127.0.0.1:5433';
const server = spawn(process.execPath,[astroBin,'dev','--ignore-lock','--host','127.0.0.1','--port','5433'],{stdio:['ignore','pipe','pipe']});
let log = '';
for (const stream of [server.stdout,server.stderr]) stream.on('data',chunk => { log = (log+chunk).slice(-16000); });
const fixture = (slug,title) => `---
title: ${title}
slug: ${slug}
description: Temporary local development publishing test.
intro: Temporary content removed before this script exits.
date: 2099-01-01
readTime: 1 min read
tags: Website Design
topics: Websites & UX
---
## Local preview updates

This fixture is temporary.
`;
async function waitFor(path,condition) {
  const deadline = Date.now()+30000;
  while (Date.now()<deadline) {
    if (server.exitCode !== null) throw new Error(`Dev server exited: ${log}`);
    try { const response = await fetch(base+path); const html = await response.text(); if (condition(response,html)) return; } catch {}
    await new Promise(resolve => setTimeout(resolve,150));
  }
  throw new Error(`Dev update timed out: ${path}\n${log}`);
}
const first = 'astro-dev-publishing-first';
const second = 'astro-dev-publishing-renamed';
try {
  await waitFor('/resources',(response) => response.status === 200);
  writeFileSync(source,fixture(first,'Dev create fixture'));
  await waitFor(`/insights/${first}`,(response,html) => response.status === 200 && html.includes('Dev create fixture'));
  await waitFor('/resources',(_,html) => html.includes(`/insights/${first}`));
  writeFileSync(source,fixture(first,'Dev edited fixture'));
  await waitFor(`/insights/${first}`,(_,html) => html.includes('Dev edited fixture') && !html.includes('Dev create fixture'));
  writeFileSync(source,fixture(second,'Dev renamed fixture'));
  await waitFor(`/insights/${second}`,(response,html) => response.status === 200 && html.includes('Dev renamed fixture'));
  await waitFor(`/insights/${first}`,response => response.status === 404);
  unlinkSync(source);
  await waitFor(`/insights/${second}`,response => response.status === 404);
  await waitFor('/resources',(_,html) => !html.includes(second) && !html.includes(first));
  console.log('Local dev publishing passed: add, edit, slug rename and delete update without restarting Astro.');
} finally {
  if (existsSync(source)) unlinkSync(source);
  if (server.exitCode === null && server.signalCode === null) {
    const closed = once(server,'close');
    server.kill('SIGTERM');
    await closed;
  }
}
