import { copyToClipboard } from './export-utils.js';

const SIZES = [
  { w: 16, h: 16, label: '16x16', desc: 'Browser tab' },
  { w: 32, h: 32, label: '32x32', desc: 'Taskbar shortcut' },
  { w: 48, h: 48, label: '48x48', desc: 'Windows site' },
  { w: 180, h: 180, label: '180x180', desc: 'Apple touch icon' },
  { w: 192, h: 192, label: '192x192', desc: 'Android home screen' },
  { w: 512, h: 512, label: '512x512', desc: 'PWA splash' },
];

/**
 * Progressive step-down scaling for high-quality downscaling.
 * Instead of scaling a 1000px image directly to 16px (which loses detail),
 * this halves the image repeatedly until it's close to the target size,
 * then does one final draw to the exact target.
 */
function stepDownScale(img, targetW, targetH) {
  let currentW = img.naturalWidth || img.width;
  let currentH = img.naturalHeight || img.height;

  // Start with the source image drawn to a canvas
  let src = document.createElement('canvas');
  src.width = currentW;
  src.height = currentH;
  const srcCtx = src.getContext('2d');
  srcCtx.drawImage(img, 0, 0);

  // Step down by halves until within 2x of target
  while (currentW > targetW * 2 || currentH > targetH * 2) {
    const nextW = Math.max(Math.round(currentW / 2), targetW);
    const nextH = Math.max(Math.round(currentH / 2), targetH);
    const step = document.createElement('canvas');
    step.width = nextW;
    step.height = nextH;
    const stepCtx = step.getContext('2d');
    stepCtx.imageSmoothingEnabled = true;
    stepCtx.imageSmoothingQuality = 'high';
    stepCtx.drawImage(src, 0, 0, nextW, nextH);
    src = step;
    currentW = nextW;
    currentH = nextH;
  }

  // Final draw to exact target size
  const final = document.createElement('canvas');
  final.width = targetW;
  final.height = targetH;
  const finalCtx = final.getContext('2d');
  finalCtx.imageSmoothingEnabled = true;
  finalCtx.imageSmoothingQuality = 'high';
  finalCtx.drawImage(src, 0, 0, targetW, targetH);

  return final;
}

function init() {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const browseBtn = document.getElementById('browse-btn');
  const previewSection = document.getElementById('image-preview');
  const previewImg = document.getElementById('preview-image');
  const resetBtn = document.getElementById('reset-btn');
  const resultsSection = document.getElementById('favicon-results');
  const previewGrid = document.getElementById('favicon-grid');
  const snippetCode = document.getElementById('snippet-code');
  const copySnippetBtn = document.getElementById('copy-snippet');

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) {
      alert('File too large. Maximum size is 10MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target.result;
      previewImg.src = src;
      previewSection.hidden = false;
      dropzone.hidden = true;
      generateFavicons(src);
    };
    reader.readAsDataURL(file);
  }

  function generateFavicons(src) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      previewGrid.innerHTML = '';
      const snippetLines = [];

      SIZES.forEach((size) => {
        // Use step-down scaling for better quality on large reductions
        const canvas = stepDownScale(img, size.w, size.h);

        const dataURL = canvas.toDataURL('image/png');

        // Build preview card
        const card = document.createElement('div');
        card.className = 'favicon-card';

        const previewWrap = document.createElement('div');
        previewWrap.className = 'favicon-card__preview';

        // Preview: use the already-rendered favicon canvas, display at 96px via CSS
        const previewCanvas = document.createElement('canvas');
        previewCanvas.width = size.w;
        previewCanvas.height = size.h;
        const pCtx = previewCanvas.getContext('2d');
        pCtx.drawImage(canvas, 0, 0);
        // Show small sizes at actual size, larger sizes capped at 96px
        const displaySize = size.w <= 48 ? size.w : Math.min(size.w, 96);
        previewCanvas.style.width = displaySize + 'px';
        previewCanvas.style.height = displaySize + 'px';
        previewWrap.appendChild(previewCanvas);

        const info = document.createElement('div');
        info.className = 'favicon-card__info';
        info.innerHTML = `
          <span class="favicon-card__size">${size.label}</span>
          <span class="favicon-card__desc">${size.desc}</span>
        `;

        const dlBtn = document.createElement('button');
        dlBtn.className = 'favicon-card__download';
        dlBtn.type = 'button';
        dlBtn.textContent = 'Download';
        dlBtn.addEventListener('click', () => {
          const a = document.createElement('a');
          a.href = dataURL;
          a.download = `favicon-${size.w}x${size.h}.png`;
          a.click();
        });

        card.appendChild(previewWrap);
        card.appendChild(info);
        card.appendChild(dlBtn);
        previewGrid.appendChild(card);

        // Build snippet lines
        if (size.w === 180) {
          snippetLines.push(`<link rel="apple-touch-icon" sizes="${size.label}" href="/apple-touch-icon.png">`);
        } else if (size.w === 192) {
          snippetLines.push(`<link rel="icon" type="image/png" sizes="${size.label}" href="/android-chrome-${size.label}.png">`);
        } else if (size.w === 512) {
          snippetLines.push(`<link rel="icon" type="image/png" sizes="${size.label}" href="/android-chrome-${size.label}.png">`);
        } else {
          snippetLines.push(`<link rel="icon" type="image/png" sizes="${size.label}" href="/favicon-${size.label}.png">`);
        }
      });

      snippetCode.textContent = snippetLines.join('\n');
      resultsSection.hidden = false;
    };
    img.src = src;
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

  // Copy snippet
  copySnippetBtn.addEventListener('click', () => {
    copyToClipboard(snippetCode.textContent, copySnippetBtn);
  });

  // Reset
  resetBtn.addEventListener('click', () => {
    previewSection.hidden = true;
    resultsSection.hidden = true;
    dropzone.hidden = false;
    fileInput.value = '';
    previewGrid.innerHTML = '';
  });
}

document.addEventListener('DOMContentLoaded', init);
