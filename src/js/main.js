// Off Piste Studio - Main JavaScript

// Scale footer brand to fill the horizontal space available to it.
function scaleFooterBrand() {
  const brand = document.querySelector('.footer__brand');
  if (!brand) return;

  const styles = getComputedStyle(brand);
  const paddingLeft = parseFloat(styles.paddingLeft) || 0;
  const paddingRight = parseFloat(styles.paddingRight) || 0;

  // On pages where the brand sits inside `.container`, use that width.
  // On the homepage it bleeds full-width, so use the element's own width.
  const container = brand.closest('.container');
  const availableWidth = container
    ? container.clientWidth - paddingLeft - paddingRight
    : brand.clientWidth - paddingLeft - paddingRight;

  if (availableWidth <= 0) return;

  // Reset to a predictable base size before measuring the text width.
  brand.style.fontSize = '100px';
  brand.style.display = 'inline-block';
  brand.style.width = 'auto';

  brand.offsetHeight;

  const textWidth = brand.scrollWidth;
  if (!textWidth) return;

  const newFontSize = (100 * availableWidth) / textWidth;

  brand.style.fontSize = newFontSize + 'px';
  brand.style.display = 'block';
  brand.style.width = '';
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

  const positionDropdown = (button) => {
    const rect = button.getBoundingClientRect();
    const headerRect = button.closest('.header').getBoundingClientRect();
    dropdown.style.left = (rect.left - headerRect.left - 12) + 'px';
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
  const projectRows = document.querySelectorAll('.project-row');

  if (!filterButtons.length || !projectRows.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      // Update active state
      filterButtons.forEach(btn => btn.classList.remove('is-active'));
      button.classList.add('is-active');

      // Filter projects
      projectRows.forEach(row => {
        if (filter === 'all') {
          row.style.display = '';
          return;
        }

        const tags = row.querySelectorAll('.project-row__tags span');
        const tagTexts = Array.from(tags).map(tag => tag.textContent);

        if (tagTexts.includes(filter)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
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
          <span class="lead-modal__eyebrow">Start a Project</span>
          <h2 class="lead-modal__title" id="lead-modal-title">Let&apos;s scope what you&apos;re building.</h2>
          <p class="lead-modal__text">Use this as the entry point for a future AI intake flow. For now, it gives leads a clear place to start the conversation and send project context.</p>

          <div class="lead-modal__profile">
            <img src="/public/images/Icon.png" alt="Off Piste Studio">
            <div>
              <p class="lead-modal__profile-name">Off Piste Studio</p>
              <p class="lead-modal__profile-role">AI intake agent coming soon</p>
            </div>
          </div>

          <div class="lead-modal__meta">
            <div class="lead-modal__meta-card">
              <span class="lead-modal__meta-label">Email</span>
              <p class="lead-modal__meta-value"><a href="mailto:hello@offpistestudio.com">hello@offpistestudio.com</a></p>
            </div>
            <div class="lead-modal__meta-card">
              <span class="lead-modal__meta-label">Typical Project Start</span>
              <p class="lead-modal__meta-value">$10,000+</p>
            </div>
          </div>
        </div>

        <div class="lead-modal__chat">
          <div class="lead-modal__chat-header">
            <div>
              <p class="lead-modal__chat-title">Lead Intake</p>
              <p class="lead-modal__chat-status">Structured for a future agent conversation</p>
            </div>
          </div>

          <div class="lead-modal__chat-body">
            <p class="lead-modal__bubble">Tell us what you need and we&apos;ll reply with the right next step, timeline, and commercial scope.</p>
            <ul class="lead-modal__prompt-list">
              <li>What are you building: website, brand, deck, or a broader system?</li>
              <li>What stage are you at, and what needs to happen next?</li>
              <li>What timeline and budget range should we plan around?</li>
            </ul>
          </div>

          <div class="lead-modal__actions">
            <a class="lead-modal__action lead-modal__action--primary" href="mailto:hello@offpistestudio.com?subject=New%20project%20enquiry&body=Hi%20Off%20Piste%20Studio%2C%0A%0AI%27d%20like%20to%20discuss%20a%20project.%0A%0AProject%20type%3A%0ATimeline%3A%0ABudget%20range%3A%0AGoals%3A%0A">Start the chat</a>
            <a class="lead-modal__action lead-modal__action--secondary" href="/contact.html">View contact page</a>
          </div>
          <p class="lead-modal__footnote">When the AI agent is ready, this panel can become the live intake interface without changing the trigger pattern.</p>
        </div>
      </div>
    </div>
  `;

  return modal;
}

function initLeadModal() {
  const triggers = document.querySelectorAll('a[href="/contact.html"]');

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

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderDropdowns();
  setActiveNavLink();
  initFaqAccordion();
  initProjectSlideshow();
  initProjectFilter();
  initLeadModal();

  // Scale footer brand after fonts load
  if (document.fonts) {
    document.fonts.ready.then(scaleFooterBrand);
  } else {
    scaleFooterBrand();
  }
});

// Rescale on window resize
window.addEventListener('resize', scaleFooterBrand);
