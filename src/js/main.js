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

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  setActiveNavLink();

  // Scale footer brand after fonts load
  if (document.fonts) {
    document.fonts.ready.then(scaleFooterBrand);
  } else {
    scaleFooterBrand();
  }
});

// Rescale on window resize
window.addEventListener('resize', scaleFooterBrand);
