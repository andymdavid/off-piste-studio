import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, basename } from 'path';

const rootDir = resolve('.');
const generatedDir = resolve(rootDir, 'src/generated');

// ---------------------------------------------------------------------------
// Shared utilities (same as generate-insights.mjs)
// ---------------------------------------------------------------------------

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function parseFrontmatter(fileContents) {
  const match = fileContents.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('Missing frontmatter block.');

  const [, frontmatterBlock, body] = match;
  const data = {};

  frontmatterBlock.split('\n').forEach(line => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return;
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    data[key] = value;
  });

  return { data, body: body.trim() };
}

function renderMarkdown(markdown) {
  const lines = markdown.split('\n');
  const html = [];
  let paragraph = [];
  let listItems = [];
  let quote = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${escapeHtml(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!listItems.length) return;
    html.push(`<ul>${listItems.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`);
    listItems = [];
  };

  const flushQuote = () => {
    if (!quote.length) return;
    html.push(`<blockquote>${escapeHtml(quote.join(' '))}</blockquote>`);
    quote = [];
  };

  lines.forEach(line => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      flushList();
      flushQuote();
      return;
    }

    if (trimmed.startsWith('## ')) {
      flushParagraph(); flushList(); flushQuote();
      html.push(`<h2>${escapeHtml(trimmed.slice(3))}</h2>`);
      return;
    }

    if (trimmed.startsWith('### ')) {
      flushParagraph(); flushList(); flushQuote();
      html.push(`<h3>${escapeHtml(trimmed.slice(4))}</h3>`);
      return;
    }

    if (trimmed.startsWith('- ')) {
      flushParagraph(); flushQuote();
      listItems.push(trimmed.slice(2));
      return;
    }

    if (trimmed.startsWith('> ')) {
      flushParagraph(); flushList();
      quote.push(trimmed.slice(2));
      return;
    }

    flushList(); flushQuote();
    paragraph.push(trimmed);
  });

  flushParagraph(); flushList(); flushQuote();
  return html.join('\n');
}

// ---------------------------------------------------------------------------
// Shared HTML fragments
// ---------------------------------------------------------------------------

const headerHtml = `
  <header class="header">
    <div class="header__inner">
      <button class="header__menu-toggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav class="header__nav">
        <a href="/work" class="header__nav-link">Work</a>
        <a href="/about" class="header__nav-link">About</a>
        <div class="header__nav-item header__nav-item--dropdown"><button class="header__nav-link header__nav-toggle" type="button" aria-expanded="false" aria-haspopup="true">Resources</button></div>
      </nav>
      <a href="/" class="header__logo"><span class="header__logo-letter">O</span><span class="header__logo-letter">f</span><span class="header__logo-letter">f</span><span class="header__logo-space"> </span><span class="header__logo-letter">P</span><span class="header__logo-letter">i</span><span class="header__logo-letter">s</span><span class="header__logo-letter">t</span><span class="header__logo-letter">e</span><span class="header__logo-space"> </span><span class="header__logo-letter">S</span><span class="header__logo-letter">t</span><span class="header__logo-letter">u</span><span class="header__logo-letter">d</span><span class="header__logo-letter">i</span><span class="header__logo-letter">o</span></a>
      <a href="/contact" class="header__cta">Let's Chat</a>
    </div>
    <div class="header__dropdown"><a href="/resources" class="header__dropdown-link">Insights</a><a href="/tools" class="header__dropdown-link">Tools</a></div>
  </header>`;

