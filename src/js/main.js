import { GLYPH_STATES } from './glyph-states.js';
import { animateGlyphRects } from './glyph-animator.js';
// Off Piste Studio - Main JavaScript


// Scale footer brand to fill the horizontal space available to it.
function scaleFooterBrand() {
  const brand = document.querySelector('.footer__brand');
  if (!brand) return;
  const brandText = brand.querySelector('.footer__brand-text');
  const measuredElement = brandText || brand;

  const styles = getComputedStyle(brand);
  const paddingLeft = parseFloat(styles.paddingLeft) || 0;
  const paddingRight = parseFloat(styles.paddingRight) || 0;

  const availableWidth = brand.clientWidth - paddingLeft - paddingRight;

  if (availableWidth <= 0) return;

  brand.style.setProperty('--footer-brand-scale', '1');
  brand.classList.remove('is-fit');
  brand.offsetHeight;

  const textWidth = measuredElement.scrollWidth;
  if (!textWidth) return;

  const scale = availableWidth / textWidth;

  brand.style.setProperty('--footer-brand-scale', scale.toString());
  brand.classList.add('is-fit');
}

function initCurrentHeader() {
  const header = document.querySelector('[data-duplicate-header]');
  if (!header) return;

  const toggle = header.querySelector('[data-duplicate-nav-toggle]');
  const overlay = document.querySelector('[data-duplicate-nav-overlay]');
  const menu = header.querySelector('#duplicate-site-menu');
  const closeTargets = header.querySelectorAll('[data-duplicate-nav-close]');

  const syncHeaderState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  const menuFocusable = () => [...header.querySelectorAll('a[href], button:not([disabled])')]
    .filter(element => element.offsetParent !== null && getComputedStyle(element).visibility !== 'hidden');

  const setMenuOpen = (isOpen, { restoreFocus = false } = {}) => {
    header.classList.toggle('is-open', isOpen);
    header.dataset.navigationStatus = isOpen ? 'active' : 'not-active';
    document.body.dataset.duplicateNavOpen = isOpen ? 'true' : 'false';
    overlay?.setAttribute('aria-hidden', String(!isOpen));

    if (menu) {
      menu.inert = !isOpen;
      menu.setAttribute('aria-hidden', String(!isOpen));
    }

    if (toggle) {
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    }

    if (isOpen) {
      window.requestAnimationFrame(() => menu?.querySelector('a[href]')?.focus());
    } else if (restoreFocus) {
      toggle?.focus();
    }
  };

  const closeMenu = (restoreFocus = false) => {
    setMenuOpen(false, { restoreFocus });
  };

  const toggleMenu = () => {
    const isOpen = header.classList.contains('is-open');
    setMenuOpen(!isOpen, { restoreFocus: isOpen });
  };

  syncHeaderState();
  setMenuOpen(false);
  window.addEventListener('scroll', syncHeaderState, { passive: true });

  if (toggle) {
    toggle.addEventListener('click', toggleMenu);
  }

  overlay?.addEventListener('click', () => closeMenu(true));
  header.addEventListener('duplicate-nav:close', () => closeMenu(false));

  closeTargets.forEach(target => {
    target.addEventListener('click', () => closeMenu(false));
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('is-open')) {
      event.preventDefault();
      closeMenu(true);
      return;
    }

    if (event.key !== 'Tab' || !header.classList.contains('is-open')) return;
    const focusable = menuFocusable();
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
}

function initBrandGlyph() {
  const glyph = document.querySelector('[data-brand-glyph]');
  if (!glyph) return;

  const brand = glyph.closest('.duplicate-header__brand');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const rects = [...glyph.querySelectorAll('rect')];
  let idleTimer = 0;
  let winkTimer = 0;
  let isWinking = false;

  if (rects.length !== GLYPH_STATES.base.blocks.length) return;

  const setGlyphState = (stateId, animate = true) => {
    animateGlyphRects(rects, GLYPH_STATES[stateId].blocks, {
      duration: 180,
      reducedMotion: reducedMotion.matches || !animate,
    });
    glyph.dataset.glyphState = stateId;
  };

  const clearIdleTimer = () => {
    window.clearTimeout(idleTimer);
    idleTimer = 0;
  };

  const clearWinkTimer = () => {
    window.clearTimeout(winkTimer);
    winkTimer = 0;
  };

  const scheduleIdleWink = () => {
    clearIdleTimer();
    if (reducedMotion.matches || document.hidden) return;
    const delay = 10000 + Math.random() * 8000;
    idleTimer = window.setTimeout(() => wink(), delay);
  };

  const wink = () => {
    if (isWinking || reducedMotion.matches || document.hidden) {
      scheduleIdleWink();
      return;
    }

    isWinking = true;
    setGlyphState('wink');
    winkTimer = window.setTimeout(() => {
      setGlyphState('base');
      isWinking = false;
      scheduleIdleWink();
    }, 480);
  };

  brand?.addEventListener('pointerenter', wink);
  brand?.addEventListener('focusin', wink);

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      clearIdleTimer();
      clearWinkTimer();
      setGlyphState('base', false);
      isWinking = false;
      return;
    }
    scheduleIdleWink();
  });

  reducedMotion.addEventListener?.('change', () => {
    clearWinkTimer();
    setGlyphState('base', false);
    isWinking = false;
    scheduleIdleWink();
  });

  // Astro already renders the registry geometry; avoid reading/writing SVG layout at startup.
  glyph.dataset.glyphState = 'base';
  scheduleIdleWink();
}

