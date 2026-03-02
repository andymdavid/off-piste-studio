// Off Piste Studio - Main JavaScript

// Scale footer brand to fill container width
function scaleFooterBrand() {
  const brand = document.querySelector('.footer__brand');
  if (!brand) return;

  // Get the container (the .container div inside footer)
  const container = brand.closest('.container');
  if (!container) return;

  // Get computed padding to calculate actual content width
  const styles = getComputedStyle(container);
  const paddingLeft = parseFloat(styles.paddingLeft);
  const paddingRight = parseFloat(styles.paddingRight);
  const contentWidth = container.clientWidth - paddingLeft - paddingRight;

  // Reset to base size and inline-block to measure actual text width
  brand.style.fontSize = '100px';
  brand.style.display = 'inline-block';
  brand.style.width = 'auto';

  // Force reflow to get accurate measurement
  brand.offsetHeight;

  // Get the natural width of the text at 100px
  const textWidth = brand.scrollWidth;

  // Calculate the font size needed to fill content area
  const newFontSize = (100 * contentWidth) / textWidth;

  // Apply the new font size and restore display
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
