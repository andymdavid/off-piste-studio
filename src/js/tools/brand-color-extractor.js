import { rgbToHex, rgbToHsl, nearestColorName } from './color-utils.js';
import { loadImagePixels, extractColors } from './canvas-utils.js';
import { copyToClipboard } from './export-utils.js';

function init() {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const browseBtn = document.getElementById('browse-btn');
  const preview = document.getElementById('image-preview');
  const previewImg = document.getElementById('preview-image');
  const resultsSection = document.getElementById('extractor-results');
  const paletteGrid = document.getElementById('palette-grid');
  const exportCss = document.getElementById('export-css');
  const exportHex = document.getElementById('export-hex');
  const copyCssBtn = document.getElementById('copy-css');
  const copyHexBtn = document.getElementById('copy-hex');
  const resetBtn = document.getElementById('reset-btn');
  const refineLink = document.getElementById('refine-link');
  const loadingEl = document.getElementById('extractor-loading');

  let extractedColors = [];

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('File too large. Maximum size is 10MB.');
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src = e.target.result;
      preview.hidden = false;
      dropzone.hidden = true;
    };
    reader.readAsDataURL(file);

    // Extract colours
    loadingEl.hidden = false;
    resultsSection.hidden = true;

    loadImagePixels(file).then(({ pixels }) => {
      extractedColors = extractColors(pixels, 6);
      renderResults();
      loadingEl.hidden = true;
      resultsSection.hidden = false;
    }).catch(() => {
      loadingEl.hidden = true;
      alert('Could not process this image. Try another file.');
    });
  }

  function renderResults() {
    paletteGrid.innerHTML = '';

    extractedColors.forEach((color, i) => {
      const hex = rgbToHex(color.r, color.g, color.b);
      const hsl = rgbToHsl(color.r, color.g, color.b);
      const name = nearestColorName(color.r, color.g, color.b);

      const card = document.createElement('div');
      card.className = 'palette-card';
      card.innerHTML = `
        <div class="palette-card__swatch" style="background-color: ${hex}"></div>
        <div class="palette-card__info">
          <span class="palette-card__hex">${hex}</span>
          <span class="palette-card__name">${name}</span>
          <span class="palette-card__values">rgb(${color.r}, ${color.g}, ${color.b})</span>
          <span class="palette-card__values">hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)</span>
        </div>
        <div class="palette-card__actions">
          <button class="tool-copy-btn" data-copy-hex="${hex}" type="button">Copy</button>
          <a class="tool-copy-btn" href="/tools/contrast-checker.html?text=${hex.slice(1)}&bg=ffffff" title="Check contrast">Check</a>
        </div>
      `;

      // Copy button
      card.querySelector('[data-copy-hex]').addEventListener('click', (e) => {
        copyToClipboard(hex, e.target);
      });

      paletteGrid.appendChild(card);
    });

    // Build export values
    const cssVars = extractedColors.map((c, i) => {
      const hex = rgbToHex(c.r, c.g, c.b);
      const labels = ['primary', 'secondary', 'accent', 'surface', 'muted', 'detail'];
      return `  --color-${labels[i] || 'color-' + (i + 1)}: ${hex};`;
    }).join('\n');

    const hexList = extractedColors.map(c => rgbToHex(c.r, c.g, c.b)).join(', ');

    exportCss.textContent = `:root {\n${cssVars}\n}`;
    exportHex.textContent = hexList;

    // Update refine link with extracted colours
    const colorParams = extractedColors.map(c => rgbToHex(c.r, c.g, c.b).slice(1)).join(',');
    refineLink.href = `/tools/color-palette.html?colors=${colorParams}`;
  }

  // Drag and drop
  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('is-dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('is-dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('is-dragover');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  });

  // Browse button
  browseBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) handleFile(fileInput.files[0]);
  });

  // Copy buttons
  copyCssBtn.addEventListener('click', () => {
    copyToClipboard(exportCss.textContent, copyCssBtn);
  });

  copyHexBtn.addEventListener('click', () => {
    copyToClipboard(exportHex.textContent, copyHexBtn);
  });

  // Reset
  resetBtn.addEventListener('click', () => {
    preview.hidden = true;
    resultsSection.hidden = true;
    dropzone.hidden = false;
    fileInput.value = '';
    extractedColors = [];
    paletteGrid.innerHTML = '';
  });
}

document.addEventListener('DOMContentLoaded', init);