function initThemeToggle() {
  if (document.body.dataset.pageType === 'duplicate-home') return;

  const toggles = document.querySelectorAll('[data-theme-toggle]');
  if (!toggles.length) return;

  const storageKey = 'off-piste-duplicate-theme';

  const getStoredTheme = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  };

  const storeTheme = theme => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch {
      // The toggle should still work for this page view if storage is unavailable.
    }
  };

  const setTheme = theme => {
    const nextTheme = theme === 'light' ? 'light' : 'dark';
    const isLight = nextTheme === 'light';

    document.body.dataset.theme = nextTheme;
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;

    toggles.forEach(toggle => {
      toggle.setAttribute('aria-pressed', String(isLight));
      toggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    });
  };

  setTheme(getStoredTheme());

  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const nextTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
      setTheme(nextTheme);
      storeTheme(nextTheme);
    });
  });
}

function initInfoOverlay() {
  const actions = document.querySelector('.duplicate-header__actions');
  const themeToggle = actions?.querySelector('[data-theme-toggle]');
  if (!actions || !themeToggle || document.querySelector('[data-info-overlay]')) return;

  const toggle = document.createElement('button');
  toggle.className = 'duplicate-info-toggle duplicate-theme-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-label', 'Open studio information');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'studio-info-overlay');
  toggle.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5"></circle>
      <path d="M9 9l6 6M15 9l-6 6"></path>
    </svg>`;
  actions.insertBefore(toggle, themeToggle);

  const overlay = document.createElement('section');
  overlay.className = 'studio-info-overlay';
  overlay.id = 'studio-info-overlay';
  overlay.dataset.infoOverlay = '';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'studio-info-title');
  overlay.setAttribute('aria-hidden', 'true');
  overlay.inert = true;
  overlay.innerHTML = `
    <div class="studio-info-overlay__inner">
      <div class="studio-info-overlay__grid">
        <div class="studio-info-overlay__contact">
          <p class="studio-info-overlay__label">Get in touch</p>
          <p><a href="mailto:hello@offpistestudio.com">hello@offpistestudio.com</a></p>
          <p><a href="https://www.linkedin.com/company/off-piste-studio" target="_blank" rel="noopener">LinkedIn</a></p>
          <p class="studio-info-overlay__label studio-info-overlay__label--spaced">Based in</p>
          <p>Leederville, WA<br>Australia, 6007</p>
          <p>Available worldwide</p>
        </div>

        <div class="studio-info-overlay__about">
          <p class="studio-info-overlay__label">About</p>
          <h2 id="studio-info-title">Off Piste Studio is a strategic design and technology partner for growing businesses.</h2>
          <p>We bring brand, websites, search, content and practical AI together to turn expertise into a clearer signal—and that signal into growth.</p>
          <p>Our work combines taste, judgement and technology to help ambitious companies look sharper, explain their value faster and convert more of the right attention.</p>
        </div>

        <div class="studio-info-overlay__services">
          <p class="studio-info-overlay__label">What we do</p>
          <ul>
            <li>Brand strategy + identity</li>
            <li>Website design + development</li>
            <li>UX/UI product design</li>
            <li>Search + content systems</li>
            <li>AI-enabled workflows</li>
            <li>Ongoing growth support</li>
          </ul>
        </div>
      </div>

      <div class="studio-info-overlay__footer" aria-hidden="true">
        <span class="studio-info-overlay__wordmark">Off Piste Studio</span>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const wordmark = overlay.querySelector('.studio-info-overlay__wordmark');
  if (wordmark) {
    wordmark.innerHTML = Array.from(wordmark.textContent || '').map((character, index) => {
      const className = character === ' '
        ? 'studio-info-overlay__wordmark-letter studio-info-overlay__wordmark-letter--space'
        : 'studio-info-overlay__wordmark-letter';
      const glyph = character === ' ' ? '&nbsp;' : character;
      return `<span class="${className}" style="--wordmark-letter-index: ${index}"><span class="studio-info-overlay__wordmark-glyph">${glyph}</span></span>`;
    }).join('');
  }

  const scaleWordmark = () => {
    if (!wordmark || document.body.dataset.infoOpen !== 'true') return;
    wordmark.style.setProperty('--studio-info-wordmark-scale', '1');
    const availableWidth = wordmark.parentElement?.clientWidth || 0;
    const textWidth = wordmark.scrollWidth;
    if (availableWidth > 0 && textWidth > 0) {
      wordmark.style.setProperty('--studio-info-wordmark-scale', String(availableWidth / textWidth));
    }
  };

  if (document.fonts) document.fonts.ready.then(scaleWordmark);
  window.addEventListener('resize', scaleWordmark, { passive: true });

  let previouslyFocused = null;

  const setOpen = isOpen => {
    if (isOpen) {
      actions.closest('[data-duplicate-header]')?.dispatchEvent(new CustomEvent('duplicate-nav:close'));
    }

    document.body.dataset.infoOpen = String(isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close studio information' : 'Open studio information');
    overlay.setAttribute('aria-hidden', String(!isOpen));
    overlay.inert = !isOpen;

    if (isOpen) {
      previouslyFocused = document.activeElement;
      requestAnimationFrame(() => {
        scaleWordmark();
        overlay.querySelector('a')?.focus({ preventScroll: true });
      });
    } else if (previouslyFocused instanceof HTMLElement) {
      if (previouslyFocused.offsetParent !== null && getComputedStyle(previouslyFocused).visibility !== 'hidden') previouslyFocused.focus({ preventScroll: true });
      else actions.querySelector('[data-duplicate-nav-toggle]')?.focus({ preventScroll: true });
    }
  };

  toggle.addEventListener('click', () => {
    setOpen(document.body.dataset.infoOpen !== 'true');
  });

  overlay.addEventListener('click', event => {
    if (event.target === overlay) setOpen(false);
  });

  document.addEventListener('keydown', event => {
    if (document.body.dataset.infoOpen !== 'true') return;

    if (event.key === 'Escape') {
      setOpen(false);
      return;
    }

    if (event.key === 'Tab') {
      const focusable = [toggle, ...overlay.querySelectorAll('a[href], button:not([disabled])')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}

function initFooterWordmark() {
  if (document.body.dataset.pageType === 'duplicate-home') return;

  const brand = document.querySelector('.footer__brand');
  const brandText = brand?.querySelector('.footer__brand-text');
  if (!brand || !brandText || brand.dataset.wordmarkReady === 'true') return;

  const text = brandText.textContent || '';
  brandText.innerHTML = Array.from(text).map((character, index) => {
    const className = character === ' ' ? 'footer__brand-letter footer__brand-letter--space' : 'footer__brand-letter';
    const content = character === ' ' ? '&nbsp;' : character;
    return `<span class="${className}" style="--footer-brand-letter-index: ${index}">${content}</span>`;
  }).join('');
  brand.dataset.wordmarkReady = 'true';

  const startAnimation = () => {
    scaleFooterBrand();
    brand.classList.add('is-animated');
  };

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    startAnimation();
    return;
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const entry = entries[0];
      if (!entry?.isIntersecting) return;
      observer.disconnect();
      startAnimation();
    }, { threshold: 0.35 });

    observer.observe(brand);
  } else {
    startAnimation();
  }
}

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.querySelector('.header__menu-toggle');
  const nav = document.querySelector('.header__nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('is-open'));
    });
  }
}

