import { parseColor, rgbToHex, rgbToHsl, hslToRgb } from './color-utils.js';
import { contrastRatio, checkWcag } from './wcag-utils.js';
import { copyToClipboard } from './export-utils.js';
import { attachColorPicker } from './color-picker.js';

function init() {
  const textInput = document.getElementById('text-color');
  const bgInput = document.getElementById('bg-color');
  const textPicker = document.getElementById('text-picker');
  const bgPicker = document.getElementById('bg-picker');
  const swapBtn = document.getElementById('swap-colors');
  const ratioDisplay = document.getElementById('contrast-ratio');
  const preview = document.getElementById('contrast-preview');
  const previewSmall = document.getElementById('preview-small');
  const previewLarge = document.getElementById('preview-large');
  const results = document.querySelectorAll('.wcag-result');
  const fixSuggestion = document.getElementById('fix-suggestion');
  const fixSwatch = document.getElementById('fix-swatch');
  const fixHex = document.getElementById('fix-hex');
  const fixApply = document.getElementById('fix-apply');
  const copyRatio = document.getElementById('copy-ratio');

  function update() {
    const text = parseColor(textInput.value);
    const bg = parseColor(bgInput.value);

    if (!text || !bg) {
      ratioDisplay.textContent = '--';
      results.forEach(r => {
        r.classList.remove('pass', 'fail');
        r.querySelector('.wcag-result__status').textContent = '--';
      });
      return;
    }

    // Sync pickers
    textPicker.value = rgbToHex(text.r, text.g, text.b);
    bgPicker.value = rgbToHex(bg.r, bg.g, bg.b);

    const ratio = contrastRatio(text.r, text.g, text.b, bg.r, bg.g, bg.b);
    const wcag = checkWcag(ratio);

    ratioDisplay.textContent = ratio.toFixed(2) + ':1';

    // Update pass/fail indicators
    const checks = [
      { id: 'aa-normal', pass: wcag.aa.normal },
      { id: 'aa-large', pass: wcag.aa.large },
      { id: 'aaa-normal', pass: wcag.aaa.normal },
      { id: 'aaa-large', pass: wcag.aaa.large },
    ];

    checks.forEach(({ id, pass }) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.classList.toggle('pass', pass);
      el.classList.toggle('fail', !pass);
      el.querySelector('.wcag-result__status').textContent = pass ? 'Pass' : 'Fail';
    });

    // Update live preview
    const textHex = rgbToHex(text.r, text.g, text.b);
    const bgHex = rgbToHex(bg.r, bg.g, bg.b);
    preview.style.backgroundColor = bgHex;
    previewSmall.style.color = textHex;
    previewLarge.style.color = textHex;

    // Show fix suggestion if AA normal fails
    if (!wcag.aa.normal) {
      const fixed = findAccessibleAdjustment(bg.r, bg.g, bg.b, text.r, text.g, text.b, 4.5);
      if (fixed) {
        const fixedHex = rgbToHex(fixed.r, fixed.g, fixed.b);
        fixSwatch.style.backgroundColor = fixedHex;
        fixHex.textContent = fixedHex;
        fixApply.onclick = () => {
          textInput.value = fixedHex;
          update();
        };
        fixSuggestion.hidden = false;
      }
    } else {
      fixSuggestion.hidden = true;
    }
  }

  function findAccessibleAdjustment(fixedR, fixedG, fixedB, adjR, adjG, adjB, targetRatio) {
    const hsl = rgbToHsl(adjR, adjG, adjB);
    let bestColor = null;
    let bestDiff = Infinity;

    for (const direction of ['darker', 'lighter']) {
      let lo, hi;
      if (direction === 'lighter') {
        lo = hsl.l; hi = 100;
      } else {
        lo = 0; hi = hsl.l;
      }

      for (let i = 0; i < 30; i++) {
        const mid = (lo + hi) / 2;
        const rgb = hslToRgb(hsl.h, hsl.s, mid);
        const ratio = contrastRatio(fixedR, fixedG, fixedB, rgb.r, rgb.g, rgb.b);

        if (ratio >= targetRatio) {
          const diff = Math.abs(mid - hsl.l);
          if (diff < bestDiff) {
            bestDiff = diff;
            bestColor = rgb;
          }
          if (direction === 'lighter') hi = mid;
          else lo = mid;
        } else {
          if (direction === 'lighter') lo = mid;
          else hi = mid;
        }
      }
    }

    return bestColor;
  }

  // Event listeners
  textInput.addEventListener('input', update);
  bgInput.addEventListener('input', update);

  // Custom colour pickers
  attachColorPicker(textPicker, {
    color: textInput.value,
    onChange: (hex) => { textInput.value = hex; update(); },
  });

  attachColorPicker(bgPicker, {
    color: bgInput.value,
    onChange: (hex) => { bgInput.value = hex; update(); },
  });

  swapBtn.addEventListener('click', () => {
    const tmp = textInput.value;
    textInput.value = bgInput.value;
    bgInput.value = tmp;
    update();
  });

  copyRatio.addEventListener('click', () => {
    copyToClipboard(ratioDisplay.textContent, copyRatio);
  });

  // Load from URL params
  const params = new URLSearchParams(window.location.search);
  if (params.get('text')) textInput.value = '#' + params.get('text').replace(/^#/, '');
  if (params.get('bg')) bgInput.value = '#' + params.get('bg').replace(/^#/, '');

  // Initial calculation
  update();
}

document.addEventListener('DOMContentLoaded', init);