const footerHtml = `
  <footer class="footer">
    <div class="footer__divider"></div>
    <div class="container"><div class="footer__top"><div class="footer__lead"><img src="/public/images/Icon.webp" alt="" class="footer__icon" aria-hidden="true" loading="lazy"><h3 class="footer__heading">Interested in working with us?</h3><a href="/contact" class="footer__cta">Let's Chat</a></div><div class="footer__navs"><nav class="footer__nav" aria-label="Footer sitemap"><a href="/work" class="footer__nav-link">Work</a><a href="/about" class="footer__nav-link">About</a><a href="/resources" class="footer__nav-link">Insights</a><a href="/tools" class="footer__nav-link">Tools</a></nav><nav class="footer__nav" aria-label="Footer social links"><a href="https://www.linkedin.com/company/off-piste-studio" class="footer__nav-link" target="_blank" rel="noopener">LinkedIn</a></nav></div></div></div>
    <div class="footer__brand-wrap"><div class="footer__brand">Off-Piste Studio</div><div class="container footer__bottom"><p class="footer__copyright">&copy; Off Piste Studio 2026 All Rights Reserved</p><p class="footer__location">City Beach, WA</p></div></div>
  </footer>`;

const fontsHtml = `
  <link rel="preload" href="/public/fonts/fonnts.com-Alfabet_Regular.otf" as="font" type="font/otf" crossorigin>
  <link rel="preload" href="/public/fonts/fonnts.com-Alfabet_Black.otf" as="font" type="font/otf" crossorigin>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">`;

const projectSlideshowHtml = `
    <div class="project-modal project-modal--page">
      <div class="project-modal__slideshow">
        <div class="project-modal__slide is-active"><img src="/public/images/cases/OtherStuff.webp" alt="Other Stuff website project"></div>
        <div class="project-modal__slide"><img src="/public/images/cases/Decarbonology.webp" alt="Decarbonology website project" loading="lazy"></div>
        <div class="project-modal__slide"><img src="/public/images/cases/Flow-Dynamics.webp" alt="Flow Dynamics website project" loading="lazy"></div>
        <div class="project-modal__slide"><img src="/public/images/cases/FlowDynamics.webp" alt="Flow Dynamics brand project" loading="lazy"></div>
        <div class="project-modal__slide"><img src="/public/images/cases/MCIA.webp" alt="MCIA website project" loading="lazy"></div>
        <div class="project-modal__slide"><img src="/public/images/cases/levelup.webp" alt="Level Up website project" loading="lazy"></div>
        <div class="project-modal__slide"><img src="/public/images/cases/adammonk.webp" alt="Adam Monk website project" loading="lazy"></div>
        <div class="project-modal__slide"><img src="/public/images/cases/crete.webp" alt="Crete website project" loading="lazy"></div>
      </div>
    </div>`;

const clientBarHtml = `
    <section class="client-bar">
      <div class="client-bar__inner">
        <span class="client-bar__text">Trusted by 50+ Clients</span>
        <div class="client-bar__track">
          <div class="client-bar__logos">
            <img src="/public/images/logos/PLI Logo Light.webp" alt="Place Intelligence" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/SB Logo Light.webp" alt="Superbeing" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/PLE Logo Light.webp" alt="Pleiades" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/FD Logo Light.webp" alt="Future Directors" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/FDY Logo Light.webp" alt="Flow Dynamics" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/DE Logo Light.webp" alt="Decarbonology" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/BU Logo Light.webp" alt="Buildsource" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/CC Logo Light.webp" alt="Cell Cyber" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/LI Logo Light.webp" alt="Linear" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/PLI Logo Light.webp" alt="Place Intelligence" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/SB Logo Light.webp" alt="Superbeing" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/PLE Logo Light.webp" alt="Pleiades" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/FD Logo Light.webp" alt="Future Directors" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/FDY Logo Light.webp" alt="Flow Dynamics" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/DE Logo Light.webp" alt="Decarbonology" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/BU Logo Light.webp" alt="Buildsource" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/CC Logo Light.webp" alt="Cell Cyber" class="client-bar__logo" loading="lazy">
            <img src="/public/images/logos/LI Logo Light.webp" alt="Linear" class="client-bar__logo" loading="lazy">
          </div>
        </div>
      </div>
    </section>`;

// ---------------------------------------------------------------------------
// Internal linking helpers
// ---------------------------------------------------------------------------

function shuffleAndPick(arr, count, excludeSlug) {
  const filtered = arr.filter(p => p.slug !== excludeSlug);
  for (let i = filtered.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
  }
  return filtered.slice(0, count);
}