// Header dropdown toggle
function initHeaderDropdowns() {
  const navItems = document.querySelectorAll('.header__nav-item--dropdown');
  const dropdown = document.querySelector('.header__dropdown');

  if (!navItems.length || !dropdown) return;

  const mobileQuery = window.matchMedia('(max-width: 1200px)');
  const dropdownParent = dropdown.parentElement;

  const positionDropdown = (button) => {
    const rect = button.getBoundingClientRect();
    const headerRect = button.closest('.header').getBoundingClientRect();
    dropdown.style.left = (rect.left - headerRect.left - 12) + 'px';
  };

  const syncDropdownPlacement = () => {
    const targetNavItem = navItems[0];

    if (mobileQuery.matches) {
      if (dropdown.parentElement !== targetNavItem) {
        targetNavItem.appendChild(dropdown);
      }
      dropdown.style.left = '';
    } else if (dropdown.parentElement !== dropdownParent) {
      dropdownParent.appendChild(dropdown);
    }
  };

  const closeDropdown = () => {
    dropdown.classList.remove('is-open');
    navItems.forEach(item => {
      item.classList.remove('is-open');
      const btn = item.querySelector('.header__nav-toggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
  };

  navItems.forEach(navItem => {
    const button = navItem.querySelector('.header__nav-toggle');
    if (!button) return;

    button.addEventListener('click', () => {
      const isOpen = dropdown.classList.contains('is-open');
      closeDropdown();
      if (!isOpen) {
        positionDropdown(button);
        dropdown.classList.add('is-open');
        navItem.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  syncDropdownPlacement();

  if (mobileQuery.addEventListener) {
    mobileQuery.addEventListener('change', () => {
      closeDropdown();
      syncDropdownPlacement();
    });
  } else if (mobileQuery.addListener) {
    mobileQuery.addListener(() => {
      closeDropdown();
      syncDropdownPlacement();
    });
  }

  document.addEventListener('click', event => {
    if (event.target.closest('.header__nav-item--dropdown')) return;
    if (event.target.closest('.header__dropdown')) return;
    closeDropdown();
  });
}

// Set active nav link based on current page
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.header__nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (currentPath === href || (currentPath === '/' && href === '/index.html')) {
      link.classList.add('active');
    }
  });
}

// FAQ accordion - one open at a time
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq__item');

  if (!faqItems.length) return;

  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(other => {
          if (other !== item) other.open = false;
        });
      }
    });
  });
}

