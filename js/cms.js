/* ==========================================================================
   CMS.JS — lightweight, no-backend content layer.
   Overrides are saved to localStorage by admin.html and read here by every
   public page. This is a browser-local demo CMS (single device/browser) —
   see README for what a production, multi-user CMS with a real database
   would additionally require.
   ========================================================================== */

const CMS = (() => {
  const KEYS = {
    site: 'a1cms_site',
    home: 'a1cms_home',
    about: 'a1cms_about',
    why: 'a1cms_why',
    services: 'a1cms_services',
    process: 'a1cms_process',
    values: 'a1cms_values',
    products: 'a1cms_products',
    testimonials: 'a1cms_testimonials',
    heroSlides: 'a1cms_heroslides',
    theme: 'a1cms_theme',
    credentials: 'a1cms_credentials',
    messages: 'a1cms_messages',
    auth: 'a1cms_auth'
  };

  function get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return structuredCloneSafe(fallback);
      return JSON.parse(raw);
    } catch (e) { return structuredCloneSafe(fallback); }
  }
  function set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (e) { console.error('CMS save failed', e); return false; }
  }
  function structuredCloneSafe(v) { return v == null ? v : JSON.parse(JSON.stringify(v)); }

  return {
    KEYS,
    getSite: () => Object.assign({}, SITE_DEFAULTS, get(KEYS.site, {})),
    setSite: (v) => set(KEYS.site, v),
    getHome: () => Object.assign({}, HOME_DEFAULTS, get(KEYS.home, {})),
    setHome: (v) => set(KEYS.home, v),
    getAbout: () => Object.assign({}, ABOUT_DEFAULTS, get(KEYS.about, {})),
    setAbout: (v) => set(KEYS.about, v),
    getWhy: () => get(KEYS.why, WHY_CHOOSE_US_DEFAULTS),
    setWhy: (v) => set(KEYS.why, v),
    getServices: () => get(KEYS.services, SERVICES_DEFAULTS),
    setServices: (v) => set(KEYS.services, v),
    getProcess: () => get(KEYS.process, PROCESS_DEFAULTS),
    setProcess: (v) => set(KEYS.process, v),
    getValues: () => get(KEYS.values, VALUES_DEFAULTS),
    setValues: (v) => set(KEYS.values, v),
    getProducts: () => get(KEYS.products, PRODUCTS_DEFAULTS),
    setProducts: (v) => set(KEYS.products, v),
    getTestimonials: () => get(KEYS.testimonials, TESTIMONIALS_DEFAULTS),
    setTestimonials: (v) => set(KEYS.testimonials, v),
    getHeroSlides: () => get(KEYS.heroSlides, HERO_SLIDES_DEFAULTS),
    setHeroSlides: (v) => set(KEYS.heroSlides, v),

    getMessages: () => get(KEYS.messages, []),
    setMessages: (v) => set(KEYS.messages, v),
    addMessage: (msg) => {
      const list = get(KEYS.messages, []);
      list.unshift(Object.assign({ id: 'm' + Date.now(), read: false, date: new Date().toISOString() }, msg));
      return set(KEYS.messages, list);
    },

    getTheme: () => localStorage.getItem(KEYS.theme) || 'light',
    setTheme: (v) => localStorage.setItem(KEYS.theme, v),

    isLoggedIn: () => sessionStorage.getItem(KEYS.auth) === 'true',

    getCredentials: () => get(KEYS.credentials, {
      username: 'Fahad',
      // default password: Fahadtravels (stored only as a SHA-256 hash, never in plain text)
      passwordHash: '1ecc14e6e1b5ee06e61eb5f313c8bf3e0bfccbdd736f67dee27aca2b5a05caed',
      securityQuestion: 'What is your favourite color?',
      // default answer: green
      securityAnswerHash: 'ba4788b226aa8dc2e6dc74248bb9f618cfa8c959e0c26c147be48f6839a0b088'
    }),
    setCredentials: (v) => set(KEYS.credentials, v),

    sha256: async (text) => {
      if (window.crypto && crypto.subtle && crypto.subtle.digest) {
        try {
          const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
          return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (e) { /* fall through to fallback below */ }
      }
      // Fallback (non-cryptographic) hash for contexts where SubtleCrypto is unavailable
      let h = 0;
      for (let i = 0; i < text.length; i++) { h = ((h << 5) - h + text.charCodeAt(i)) | 0; }
      return 'fallback-' + Math.abs(h).toString(16);
    },

    login: async function (user, pass) {
      const creds = this.getCredentials();
      const passHash = await this.sha256(pass);
      const ok = user === creds.username && passHash === creds.passwordHash;
      if (ok) sessionStorage.setItem(KEYS.auth, 'true');
      return ok;
    },
    logout: () => sessionStorage.removeItem(KEYS.auth),

    verifySecurityAnswer: async function (answer) {
      const creds = this.getCredentials();
      const answerHash = await this.sha256(answer.trim().toLowerCase());
      return answerHash === creds.securityAnswerHash;
    },

    resetAll: () => { Object.values(KEYS).forEach(k => k !== KEYS.auth && localStorage.removeItem(k)); }
  };
})();

