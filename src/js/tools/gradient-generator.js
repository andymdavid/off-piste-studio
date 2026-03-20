import { parseColor, rgbToHex } from './color-utils.js';
import { copyToClipboard } from './export-utils.js';
import { attachColorPicker } from './color-picker.js';

function init() {
  const preview = document.getElementById('gradient-preview');
  const cssOutput = document.getElementById('gradient-css');
  const copyCssBtn = document.getElementById('gradient-copy-css');
  const typeSelect = document.getElementById('gradient-type');
  const angleSlider = document.getElementById('gradient-angle');
  const angleValue = document.getElementById('angle-value');
  const stopsContainer = document.getElementById('gradient-stops');
  const addStopBtn = document.getElementById('add-stop');
  const randomBtn = document.getElementById('gradient-random');

  let stops = [
    { color: '#d4622a', position: 0 },
    { color: '#1a1a2e', position: 100 },
  ];

  function render() {
    renderStops();
    updatePreview();
  }

  function renderStops() {
    stopsContainer.innerHTML = '';

    stops.forEach((stop, i) => {
      const el = document.createElement('div');
      el.className = 'gradient-stop';
      el.innerHTML = `
        <input type="color" class="gradient-stop__picker" value="${stop.color}" data-index="${i}" aria-label="Stop ${i + 1} colour">
        <input type="text" class="gradient-stop__hex tool-text-input" value="${stop.color}" data-index="${i}" spellcheck="false" autocomplete="off">
        <div class="gradient-stop__position">
          <input type="range" class="gradient-stop__range" min="0" max="100" value="${stop.position}" data-index="${i}" aria-label="Stop ${i + 1} position">
          <span class="gradient-stop__percent">${stop.position}%</span>
        </div>
        ${stops.length > 2 ? `<button class="gradient-stop__remove" type="button" data-index="${i}" aria-label="Remove stop">&times;</button>` : ''}
      `;

      stopsContainer.appendChild(el);
    });

    // Custom colour pickers on each stop
    stopsContainer.querySelectorAll('.gradient-stop__picker').forEach(picker => {
      const i = parseInt(picker.dataset.index);
      attachColorPicker(picker, {
        color: stops[i].color,
        onChange: (hex) => {
          stops[i].color = hex;
          // Sync hex input
          const hexInput = stopsContainer.querySelector(`.gradient-stop__hex[data-index="${i}"]`);
          if (hexInput) hexInput.value = hex;
          updatePreview();
        },
      });
    });

    // Hex input events
    stopsContainer.querySelectorAll('.gradient-stop__hex').forEach(input => {
      input.addEventListener('change', (e) => {
        const i = parseInt(e.target.dataset.index);
        const parsed = parseColor(e.target.value);
        if (parsed) {
          stops[i].color = rgbToHex(parsed.r, parsed.g, parsed.b);
          render();
        }
      });
    });

    // Range events
    stopsContainer.querySelectorAll('.gradient-stop__range').forEach(range => {
      range.addEventListener('input', (e) => {
        const i = parseInt(e.target.dataset.index);
        stops[i].position = parseInt(e.target.value);
        updatePreview();
        e.target.closest('.gradient-stop').querySelector('.gradient-stop__percent').textContent = stops[i].position + '%';
      });
    });

    // Remove buttons
    stopsContainer.querySelectorAll('.gradient-stop__remove').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = parseInt(e.target.dataset.index);
        stops.splice(i, 1);
        render();
      });
    });
  }

  function updatePreview() {
    const type = typeSelect.value;
    const angle = angleSlider.value;
    angleValue.textContent = angle + '°';

    const stopsCss = stops
      .map(s => `${s.color} ${s.position}%`)
      .join(', ');

    let css;
    switch (type) {
      case 'linear':
        css = `linear-gradient(${angle}deg, ${stopsCss})`;
        break;
      case 'radial':
        css = `radial-gradient(circle, ${stopsCss})`;
        break;
      case 'conic':
        css = `conic-gradient(from ${angle}deg, ${stopsCss})`;
        break;
      default:
        css = `linear-gradient(${angle}deg, ${stopsCss})`;
    }

    preview.style.background = css;
    cssOutput.textContent = `background: ${css};`;
  }

  // Add stop
  addStopBtn.addEventListener('click', () => {
    if (stops.length >= 6) return;
    const lastPos = stops[stops.length - 1].position;
    const prevPos = stops[stops.length - 2]?.position || 0;
    const newPos = Math.min(100, Math.round((lastPos + prevPos) / 2));

    // Random hue blended between last two stops
    const c1 = parseColor(stops[stops.length - 2]?.color || '#ffffff');
    const c2 = parseColor(stops[stops.length - 1].color);
    const blended = rgbToHex(
      Math.round((c1.r + c2.r) / 2),
      Math.round((c1.g + c2.g) / 2),
      Math.round((c1.b + c2.b) / 2)
    );

    stops.splice(stops.length - 1, 0, { color: blended, position: newPos });
    // Re-sort by position
    stops.sort((a, b) => a.position - b.position);
    render();
  });

  // Random gradient
  randomBtn.addEventListener('click', () => {
    const randomHex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const numStops = 2 + Math.floor(Math.random() * 2); // 2-3 stops
    stops = [];
    for (let i = 0; i < numStops; i++) {
      stops.push({
        color: randomHex(),
        position: Math.round((i / (numStops - 1)) * 100),
      });
    }
    angleSlider.value = Math.floor(Math.random() * 360);
    render();
  });

  // Type and angle
  typeSelect.addEventListener('change', updatePreview);
  angleSlider.addEventListener('input', updatePreview);

  // Copy
  copyCssBtn.addEventListener('click', () => {
    copyToClipboard(cssOutput.textContent, copyCssBtn);
  });

  // Download PNG
  document.getElementById('download-png').addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    const angle = parseInt(angleSlider.value);
    const type = typeSelect.value;

    if (type === 'linear') {
      const rad = (angle - 90) * Math.PI / 180;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      const len = Math.sqrt(canvas.width ** 2 + canvas.height ** 2) / 2;
      const x0 = cx - Math.cos(rad) * len;
      const y0 = cy - Math.sin(rad) * len;
      const x1 = cx + Math.cos(rad) * len;
      const y1 = cy + Math.sin(rad) * len;
      const grad = ctx.createLinearGradient(x0, y0, x1, y1);
      stops.forEach(s => {
        grad.addColorStop(s.position / 100, s.color);
      });
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (type === 'radial') {
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      stops.forEach(s => {
        grad.addColorStop(s.position / 100, s.color);
      });
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (type === 'conic') {
      // Canvas doesn't natively support conic gradients — render via CSS on an offscreen element
      const el = document.createElement('div');
      el.style.width = canvas.width + 'px';
      el.style.height = canvas.height + 'px';
      el.style.position = 'fixed';
      el.style.left = '-9999px';
      const stopsCss = stops.map(s => `${s.color} ${s.position}%`).join(', ');
      el.style.background = `conic-gradient(from ${angle}deg, ${stopsCss})`;
      document.body.appendChild(el);
      // Fall back to linear for download
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      stops.forEach(s => {
        grad.addColorStop(s.position / 100, s.color);
      });
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      document.body.removeChild(el);
    }

    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'gradient.png';
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  });

  // Download SVG
  document.getElementById('download-svg').addEventListener('click', () => {
    const angle = parseInt(angleSlider.value);
    const type = typeSelect.value;
    const w = 1920;
    const h = 1080;

    let svgDef = '';

    if (type === 'linear') {
      const rad = (angle - 90) * Math.PI / 180;
      const x1 = 50 - Math.cos(rad) * 50;
      const y1 = 50 - Math.sin(rad) * 50;
      const x2 = 50 + Math.cos(rad) * 50;
      const y2 = 50 + Math.sin(rad) * 50;
      const svgStops = stops.map(s =>
        `<stop offset="${s.position}%" stop-color="${s.color}"/>`
      ).join('\n      ');
      svgDef = `<defs>
    <linearGradient id="g" x1="${x1.toFixed(1)}%" y1="${y1.toFixed(1)}%" x2="${x2.toFixed(1)}%" y2="${y2.toFixed(1)}%">
      ${svgStops}
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>`;
    } else if (type === 'radial') {
      const svgStops = stops.map(s =>
        `<stop offset="${s.position}%" stop-color="${s.color}"/>`
      ).join('\n      ');
      svgDef = `<defs>
    <radialGradient id="g" cx="50%" cy="50%" r="50%">
      ${svgStops}
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>`;
    } else {
      // Conic — SVG doesn't support conic gradients natively, fall back to linear
      const svgStops = stops.map(s =>
        `<stop offset="${s.position}%" stop-color="${s.color}"/>`
      ).join('\n      ');
      svgDef = `<defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      ${svgStops}
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>`;
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  ${svgDef}
</svg>`;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'gradient.svg';
    a.click();
    URL.revokeObjectURL(url);
  });

  // URL params
  const params = new URLSearchParams(window.location.search);
  if (params.get('colors')) {
    const hexes = params.get('colors').split(',');
    stops = hexes.slice(0, 6).map((hex, i) => ({
      color: '#' + hex.replace(/^#/, ''),
      position: Math.round((i / (hexes.length - 1)) * 100),
    }));
  }

  render();
}

document.addEventListener('DOMContentLoaded', init);