function initFaqClickScramble() {
  if (document.body.dataset.pageType === 'duplicate-home') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const questions = document.querySelectorAll('.faq-duplicate .faq__question');
  if (!questions.length) return;

  const symbols = '{}[]<>/\\|01#$%&*=+_~';
  const duration = 280;
  const interval = 35;

  questions.forEach(question => {
    const item = question.closest('.faq__item');
    if (!item || question.dataset.scrambleBound === 'true') return;

    question.dataset.scrambleBound = 'true';

    const originalText = question.textContent || '';
    let timer = 0;
    let elapsed = 0;

    const restore = () => {
      window.clearInterval(timer);
      timer = 0;
      elapsed = 0;
      question.textContent = originalText;
      window.setTimeout(() => {
        item.classList.remove('is-click-animating');
      }, 120);
    };

    const scramble = () => {
      window.clearInterval(timer);
      timer = 0;
      elapsed = 0;
      item.classList.remove('is-click-animating');
      void item.offsetWidth;
      item.classList.add('is-click-animating');

      timer = window.setInterval(() => {
        elapsed += interval;
        question.textContent = Array.from(originalText)
          .map(character => {
            if (character === ' ') return ' ';
            return symbols[Math.floor(Math.random() * symbols.length)];
          })
          .join('');

        if (elapsed >= duration) restore();
      }, interval);
    };

    question.addEventListener('click', scramble);
  });
}

// Project modal slideshow - auto-rotate
function initProjectSlideshow() {
  const slides = document.querySelectorAll('.project-modal__slide');

  if (slides.length < 2) return;

  let currentIndex = 0;
  const interval = 3500; // 3.5 seconds

  setInterval(() => {
    slides[currentIndex].classList.remove('is-active');
    currentIndex = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.add('is-active');
  }, interval);
}

// Work page project filter
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.work-hero__filter');
  const filterRows = document.querySelectorAll('.project-row, .insight-row, .insight-card');

  if (!filterButtons.length || !filterRows.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');


      // Filter rows
      filterRows.forEach(row => {
        if (filter === 'all') {
          row.style.display = '';
          return;
        }

        const tags = row.querySelectorAll('.project-row__tags span, .insight-row__tags span, .insight-card__tags span');
        const tagTexts = Array.from(tags).map(tag => tag.textContent);

        if (tagTexts.includes(filter)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });

      document.querySelectorAll('.insights-index__row-spacer').forEach(spacer => {
        const row = spacer.previousElementSibling;
        const hasVisibleCards = row?.classList.contains('insights-index__article-row')
          ? Array.from(row.querySelectorAll('.insight-card')).some(card => card.style.display !== 'none')
          : false;
        spacer.style.display = filter === 'all' || hasVisibleCards ? '' : 'none';
      });

      document.querySelectorAll('.insights-index__article-row').forEach(row => {
        const hasVisibleCards = Array.from(row.querySelectorAll('.insight-card')).some(card => card.style.display !== 'none');
        row.style.display = filter === 'all' || hasVisibleCards ? '' : 'none';
      });
    });
  });
}

function initWorkRowScramble() {
  if (document.body.dataset.pageType !== 'work') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const rows = document.querySelectorAll('.project-row');
  if (!rows.length) return;

  const symbols = '{}[]<>/\\|01#$%&*=+_~';
  const duration = 280;
  const interval = 35;

  rows.forEach(row => {
    const target = row.querySelector('.project-row__description');
    if (!target) return;

    const originalText = target.textContent || '';
    let timer = 0;
    let elapsed = 0;

    const restore = () => {
      window.clearInterval(timer);
      timer = 0;
      elapsed = 0;
      target.textContent = originalText;
    };

    const scramble = () => {
      if (timer) return;

      timer = window.setInterval(() => {
        elapsed += interval;
        target.textContent = Array.from(originalText)
          .map(character => {
            if (character === ' ') return ' ';
            return symbols[Math.floor(Math.random() * symbols.length)];
          })
          .join('');

        if (elapsed >= duration) restore();
      }, interval);
    };

    row.addEventListener('mouseenter', scramble);
    row.addEventListener('mouseleave', restore);
  });
}

function initWorkImagePreview() {
  if (document.body.dataset.pageType !== 'work') return;

  const rows = document.querySelectorAll('.project-row');
  if (!rows.length) return;

  const canHover = window.matchMedia('(min-width: 1024px) and (hover: hover)').matches;
  if (!canHover) return;

  const cursorCta = document.createElement('div');
  cursorCta.className = 'work-preview-cursor-cta';
  cursorCta.setAttribute('aria-hidden', 'true');
  cursorCta.textContent = 'Coming Soon';
  document.body.appendChild(cursorCta);

  const moveCursorCta = event => {
    cursorCta.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
  };

  rows.forEach(row => {
    const preview = row.querySelector('.project-row__preview');
    if (!preview) return;

    const movePreview = event => {
      const rect = preview.getBoundingClientRect();
      const gutter = 24;
      const halfWidth = rect.width / 2;
      const halfHeight = rect.height / 2;
      const minX = gutter + halfWidth;
      const maxX = window.innerWidth - gutter - halfWidth;
      const minY = gutter + halfHeight;
      const maxY = window.innerHeight - gutter - halfHeight;
      const x = Math.min(Math.max(event.clientX, minX), maxX);
      const y = Math.min(Math.max(event.clientY, minY), maxY);

      preview.style.setProperty('--work-preview-x', `${x}px`);
      preview.style.setProperty('--work-preview-y', `${y}px`);
      moveCursorCta(event);
    };

    row.addEventListener('mouseenter', event => {
      movePreview(event);
      document.body.classList.add('is-work-preview-cursor');
      cursorCta.classList.add('is-visible');
    });
    row.addEventListener('mousemove', movePreview);
    row.addEventListener('mouseleave', () => {
      document.body.classList.remove('is-work-preview-cursor');
      cursorCta.classList.remove('is-visible');
    });
  });
}

