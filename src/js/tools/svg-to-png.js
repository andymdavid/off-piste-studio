function init() {
  const tabUpload = document.getElementById('tab-upload');
  const tabPaste = document.getElementById('tab-paste');
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const browseBtn = document.getElementById('browse-btn');
  const pasteArea = document.getElementById('paste-area');
  const svgCodeInput = document.getElementById('svg-code');
  const loadSvgBtn = document.getElementById('load-svg-btn');
  const workspace = document.getElementById('workspace');
  const svgFilename = document.getElementById('svg-filename');
  const resetBtn = document.getElementById('reset-btn');
  const widthInput = document.getElementById('output-width');
  const heightInput = document.getElementById('output-height');
  const lockRatioBtn = document.getElementById('lock-ratio');
  const scaleBtns = document.querySelectorAll('.svg-converter__scale-btn');
  const previewCanvas = document.getElementById('preview-canvas');
  const outputFilesize = document.getElementById('output-filesize');
  const downloadBtn = document.getElementById('download-btn');

  let svgBlobUrl = null;
  let originalWidth = 0;
  let originalHeight = 0;
  let aspectRatio = 1;
  let ratioLocked = true;
  let currentScale = 1;
  let loadedImg = null;

  // Tab switching
  tabUpload.addEventListener('click', () => {
    tabUpload.classList.add('is-active');
    tabPaste.classList.remove('is-active');
    dropzone.hidden = false;
    pasteArea.hidden = true;
  });

  tabPaste.addEventListener('click', () => {
    tabPaste.classList.add('is-active');
    tabUpload.classList.remove('is-active');
    dropzone.hidden = true;
    pasteArea.hidden = false;
  });

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

  // Load SVG from pasted code
  loadSvgBtn.addEventListener('click', () => {
    const code = svgCodeInput.value.trim();
    if (!code) return;
    if (!code.includes('<svg')) {
      alert('No valid SVG element found. Please paste SVG markup starting with <svg>.');
      return;
    }
    const blob = new Blob([code], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    loadSvg(url, 'pasted-svg.svg');
  });

  function handleFile(file) {
    if (!file.name.toLowerCase().endsWith('.svg') && file.type !== 'image/svg+xml') {
      alert('Please upload an SVG file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File too large. Maximum size is 10 MB.');
      return;
    }
    const url = URL.createObjectURL(file);
    loadSvg(url, file.name);
  }

  function loadSvg(url, filename) {
    if (svgBlobUrl) URL.revokeObjectURL(svgBlobUrl);
    svgBlobUrl = url;

    const img = new Image();
    img.onload = () => {
      loadedImg = img;

      // Try to get intrinsic dimensions
      originalWidth = img.naturalWidth || 300;
      originalHeight = img.naturalHeight || 150;
      aspectRatio = originalWidth / originalHeight;

      // If the SVG has no intrinsic size (0x0), try parsing viewBox from the blob
      if (originalWidth === 0 || originalHeight === 0) {
        originalWidth = 300;
        originalHeight = 300;
        aspectRatio = 1;
      }

      svgFilename.textContent = filename;
      widthInput.value = originalWidth;
      heightInput.value = originalHeight;
      currentScale = 1;
      setActiveScale(1);

      workspace.hidden = false;
      dropzone.hidden = true;
      pasteArea.hidden = true;

      renderPreview();
    };
    img.onerror = () => {
      alert('Failed to load SVG. Please check the file is valid.');
    };
    img.src = url;
  }

  // Aspect ratio lock
  lockRatioBtn.addEventListener('click', () => {
    ratioLocked = !ratioLocked;
    lockRatioBtn.classList.toggle('is-locked', ratioLocked);
    lockRatioBtn.setAttribute('aria-pressed', String(ratioLocked));

    // Update icon
    if (ratioLocked) {
      lockRatioBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>';
    } else {
      lockRatioBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 019.9-1"/></svg>';
    }
  });

  // Width input change
  widthInput.addEventListener('input', () => {
    const w = parseInt(widthInput.value, 10);
    if (!w || w < 1) return;
    if (ratioLocked) {
      heightInput.value = Math.round(w / aspectRatio);
    }
    currentScale = 0;
    setActiveScale(0);
    renderPreview();
  });

  // Height input change
  heightInput.addEventListener('input', () => {
    const h = parseInt(heightInput.value, 10);
    if (!h || h < 1) return;
    if (ratioLocked) {
      widthInput.value = Math.round(h * aspectRatio);
    }
    currentScale = 0;
    setActiveScale(0);
    renderPreview();
  });

  // Scale preset buttons
  scaleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const scale = parseInt(btn.dataset.scale, 10);
      currentScale = scale;
      setActiveScale(scale);
      widthInput.value = Math.round(originalWidth * scale);
      heightInput.value = Math.round(originalHeight * scale);
      renderPreview();
    });
  });

  function setActiveScale(scale) {
    scaleBtns.forEach((btn) => {
      btn.classList.toggle('is-active', parseInt(btn.dataset.scale, 10) === scale);
    });
  }

  function renderPreview() {
    if (!loadedImg) return;

    const w = parseInt(widthInput.value, 10) || originalWidth;
    const h = parseInt(heightInput.value, 10) || originalHeight;

    previewCanvas.width = w;
    previewCanvas.height = h;

    const ctx = previewCanvas.getContext('2d');
    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(loadedImg, 0, 0, w, h);

    // Calculate file size from data URL
    const dataURL = previewCanvas.toDataURL('image/png');
    // Data URL: "data:image/png;base64,..." — base64 size is ~4/3 of binary
    const base64Len = dataURL.length - dataURL.indexOf(',') - 1;
    const byteSize = Math.round((base64Len * 3) / 4);
    outputFilesize.textContent = formatBytes(byteSize);
  }

  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  }

  // Download
  downloadBtn.addEventListener('click', () => {
    const dataURL = previewCanvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataURL;
    const w = parseInt(widthInput.value, 10) || originalWidth;
    const h = parseInt(heightInput.value, 10) || originalHeight;
    a.download = `converted-${w}x${h}.png`;
    a.click();
  });

  // Reset
  resetBtn.addEventListener('click', () => {
    workspace.hidden = true;
    dropzone.hidden = false;
    pasteArea.hidden = true;
    tabUpload.classList.add('is-active');
    tabPaste.classList.remove('is-active');
    fileInput.value = '';
    svgCodeInput.value = '';
    previewCanvas.width = 0;
    previewCanvas.height = 0;
    outputFilesize.textContent = '';
    loadedImg = null;
    if (svgBlobUrl) {
      URL.revokeObjectURL(svgBlobUrl);
      svgBlobUrl = null;
    }
    currentScale = 1;
    setActiveScale(1);
  });
}

document.addEventListener('DOMContentLoaded', init);