function createInternalLinksHtml(page, allIndustries, allServices, allLocations) {
  const sections = [];

  if (page._type === 'industry') {
    const related = shuffleAndPick(allIndustries, 4, page.slug);
    const locs = shuffleAndPick(allLocations, 4, null);
    const svcs = allServices.slice(0, 4);

    if (related.length) {
      sections.push(`<div class="page-links__group"><h3 class="page-links__label">We also build websites for</h3><div class="page-links__list">${related.map(p => `<a href="/industries/${p.slug}" class="page-links__link">${escapeHtml(p.industry || p.title)}</a>`).join('')}</div></div>`);
    }
    if (svcs.length) {
      sections.push(`<div class="page-links__group"><h3 class="page-links__label">Our services</h3><div class="page-links__list">${svcs.map(p => `<a href="/services/${p.slug}" class="page-links__link">${escapeHtml(p.title)}</a>`).join('')}</div></div>`);
    }
    if (locs.length) {
      sections.push(`<div class="page-links__group"><h3 class="page-links__label">Serving businesses in</h3><div class="page-links__list">${locs.map(p => `<a href="/locations/${p.slug}" class="page-links__link">${escapeHtml(p.location || p.title)}</a>`).join('')}</div></div>`);
    }
  }

  if (page._type === 'service') {
    const inds = shuffleAndPick(allIndustries, 6, null);
    const locs = shuffleAndPick(allLocations, 4, null);

    if (inds.length) {
      sections.push(`<div class="page-links__group"><h3 class="page-links__label">Industries we serve</h3><div class="page-links__list">${inds.map(p => `<a href="/industries/${p.slug}" class="page-links__link">${escapeHtml(p.industry || p.title)}</a>`).join('')}</div></div>`);
    }
    if (locs.length) {
      sections.push(`<div class="page-links__group"><h3 class="page-links__label">Serving businesses in</h3><div class="page-links__list">${locs.map(p => `<a href="/locations/${p.slug}" class="page-links__link">${escapeHtml(p.location || p.title)}</a>`).join('')}</div></div>`);
    }
  }

  if (page._type === 'location') {
    const inds = shuffleAndPick(allIndustries, 6, null);
    const svcs = allServices.slice(0, 4);

    if (inds.length) {
      sections.push(`<div class="page-links__group"><h3 class="page-links__label">Industries we serve in ${escapeHtml(page.location || '')}</h3><div class="page-links__list">${inds.map(p => `<a href="/industries/${p.slug}" class="page-links__link">${escapeHtml(p.industry || p.title)}</a>`).join('')}</div></div>`);
    }
    if (svcs.length) {
      sections.push(`<div class="page-links__group"><h3 class="page-links__label">Our services</h3><div class="page-links__list">${svcs.map(p => `<a href="/services/${p.slug}" class="page-links__link">${escapeHtml(p.title)}</a>`).join('')}</div></div>`);
    }
  }

  if (!sections.length) return '';

  return `
    <section class="page-links">
      <div class="container">
        ${sections.join('\n        ')}
      </div>
    </section>`;
}

// ---------------------------------------------------------------------------
// Page type: Industry
// ---------------------------------------------------------------------------
// Frontmatter fields:
//   title, slug, description, intro, industry, keywords, faqs (JSON array)
//
// Body: markdown content for the main body section