/* ---------- Apply site-wide branding + render data-key text on every page ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const site = CMS.getSite();

  document.querySelectorAll('[data-cms-logo]').forEach(img => { img.src = site.logo; });
  document.querySelectorAll('[data-cms="site.phone"]').forEach(el => { el.textContent = site.phone; });
  document.querySelectorAll('[data-cms-href="tel"]').forEach(a => { a.href = 'tel:' + site.phone.replace(/[^\d+]/g, ''); a.textContent = site.phone; });
  document.querySelectorAll('[data-cms-href="mailto"]').forEach(a => { a.href = 'mailto:' + site.email; a.textContent = site.email; });
  document.querySelectorAll('[data-cms="site.address"]').forEach(el => { el.textContent = site.address; });
  document.querySelectorAll('[data-cms="site.tagline"]').forEach(el => { el.textContent = site.tagline; });
  document.querySelectorAll('[data-cms="site.navText"]').forEach(el => { el.textContent = site.navText; });
  document.querySelectorAll('[data-cms-href="whatsapp"]').forEach(a => { a.href = 'https://wa.me/' + site.whatsapp; });
  document.querySelectorAll('[data-cms="site.whatsapp"]').forEach(el => { el.textContent = site.phone; });
  document.querySelectorAll('[data-social="facebook"]').forEach(a => a.href = site.social.facebook);
  document.querySelectorAll('[data-social="twitter"]').forEach(a => a.href = site.social.twitter);
  document.querySelectorAll('[data-social="tiktok"]').forEach(a => a.href = site.social.tiktok);
  document.querySelectorAll('[data-social="instagram"]').forEach(a => a.href = site.social.instagram);

  const home = CMS.getHome();
  const about = CMS.getAbout();
  const bind = (selector, value) => document.querySelectorAll(selector).forEach(el => { if (value != null && value !== 'undefined' && value !== 'null') el.innerHTML = value; });

  bind('[data-cms="home.heroEyebrow"]', home.heroEyebrow);
  bind('[data-cms="home.heroSub"]', home.heroSub);
  bind('[data-cms="home.heroAccent"]', home.heroHeadlineAccent);
  bind('[data-cms="home.heroPrefix"]', home.heroHeadlinePrefix);
  bind('[data-cms="home.heroSuffix"]', home.heroHeadlineSuffix);
  bind('[data-cms="home.messageQuote"]', home.messageQuote);
  bind('[data-cms="home.introHeading"]', home.introHeading);
  bind('[data-cms="home.introText"]', home.introText);
  bind('[data-cms="home.missionText"]', home.missionText);
  bind('[data-cms="home.visionText"]', home.visionText);
  bind('[data-cms="home.storyPreview"]', home.storyPreview);

  document.querySelectorAll('[data-counter-key="statCustomers"]').forEach(el => el.dataset.counter = home.statCustomers);
  document.querySelectorAll('[data-counter-key="statYears"]').forEach(el => el.dataset.counter = home.statYears);
  document.querySelectorAll('[data-counter-key="statSatisfaction"]').forEach(el => el.dataset.counter = home.statSatisfaction);
  bind('[data-cms="home.statArea"]', home.statArea);

  bind('[data-cms="about.whoWeAreText"]', about.whoWeAreText);
  bind('[data-cms="about.sinceYear"]', about.sinceYear);
  bind('[data-cms="about.aboutText1"]', about.aboutText1);
  bind('[data-cms="about.aboutText2"]', about.aboutText2);
  bind('[data-cms="about.founderQuote"]', '&ldquo;' + about.founderQuote + '&rdquo;');
  bind('[data-cms="about.founderName"]', about.founderName);
  bind('[data-cms="about.ceoQuote"]', '&ldquo;' + about.ceoQuote + '&rdquo;');
  bind('[data-cms="about.ceoName"]', about.ceoName);
  bind('[data-cms="about.missionText"]', about.missionText);
  bind('[data-cms="about.visionText"]', about.visionText);
  bind('[data-cms="about.storyFull"]', about.storyFull);
  bind('[data-cms="about.recentProjectsText"]', about.recentProjectsText);

  document.querySelectorAll('[data-cms-img="about.whoImage1"]').forEach(el => el.src = about.whoImage1);
  document.querySelectorAll('[data-cms-img="about.whoImage2"]').forEach(el => el.src = about.whoImage2);
  document.querySelectorAll('[data-cms-img="about.founderImage"]').forEach(el => el.src = about.founderImage);
  document.querySelectorAll('[data-cms-img="about.ceoImage"]').forEach(el => el.src = about.ceoImage);

  const whyWrap = document.getElementById('why-choose-us-grid');
  if (whyWrap) {
    whyWrap.innerHTML = CMS.getWhy().map((item, i) => `
      <div class="card feature-card reveal" style="--i:${i % 8}">
        <div class="icon-badge${['', ' gold', ' orange'][i % 3]}">&#10003;</div>
        <div><h4>${item}</h4></div>
      </div>`).join('');
  }

  const servicesWrap = document.getElementById('services-grid');
  if (servicesWrap) {
    servicesWrap.innerHTML = CMS.getServices().map((item, i) => `
      <div class="card feature-card reveal" style="flex-direction:column; --i:${i % 4}">
        <div class="icon-badge${['', ' gold', ' orange'][i % 3]}">&#9670;</div>
        <h4 class="mt-16">${item}</h4>
      </div>`).join('');
  }

  const processWrap = document.getElementById('process-timeline');
  if (processWrap) {
    processWrap.innerHTML = CMS.getProcess().map((item, i) => `
      <div class="tl-step reveal"><div class="tl-num">${i + 1}</div><h4>${item}</h4></div>`).join('');
  }

  const valuesWrap = document.getElementById('values-grid');
  if (valuesWrap) {
    valuesWrap.innerHTML = CMS.getValues().map((v, i) => `
      <div class="card glass value-card reveal" style="--i:${i % 4}">
        <div class="icon-badge${['', ' gold', ' orange'][i % 3]}">&#9671;</div>
        <h4 class="mt-16">${v.title}</h4><p>${v.text}</p>
      </div>`).join('');
  }

  /* ---------- Theme toggle ---------- */
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      CMS.setTheme(next);
    });
  });

  /* ---------- Welcome popup — Home page only, every visit/refresh ---------- */
  const currentPage = location.pathname.split('/').pop();
  const isHomePage = currentPage === '' || currentPage === 'index.html';
  if (site.welcomeEnabled && isHomePage && !document.body.classList.contains('admin-body')) {
    const popup = document.createElement('div');
    popup.className = 'welcome-popup-overlay';
    popup.innerHTML = `
      <div class="welcome-popup-card">
        <button class="welcome-popup-close" aria-label="Close welcome message">&times;</button>
        <div class="welcome-logo-ring">
          <img class="welcome-popup-logo" src="${site.logo}" alt="${site.siteName} logo">
        </div>
        <h3 class="wp-title">${site.welcomeTitle}</h3>
        <p class="wp-message">${site.welcomeMessage}</p>
        <div class="wp-progress"><div class="wp-progress-bar"></div></div>
      </div>`;
    document.body.appendChild(popup);
    requestAnimationFrame(() => popup.classList.add('open'));
    let autoTimer;
    const closePopup = () => { clearTimeout(autoTimer); popup.classList.remove('open'); setTimeout(() => popup.remove(), 400); };
    popup.addEventListener('click', (e) => { if (e.target === popup) closePopup(); });
    popup.querySelector('.welcome-popup-close').addEventListener('click', closePopup);
    document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { closePopup(); document.removeEventListener('keydown', esc); } });
    autoTimer = setTimeout(closePopup, 5000);
  }
});
