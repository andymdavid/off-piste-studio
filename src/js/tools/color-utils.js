// Color conversion and utility functions

/**
 * Parse any color string (hex, rgb, hsl) into {r, g, b} (0-255).
 */
export function parseColor(str) {
  str = str.trim().toLowerCase();

  // Hex
  const hex = str.replace(/^#/, '');
  if (/^[0-9a-f]{3}$/.test(hex)) {
    return {
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
    };
  }
  if (/^[0-9a-f]{6}$/.test(hex)) {
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    };
  }

  // rgb(r, g, b)
  const rgbMatch = str.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
  if (rgbMatch) {
    return { r: +rgbMatch[1], g: +rgbMatch[2], b: +rgbMatch[3] };
  }

  // hsl(h, s%, l%)
  const hslMatch = str.match(/^hsl\(\s*(\d+)\s*,\s*(\d+)%?\s*,\s*(\d+)%?\s*\)$/);
  if (hslMatch) {
    return hslToRgb(+hslMatch[1], +hslMatch[2], +hslMatch[3]);
  }

  return null;
}

/**
 * Convert RGB (0-255) to hex string with leading #.
 */
export function rgbToHex(r, g, b) {
  const toHex = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert RGB (0-255) to HSL {h: 0-360, s: 0-100, l: 0-100}.
 */
export function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0, s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL (h: 0-360, s: 0-100, l: 0-100) to RGB {r, g, b} (0-255).
 */
export function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;

  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }

  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hue2rgb(p, q, h + 1/3) * 255),
    g: Math.round(hue2rgb(p, q, h) * 255),
    b: Math.round(hue2rgb(p, q, h - 1/3) * 255),
  };
}

/**
 * Clamp a number between min and max.
 */
export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

/**
 * Find the nearest named CSS color for a given RGB value.
 */
export function nearestColorName(r, g, b) {
  let bestName = '';
  let bestDist = Infinity;

  for (const [name, hex] of Object.entries(CSS_COLORS)) {
    const c = parseColor(hex);
    const dist = (c.r - r) ** 2 + (c.g - g) ** 2 + (c.b - b) ** 2;
    if (dist < bestDist) {
      bestDist = dist;
      bestName = name;
    }
  }

  return bestName;
}

/**
 * Common CSS named colors (subset for performance).
 */
export const CSS_COLORS = {
  'Black': '#000000', 'White': '#ffffff', 'Red': '#ff0000', 'Green': '#008000',
  'Blue': '#0000ff', 'Yellow': '#ffff00', 'Cyan': '#00ffff', 'Magenta': '#ff00ff',
  'Silver': '#c0c0c0', 'Gray': '#808080', 'Maroon': '#800000', 'Olive': '#808000',
  'Navy': '#000080', 'Purple': '#800080', 'Teal': '#008080', 'Orange': '#ffa500',
  'Coral': '#ff7f50', 'Salmon': '#fa8072', 'Tomato': '#ff6347', 'Crimson': '#dc143c',
  'Firebrick': '#b22222', 'DarkRed': '#8b0000', 'Pink': '#ffc0cb', 'HotPink': '#ff69b4',
  'DeepPink': '#ff1493', 'Gold': '#ffd700', 'Khaki': '#f0e68c', 'Lavender': '#e6e6fa',
  'Violet': '#ee82ee', 'Orchid': '#da70d6', 'Plum': '#dda0dd', 'Indigo': '#4b0082',
  'SlateBlue': '#6a5acd', 'MediumBlue': '#0000cd', 'RoyalBlue': '#4169e1',
  'DodgerBlue': '#1e90ff', 'SkyBlue': '#87ceeb', 'SteelBlue': '#4682b4',
  'Turquoise': '#40e0d0', 'Aquamarine': '#7fffd4', 'MediumSpringGreen': '#00fa9a',
  'LimeGreen': '#32cd32', 'ForestGreen': '#228b22', 'DarkGreen': '#006400',
  'OliveDrab': '#6b8e23', 'DarkOliveGreen': '#556b2f', 'Chocolate': '#d2691e',
  'SaddleBrown': '#8b4513', 'Sienna': '#a0522d', 'Peru': '#cd853f', 'Tan': '#d2b48c',
  'Wheat': '#f5deb3', 'BurlyWood': '#deb887', 'Beige': '#f5f5dc', 'Ivory': '#fffff0',
  'Snow': '#fffafa', 'MistyRose': '#ffe4e1', 'SeaShell': '#fff5ee', 'Linen': '#faf0e6',
  'AntiqueWhite': '#faebd7', 'Bisque': '#ffe4c4', 'PeachPuff': '#ffdab9',
  'LightGray': '#d3d3d3', 'DarkGray': '#a9a9a9', 'DimGray': '#696969',
  'SlateGray': '#708090', 'DarkSlateGray': '#2f4f4f',
};
