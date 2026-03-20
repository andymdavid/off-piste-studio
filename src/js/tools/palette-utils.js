// Colour harmony and palette generation utilities

import { hslToRgb, rgbToHsl } from './color-utils.js';

/**
 * Generate a harmonious palette from a base colour.
 * @param {number} h - Base hue (0-360)
 * @param {number} s - Base saturation (0-100)
 * @param {number} l - Base lightness (0-100)
 * @param {string} mode - Harmony mode
 * @returns {Array<{h, s, l}>} Array of 5 HSL colours
 */
export function generateHarmony(h, s, l, mode) {
  switch (mode) {
    case 'complementary':
      return [
        { h, s, l },
        { h: (h + 30) % 360, s: clampS(s - 10), l: clampL(l + 15) },
        { h: (h + 180) % 360, s, l },
        { h: (h + 180) % 360, s: clampS(s - 15), l: clampL(l + 20) },
        { h: (h + 210) % 360, s: clampS(s - 20), l: clampL(l - 10) },
      ];

    case 'analogous':
      return [
        { h: (h - 30 + 360) % 360, s, l },
        { h: (h - 15 + 360) % 360, s: clampS(s - 5), l: clampL(l + 10) },
        { h, s, l },
        { h: (h + 15) % 360, s: clampS(s - 5), l: clampL(l + 10) },
        { h: (h + 30) % 360, s, l },
      ];

    case 'triadic':
      return [
        { h, s, l },
        { h, s: clampS(s - 20), l: clampL(l + 25) },
        { h: (h + 120) % 360, s, l },
        { h: (h + 240) % 360, s, l },
        { h: (h + 240) % 360, s: clampS(s - 15), l: clampL(l + 20) },
      ];

    case 'split-complementary':
      return [
        { h, s, l },
        { h, s: clampS(s - 15), l: clampL(l + 20) },
        { h: (h + 150) % 360, s, l },
        { h: (h + 210) % 360, s, l },
        { h: (h + 180) % 360, s: clampS(s - 20), l: clampL(l + 25) },
      ];

    case 'monochromatic':
      return [
        { h, s, l: clampL(l - 20) },
        { h, s, l: clampL(l - 10) },
        { h, s, l },
        { h, s: clampS(s - 10), l: clampL(l + 15) },
        { h, s: clampS(s - 20), l: clampL(l + 30) },
      ];

    default:
      return generateHarmony(h, s, l, 'complementary');
  }
}

/**
 * Generate a random pleasant colour.
 */
export function randomColor() {
  return {
    h: Math.floor(Math.random() * 360),
    s: 40 + Math.floor(Math.random() * 40), // 40-80
    l: 30 + Math.floor(Math.random() * 40), // 30-70
  };
}

function clampS(v) { return Math.max(5, Math.min(100, v)); }
function clampL(v) { return Math.max(5, Math.min(95, v)); }