function initAboutCardScramble() {
  if (document.body.dataset.pageType !== 'about') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.about__card');
  if (!cards.length) return;

  const symbols = '{}[]<>/\\|01#$%&*=+_~';
  const duration = 280;
  const interval = 35;

  cards.forEach(card => {
    const target = card.querySelector('.about__card-title');
    if (!target || target.dataset.scrambleBound === 'true') return;

    target.dataset.scrambleBound = 'true';

    const originalText = target.textContent || '';
    let timer = 0;
    let elapsed = 0;

    const restore = () => {
      window.clearInterval(timer);
      timer = 0;
      elapsed = 0;
      target.textContent = originalText;
    };

    const scramble = () => {
      window.clearInterval(timer);
      timer = 0;
      elapsed = 0;

      timer = window.setInterval(() => {
        elapsed += interval;
        target.textContent = Array.from(originalText)
          .map(character => {
            if (character === ' ') return ' ';
            return symbols[Math.floor(Math.random() * symbols.length)];
          })
          .join('');

        if (elapsed >= duration) restore();
      }, interval);
    };

    card.addEventListener('mouseenter', scramble);
    card.addEventListener('mouseleave', restore);
  });
}

function initPricingCardScramble() {
  if (document.body.dataset.pageType !== 'pricing') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.pricing-investment__card');
  if (!cards.length) return;

  const symbols = '{}[]<>/\\|01#$%&*=+_~';
  const duration = 280;
  const interval = 35;

  cards.forEach(card => {
    const target = card.querySelector('.pricing-investment__card-title');
    if (!target || target.dataset.scrambleBound === 'true') return;

    target.dataset.scrambleBound = 'true';

    const originalText = target.textContent || '';
    let timer = 0;
    let elapsed = 0;

    const restore = () => {
      window.clearInterval(timer);
      timer = 0;
      elapsed = 0;
      target.textContent = originalText;
    };

    const scramble = () => {
      window.clearInterval(timer);
      timer = 0;
      elapsed = 0;

      timer = window.setInterval(() => {
        elapsed += interval;
        target.textContent = Array.from(originalText)
          .map(character => {
            if (character === ' ') return ' ';
            return symbols[Math.floor(Math.random() * symbols.length)];
          })
          .join('');

        if (elapsed >= duration) restore();
      }, interval);
    };

    card.addEventListener('mouseenter', scramble);
    card.addEventListener('mouseleave', restore);
  });
}

function initToolRelatedCardScramble() {
  if (document.body.dataset.pageType !== 'tool') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.tool-related__link');
  if (!cards.length) return;

  const symbols = '{}[]<>/\\|01#$%&*=+_~';
  const duration = 280;
  const interval = 35;

  cards.forEach(card => {
    const target = card.querySelector('.tool-related__name');
    if (!target || target.dataset.scrambleBound === 'true') return;

    target.dataset.scrambleBound = 'true';

    const originalText = target.textContent || '';
    let timer = 0;
    let elapsed = 0;

    const restore = () => {
      window.clearInterval(timer);
      timer = 0;
      elapsed = 0;
      target.textContent = originalText;
    };

    const scramble = () => {
      window.clearInterval(timer);
      timer = 0;
      elapsed = 0;

      timer = window.setInterval(() => {
        elapsed += interval;
        target.textContent = Array.from(originalText)
          .map(character => {
            if (character === ' ') return ' ';
            return symbols[Math.floor(Math.random() * symbols.length)];
          })
          .join('');

        if (elapsed >= duration) restore();
      }, interval);
    };

    card.addEventListener('mouseenter', scramble);
    card.addEventListener('mouseleave', restore);
  });
}

