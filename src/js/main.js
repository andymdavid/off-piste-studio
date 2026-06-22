// Off Piste Studio - Main JavaScript
import '../styles/tools.css';
import { INSIGHT_POSTS } from '../generated/insights-data.js';

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
  const closeTargets = header.querySelectorAll('[data-duplicate-nav-close]');

  const syncHeaderState = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  const setMenuOpen = (isOpen) => {
    header.classList.toggle('is-open', isOpen);
    header.dataset.navigationStatus = isOpen ? 'active' : 'not-active';
    document.body.dataset.duplicateNavOpen = isOpen ? 'true' : 'false';

    if (toggle) {
      toggle.setAttribute('aria-expanded', String(isOpen));
      toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!header.classList.contains('is-open'));
  };

  syncHeaderState();
  window.addEventListener('scroll', syncHeaderState, { passive: true });

  if (toggle) {
    toggle.addEventListener('click', toggleMenu);
  }

  overlay?.addEventListener('click', closeMenu);

  closeTargets.forEach(target => {
    target.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
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

function initHeroDistortion() {
  const canvas = document.querySelector('[data-hero-distortion]');
  if (!canvas) return;

  const gl = canvas.getContext('webgl', {
    alpha: true,
    antialias: false,
    depth: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false
  });

  if (!gl) return;

  const vertexShaderSource = `
    attribute vec2 a_position;
    varying vec2 v_uv;

    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision highp float;

    const int TRAIL_COUNT = 32;

    uniform sampler2D u_image;
    uniform vec2 u_resolution;
    uniform vec2 u_imageResolution;
    uniform vec2 u_pointer;
    uniform vec3 u_trails[TRAIL_COUNT];
    uniform float u_time;
    uniform float u_motion;
    uniform float u_active;
    varying vec2 v_uv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);

      return mix(
        mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
        mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
        u.y
      );
    }

    vec2 coverUv(vec2 uv) {
      vec2 screenRatio = vec2(u_resolution.x / u_resolution.y, 1.0);
      vec2 imageRatio = vec2(u_imageResolution.x / u_imageResolution.y, 1.0);
      vec2 scale = screenRatio.x < imageRatio.x
        ? vec2(screenRatio.x / imageRatio.x, 1.0)
        : vec2(1.0, imageRatio.x / screenRatio.x);

      return (uv - 0.5) * scale + 0.5;
    }

    void main() {
      vec2 uv = v_uv;
      vec2 pointer = u_pointer;
      float aspect = u_resolution.x / u_resolution.y;
      vec3 baseColor = vec3(0.0706, 0.0706, 0.0706);

      float fineNoise = noise(uv * vec2(34.0, 18.0) - u_time * 0.22);
      float revealFeather = 0.13;
      float revealMask = 0.0;
      float edgeField = 0.0;
      float banding = 0.0;

      for (int i = 0; i < TRAIL_COUNT; i++) {
        vec3 trail = u_trails[i];

        if (trail.z > 0.001) {
          vec2 fromTrail = vec2((uv.x - trail.x) * aspect, uv.y - trail.y);
          float distanceFromTrail = length(fromTrail);
          float angle = atan(fromTrail.y, fromTrail.x);
          vec2 liquidUv = vec2(cos(angle), sin(angle));
          float slowNoise = noise(liquidUv * 2.1 + vec2(u_time * 0.11, -u_time * 0.07) + trail.xy * 2.0);
          float midNoise = noise(liquidUv * 5.2 + vec2(-u_time * 0.16, u_time * 0.13) + trail.yx * 3.0);
          float localBanding = sin((uv.y * 150.0) + (slowNoise * 7.0) + (u_time * 1.5)) * 0.5 + 0.5;
          float pulse = sin(u_time * 1.15 + trail.x * 9.0 + trail.y * 5.0) * 0.025;
          float wobble = (slowNoise - 0.5) * 0.085 + (midNoise - 0.5) * 0.035;
          float revealRadius = 0.27 + pulse + wobble;
          float localReveal = 1.0 - smoothstep(revealRadius, revealRadius + revealFeather * 0.82, distanceFromTrail);
          localReveal *= trail.z;

          float edgeWidth = revealFeather * 0.42;
          float localEdge = 1.0 - smoothstep(0.0, edgeWidth, abs(distanceFromTrail - revealRadius));
          float edgeNoise = smoothstep(0.26, 0.82, midNoise) * (0.45 + fineNoise * 0.55);
          localEdge *= trail.z * edgeNoise;

          revealMask = max(revealMask, localReveal);
          edgeField = max(edgeField, localEdge);
          banding = max(banding, localBanding * localEdge);
        }
      }

      revealMask *= u_active;
      edgeField *= u_active;

      vec2 imageUv = coverUv(uv);

      float r = texture2D(u_image, imageUv).r;
      float g = texture2D(u_image, imageUv).g;
      float b = texture2D(u_image, imageUv).b;
      vec3 color = vec3(r, g, b);

      color *= 1.0 + edgeField * 0.012;

      vec3 finalColor = mix(baseColor, color, revealMask);
      float outerBurn = edgeField * (1.0 - revealMask) * (0.55 + fineNoise * 0.45);
      float innerGlow = edgeField * revealMask * (0.25 + banding * 0.2);
      finalColor += vec3(0.85, 0.2, 0.02) * outerBurn * 0.16;
      finalColor += vec3(0.1, 0.55, 1.0) * innerGlow * 0.04;

      float alpha = max(revealMask, edgeField * 0.95);
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  const createShader = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
  if (!vertexShader || !fragmentShader) return;

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn(gl.getProgramInfoLog(program));
    return;
  }

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1, -1,
     1, -1,
    -1,  1,
    -1,  1,
     1, -1,
     1,  1
  ]), gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, 'a_position');
  const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
  const imageResolutionLocation = gl.getUniformLocation(program, 'u_imageResolution');
  const pointerLocation = gl.getUniformLocation(program, 'u_pointer');
  const trailsLocation = gl.getUniformLocation(program, 'u_trails[0]');
  const timeLocation = gl.getUniformLocation(program, 'u_time');
  const motionLocation = gl.getUniformLocation(program, 'u_motion');
  const activeLocation = gl.getUniformLocation(program, 'u_active');
  const imageLocation = gl.getUniformLocation(program, 'u_image');

  const image = new Image();
  image.src = canvas.dataset.imageSrc;
  const pointer = { x: 0.62, y: 0.58, targetX: 0.62, targetY: 0.58 };
  const reveal = { value: 0, target: 0 };
  const maxTrailPoints = 32;
  const trailDuration = 3000;
  const trailPoints = [];
  const trailUniformData = new Float32Array(maxTrailPoints * 3);
  let lastTrailPoint = null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motion = reducedMotion ? 0.42 : 1.0;

  function addTrailPoint(x, y, time) {
    const point = { x, y, time };
    const shouldAppend = !lastTrailPoint ||
      Math.hypot(x - lastTrailPoint.x, y - lastTrailPoint.y) > 0.018 ||
      time - lastTrailPoint.time > 90;

    if (!shouldAppend) return;

    trailPoints.push(point);
    lastTrailPoint = point;

    while (trailPoints.length > maxTrailPoints) {
      trailPoints.shift();
    }
  }

  function updateTrailUniforms(time) {
    trailUniformData.fill(0);

    for (let i = trailPoints.length - 1; i >= 0; i--) {
      if (time - trailPoints[i].time > trailDuration) {
        trailPoints.splice(i, 1);
      }
    }

    trailPoints.forEach((point, index) => {
      if (index >= maxTrailPoints) return;

      const age = Math.max(0, Math.min(1, (time - point.time) / trailDuration));
      const strength = 1 - Math.max(0, Math.min(1, (age - 0.68) / 0.32));
      const offset = index * 3;

      trailUniformData[offset] = point.x;
      trailUniformData[offset + 1] = point.y;
      trailUniformData[offset + 2] = strength;
    });
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
  }

  function render(time) {
    resize();

    pointer.x += (pointer.targetX - pointer.x) * 0.07;
    pointer.y += (pointer.targetY - pointer.y) * 0.07;
    reveal.value += (reveal.target - reveal.value) * 0.08;

    if (reveal.target > 0.5) {
      addTrailPoint(pointer.x, pointer.y, time);
    }

    updateTrailUniforms(time);

    gl.useProgram(program);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enableVertexAttribArray(positionLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform2f(imageResolutionLocation, image.naturalWidth, image.naturalHeight);
    gl.uniform2f(pointerLocation, pointer.x, pointer.y);
    gl.uniform3fv(trailsLocation, trailUniformData);
    gl.uniform1f(timeLocation, time * 0.001);
    gl.uniform1f(motionLocation, motion);
    gl.uniform1f(activeLocation, Math.max(reveal.value, trailPoints.length ? 1 : 0));
    gl.uniform1i(imageLocation, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);

    if (!reducedMotion) {
      requestAnimationFrame(render);
    }
  }

  image.addEventListener('load', () => {
    const texture = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    requestAnimationFrame(render);
  });

  const hero = canvas.closest('.hero-intro');

  function updatePointer(event) {
    const rect = canvas.getBoundingClientRect();
    pointer.targetX = (event.clientX - rect.left) / rect.width;
    pointer.targetY = 1 - ((event.clientY - rect.top) / rect.height);
    addTrailPoint(pointer.targetX, pointer.targetY, performance.now());
  }

  if (hero) {
    hero.addEventListener('pointerenter', event => {
      reveal.target = 1;
      updatePointer(event);
    }, { passive: true });

    hero.addEventListener('pointermove', event => {
      reveal.target = 1;
      updatePointer(event);
    }, { passive: true });

    hero.addEventListener('pointerleave', () => {
      reveal.target = 0;
    }, { passive: true });

    hero.addEventListener('touchstart', event => {
      reveal.target = 1;
      if (event.touches.length) updatePointer(event.touches[0]);
    }, { passive: true });

    hero.addEventListener('touchmove', event => {
      reveal.target = 1;
      if (event.touches.length) updatePointer(event.touches[0]);
    }, { passive: true });
  }

  window.addEventListener('resize', resize);
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
  const resourcesInsightsList = document.querySelector('body[data-page-type="resources"] [data-insights-list]');

  if (!filterButtons.length || !filterRows.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      if (resourcesInsightsList) {
        const posts = filter === 'all'
          ? INSIGHT_POSTS
          : INSIGHT_POSTS.filter(post => post.tags.includes(filter));
        renderInsightsGrid(resourcesInsightsList, posts, { limitRows: filter === 'all' });
        return;
      }

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
    { src: '/public/images/logos/PLI Logo Light.webp', alt: 'Place Intelligence' },
    { src: '/public/images/logos/SB Logo Light.webp', alt: 'Superbeing' },
    { src: '/public/images/logos/PLE Logo Light.webp', alt: 'Pleiades' },
    { src: '/public/images/logos/FD Logo Light.webp', alt: 'Future Directors' },
    { src: '/public/images/logos/FDY Logo Light.webp', alt: 'Flow Dynamics' },
    { src: '/public/images/logos/DE Logo Light.webp', alt: 'Decarbonology' },
    { src: '/public/images/logos/BU Logo Light.webp', alt: 'Buildsource' },
    { src: '/public/images/logos/CC Logo Light.webp', alt: 'Cell Cyber' },
    { src: '/public/images/logos/LI Logo Light.webp', alt: 'Linear' }
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

  const swapLogo = () => {
    const target = logos[Math.floor(Math.random() * logos.length)];
    const nextIndex = pickNextIndex();
    if (!target || nextIndex === null) return;

    const nextLogo = logoPool[nextIndex];
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

function createInsightRow(post) {
  const article = document.createElement('article');
  article.className = 'insight-row';
  article.innerHTML = `
    <div class="insight-row__title-group">
      <p class="insight-row__eyebrow">${post.readTime}</p>
      <h3 class="insight-row__title"><a href="${post.url}" class="insight-row__link">${post.title}</a></h3>
    </div>
    <p class="insight-row__description">${post.description}</p>
    <div class="insight-row__tags">
      ${post.tags.map(tag => `<span>${tag}</span>`).join('')}
    </div>
  `;

  return article;
}

function createInsightCard(post, index = 0) {
  const article = document.createElement('article');
  article.className = 'insight-card';

  const imageHtml = post.image
    ? `<div class="insight-card__media"><img src="${post.image}" alt="${post.imageAlt || post.title}" loading="lazy" decoding="async"></div>`
    : '';

  article.innerHTML = `
    <a href="${post.url}" class="insight-card__link" aria-label="Read ${post.title}">
      ${imageHtml}
      <div class="insight-card__content">
        <div class="insight-card__top">
          <div class="insight-card__meta">
            <span>${String(index + 1).padStart(2, '0')}</span>
            <span>${post.displayDate}</span>
            <span>${post.readTime}</span>
          </div>
          <div class="insight-card__tags">
            ${post.tags.map(tag => `<span>${tag}</span>`).join('')}
          </div>
        </div>
        <h3 class="insight-card__title">${post.title}</h3>
        <p class="insight-card__description">${post.description}</p>
      </div>
    </a>
  `;

  return article;
}

function renderInsightsGrid(insightsList, posts, options = {}) {
  insightsList.innerHTML = '';

  const cardsPerRow = 4;
  const initialRows = 3;
  const initialPostCount = cardsPerRow * initialRows;
  const shouldLimit = options.limitRows && posts.length > initialPostCount;
  const visiblePosts = shouldLimit ? posts.slice(0, initialPostCount) : posts;

  for (let index = 0; index < visiblePosts.length; index += cardsPerRow) {
    const row = document.createElement('div');
    row.className = 'insights-index__article-row';

    visiblePosts.slice(index, index + cardsPerRow).forEach((post, offset) => {
      row.appendChild(createInsightCard(post, index + offset));
    });

    insightsList.appendChild(row);

    const spacer = document.createElement('div');
    spacer.className = 'insights-index__row-spacer';

    const isLimitedFinalRow = shouldLimit && index + cardsPerRow >= visiblePosts.length;
    if (isLimitedFinalRow) {
      spacer.classList.add('insights-index__row-spacer--action');
      const showMoreButton = document.createElement('button');
      showMoreButton.type = 'button';
      showMoreButton.className = 'button insights-index__show-more';
      showMoreButton.textContent = 'Show More';
      showMoreButton.addEventListener('click', () => {
        renderInsightsGrid(insightsList, posts);
      });
      spacer.appendChild(showMoreButton);
    } else {
      spacer.setAttribute('aria-hidden', 'true');
    }

    insightsList.appendChild(spacer);
  }
}

function initInsightsList() {
  const insightsList = document.querySelector('[data-insights-list]');
  const filtersRoot = document.querySelector('[data-insights-filters]');

  if (!insightsList) return;

  insightsList.classList.add('insights-index__grid');
  renderInsightsGrid(insightsList, INSIGHT_POSTS, { limitRows: true });

  if (!filtersRoot) return;

  const uniqueTags = [...new Set(INSIGHT_POSTS.flatMap(post => post.tags))].sort((a, b) => a.localeCompare(b));
  const filters = ['all', ...uniqueTags];

  filters.forEach(filter => {
    const button = document.createElement('button');
    button.className = `work-hero__filter${filter === 'all' ? ' is-active' : ''}`;
    button.dataset.filter = filter;
    button.textContent = filter === 'all' ? 'Show All' : filter;
    filtersRoot.appendChild(button);
  });
}

function initRelatedPosts() {
  const relatedPostsRoot = document.querySelector('[data-related-posts]');
  const currentSlug = document.body.dataset.insightSlug;

  if (!relatedPostsRoot || !currentSlug) return;

  const availablePosts = INSIGHT_POSTS.filter(post => post.slug !== currentSlug);

  if (!availablePosts.length) return;

  const randomizedPosts = [...availablePosts]
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  randomizedPosts.forEach(post => {
    relatedPostsRoot.appendChild(createInsightRow(post));
  });
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
            <img src="/images/Icon.webp" alt="" aria-hidden="true">
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
  initThemeToggle();
  initMobileMenu();
  initHeaderDropdowns();
  initCustomCursor();
  initHeroDistortion();
  setActiveNavLink();
  initFaqAccordion();
  initFaqClickScramble();
  initProjectSlideshow();
  initInsightsList();
  initProjectFilter();
  initWorkRowScramble();
  initWorkImagePreview();
  initAboutCardScramble();
  initToolRelatedCardScramble();
  initAboutLogoSwap();
  initButtonScramble();
  initRelatedPosts();
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
