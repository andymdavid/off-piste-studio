import { FONT_PAIRINGS } from './font-pairings-data.js';

const loadedFonts = new Set();

function loadGoogleFont(fontName, weights = '400;700') {
  const key = `${fontName}:${weights}`;
  if (loadedFonts.has(key)) return;
  loadedFonts.add(key);
  const encoded = fontName.replace(/ /g, '+');
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@${weights}&display=swap`;
  document.head.appendChild(link);
}

function fontFamilyCSS(fontName) {
  return `'${fontName}', sans-serif`;
}

function googleFontsLink(heading, body) {
  const h = heading.replace(/ /g, '+');
  const b = body.replace(/ /g, '+');
  return `<link href="https://fonts.googleapis.com/css2?family=${h}:wght@400;700&family=${b}:wght@400;700&display=swap" rel="stylesheet">`;
}

function cssSnippet(heading, body) {
  return `/* Heading font */
h1, h2, h3, h4, h5, h6 {
  font-family: '${heading}', sans-serif;
}

/* Body font */
body, p, li, span {
  font-family: '${body}', sans-serif;
}`;
}

function init() {
  const searchInput = document.getElementById('font-search');
  const searchDropdown = document.getElementById('font-search-dropdown');
  const categoryBtns = document.querySelectorAll('.fp-category-btn');
  const moodBtns = document.querySelectorAll('.fp-mood-btn');
  const pairingsGrid = document.getElementById('pairings-grid');
  const previewArea = document.getElementById('font-preview-area');
  const exportArea = document.getElementById('font-export-area');
  const exportLink = document.getElementById('export-link-code');
  const exportCSS = document.getElementById('export-css-code');
  const copyLinkBtn = document.getElementById('copy-font-link');
  const copyCSSBtn = document.getElementById('copy-font-css');
  const selectedHeadingEl = document.getElementById('selected-heading-font');
  const selectedWrap = document.querySelector('.fp-selected');
  const emptyState = document.getElementById('fp-empty-state');

  const headingFonts = Object.keys(FONT_PAIRINGS);
  let activeCategory = 'all';
  let activeMood = 'all';
  let selectedHeading = null;
  let selectedBody = null;

  // Category filters
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeCategory = btn.dataset.category;
      updateDropdown(searchInput.value);
    });
  });

  // Mood filters
  moodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      moodBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeMood = btn.dataset.mood;
      if (selectedHeading) renderPairings();
    });
  });

  // Search input — show dropdown on focus with all fonts visible
  searchInput.addEventListener('focus', () => {
    searchInput.select();
    updateDropdown(searchInput.value);
    searchDropdown.hidden = false;
  });

  searchInput.addEventListener('input', () => {
    updateDropdown(searchInput.value);
    searchDropdown.hidden = false;
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.fp-search')) {
      searchDropdown.hidden = true;
    }
  });

  function getFilteredHeadings(query) {
    const q = query.toLowerCase().trim();
    return headingFonts.filter(name => {
      if (activeCategory !== 'all' && FONT_PAIRINGS[name].category !== activeCategory) return false;
      if (q && !name.toLowerCase().includes(q)) return false;
      return true;
    });
  }

  function updateDropdown(query) {
    const matches = getFilteredHeadings(query);
    if (matches.length === 0) {
      searchDropdown.innerHTML = '<div class="fp-dropdown-empty">No fonts match your search</div>';
      searchDropdown.hidden = false;
      return;
    }

    // Load all visible fonts so they render in their own typeface
    matches.forEach(name => loadGoogleFont(name));

    searchDropdown.innerHTML = matches.map(name => {
      const cat = FONT_PAIRINGS[name].category;
      return `<button class="fp-dropdown-item" data-font="${name}" type="button">
        <span class="fp-dropdown-item__preview" style="font-family:${fontFamilyCSS(name)}">${name}</span>
        <span class="fp-dropdown-item__cat">${cat}</span>
      </button>`;
    }).join('');
    searchDropdown.hidden = false;

    searchDropdown.querySelectorAll('.fp-dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        selectHeadingFont(item.dataset.font);
        searchDropdown.hidden = true;
      });
    });
  }

  function selectHeadingFont(name) {
    selectedHeading = name;
    searchInput.value = name;
    selectedHeadingEl.textContent = name;
    loadGoogleFont(name);
    renderPairings();
    emptyState.hidden = true;
    selectedWrap.hidden = false;
    pairingsGrid.hidden = false;
    previewArea.hidden = true;
    exportArea.hidden = true;
  }

  function renderPairings() {
    const data = FONT_PAIRINGS[selectedHeading];
    if (!data) return;

    let pairings = data.pairings;
    if (activeMood !== 'all') {
      pairings = pairings.filter(p => p.mood === activeMood);
    }

    if (pairings.length === 0) {
      pairingsGrid.innerHTML = '<div class="fp-no-pairings">No pairings match this mood filter. Try a different mood.</div>';
      return;
    }

    // Load all body fonts
    pairings.forEach(p => loadGoogleFont(p.font));

    pairingsGrid.innerHTML = pairings.map(p => `
      <div class="pairing-card">
        <div class="pairing-card__sample">
          <span class="pairing-card__heading" style="font-family:${fontFamilyCSS(selectedHeading)}">${selectedHeading}</span>
          <span class="pairing-card__body-sample" style="font-family:${fontFamilyCSS(p.font)}">The quick brown fox jumps over the lazy dog. Regular weight at body size for comfortable reading.</span>
        </div>
        <div class="pairing-card__info">
          <div class="pairing-card__meta">
            <span class="pairing-card__font-name">${p.font}</span>
            <span class="pairing-card__mood pairing-card__mood--${p.mood}">${p.mood}</span>
          </div>
          <p class="pairing-card__note">${p.note}</p>
          <button class="pairing-card__preview-btn" data-body="${p.font}" type="button">Preview this pairing</button>
        </div>
      </div>
    `).join('');

    pairingsGrid.querySelectorAll('.pairing-card__preview-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activatePairing(btn.dataset.body);
      });
    });
  }

  function activatePairing(bodyFont) {
    selectedBody = bodyFont;
    loadGoogleFont(bodyFont);
    loadGoogleFont(selectedHeading);

    // Update preview
    previewArea.hidden = false;
    exportArea.hidden = false;

    const headingFamily = fontFamilyCSS(selectedHeading);
    const bodyFamily = fontFamilyCSS(bodyFont);

    // Hero context
    const heroH = previewArea.querySelector('.fp-context--hero h2');
    const heroP = previewArea.querySelector('.fp-context--hero p');
    heroH.style.fontFamily = headingFamily;
    heroP.style.fontFamily = bodyFamily;

    // Article context
    const artH = previewArea.querySelector('.fp-context--article h3');
    const artPs = previewArea.querySelectorAll('.fp-context--article p');
    artH.style.fontFamily = headingFamily;
    artPs.forEach(p => p.style.fontFamily = bodyFamily);

    // Card context
    const cardH = previewArea.querySelector('.fp-context--card h4');
    const cardP = previewArea.querySelector('.fp-context--card p');
    cardH.style.fontFamily = headingFamily;
    cardP.style.fontFamily = bodyFamily;

    // Update active label
    const activeLabel = previewArea.querySelector('.fp-preview__active-label');
    if (activeLabel) {
      activeLabel.textContent = `${selectedHeading} + ${bodyFont}`;
    }

    // Export
    exportLink.textContent = googleFontsLink(selectedHeading, bodyFont);
    exportCSS.textContent = cssSnippet(selectedHeading, bodyFont);

    // Scroll to preview
    previewArea.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Highlight active card
    pairingsGrid.querySelectorAll('.pairing-card').forEach(card => {
      const btn = card.querySelector('.pairing-card__preview-btn');
      if (btn.dataset.body === bodyFont) {
        card.classList.add('is-active');
      } else {
        card.classList.remove('is-active');
      }
    });
  }

  // Copy buttons
  copyLinkBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(exportLink.textContent).then(() => {
      copyLinkBtn.textContent = 'Copied!';
      copyLinkBtn.classList.add('is-copied');
      setTimeout(() => {
        copyLinkBtn.textContent = 'Copy';
        copyLinkBtn.classList.remove('is-copied');
      }, 2000);
    });
  });

  copyCSSBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(exportCSS.textContent).then(() => {
      copyCSSBtn.textContent = 'Copied!';
      copyCSSBtn.classList.add('is-copied');
      setTimeout(() => {
        copyCSSBtn.textContent = 'Copy';
        copyCSSBtn.classList.remove('is-copied');
      }, 2000);
    });
  });
}

if (document.querySelector('.font-pairing-tool')) {
  init();
}