function initAboutLogoSwap() {
  if (document.body.dataset.pageType !== 'about') return;

  const logos = Array.from(document.querySelectorAll('.about__logo'));
  if (!logos.length) return;

  const logoPool = [
    { src: '/images/logos/PLI Logo Light.webp', alt: 'Place Intelligence' },
    { src: '/images/logos/SB Logo Light.webp', alt: 'Superbeing' },
    { src: '/images/logos/PLE Logo Light.webp', alt: 'Pleiades' },
    { src: '/images/logos/FD Logo Light.webp', alt: 'Future Directors' },
    { src: '/images/logos/FDY Logo Light.webp', alt: 'Flow Dynamics' },
    { src: '/images/logos/DE Logo Light.webp', alt: 'Decarbonology' },
    { src: '/images/logos/BU Logo Light.webp', alt: 'Buildsource' },
    { src: '/images/logos/CC Logo Light.webp', alt: 'Cell Cyber' },
    { src: '/images/logos/LI Logo Light.webp', alt: 'Linear' },
    { src: '/images/logos/new-client-logo.webp', alt: '3LINES Group' }
  ];

  const pickNextIndex = () => {
    const active = new Set(
      logos
        .map(logo => Number.parseInt(logo.dataset.logoIndex || '', 10))
        .filter(value => Number.isInteger(value))
    );

    const available = logoPool
      .map((_, index) => index)
      .filter(index => !active.has(index));

    if (!available.length) return null;
    return available[Math.floor(Math.random() * available.length)];
  };

  const preloadLogo = src =>
    new Promise(resolve => {
      const image = new Image();
      image.onload = () => {
        if (typeof image.decode === 'function') {
          image.decode().then(resolve).catch(resolve);
          return;
        }

        resolve();
      };
      image.onerror = resolve;
      image.src = src;
    });

  const swapLogo = async () => {
    const target = logos[Math.floor(Math.random() * logos.length)];
    const nextIndex = pickNextIndex();
    if (!target || nextIndex === null) return;

    const nextLogo = logoPool[nextIndex];
    await preloadLogo(nextLogo.src);

    target.classList.add('is-swapping-out');

    window.setTimeout(() => {
      target.src = nextLogo.src;
      target.alt = nextLogo.alt;
      target.dataset.logoIndex = String(nextIndex);
      target.classList.remove('is-swapping-out');
      target.classList.add('is-swapping-in');

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          target.classList.remove('is-swapping-in');
        });
      });
    }, 280);
  };

  const scheduleNextSwap = () => {
    const delay = 2200 + Math.floor(Math.random() * 2600);
    window.setTimeout(() => {
      swapLogo();
      scheduleNextSwap();
    }, delay);
  };

  scheduleNextSwap();
}

function initButtonScramble() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = document.querySelectorAll([
    '.button',
    '.hero-intro__button',
    '.hero__button',
    '.services__button',
    '.about-hero__button',
    '.about__button',
    '.page-hero__button',
    '.page-cta__button',
    '.pricing-tier__cta',
    '.pricing-estimator__result-cta',
    '.pricing-investment__button',
    '.about-grid__button',
    '.testimonials__button',
    '.case-studies__cta',
    '.closing-cta__button',
    '.between-strip__link'
  ].join(', '));

  if (!targets.length) return;

  const symbols = '{}[]<>/\\|01#$%&*=+_~';
  const duration = 280;
  const interval = 35;

  targets.forEach(target => {
    if (target.dataset.scrambleBound === 'true') return;
    if (target.children.length > 0) return;

    target.dataset.scrambleBound = 'true';

    const originalText = target.textContent || '';
    let timer = 0;
    let elapsed = 0;

    const restore = () => {
      window.clearInterval(timer);
      timer = 0;
      elapsed = 0;
      target.textContent = originalText;
      target.style.width = '';
      target.style.whiteSpace = '';
    };

    const scramble = () => {
      window.clearInterval(timer);
      timer = 0;
      elapsed = 0;

      const width = target.getBoundingClientRect().width;
      target.style.width = `${width}px`;
      target.style.whiteSpace = 'nowrap';

      timer = window.setInterval(() => {
        elapsed += interval;
        target.textContent = Array.from(originalText)
          .map(character => {
            if (character === ' ') return ' ';
            return symbols[Math.floor(Math.random() * symbols.length)];
          })
          .join('');

        if (elapsed >= duration) restore();
      }, interval);
    };

    target.addEventListener('mouseenter', scramble);
    target.addEventListener('mouseleave', restore);
  });
}

function initFooterLinkScramble() {
  if (document.body.dataset.pageType === 'duplicate-home') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = document.querySelectorAll('.footer__nav-link, .footer__contact-link');
  if (!targets.length) return;

  const symbols = '{}[]<>/\\|01#$%&*=+_~';
  const duration = 280;
  const interval = 35;

  targets.forEach(target => {
    if (target.dataset.scrambleBound === 'true') return;
    if (target.children.length > 0) return;

    target.dataset.scrambleBound = 'true';

    const originalText = target.textContent || '';
    let timer = 0;
    let elapsed = 0;

    const restore = () => {
      window.clearInterval(timer);
      timer = 0;
      elapsed = 0;
      target.textContent = originalText;
      target.style.width = '';
      target.style.whiteSpace = '';
    };

    const scramble = () => {
      window.clearInterval(timer);
      timer = 0;
      elapsed = 0;

      const width = target.getBoundingClientRect().width;
      target.style.width = `${width}px`;
      target.style.whiteSpace = 'nowrap';

      timer = window.setInterval(() => {
        elapsed += interval;
        target.textContent = Array.from(originalText)
          .map(character => {
            if (character === ' ') return ' ';
            return symbols[Math.floor(Math.random() * symbols.length)];
          })
          .join('');

        if (elapsed >= duration) restore();
      }, interval);
    };

    target.addEventListener('mouseenter', scramble);
    target.addEventListener('mouseleave', restore);
  });
}

