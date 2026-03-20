// Custom colour picker component
// Replaces native <input type="color"> with an in-page picker
// Usage: attachColorPicker(triggerEl, { onChange, initialColor })

import { rgbToHex, rgbToHsl, hslToRgb, parseColor } from './color-utils.js';

let activePopover = null;

/**
 * Attach a custom colour picker to a trigger element.
 * @param {HTMLElement} trigger - The element that opens the picker (e.g. the native color input or swatch)
 * @param {object} opts
 * @param {string} opts.color - Initial hex colour
 * @param {function} opts.onChange - Called with hex string on every change
 */
export function attachColorPicker(trigger, opts = {}) {
  const state = {
    h: 0, s: 100, l: 50,
    ...parseToHsl(opts.color || '#ff0000'),
  };

  // Replace native picker click with custom popover
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (activePopover) {
      closePopover();
      return;
    }

    openPopover(trigger, state, opts.onChange);
  });

  // Expose a way to update the picker externally
  trigger._cpUpdate = (hex) => {
    const hsl = parseToHsl(hex);
    if (hsl) {
      state.h = hsl.h;
      state.s = hsl.s;
      state.l = hsl.l;
    }
  };
}

function parseToHsl(hex) {
  const rgb = parseColor(hex);
  if (!rgb) return null;
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

function openPopover(trigger, state, onChange) {
  closePopover();

  const popover = document.createElement('div');
  popover.className = 'cp-popover';

  popover.innerHTML = `
    <div class="cp-area">
      <div class="cp-area__gradient"></div>
      <div class="cp-area__cursor"></div>
    </div>
    <div class="cp-hue">
      <div class="cp-hue__track"></div>
      <div class="cp-hue__cursor"></div>
    </div>
    <div class="cp-footer">
      <div class="cp-footer__swatch"></div>
      <input type="text" class="cp-footer__input" spellcheck="false" autocomplete="off">
    </div>
  `;

  // Position relative to trigger
  const rect = trigger.getBoundingClientRect();
  popover.style.position = 'fixed';
  popover.style.zIndex = '9999';

  document.body.appendChild(popover);
  activePopover = popover;

  // Position: below trigger, or above if not enough space
  const popoverHeight = 280;
  const spaceBelow = window.innerHeight - rect.bottom;
  if (spaceBelow >= popoverHeight + 8) {
    popover.style.top = (rect.bottom + 4) + 'px';
  } else {
    popover.style.top = (rect.top - popoverHeight - 4) + 'px';
  }
  popover.style.left = Math.max(8, Math.min(rect.left, window.innerWidth - 232)) + 'px';

  const area = popover.querySelector('.cp-area');
  const areaGradient = popover.querySelector('.cp-area__gradient');
  const areaCursor = popover.querySelector('.cp-area__cursor');
  const hueTrack = popover.querySelector('.cp-hue');
  const hueCursor = popover.querySelector('.cp-hue__cursor');
  const swatch = popover.querySelector('.cp-footer__swatch');
  const hexInput = popover.querySelector('.cp-footer__input');

  function hslToPosition() {
    // Convert HSL to position in the SL area
    // Area X = saturation (0-100), Y = lightness (100-0)
    // But we use HSV model for the area (more intuitive)
    const rgb = hslToRgb(state.h, state.s, state.l);
    const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
    return { x: hsv.s / 100, y: 1 - hsv.v / 100 };
  }

  function positionToHsl(x, y) {
    // Convert position back to HSL via HSV
    const s = x * 100;
    const v = (1 - y) * 100;
    const rgb = hsvToRgb(state.h, s, v);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    state.s = hsl.s;
    state.l = hsl.l;
  }

  function update() {
    const rgb = hslToRgb(state.h, state.s, state.l);
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

    // Update area background (pure hue)
    areaGradient.style.backgroundColor = `hsl(${state.h}, 100%, 50%)`;

    // Update cursors
    const pos = hslToPosition();
    areaCursor.style.left = (pos.x * 100) + '%';
    areaCursor.style.top = (pos.y * 100) + '%';
    hueCursor.style.left = (state.h / 360 * 100) + '%';

    // Update swatch and input
    swatch.style.backgroundColor = hex;
    hexInput.value = hex;

    // Update trigger
    if (trigger.type === 'color') {
      trigger.value = hex;
    } else {
      trigger.style.backgroundColor = hex;
    }

    if (onChange) onChange(hex);
  }

  // Area dragging (saturation/brightness)
  function handleAreaMove(e) {
    const rect = area.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    positionToHsl(x, y);
    update();
  }

  area.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    handleAreaMove(e);
    const onMove = (ev) => { ev.preventDefault(); handleAreaMove(ev); };
    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  });

  // Hue dragging
  function handleHueMove(e) {
    const rect = hueTrack.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    state.h = Math.round(x * 360);
    update();
  }

  hueTrack.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    handleHueMove(e);
    const onMove = (ev) => { ev.preventDefault(); handleHueMove(ev); };
    const onUp = () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', onUp);
    };
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerup', onUp);
  });

  // Hex input
  hexInput.addEventListener('change', () => {
    const parsed = parseToHsl(hexInput.value);
    if (parsed) {
      state.h = parsed.h;
      state.s = parsed.s;
      state.l = parsed.l;
      update();
    }
  });

  // Close on outside click
  setTimeout(() => {
    document.addEventListener('pointerdown', handleOutsideClick);
  }, 0);

  update();
}

function handleOutsideClick(e) {
  if (activePopover && !activePopover.contains(e.target)) {
    closePopover();
  }
}

function closePopover() {
  if (activePopover) {
    activePopover.remove();
    activePopover = null;
    document.removeEventListener('pointerdown', handleOutsideClick);
  }
}

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePopover();
});

// --- HSV helpers (needed for the SV area) ---

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0, s = max === 0 ? 0 : d / max, v = max;

  if (d !== 0) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

function hsvToRgb(h, s, v) {
  h /= 360; s /= 100; v /= 100;
  let r, g, b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}