function createIndustryHtml(page, allIndustries, allServices, allLocations) {
  const faqItems = page.faqs || [];

  const faqHtml = faqItems.length ? `
    <section class="faq section page-faq">
      <div class="container">
        <div class="faq__layout">
          <div class="faq__intro">
            <h2 class="faq__heading">Common questions about ${escapeHtml(page.industry.toLowerCase())} websites</h2>
          </div>
          <div class="faq__list">
            ${faqItems.map(faq => `
            <details class="faq__item">
              <summary class="faq__question">${escapeHtml(faq.q)}</summary>
              <p class="faq__answer">${escapeHtml(faq.a)}</p>
            </details>`).join('')}
          </div>
        </div>
      </div>
    </section>` : '';

  const faqSchema = faqItems.length ? `,
      {
        "@type": "FAQPage",
        "mainEntity": [${faqItems.map(faq => `
          {
            "@type": "Question",
            "name": ${JSON.stringify(faq.q)},
            "acceptedAnswer": {
              "@type": "Answer",
              "text": ${JSON.stringify(faq.a)}
            }
          }`).join(',')}
        ]
      }` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/images/Icon.webp" type="image/webp">
  <meta name="description" content="${escapeHtml(page.description)}">
  <title>${escapeHtml(page.title)} | Off Piste Studio</title>
  <link rel="canonical" href="https://offpistestudio.com/industries/${escapeHtml(page.slug)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(page.title)} | Off Piste Studio">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="https://offpistestudio.com/industries/${escapeHtml(page.slug)}">
  <meta property="og:site_name" content="Off Piste Studio">
  <meta property="og:image" content="https://offpistestudio.com/images/Hero-Background.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(page.title)} | Off Piste Studio">
  <meta name="twitter:description" content="${escapeHtml(page.description)}">
  <meta name="twitter:image" content="https://offpistestudio.com/images/Hero-Background.png">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "${escapeHtml(page.title)}",
        "description": "${escapeHtml(page.description)}",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Off Piste Studio",
          "url": "https://offpistestudio.com"
        },
        "serviceType": "Website Design",
        "areaServed": [
          { "@type": "City", "name": "Perth" },
          { "@type": "Country", "name": "Australia" }
        ]
      }${faqSchema},
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://offpistestudio.com/" },
          { "@type": "ListItem", "position": 2, "name": "Industries", "item": "https://offpistestudio.com/industries" },
          { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(page.title)}, "item": "https://offpistestudio.com/industries/${escapeHtml(page.slug)}" }
        ]
      }
    ]
  }
  </script>
  <link rel="stylesheet" href="/src/styles/main.css">
  ${fontsHtml}
</head>
<body data-page-type="industry" data-page-slug="${escapeHtml(page.slug)}">
  ${headerHtml}
  <main>
    <section class="work-hero">
      <div class="container">
        <img src="/public/images/Icon.webp" alt="" class="work-hero__icon" aria-hidden="true">
        <h1 class="page-hero__title">${escapeHtml(page.title)}</h1>
        <p class="page-hero__intro">${escapeHtml(page.intro)}</p>
        <a href="/contact" class="page-hero__button">Let's Chat</a>
        ${projectSlideshowHtml}
      </div>
    </section>
    ${clientBarHtml}

    <section class="page-body">
      <div class="container">
        <div class="page-body__content">
          ${page.html}
        </div>
      </div>
    </section>

    <section class="page-trust">
      <div class="container">
        <div class="page-trust__content">
          <div class="page-trust__item">
            <span class="page-trust__number">50+</span>
            <span class="page-trust__label">Websites built for small businesses</span>
          </div>
          <div class="page-trust__item">
            <span class="page-trust__number">2–4</span>
            <span class="page-trust__label">Weeks typical delivery</span>
          </div>
          <div class="page-trust__item">
            <span class="page-trust__number">100%</span>
            <span class="page-trust__label">Client satisfaction — no refund ever requested</span>
          </div>
        </div>
      </div>
    </section>

    <section class="page-cta">
      <div class="container">
        <div class="page-cta__content">
          <h2 class="page-cta__heading">Ready to get more leads for your ${escapeHtml(page.industry.toLowerCase())} business?</h2>
          <p class="page-cta__text">Get in touch to discuss your project. We'll show you what a high-performing website looks like for your industry.</p>
          <a href="/contact" class="page-cta__button">Let's Chat</a>
        </div>
      </div>
    </section>
    ${faqHtml}
    ${createInternalLinksHtml({ ...page, _type: 'industry' }, allIndustries, allServices, allLocations)}
  </main>
  ${footerHtml}
  <script type="module" src="/src/js/main.js"></script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Page type: Service
