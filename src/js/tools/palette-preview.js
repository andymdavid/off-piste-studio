import { parseColor, rgbToHex, rgbToHsl, hslToRgb } from './color-utils.js';
import { copyToClipboard } from './export-utils.js';
import { attachColorPicker } from './color-picker.js';

function init() {
  const previewFrame = document.getElementById('preview-frame');
  const templateBtns = document.querySelectorAll('[data-template]');
  const colorInputs = document.querySelectorAll('.preview-color-input');
  const resetBtn = document.getElementById('preview-reset');

  const roles = ['primary', 'secondary', 'accent', 'bg', 'text', 'muted'];

  // Default colours
  const defaults = {
    primary: '#d4622a',
    secondary: '#1a1a2e',
    accent: '#e94560',
    bg: '#ffffff',
    text: '#1a1a2e',
    muted: '#6b7280',
  };

  let colors = { ...defaults };
  let activeTemplate = 'services';

  function loadFromParams() {
    const params = new URLSearchParams(window.location.search);
    const colorsParam = params.get('colors');
    const templateParam = params.get('template');

    if (colorsParam) {
      const hexes = colorsParam.split(',').map(h => '#' + h.replace(/^#/, ''));
      const assignments = ['primary', 'secondary', 'accent', 'bg', 'text', 'muted'];
      hexes.forEach((hex, i) => {
        if (assignments[i] && parseColor(hex)) {
          colors[assignments[i]] = hex;
        }
      });

      // If only a few colours provided, derive the rest intelligently
      if (hexes.length <= 3) {
        // Auto-assign bg/text/muted if not provided
        const primary = parseColor(colors.primary);
        if (primary) {
          const hsl = rgbToHsl(primary.r, primary.g, primary.b);
          // Light primary → dark text, dark bg
          if (hsl.l > 50) {
            colors.bg = '#ffffff';
            colors.text = '#1a1a2e';
            colors.muted = '#6b7280';
          } else {
            colors.bg = '#ffffff';
            colors.text = colors.primary;
            colors.muted = '#6b7280';
          }
        }
      }
    }

    if (templateParam) {
      activeTemplate = templateParam;
    }
  }

  function syncInputs() {
    colorInputs.forEach(input => {
      const role = input.dataset.role;
      const picker = input.querySelector('.preview-color-input__picker');
      const text = input.querySelector('.preview-color-input__text');
      if (picker && text && colors[role]) {
        picker.value = colors[role];
        text.value = colors[role];
      }
    });
  }

  function updatePreview() {
    // Set CSS variables on the preview frame
    roles.forEach(role => {
      previewFrame.style.setProperty(`--preview-${role}`, colors[role]);
    });

    // Derive a lighter version of primary for hover/subtle uses
    const primary = parseColor(colors.primary);
    if (primary) {
      const hsl = rgbToHsl(primary.r, primary.g, primary.b);
      const lighter = hslToRgb(hsl.h, Math.max(hsl.s - 10, 0), Math.min(hsl.l + 15, 95));
      previewFrame.style.setProperty('--preview-primary-light', rgbToHex(lighter.r, lighter.g, lighter.b));
    }

    // Update active template
    previewFrame.querySelectorAll('.preview-template').forEach(t => {
      t.hidden = t.dataset.template !== activeTemplate;
    });

    templateBtns.forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.template === activeTemplate);
    });

    updateUrl();
  }

  function updateUrl() {
    const hexes = roles.map(r => colors[r].replace('#', '')).join(',');
    const url = new URL(window.location);
    url.searchParams.set('colors', hexes);
    url.searchParams.set('template', activeTemplate);
    window.history.replaceState({}, '', url);
  }

  // Color input events
  colorInputs.forEach(input => {
    const role = input.dataset.role;
    const picker = input.querySelector('.preview-color-input__picker');
    const text = input.querySelector('.preview-color-input__text');

    attachColorPicker(picker, {
      color: colors[role],
      onChange: (hex) => {
        colors[role] = hex;
        text.value = hex;
        updatePreview();
      },
    });

    text.addEventListener('change', () => {
      const parsed = parseColor(text.value);
      if (parsed) {
        const hex = rgbToHex(parsed.r, parsed.g, parsed.b);
        colors[role] = hex;
        picker.value = hex;
        text.value = hex;
        updatePreview();
      }
    });
  });

  // Template switching
  templateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeTemplate = btn.dataset.template;
      updatePreview();
    });
  });

  // Reset
  resetBtn.addEventListener('click', () => {
    colors = { ...defaults };
    syncInputs();
    updatePreview();
  });

  // Init
  loadFromParams();
  syncInputs();
  updatePreview();
}

document.addEventListener('DOMContentLoaded', init);
