import { parseColor, rgbToHex, rgbToHsl, hslToRgb } from './color-utils.js';
import { generateHarmony, randomColor } from './palette-utils.js';
import { copyToClipboard } from './export-utils.js';

function init() {
  const slotsContainer = document.getElementById('palette-slots');
  const modeSelect = document.getElementById('harmony-mode');
  const generateBtn = document.getElementById('generate-btn');
  const randomBtn = document.getElementById('random-btn');
  const exportCss = document.getElementById('palette-export-css');
  const exportHex = document.getElementById('palette-export-hex');
  const copyCssBtn = document.getElementById('palette-copy-css');
  const copyHexBtn = document.getElementById('palette-copy-hex');

  // State: 5 colour slots, each with {h, s, l, locked}
  let slots = [];

  function initSlots() {
    // Check URL params for pre-loaded colours
    const params = new URLSearchParams(window.location.search);
    const baseParam = params.get('base');
    const colorsParam = params.get('colors');
    const modeParam = params.get('mode');

    if (modeParam && modeSelect.querySelector(`option[value="${modeParam}"]`)) {
      modeSelect.value = modeParam;
    }

    if (colorsParam) {
      // Pre-loaded palette from extractor: comma-separated hex values
      const hexes = colorsParam.split(',').slice(0, 5);
      slots = hexes.map(hex => {
        const rgb = parseColor('#' + hex.replace(/^#/, ''));
        if (!rgb) return { ...randomColor(), locked: false };
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        return { h: hsl.h, s: hsl.s, l: hsl.l, locked: false };
      });
      // Fill remaining slots if fewer than 5
      while (slots.length < 5) {
        slots.push({ ...randomColor(), locked: false });
      }
    } else if (baseParam) {
      // Single base colour — generate harmony
      const rgb = parseColor('#' + baseParam.replace(/^#/, ''));
      if (rgb) {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        const harmony = generateHarmony(hsl.h, hsl.s, hsl.l, modeSelect.value);
        slots = harmony.map(c => ({ ...c, locked: false }));
        slots[0].locked = true; // Lock the base colour
      } else {
        generateNewPalette();
      }
    } else {
      generateNewPalette();
    }

    render();
  }

  function generateNewPalette() {
    // Find first locked slot or use a random base
    const lockedSlot = slots.find(s => s.locked);
    const base = lockedSlot || randomColor();
    const harmony = generateHarmony(base.h, base.s, base.l, modeSelect.value);

    slots = harmony.map((c, i) => {
      // Preserve locked slots
      if (slots[i] && slots[i].locked) {
        return slots[i];
      }
      return { ...c, locked: false };
    });
  }

  function render() {
    slotsContainer.innerHTML = '';

    slots.forEach((slot, i) => {
      const rgb = hslToRgb(slot.h, slot.s, slot.l);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

      const el = document.createElement('div');
      el.className = 'palette-slot' + (slot.locked ? ' is-locked' : '');
      el.innerHTML = `
        <div class="palette-slot__color" style="background-color: ${hex}"></div>
        <div class="palette-slot__info">
          <input type="text" class="palette-slot__hex" value="${hex}" spellcheck="false" autocomplete="off" data-index="${i}">
          <span class="palette-slot__hsl">hsl(${slot.h}, ${slot.s}%, ${slot.l}%)</span>
        </div>
        <div class="palette-slot__actions">
          <button class="palette-slot__lock" type="button" data-index="${i}" title="${slot.locked ? 'Unlock colour' : 'Lock colour'}" aria-label="${slot.locked ? 'Unlock colour' : 'Lock colour'}">
            ${slot.locked ? lockIconSvg() : unlockIconSvg()}
          </button>
          <button class="palette-slot__copy tool-copy-btn" type="button" data-hex="${hex}">Copy</button>
        </div>
      `;

      slotsContainer.appendChild(el);
    });

    // Hex input editing
    slotsContainer.querySelectorAll('.palette-slot__hex').forEach(input => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.index);
        const rgb = parseColor(e.target.value);
        if (rgb) {
          const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
          slots[idx] = { h: hsl.h, s: hsl.s, l: hsl.l, locked: slots[idx].locked };
          render();
        }
      });
    });

    // Lock toggle
    slotsContainer.querySelectorAll('.palette-slot__lock').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.dataset.index);
        slots[idx].locked = !slots[idx].locked;
        render();
      });
    });

    // Copy buttons
    slotsContainer.querySelectorAll('.palette-slot__copy').forEach(btn => {
      btn.addEventListener('click', (e) => {
        copyToClipboard(e.currentTarget.dataset.hex, e.currentTarget);
      });
    });

    updateExports();
    updateUrl();
  }

  function updateExports() {
    const labels = ['primary', 'secondary', 'accent', 'surface', 'muted'];
    const cssVars = slots.map((slot, i) => {
      const rgb = hslToRgb(slot.h, slot.s, slot.l);
      const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      return `  --color-${labels[i] || 'color-' + (i + 1)}: ${hex};`;
    }).join('\n');

    const hexList = slots.map(slot => {
      const rgb = hslToRgb(slot.h, slot.s, slot.l);
      return rgbToHex(rgb.r, rgb.g, rgb.b);
    }).join(', ');

    exportCss.textContent = `:root {\n${cssVars}\n}`;
    exportHex.textContent = hexList;
  }

  function updateUrl() {
    const hexes = slots.map(slot => {
      const rgb = hslToRgb(slot.h, slot.s, slot.l);
      return rgbToHex(rgb.r, rgb.g, rgb.b).slice(1);
    }).join(',');

    const url = new URL(window.location);
    url.searchParams.set('colors', hexes);
    url.searchParams.set('mode', modeSelect.value);
    url.searchParams.delete('base');
    window.history.replaceState({}, '', url);
  }

  // Event listeners
  generateBtn.addEventListener('click', () => {
    generateNewPalette();
    render();
  });

  randomBtn.addEventListener('click', () => {
    // Unlock all, generate fresh
    slots.forEach(s => s.locked = false);
    slots = [];
    generateNewPalette();
    render();
  });

  modeSelect.addEventListener('change', () => {
    generateNewPalette();
    render();
  });

  // Spacebar to regenerate
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'SELECT') {
      e.preventDefault();
      generateNewPalette();
      render();
    }
  });

  copyCssBtn.addEventListener('click', () => {
    copyToClipboard(exportCss.textContent, copyCssBtn);
  });

  copyHexBtn.addEventListener('click', () => {
    copyToClipboard(exportHex.textContent, copyHexBtn);
  });

  initSlots();
}

function lockIconSvg() {
  return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>';
}

function unlockIconSvg() {
  return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 019.9-1"/></svg>';
}

document.addEventListener('DOMContentLoaded', init);