// ---------------------------------------------------------------------------
// Frontmatter fields:
//   title, slug, description, intro, keywords, faqs (JSON array)

function createServiceHtml(page, allIndustries, allServices, allLocations) {
  const faqItems = page.faqs || [];

  const faqHtml = faqItems.length ? `
    <section class="faq section page-faq">
      <div class="container">
        <div class="faq__layout">
          <div class="faq__intro">
            <h2 class="faq__heading">Common questions</h2>
          </div>
          <div class="faq__list">
            ${faqItems.map(faq => `
            <details class="faq__item">
              <summary class="faq__question">${escapeHtml(faq.q)}</summary>
              <p class="faq__answer">${escapeHtml(faq.a)}</p>
            </details>`).join('')}
          </div>
        </div>
      </div>
    </section>` : '';

  const faqSchema = faqItems.length ? `,
      {
        "@type": "FAQPage",
        "mainEntity": [${faqItems.map(faq => `
          {
            "@type": "Question",
            "name": ${JSON.stringify(faq.q)},
            "acceptedAnswer": {
              "@type": "Answer",
              "text": ${JSON.stringify(faq.a)}
            }
          }`).join(',')}
        ]
      }` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/images/Icon.webp" type="image/webp">
  <meta name="description" content="${escapeHtml(page.description)}">
  <title>${escapeHtml(page.title)} | Off Piste Studio</title>
  <link rel="canonical" href="https://offpistestudio.com/services/${escapeHtml(page.slug)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(page.title)} | Off Piste Studio">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="https://offpistestudio.com/services/${escapeHtml(page.slug)}">
  <meta property="og:site_name" content="Off Piste Studio">
  <meta property="og:image" content="https://offpistestudio.com/images/Hero-Background.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(page.title)} | Off Piste Studio">
  <meta name="twitter:description" content="${escapeHtml(page.description)}">
  <meta name="twitter:image" content="https://offpistestudio.com/images/Hero-Background.png">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": "${escapeHtml(page.title)}",
        "description": "${escapeHtml(page.description)}",
        "provider": {
          "@type": "LocalBusiness",
          "name": "Off Piste Studio",
          "url": "https://offpistestudio.com"
        },
        "areaServed": [
          { "@type": "City", "name": "Perth" },
          { "@type": "Country", "name": "Australia" }
        ]
      }${faqSchema},
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://offpistestudio.com/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://offpistestudio.com/services" },
          { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(page.title)}, "item": "https://offpistestudio.com/services/${escapeHtml(page.slug)}" }
        ]
      }
    ]
  }
  </script>
  <link rel="stylesheet" href="/src/styles/main.css">
  ${fontsHtml}
</head>
<body data-page-type="service" data-page-slug="${escapeHtml(page.slug)}">
  ${headerHtml}
  <main>
    <section class="work-hero">
      <div class="container">
        <img src="/public/images/Icon.webp" alt="" class="work-hero__icon" aria-hidden="true">
        <h1 class="page-hero__title">${escapeHtml(page.title)}</h1>
        <p class="page-hero__intro">${escapeHtml(page.intro)}</p>
        <a href="/contact" class="page-hero__button">Let's Chat</a>
        ${projectSlideshowHtml}
      </div>
    </section>
    ${clientBarHtml}

    <section class="page-body">
      <div class="container">
        <div class="page-body__content">
          ${page.html}
        </div>
      </div>
    </section>

    <section class="page-trust">
      <div class="container">
        <div class="page-trust__content">
          <div class="page-trust__item">
            <span class="page-trust__number">50+</span>
            <span class="page-trust__label">Websites built for small businesses</span>
          </div>
          <div class="page-trust__item">
            <span class="page-trust__number">2–4</span>
            <span class="page-trust__label">Weeks typical delivery</span>
          </div>
          <div class="page-trust__item">
            <span class="page-trust__number">100%</span>
            <span class="page-trust__label">Client satisfaction — no refund ever requested</span>
          </div>
        </div>
      </div>
    </section>

    <section class="page-cta">
      <div class="container">
        <div class="page-cta__content">
          <h2 class="page-cta__heading">Ready to get started?</h2>
          <p class="page-cta__text">Get in touch and we'll walk you through how it works.</p>
          <a href="/contact" class="page-cta__button">Let's Chat</a>
        </div>
      </div>
    </section>
    ${faqHtml}
    ${createInternalLinksHtml({ ...page, _type: 'service' }, allIndustries, allServices, allLocations)}
  </main>
  ${footerHtml}
  <script type="module" src="/src/js/main.js"></script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Page type: Location
