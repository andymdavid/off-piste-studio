// Off Piste Studio - Main JavaScript

// Resize footer brand to fill full container width
function resizeFooterBrand() {
  const brand = document.querySelector('.footer__brand');
  if (!brand) return;

  const container = brand.parentElement;
  const containerWidth = container.clientWidth;

  // Start with a base size
  brand.style.fontSize = '100px';

  // Calculate the scale needed
  const textWidth = brand.scrollWidth;
  const scale = containerWidth / textWidth;

  // Apply the calculated font size
  brand.style.fontSize = (100 * scale) + 'px';
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
  resizeFooterBrand();
});

// Resize footer brand on window resize
window.addEventListener('resize', resizeFooterBrand);