function initCustomCursor() {
  const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!pointerQuery.matches) return;
  if (document.body.dataset.customCursorBound === 'true') return;

  document.body.dataset.customCursorBound = 'true';
  document.body.classList.add('has-custom-cursor');

  let cursor = document.querySelector('.duplicate-cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.className = 'duplicate-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursor);
  }

  let scrollTimer = 0;
  let hasPointer = false;

  const setPosition = event => {
    hasPointer = true;
    cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
  };

  window.addEventListener('pointermove', event => {
    setPosition(event);
    cursor.classList.add('is-visible');
  }, { passive: true });

  window.addEventListener('pointerdown', () => {
    cursor.classList.add('is-pressed');
  }, { passive: true });

  window.addEventListener('pointerup', () => {
    cursor.classList.remove('is-pressed');
  }, { passive: true });

  window.addEventListener('scroll', () => {
    cursor.classList.remove('is-visible');
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      if (hasPointer) cursor.classList.add('is-visible');
    }, 120);
  }, { passive: true });

  document.addEventListener('mouseleave', () => {
    cursor.classList.remove('is-visible');
  });

  document.addEventListener('mouseenter', () => {
    if (hasPointer) cursor.classList.add('is-visible');
  });
}

function initInsightsList() {
  const list = document.querySelector('[data-insights-list]');
  const filter = document.querySelector('[data-insights-filter]');
  if (!list || !filter) return;
  const cards = [...list.querySelectorAll('.insight-card')];
  const topics = card => JSON.parse(card.dataset.topics);
  let expanded = false;
  const render = () => {
    const selected = filter.value || 'all';
    const matches = cards.filter(card => selected === 'all' || topics(card).includes(selected));
    const limited = selected === 'all' && !expanded && matches.length > 12;
    const visible = limited ? matches.slice(0,12) : matches;
    list.replaceChildren();
    for (let index = 0; index < visible.length; index += 4) {
      const row = document.createElement('div');
      row.className = 'insights-index__article-row';
      row.append(...visible.slice(index,index+4));
      list.append(row);
      const spacer = document.createElement('div');
      spacer.className = 'insights-index__row-spacer';
      if (limited && index+4 >= visible.length) {
        spacer.classList.add('insights-index__row-spacer--action');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'button insights-index__show-more';
        button.textContent = 'Show More';
        button.addEventListener('click', () => { expanded = true; render(); });
        spacer.append(button);
      } else spacer.setAttribute('aria-hidden','true');
      list.append(spacer);
    }
  };
  filter.addEventListener('change', () => { expanded = false; render(); });
  render();
}

function createLeadModal() {
  const modal = document.createElement('div');
  modal.className = 'lead-modal';
  modal.setAttribute('hidden', '');
  modal.innerHTML = `
    <div class="lead-modal__backdrop" data-lead-close></div>
    <div class="lead-modal__panel" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
      <button class="lead-modal__close" type="button" aria-label="Close contact modal" data-lead-close>&times;</button>
      <div class="lead-modal__grid">
        <div class="lead-modal__content">
          <div class="lead-modal__eyebrow">
            <img src="/images/off-piste-mark-transparent-white.webp" alt="" aria-hidden="true">
            <span>Start a Project</span>
          </div>
          <h2 class="lead-modal__title" id="lead-modal-title">Let&apos;s scope what you&apos;re building.</h2>
          <p class="lead-modal__text">Chat with Lara, our Creative Director, or send us an email with your project details and we&apos;ll take it from there.</p>

          <div class="lead-modal__meta">
            <div class="lead-modal__meta-card">
              <span class="lead-modal__meta-label">Email</span>
              <p class="lead-modal__meta-value"><a href="mailto:hello@offpistestudio.com">hello@offpistestudio.com</a></p>
            </div>
          </div>
        </div>

        <div class="lead-modal__chat">
          <div class="lead-modal__chat-header">
            <img src="/images/Lara.webp" alt="Lara">
            <div>
              <p class="lead-modal__chat-title">Chat with Lara</p>
              <p class="lead-modal__chat-status">Creative Director at Off Piste Studio</p>
            </div>
          </div>

          <div class="lead-modal__chat-body">
            <p class="lead-modal__bubble">Open the conversation when you&apos;re ready and send through the basics of your project, timeline, and goals.</p>
          </div>

          <div class="lead-modal__actions">
            <a class="lead-modal__action lead-modal__action--primary" href="mailto:hello@offpistestudio.com?subject=New%20project%20enquiry&body=Hi%20Lara%2C%0A%0AI%27d%20like%20to%20discuss%20a%20project.%0A%0AProject%20type%3A%0ATimeline%3A%0AGoals%3A%0A">Chat with Lara</a>
          </div>
        </div>
      </div>
    </div>
  `;

  return modal;
}

function initLeadModal() {
  const triggers = document.querySelectorAll('a[href="/contact"]');

  if (!triggers.length) return;

  const modal = createLeadModal();
  const closeControls = () => modal.querySelectorAll('[data-lead-close]');
  const closeButton = () => modal.querySelector('.lead-modal__close');
  let previousActiveElement = null;

  const openModal = () => {
    previousActiveElement = document.activeElement;
    modal.hidden = false;
    modal.classList.add('is-open');
    document.body.classList.add('lead-modal-open');
    closeButton().focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.hidden = true;
    document.body.classList.remove('lead-modal-open');

    if (previousActiveElement instanceof HTMLElement) {
      previousActiveElement.focus();
    }
  };

  document.body.appendChild(modal);

  triggers.forEach(trigger => {
    trigger.addEventListener('click', event => {
      event.preventDefault();
      openModal();
    });
  });

  closeControls().forEach(control => {
    control.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
}

// Copy link share button
function initShareButtons() {
  document.querySelectorAll('[data-copy-url]').forEach(btn => {
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.copyUrl).then(() => {
        btn.classList.add('is-copied');
        setTimeout(() => btn.classList.remove('is-copied'), 1500);
      });
    });
  });
}