// ---------------------------------------------------------------------------
// Frontmatter fields:
//   title, slug, description, intro, location, region, keywords, faqs (JSON)

function createLocationHtml(page, allIndustries, allServices, allLocations) {
  const faqItems = page.faqs || [];

  const faqHtml = faqItems.length ? `
    <section class="faq section page-faq">
      <div class="container">
        <div class="faq__layout">
          <div class="faq__intro">
            <h2 class="faq__heading">Common questions about web design in ${escapeHtml(page.location)}</h2>
          </div>
          <div class="faq__list">
            ${faqItems.map(faq => `
            <details class="faq__item">
              <summary class="faq__question">${escapeHtml(faq.q)}</summary>
              <p class="faq__answer">${escapeHtml(faq.a)}</p>
            </details>`).join('')}
          </div>
        </div>
      </div>
    </section>` : '';

  const faqSchema = faqItems.length ? `,
      {
        "@type": "FAQPage",
        "mainEntity": [${faqItems.map(faq => `
          {
            "@type": "Question",
            "name": ${JSON.stringify(faq.q)},
            "acceptedAnswer": {
              "@type": "Answer",
              "text": ${JSON.stringify(faq.a)}
            }
          }`).join(',')}
        ]
      }` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="icon" href="/images/Icon.webp" type="image/webp">
  <meta name="description" content="${escapeHtml(page.description)}">
  <title>${escapeHtml(page.title)} | Off Piste Studio</title>
  <link rel="canonical" href="https://offpistestudio.com/locations/${escapeHtml(page.slug)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(page.title)} | Off Piste Studio">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="https://offpistestudio.com/locations/${escapeHtml(page.slug)}">
  <meta property="og:site_name" content="Off Piste Studio">
  <meta property="og:image" content="https://offpistestudio.com/images/Hero-Background.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(page.title)} | Off Piste Studio">
  <meta name="twitter:description" content="${escapeHtml(page.description)}">
  <meta name="twitter:image" content="https://offpistestudio.com/images/Hero-Background.png">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "name": "Off Piste Studio",
        "description": "${escapeHtml(page.description)}",
        "url": "https://offpistestudio.com",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "City Beach",
          "addressRegion": "WA",
          "addressCountry": "AU"
        },
        "areaServed": {
          "@type": "City",
          "name": "${escapeHtml(page.location)}"
        }
      }${faqSchema},
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://offpistestudio.com/" },
          { "@type": "ListItem", "position": 2, "name": "Locations", "item": "https://offpistestudio.com/locations" },
          { "@type": "ListItem", "position": 3, "name": ${JSON.stringify(page.title)}, "item": "https://offpistestudio.com/locations/${escapeHtml(page.slug)}" }
        ]
      }
    ]
  }
  </script>
  <link rel="stylesheet" href="/src/styles/main.css">
  ${fontsHtml}
