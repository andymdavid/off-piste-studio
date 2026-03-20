import { parseColor, rgbToHex, rgbToHsl, hslToRgb, nearestColorName } from './color-utils.js';
import { copyToClipboard } from './export-utils.js';
import { attachColorPicker } from './color-picker.js';

function init() {
  const hexInput = document.getElementById('hex-input');
  const rgbR = document.getElementById('rgb-r');
  const rgbG = document.getElementById('rgb-g');
  const rgbB = document.getElementById('rgb-b');
  const hslH = document.getElementById('hsl-h');
  const hslS = document.getElementById('hsl-s');
  const hslL = document.getElementById('hsl-l');
  const picker = document.getElementById('color-picker');
  const swatch = document.getElementById('color-swatch');
  const colorName = document.getElementById('color-name');
  const cssVar = document.getElementById('css-var');

  let updating = false;

  function updateFromRgb(r, g, b, source) {
    if (updating) return;
    updating = true;

    const hex = rgbToHex(r, g, b);
    const hsl = rgbToHsl(r, g, b);

    if (source !== 'hex') hexInput.value = hex;
    if (source !== 'rgb') { rgbR.value = r; rgbG.value = g; rgbB.value = b; }
    if (source !== 'hsl') { hslH.value = hsl.h; hslS.value = hsl.s; hslL.value = hsl.l; }
    if (source !== 'picker') picker.value = hex;

    swatch.style.backgroundColor = hex;
    colorName.textContent = nearestColorName(r, g, b);
    cssVar.textContent = `--color: ${hex};`;

    // Update URL without reload
    const url = new URL(window.location);
    url.searchParams.set('color', hex.replace('#', ''));
    window.history.replaceState({}, '', url);

    updating = false;
  }

  // Hex input
  hexInput.addEventListener('input', () => {
    const color = parseColor(hexInput.value);
    if (color) updateFromRgb(color.r, color.g, color.b, 'hex');
  });

  // RGB inputs
  [rgbR, rgbG, rgbB].forEach(input => {
    input.addEventListener('input', () => {
      const r = Math.min(255, Math.max(0, parseInt(rgbR.value) || 0));
      const g = Math.min(255, Math.max(0, parseInt(rgbG.value) || 0));
      const b = Math.min(255, Math.max(0, parseInt(rgbB.value) || 0));
      updateFromRgb(r, g, b, 'rgb');
    });
  });

  // HSL inputs
  [hslH, hslS, hslL].forEach(input => {
    input.addEventListener('input', () => {
      const h = Math.min(360, Math.max(0, parseInt(hslH.value) || 0));
      const s = Math.min(100, Math.max(0, parseInt(hslS.value) || 0));
      const l = Math.min(100, Math.max(0, parseInt(hslL.value) || 0));
      const rgb = hslToRgb(h, s, l);
      updateFromRgb(rgb.r, rgb.g, rgb.b, 'hsl');
    });
  });

  // Custom colour picker
  attachColorPicker(picker, {
    color: hexInput.value,
    onChange: (hex) => {
      const color = parseColor(hex);
      if (color) updateFromRgb(color.r, color.g, color.b, 'picker');
    },
  });

  // Copy buttons
  document.querySelectorAll('[data-copy]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.copy;
      let text = '';

      switch (target) {
        case 'hex': text = hexInput.value; break;
        case 'rgb': text = `rgb(${rgbR.value}, ${rgbG.value}, ${rgbB.value})`; break;
        case 'hsl': text = `hsl(${hslH.value}, ${hslS.value}%, ${hslL.value}%)`; break;
        case 'css': text = cssVar.textContent; break;
      }

      copyToClipboard(text, btn);
    });
  });

  // Load from URL params
  const params = new URLSearchParams(window.location.search);
  const initialColor = params.get('color');
  if (initialColor) {
    hexInput.value = '#' + initialColor.replace(/^#/, '');
  }

  // Initial update
  const color = parseColor(hexInput.value);
  if (color) updateFromRgb(color.r, color.g, color.b, 'hex');
}

document.addEventListener('DOMContentLoaded', init);
