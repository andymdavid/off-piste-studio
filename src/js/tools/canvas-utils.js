// Canvas-based image processing utilities

/**
 * Load an image file into pixel data.
 * @param {File} file - Image file from input
 * @returns {Promise<{pixels: Uint8ClampedArray, width: number, height: number}>}
 */
export function loadImagePixels(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      // Cap dimensions for performance — sample at max 200x200
      const maxDim = 200;
      let w = img.width;
      let h = img.height;

      if (w > maxDim || h > maxDim) {
        const scale = maxDim / Math.max(w, h);
        w = Math.round(w * scale);
        h = Math.round(h * scale);
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);

      const imageData = ctx.getImageData(0, 0, w, h);
      URL.revokeObjectURL(url);
      resolve({ pixels: imageData.data, width: w, height: h });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };

    img.src = url;
  });
}

/**
 * Extract dominant colours from pixel data using median cut algorithm.
 * @param {Uint8ClampedArray} pixels - RGBA pixel data
 * @param {number} count - Number of colours to extract
 * @returns {Array<{r: number, g: number, b: number, population: number}>}
 */
export function extractColors(pixels, count = 6) {
  // Collect RGB values, skipping near-transparent pixels
  const colors = [];
  for (let i = 0; i < pixels.length; i += 4) {
    const a = pixels[i + 3];
    if (a < 128) continue; // Skip transparent pixels

    colors.push([pixels[i], pixels[i + 1], pixels[i + 2]]);
  }

  if (colors.length === 0) return [];

  // Median cut
  const buckets = medianCut(colors, count);

  // Average each bucket and sort by population (largest first)
  const results = buckets
    .map(bucket => {
      let rSum = 0, gSum = 0, bSum = 0;
      for (const [r, g, b] of bucket) {
        rSum += r;
        gSum += g;
        bSum += b;
      }
      const len = bucket.length;
      return {
        r: Math.round(rSum / len),
        g: Math.round(gSum / len),
        b: Math.round(bSum / len),
        population: len,
      };
    })
    .sort((a, b) => b.population - a.population);

  // Filter out near-duplicates (colours within distance 30 of each other)
  const filtered = [];
  for (const color of results) {
    const isDuplicate = filtered.some(existing => {
      const dist = Math.sqrt(
        (existing.r - color.r) ** 2 +
        (existing.g - color.g) ** 2 +
        (existing.b - color.b) ** 2
      );
      return dist < 30;
    });
    if (!isDuplicate) filtered.push(color);
  }

  return filtered.slice(0, count);
}

/**
 * Median cut algorithm — recursively splits colour space.
 */
function medianCut(colors, targetBuckets) {
  if (colors.length === 0) return [];

  let buckets = [colors];

  // Over-split to account for merging later
  const maxSplits = targetBuckets * 2;

  while (buckets.length < maxSplits) {
    // Find the bucket with the largest range in any channel
    let bestIndex = 0;
    let bestRange = -1;
    let bestChannel = 0;

    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i];
      if (bucket.length < 2) continue;

      for (let ch = 0; ch < 3; ch++) {
        let min = 255, max = 0;
        for (const color of bucket) {
          if (color[ch] < min) min = color[ch];
          if (color[ch] > max) max = color[ch];
        }
        const range = max - min;
        if (range > bestRange) {
          bestRange = range;
          bestIndex = i;
          bestChannel = ch;
        }
      }
    }

    if (bestRange <= 0) break; // No more splits possible

    // Sort the chosen bucket by the chosen channel and split at median
    const bucket = buckets[bestIndex];
    bucket.sort((a, b) => a[bestChannel] - b[bestChannel]);
    const mid = Math.floor(bucket.length / 2);

    buckets.splice(bestIndex, 1, bucket.slice(0, mid), bucket.slice(mid));
  }

  return buckets.filter(b => b.length > 0);
}