</head>
<body data-page-type="location" data-page-slug="${escapeHtml(page.slug)}">
  ${headerHtml}
  <main>
    <section class="work-hero">
      <div class="container">
        <img src="/public/images/Icon.webp" alt="" class="work-hero__icon" aria-hidden="true">
        <h1 class="page-hero__title">${escapeHtml(page.title)}</h1>
        <p class="page-hero__intro">${escapeHtml(page.intro)}</p>
        <a href="/contact" class="page-hero__button">Let's Chat</a>
        ${projectSlideshowHtml}
      </div>
    </section>
    ${clientBarHtml}

    <section class="page-body">
      <div class="container">
        <div class="page-body__content">
          ${page.html}
        </div>
      </div>
    </section>

    <section class="page-cta">
      <div class="container">
        <div class="page-cta__content">
          <h2 class="page-cta__heading">Need a website for your ${escapeHtml(page.location)} business?</h2>
          <p class="page-cta__text">We build websites for local businesses in ${escapeHtml(page.location)} and across ${escapeHtml(page.region || 'Perth')}. Get in touch to discuss your project.</p>
          <a href="/contact" class="page-cta__button">Let's Chat</a>
        </div>
      </div>
    </section>
    ${faqHtml}
    ${createInternalLinksHtml({ ...page, _type: 'location' }, allIndustries, allServices, allLocations)}
  </main>
  ${footerHtml}
  <script type="module" src="/src/js/main.js"></script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Process a content directory
// ---------------------------------------------------------------------------

function parseContentDir(contentPath, extraFields = []) {
  if (!existsSync(contentPath)) return [];

  return readdirSync(contentPath)
    .filter(file => file.endsWith('.md') && file !== 'README.md')
    .map(file => {
      const { data, body } = parseFrontmatter(readFileSync(resolve(contentPath, file), 'utf8'));

      const page = {
        slug: data.slug || basename(file, '.md'),
        title: data.title,
        description: data.description,
        intro: data.intro,
        keywords: data.keywords || '',
        html: renderMarkdown(body),
      };

      // Parse FAQs if present (JSON array in frontmatter)
      if (data.faqs) {
        try {
          page.faqs = JSON.parse(data.faqs);
        } catch {
          console.warn(`Warning: Could not parse FAQs in ${file}`);
          page.faqs = [];
        }
      }

      // Copy extra fields from frontmatter
      extraFields.forEach(field => {
        if (data[field]) page[field] = data[field];
      });

      return page;
    });
}

function writePages(pages, outputPath, templateFn, allIndustries, allServices, allLocations) {
  mkdirSync(outputPath, { recursive: true });
  pages.forEach(page => {
    writeFileSync(resolve(outputPath, `${page.slug}.html`), templateFn(page, allIndustries, allServices, allLocations));
  });
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

mkdirSync(generatedDir, { recursive: true });

// Parse all content first
const industries = parseContentDir(resolve(rootDir, 'content/industries'), ['industry']);
const services = parseContentDir(resolve(rootDir, 'content/services'), []);
const locations = parseContentDir(resolve(rootDir, 'content/locations'), ['location', 'region']);

// Generate HTML with cross-links
writePages(industries, resolve(rootDir, 'industries'), createIndustryHtml, industries, services, locations);
writePages(services, resolve(rootDir, 'services'), createServiceHtml, industries, services, locations);
writePages(locations, resolve(rootDir, 'locations'), createLocationHtml, industries, services, locations);

// Write data files for client-side use (listings, internal linking, etc.)
const pageData = {
  industries: industries.map(({ html, faqs, ...p }) => ({ ...p, url: `/industries/${p.slug}` })),
  services: services.map(({ html, faqs, ...p }) => ({ ...p, url: `/services/${p.slug}` })),
  locations: locations.map(({ html, faqs, ...p }) => ({ ...p, url: `/locations/${p.slug}` })),
};

writeFileSync(
  resolve(generatedDir, 'pages-data.js'),
  `export const INDUSTRY_PAGES = ${JSON.stringify(pageData.industries, null, 2)};\n\nexport const SERVICE_PAGES = ${JSON.stringify(pageData.services, null, 2)};\n\nexport const LOCATION_PAGES = ${JSON.stringify(pageData.locations, null, 2)};\n`
);

const total = industries.length + services.length + locations.length;
console.log(`Generated ${total} pages (${industries.length} industries, ${services.length} services, ${locations.length} locations)`);
