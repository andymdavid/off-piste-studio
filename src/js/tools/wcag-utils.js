// WCAG contrast ratio calculation utilities

/**
 * Calculate relative luminance per WCAG 2.1 specification.
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {number} Relative luminance (0-1)
 */
export function relativeLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors.
 * @returns {number} Contrast ratio (1-21)
 */
export function contrastRatio(r1, g1, b1, r2, g2, b2) {
  const l1 = relativeLuminance(r1, g1, b1);
  const l2 = relativeLuminance(r2, g2, b2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check WCAG compliance levels for a given contrast ratio.
 */
export function checkWcag(ratio) {
  return {
    aa: { normal: ratio >= 4.5, large: ratio >= 3 },
    aaa: { normal: ratio >= 7, large: ratio >= 4.5 },
  };
}

/**
 * Find the nearest accessible color by adjusting lightness.
 * Returns an adjusted {r, g, b} that meets the target ratio against the fixed color.
 */
export function findAccessibleColor(fixedR, fixedG, fixedB, adjustR, adjustG, adjustB, targetRatio = 4.5) {
  const fixedLum = relativeLuminance(fixedR, fixedG, fixedB);

  // Convert adjustable color to HSL and binary search on lightness
  const { rgbToHsl, hslToRgb } = await_imports();

  const hsl = rgbToHsl(adjustR, adjustG, adjustB);
  let bestColor = { r: adjustR, g: adjustG, b: adjustB };
  let bestDiff = Infinity;

  // Try both directions: lighter and darker
  for (const direction of ['lighter', 'darker']) {
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

// Lazy import helper to avoid circular dependency
function await_imports() {
  // These are imported inline since this module is small
  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
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
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const hslToRgb = (h, s, l) => {
    h /= 360; s /= 100; l /= 100;
    if (s === 0) { const v = Math.round(l * 255); return { r: v, g: v, b: v }; }
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1; if (t > 1) t -= 1;
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
  };

  return { rgbToHsl, hslToRgb };
}