// Auto-scrolling llms.txt demo viewer
function initLlmsDemos() {
  document.querySelectorAll('.llms-demo').forEach(demo => {
    const scroll = demo.querySelector('.llms-demo__scroll');
    if (!scroll) return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        scroll.classList.toggle('is-scrolling', entry.isIntersecting);
      });
    }, { threshold: 0.3 });

    observer.observe(demo);
  });
}

// Pricing page quote estimator
function initEstimator() {
  const form = document.querySelector('[data-estimator]');
  if (!form) return;

  const pagesGroup = form.querySelector('[data-estimator-pages]');
  const hostingGroup = form.querySelector('[data-estimator-hosting]');
  const addons = form.querySelectorAll('[data-addon]');
  const lowEl = form.querySelector('[data-estimator-low]');
  const highEl = form.querySelector('[data-estimator-high]');
  const monthlyEl = form.querySelector('[data-estimator-monthly]');
  const ctaEl = form.querySelector('[data-estimator-cta]');

  const basePrices = { '5': [3500, 4500], '10': [5500, 7500], '15': [8000, 11000] };
  const addonPrices = {
    booking:  [600, 1200],
    payments: [800, 1800],
    blog:     [400, 800],
    gbp:      [300, 500],
    seo:      [500, 1000]
  };
  const hostingMonthly = { none: 0, managed: 49, growth: 99 };

  let selectedPages = '5';
  let selectedHosting = 'none';

  function formatCurrency(n) {
    return '$' + n.toLocaleString('en-AU');
  }

  function update() {
    let [low, high] = basePrices[selectedPages];

    addons.forEach(input => {
      if (input.checked) {
        const key = input.dataset.addon;
        if (addonPrices[key]) {
          low += addonPrices[key][0];
          high += addonPrices[key][1];
        }
      }
    });

    lowEl.textContent = formatCurrency(low);
    highEl.textContent = formatCurrency(high);

    const monthly = hostingMonthly[selectedHosting];
    if (monthly > 0) {
      monthlyEl.textContent = '+ ' + formatCurrency(monthly) + '/month hosting';
    } else {
      monthlyEl.textContent = '';
    }

    // Build mailto with selections pre-filled
    const parts = [];
    parts.push('Pages: ' + (selectedPages === '15' ? '15+' : 'Up to ' + selectedPages));

    const activeAddons = [];
    addons.forEach(input => {
      if (input.checked) {
        const label = input.closest('.pricing-estimator__toggle').querySelector('.pricing-estimator__toggle-label');
        if (label) activeAddons.push(label.textContent);
      }
    });
    if (activeAddons.length) parts.push('Add-ons: ' + activeAddons.join(', '));

    if (selectedHosting !== 'none') {
      parts.push('Hosting: ' + (selectedHosting === 'managed' ? 'Managed ($49/mo)' : 'Managed + Growth ($99/mo)'));
    }

    parts.push('Estimate range: ' + formatCurrency(low) + ' – ' + formatCurrency(high));

    const body = 'Hi,\n\nI\'d like a detailed quote for my project.\n\n' + parts.join('\n') + '\n\nProject details:\n';
    ctaEl.href = '/contact';
    ctaEl.dataset.estimatorBody = body;
  }

  function initOptionGroup(group, callback) {
    const buttons = group.querySelectorAll('.pricing-estimator__option');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        callback(btn.dataset.value);
        update();
      });
    });
  }

  initOptionGroup(pagesGroup, val => { selectedPages = val; });
  initOptionGroup(hostingGroup, val => { selectedHosting = val; });
  addons.forEach(input => input.addEventListener('change', update));

  update();
}

function initSite() {
  initCurrentHeader();
  initBrandGlyph();
  initInfoOverlay();
  initThemeToggle();
  initMobileMenu();
  initHeaderDropdowns();
  initCustomCursor();
  setActiveNavLink();
  initFaqAccordion();
  initFaqClickScramble();
  initProjectSlideshow();
  initInsightsList();
  initProjectFilter();
  initWorkRowScramble();
  initWorkImagePreview();
  initAboutCardScramble();
  initPricingCardScramble();
  initToolRelatedCardScramble();
  initAboutLogoSwap();
  initButtonScramble();
  initFooterLinkScramble();
  initLeadModal();
  initEstimator();
  initLlmsDemos();
  initShareButtons();
  initFooterWordmark();

  // Scale footer brand after fonts load
  if (document.fonts) {
    document.fonts.ready.then(scaleFooterBrand);
  } else {
    scaleFooterBrand();
  }
}

// Initialize on DOM ready, or immediately if this module is evaluated late.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSite, { once: true });
} else {
  initSite();
}

// Rescale on window resize
window.addEventListener('resize', scaleFooterBrand);
