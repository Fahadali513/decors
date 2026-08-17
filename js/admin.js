document.addEventListener('DOMContentLoaded', () => {

  const loginScreen = document.getElementById('login-screen');
  const dashboard = document.getElementById('dashboard');

  function showDashboard() {
    loginScreen.hidden = true;
    dashboard.hidden = false;
    loadAllForms();
  }

  if (CMS.isLoggedIn()) showDashboard();

  const setupBanner = document.getElementById('setup-banner');
  if (sessionStorage.getItem('a1cms_banner_dismissed') === 'true') setupBanner.hidden = true;
  document.getElementById('dismiss-banner').addEventListener('click', () => {
    setupBanner.hidden = true;
    sessionStorage.setItem('a1cms_banner_dismissed', 'true');
  });

  document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value;
    const errBox = document.getElementById('login-error');
    const ok = await CMS.login(user, pass);
    if (ok) {
      errBox.textContent = '';
      showDashboard();
    } else {
      errBox.textContent = 'Incorrect username or password. Please try again.';
    }
  });

  document.getElementById('logout-btn').addEventListener('click', () => {
    CMS.logout();
    location.reload();
  });

  /* ---------- Forgot password flow ---------- */
  const forgotLink = document.getElementById('forgot-link');
  const forgotPanel = document.getElementById('forgot-panel');
  const loginForm = document.getElementById('login-form');
  let answerVerified = false;

  forgotLink.addEventListener('click', () => {
    const creds = CMS.getCredentials();
    document.getElementById('forgot-question').textContent = creds.securityQuestion;
    loginForm.hidden = true;
    forgotLink.hidden = true;
    forgotPanel.hidden = false;
    answerVerified = false;
    document.getElementById('forgot-reset-fields').hidden = true;
    document.getElementById('forgot-submit').textContent = 'Verify Answer';
  });

  document.getElementById('forgot-cancel').addEventListener('click', () => {
    loginForm.hidden = false;
    forgotLink.hidden = false;
    forgotPanel.hidden = true;
    document.getElementById('forgot-error').textContent = '';
    document.getElementById('forgot-answer').value = '';
  });

  document.getElementById('forgot-submit').addEventListener('click', async () => {
    const errBox = document.getElementById('forgot-error');
    if (!answerVerified) {
      const answer = document.getElementById('forgot-answer').value;
      const ok = await CMS.verifySecurityAnswer(answer);
      if (!ok) { errBox.textContent = 'That answer doesn\'t match. Please try again.'; return; }
      errBox.textContent = '';
      answerVerified = true;
      document.getElementById('forgot-reset-fields').hidden = false;
      document.getElementById('forgot-submit').textContent = 'Set New Password';
    } else {
      const p1 = document.getElementById('forgot-new-pass').value;
      const p2 = document.getElementById('forgot-new-pass-confirm').value;
      if (p1.length < 6) { errBox.textContent = 'Password must be at least 6 characters.'; return; }
      if (p1 !== p2) { errBox.textContent = 'Passwords do not match.'; return; }
      const creds = CMS.getCredentials();
      creds.passwordHash = await CMS.sha256(p1);
      CMS.setCredentials(creds);
      errBox.textContent = '';
      loginForm.hidden = false;
      forgotLink.hidden = false;
      forgotPanel.hidden = true;
      document.getElementById('login-error').textContent = '';
      document.getElementById('login-user').value = creds.username;
      document.getElementById('login-pass').value = '';
      document.getElementById('login-pass').focus();
    }
  });

  /* ---------- Sidebar navigation ---------- */
  const navItems = document.querySelectorAll('.nav-item[data-panel]');
  navItems.forEach(btn => {
    btn.addEventListener('click', () => {
      navItems.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.admin-panel').forEach(p => p.hidden = true);
      document.getElementById(btn.dataset.panel).hidden = false;
      document.getElementById('panel-title').textContent = btn.dataset.label || btn.textContent;
    });
  });

  function toast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2200);
  }

  /* ---------- Load all forms with current CMS data ---------- */
  function loadAllForms() {
    const home = CMS.getHome();
    const about = CMS.getAbout();
    const site = CMS.getSite();

    document.getElementById('h-heroEyebrow').value = home.heroEyebrow || '';
    document.getElementById('h-heroHeadlinePrefix').value = home.heroHeadlinePrefix || '';
    document.getElementById('h-heroHeadlineAccent').value = home.heroHeadlineAccent || '';
    document.getElementById('h-heroHeadlineSuffix').value = home.heroHeadlineSuffix || '';
    document.getElementById('h-heroSub').value = home.heroSub || '';
    document.getElementById('h-messageQuote').value = home.messageQuote || '';
    document.getElementById('h-introHeading').value = home.introHeading || '';
    document.getElementById('h-introText').value = home.introText || '';
    document.getElementById('h-storyPreview').value = home.storyPreview || '';
    document.getElementById('h-statCustomers').value = home.statCustomers || '';
    document.getElementById('h-statArea').value = home.statArea || '';
    document.getElementById('h-statYears').value = home.statYears || '';
    document.getElementById('h-statSatisfaction').value = home.statSatisfaction || '';

    document.getElementById('a-whoWeAreText').value = about.whoWeAreText || '';
    document.getElementById('a-sinceYear').value = about.sinceYear || '';
    document.getElementById('a-aboutText1').value = about.aboutText1;
    document.getElementById('a-aboutText2').value = about.aboutText2;
    document.getElementById('a-founderName').value = about.founderName || '';
    document.getElementById('a-founderQuote').value = about.founderQuote || '';
    document.getElementById('a-ceoName').value = about.ceoName || '';
    document.getElementById('a-ceoQuote').value = about.ceoQuote || '';
    document.getElementById('a-missionText').value = about.missionText || '';
    document.getElementById('a-visionText').value = about.visionText || '';
    document.getElementById('a-storyFull').value = about.storyFull || '';
    document.getElementById('a-recentProjectsText').value = about.recentProjectsText || '';

    document.getElementById('s-phone').value = site.phone || '';
    document.getElementById('s-whatsapp').value = site.whatsapp || '';
    document.getElementById('s-email').value = site.email || '';
    document.getElementById('s-address').value = site.address || '';

    document.getElementById('b-siteName').value = site.siteName || '';
    document.getElementById('b-navText').value = site.navText || '';
    document.getElementById('b-tagline').value = site.tagline || '';
    document.getElementById('b-facebook').value = site.social.facebook || '';
    document.getElementById('b-twitter').value = site.social.twitter || '';
    document.getElementById('b-tiktok').value = site.social.tiktok || '';
    document.getElementById('b-instagram').value = site.social.instagram || '';
    document.getElementById('b-logo-preview').src = site.logo;
    document.getElementById('b-welcomeEnabled').checked = site.welcomeEnabled !== false;
    document.getElementById('b-welcomeTitle').value = site.welcomeTitle || '';
    document.getElementById('b-welcomeMessage').value = site.welcomeMessage || '';

    document.getElementById('a-whoImage1-preview').src = about.whoImage1;
    document.getElementById('a-whoImage2-preview').src = about.whoImage2;
    document.getElementById('a-founderImage-preview').src = about.founderImage;
    document.getElementById('a-ceoImage-preview').src = about.ceoImage;

    renderSimpleList('why-list', CMS.getWhy());
    renderHeroSlidesList(CMS.getHeroSlides());
    renderSimpleList('services-list', CMS.getServices());
    renderSimpleList('process-list', CMS.getProcess());
    renderValuesList(CMS.getValues());
    renderProductsList(CMS.getProducts());
    renderTestimonialsList(CMS.getTestimonials());
    renderMessages();

    const creds = CMS.getCredentials();
    document.getElementById('acc-username').value = creds.username || '';
    document.getElementById('acc-password').value = '';
    document.getElementById('acc-password-confirm').value = '';
    document.getElementById('acc-question').value = creds.securityQuestion || '';
    document.getElementById('acc-answer').value = '';
  }

  /* ---------- Generic single-text-field repeater (why/services/process) ---------- */
  function renderSimpleList(containerId, items) {
    const wrap = document.getElementById(containerId);
    wrap.innerHTML = '';
    items.forEach((val, i) => wrap.appendChild(simpleRow(val, i)));
  }
  function simpleRow(val) {
    const row = document.createElement('div');
    row.className = 'repeater-row';
    row.innerHTML = `<div class="rr-fields"><input type="text" value="${escapeAttr(val)}"></div><button type="button" class="rr-remove" aria-label="Remove">✕</button>`;
    row.querySelector('.rr-remove').addEventListener('click', () => row.remove());
    return row;
  }
  function readSimpleList(containerId) {
    return Array.from(document.querySelectorAll(`#${containerId} input`)).map(i => i.value.trim()).filter(Boolean);
  }
  document.getElementById('add-why').addEventListener('click', () => document.getElementById('why-list').appendChild(simpleRow('')));
  document.getElementById('add-service').addEventListener('click', () => document.getElementById('services-list').appendChild(simpleRow('')));
  document.getElementById('add-process').addEventListener('click', () => document.getElementById('process-list').appendChild(simpleRow('')));

  /* ---------- Values repeater (title + text) ---------- */
  function renderValuesList(values) {
    const wrap = document.getElementById('values-list');
    wrap.innerHTML = '';
    values.forEach(v => wrap.appendChild(valueRow(v)));
  }
  function valueRow(v = { title: '', text: '' }) {
    const row = document.createElement('div');
    row.className = 'repeater-row';
    row.innerHTML = `
      <div class="rr-fields">
        <input type="text" class="v-title" placeholder="Title" value="${escapeAttr(v.title)}">
        <input type="text" class="v-text" placeholder="Description" value="${escapeAttr(v.text)}">
      </div>
      <button type="button" class="rr-remove" aria-label="Remove">✕</button>`;
    row.querySelector('.rr-remove').addEventListener('click', () => row.remove());
    return row;
  }
  document.getElementById('add-value').addEventListener('click', () => document.getElementById('values-list').appendChild(valueRow()));
  function readValuesList() {
    return Array.from(document.querySelectorAll('#values-list .repeater-row')).map(row => ({
      title: row.querySelector('.v-title').value.trim(),
      text: row.querySelector('.v-text').value.trim()
    })).filter(v => v.title);
  }

  /* ---------- Products repeater ---------- */
  function renderProductsList(products) {
    const wrap = document.getElementById('products-list');
    wrap.innerHTML = '';
    products.forEach(p => wrap.appendChild(productRow(p)));
  }
  function productRow(p) {
    p = p || { id: 'p' + Date.now(), name: '', category: '', tagline: '', shortDesc: '', fullDesc: '', images: [], featured: false, popular: false, comingSoon: false };
    const row = document.createElement('div');
    row.className = 'repeater-row';
    row.dataset.id = p.id;
    row.innerHTML = `
      <div class="rr-fields" style="flex:1;">
        <div class="rr-fields row">
          <input type="text" class="p-name" placeholder="Product name" value="${escapeAttr(p.name)}" style="flex:2;">
          <input type="text" class="p-category" placeholder="Category" value="${escapeAttr(p.category)}" style="flex:1;">
        </div>
        <input type="text" class="p-tagline" placeholder="Tagline" value="${escapeAttr(p.tagline)}">
        <textarea class="p-shortDesc" placeholder="Short description" rows="2">${escapeHtml(p.shortDesc)}</textarea>
        <textarea class="p-fullDesc" placeholder="Full description" rows="3">${escapeHtml(p.fullDesc)}</textarea>
        <div class="field-label">Video (paste a YouTube/Vimeo embed URL, or upload a short clip — large videos may not save, see note below)</div>
        <input type="text" class="p-videoUrl" placeholder="Video embed URL (optional)" value="${escapeAttr(p.videoUrl || '')}">
        <input type="file" class="p-videoFile" accept="video/*" style="margin-top:6px;">
        <div class="field-label" style="margin-top:10px;">Images</div>
        <div class="rr-images">
          ${(p.images || []).map((src, i) => `<div class="img-row"><img src="${src}" alt=""><input type="text" class="p-image" value="${escapeAttr(src)}" placeholder="Image URL"><input type="file" class="p-image-file" accept="image/*"><button type="button" class="rr-remove img-remove">✕</button></div>`).join('')}
        </div>
        <button type="button" class="btn btn-outline-navy add-image-btn" style="padding:8px 16px; font-size:0.8rem;">+ Add Image</button>
        <div class="rr-checks">
          <label><input type="checkbox" class="p-featured" ${p.featured ? 'checked' : ''}> Featured</label>
          <label><input type="checkbox" class="p-popular" ${p.popular ? 'checked' : ''}> Popular</label>
          <label><input type="checkbox" class="p-comingSoon" ${p.comingSoon ? 'checked' : ''}> Coming Soon</label>
        </div>
      </div>
      <button type="button" class="rr-remove" aria-label="Remove product">✕</button>`;

    row.querySelector('.rr-remove').addEventListener('click', () => row.remove());
    row.querySelector('.add-image-btn').addEventListener('click', () => {
      const div = document.createElement('div');
      div.className = 'img-row';
      div.innerHTML = `<img src="" alt=""><input type="text" class="p-image" value="" placeholder="Image URL"><input type="file" class="p-image-file" accept="image/*"><button type="button" class="rr-remove img-remove">✕</button>`;
      wireImageRow(div);
      row.querySelector('.rr-images').appendChild(div);
    });
    function wireImageRow(div) {
      div.querySelector('.img-remove').addEventListener('click', () => div.remove());
      div.querySelector('.p-image').addEventListener('input', (e) => { div.querySelector('img').src = e.target.value; });
      div.querySelector('.p-image-file').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) { toast('Please choose an image under 2MB'); return; }
        const reader = new FileReader();
        reader.onload = () => { div.querySelector('img').src = reader.result; div.querySelector('.p-image').value = reader.result; };
        reader.readAsDataURL(file);
      });
    }
    row.querySelectorAll('.img-row').forEach(wireImageRow);
    row.querySelector('.p-videoFile').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 4 * 1024 * 1024) { toast('Video too large for browser storage — use a YouTube/Vimeo link instead'); e.target.value = ''; return; }
      const reader = new FileReader();
      reader.onload = () => { row.querySelector('.p-videoUrl').value = reader.result; toast('Video attached'); };
      reader.readAsDataURL(file);
    });
    return row;
  }
  document.getElementById('add-product').addEventListener('click', () => document.getElementById('products-list').appendChild(productRow()));
  function readProductsList() {
    return Array.from(document.querySelectorAll('#products-list .repeater-row')).map(row => ({
      id: row.dataset.id,
      name: row.querySelector('.p-name').value.trim(),
      category: row.querySelector('.p-category').value.trim(),
      tagline: row.querySelector('.p-tagline').value.trim(),
      shortDesc: row.querySelector('.p-shortDesc').value.trim(),
      fullDesc: row.querySelector('.p-fullDesc').value.trim(),
      videoUrl: row.querySelector('.p-videoUrl').value.trim(),
      images: Array.from(row.querySelectorAll('.p-image')).map(i => i.value.trim()).filter(Boolean),
      featured: row.querySelector('.p-featured').checked,
      popular: row.querySelector('.p-popular').checked,
      comingSoon: row.querySelector('.p-comingSoon').checked
    })).filter(p => p.name);
  }

  /* ---------- Testimonials repeater ---------- */
  function renderTestimonialsList(list) {
    const wrap = document.getElementById('testimonials-list');
    wrap.innerHTML = '';
    list.forEach(t => wrap.appendChild(testimonialRow(t)));
  }
  function testimonialRow(t) {
    t = t || { name: '', city: '', rating: 5, review: '' };
    const row = document.createElement('div');
    row.className = 'repeater-row';
    row.innerHTML = `
      <div class="rr-fields" style="flex:1;">
        <div class="rr-fields row">
          <input type="text" class="t-name" placeholder="Customer name" value="${escapeAttr(t.name)}" style="flex:1;">
          <input type="text" class="t-city" placeholder="City" value="${escapeAttr(t.city)}" style="flex:1;">
          <input type="number" class="t-rating" min="1" max="5" value="${t.rating}" style="width:80px; flex:none;">
        </div>
        <textarea class="t-review" placeholder="Review" rows="2">${escapeHtml(t.review)}</textarea>
      </div>
      <button type="button" class="rr-remove" aria-label="Remove testimonial">✕</button>`;
    row.querySelector('.rr-remove').addEventListener('click', () => row.remove());
    return row;
  }
  document.getElementById('add-testimonial').addEventListener('click', () => document.getElementById('testimonials-list').appendChild(testimonialRow()));
  function readTestimonialsList() {
    return Array.from(document.querySelectorAll('#testimonials-list .repeater-row')).map(row => ({
      name: row.querySelector('.t-name').value.trim(),
      city: row.querySelector('.t-city').value.trim(),
      rating: Math.min(5, Math.max(1, parseInt(row.querySelector('.t-rating').value, 10) || 5)),
      review: row.querySelector('.t-review').value.trim()
    })).filter(t => t.name && t.review);
  }

  /* ---------- Hero slideshow repeater ---------- */
  function renderHeroSlidesList(slides) {
    const wrap = document.getElementById('hero-slides-list');
    wrap.innerHTML = '';
    slides.forEach(src => wrap.appendChild(heroSlideRow(src)));
  }
  function heroSlideRow(src = '') {
    const row = document.createElement('div');
    row.className = 'repeater-row';
    row.innerHTML = `
      <div class="rr-images" style="flex:1;">
        <div class="img-row">
          <img src="${escapeAttr(src)}" alt="">
          <input type="text" class="hs-url" value="${escapeAttr(src)}" placeholder="Image URL">
          <input type="file" class="hs-file" accept="image/*" style="width:auto;">
        </div>
      </div>
      <button type="button" class="rr-remove" aria-label="Remove slide">✕</button>`;
    row.querySelector('.rr-remove').addEventListener('click', () => row.remove());
    const img = row.querySelector('img');
    row.querySelector('.hs-url').addEventListener('input', (e) => { img.src = e.target.value; });
    row.querySelector('.hs-file').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => { img.src = reader.result; row.querySelector('.hs-url').value = reader.result; };
      reader.readAsDataURL(file);
    });
    return row;
  }
  document.getElementById('add-hero-slide').addEventListener('click', () => document.getElementById('hero-slides-list').appendChild(heroSlideRow()));
  function readHeroSlidesList() {
    return Array.from(document.querySelectorAll('#hero-slides-list .hs-url')).map(i => i.value.trim()).filter(Boolean);
  }

  /* ---------- Photo uploads (who-we-are / founder / CEO) — save immediately ---------- */
  function wirePhotoUpload(fileId, previewId, aboutField) {
    document.getElementById(fileId).addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      if (file.size > 3 * 1024 * 1024) { toast('Please choose an image under 3MB'); return; }
      const reader = new FileReader();
      reader.onload = () => {
        const about = CMS.getAbout();
        about[aboutField] = reader.result;
        CMS.setAbout(about);
        document.getElementById(previewId).src = reader.result;
        toast('Photo updated');
      };
      reader.readAsDataURL(file);
    });
  }
  wirePhotoUpload('a-whoImage1-file', 'a-whoImage1-preview', 'whoImage1');
  wirePhotoUpload('a-whoImage2-file', 'a-whoImage2-preview', 'whoImage2');
  wirePhotoUpload('a-founderImage-file', 'a-founderImage-preview', 'founderImage');
  wirePhotoUpload('a-ceoImage-file', 'a-ceoImage-preview', 'ceoImage');

  /* ---------- Messages inbox ---------- */
  function renderMessages() {
    const list = CMS.getMessages();
    const wrap = document.getElementById('messages-list');
    const empty = document.getElementById('messages-empty');
    const badge = document.getElementById('msg-badge');
    wrap.innerHTML = '';
    const unread = list.filter(m => !m.read).length;
    if (unread > 0) { badge.textContent = unread; badge.hidden = false; } else { badge.hidden = true; }
    empty.hidden = list.length > 0;
    list.forEach(m => {
      const card = document.createElement('div');
      card.className = 'msg-card' + (m.read ? '' : ' unread');
      const dt = new Date(m.date);
      card.innerHTML = `
        <div class="msg-top">
          <div><span class="who">${escapeHtml(m.name)}</span> <span class="msg-meta">${escapeHtml(m.email)} &middot; ${escapeHtml(m.phone)}</span></div>
          <span class="msg-meta">${dt.toLocaleDateString()} ${dt.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
        </div>
        <div class="msg-subject">${escapeHtml(m.subject)}</div>
        <div class="msg-body">${escapeHtml(m.message)}</div>
        <div class="msg-actions">
          <button type="button" class="msg-toggle-read">${m.read ? 'Mark Unread' : 'Mark Read'}</button>
          <button type="button" class="msg-delete">Delete</button>
        </div>`;
      card.querySelector('.msg-toggle-read').addEventListener('click', () => {
        const all = CMS.getMessages();
        const item = all.find(x => x.id === m.id);
        if (item) { item.read = !item.read; CMS.setMessages(all); renderMessages(); }
      });
      card.querySelector('.msg-delete').addEventListener('click', () => {
        CMS.setMessages(CMS.getMessages().filter(x => x.id !== m.id));
        renderMessages();
      });
      wrap.appendChild(card);
    });
  }

  /* ---------- Logo upload ---------- */
  document.getElementById('b-logo-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast('Please choose an image under 2MB'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const site = CMS.getSite();
      site.logo = reader.result;
      CMS.setSite(site);
      document.getElementById('b-logo-preview').src = reader.result;
      toast('Logo updated');
    };
    reader.readAsDataURL(file);
  });

  /* ---------- Save handlers ---------- */
  document.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const type = btn.dataset.save;
      let ok = true;
      if (type === 'home') {
        ok = CMS.setHome(Object.assign(CMS.getHome(), {
          heroEyebrow: val('h-heroEyebrow'), heroHeadlinePrefix: val('h-heroHeadlinePrefix'),
          heroHeadlineAccent: val('h-heroHeadlineAccent'), heroHeadlineSuffix: val('h-heroHeadlineSuffix'),
          heroSub: val('h-heroSub'), messageQuote: val('h-messageQuote'),
          introHeading: val('h-introHeading'), introText: val('h-introText'),
          storyPreview: val('h-storyPreview'),
          statCustomers: numVal('h-statCustomers'), statArea: val('h-statArea'),
          statYears: numVal('h-statYears'), statSatisfaction: numVal('h-statSatisfaction')
        })) && ok;
        ok = CMS.setWhy(readSimpleList('why-list')) && ok;
        ok = CMS.setHeroSlides(readHeroSlidesList()) && ok;
        toast(ok ? 'Home page saved' : 'Save failed — see note below');
      } else if (type === 'about') {
        ok = CMS.setAbout(Object.assign(CMS.getAbout(), {
          whoWeAreText: val('a-whoWeAreText'), sinceYear: val('a-sinceYear'),
          aboutText1: val('a-aboutText1'), aboutText2: val('a-aboutText2'),
          founderName: val('a-founderName'), founderQuote: val('a-founderQuote'),
          ceoName: val('a-ceoName'), ceoQuote: val('a-ceoQuote'),
          missionText: val('a-missionText'), visionText: val('a-visionText'),
          storyFull: val('a-storyFull'), recentProjectsText: val('a-recentProjectsText')
        })) && ok;
        ok = CMS.setServices(readSimpleList('services-list')) && ok;
        ok = CMS.setProcess(readSimpleList('process-list')) && ok;
        ok = CMS.setValues(readValuesList()) && ok;
        toast(ok ? 'About page saved' : 'Save failed — see note below');
      } else if (type === 'products') {
        ok = CMS.setProducts(readProductsList());
        toast(ok ? 'Products saved' : 'Save failed — see note below');
      } else if (type === 'testimonials') {
        ok = CMS.setTestimonials(readTestimonialsList());
        toast(ok ? 'Testimonials saved' : 'Save failed — see note below');
      } else if (type === 'site') {
        const site = CMS.getSite();
        site.phone = val('s-phone'); site.whatsapp = val('s-whatsapp');
        site.email = val('s-email'); site.address = val('s-address');
        ok = CMS.setSite(site);
        toast(ok ? 'Contact details saved' : 'Save failed — see note below');
      } else if (type === 'branding') {
        const site = CMS.getSite();
        site.siteName = val('b-siteName'); site.tagline = val('b-tagline'); site.navText = val('b-navText');
        site.social = { facebook: val('b-facebook'), twitter: val('b-twitter'), tiktok: val('b-tiktok'), instagram: val('b-instagram') };
        site.welcomeEnabled = document.getElementById('b-welcomeEnabled').checked;
        site.welcomeTitle = val('b-welcomeTitle');
        site.welcomeMessage = val('b-welcomeMessage');
        ok = CMS.setSite(site);
        toast(ok ? 'Branding saved' : 'Save failed — see note below');
      } else if (type === 'account') {
        const errBox = document.getElementById('account-error');
        errBox.textContent = '';
        const newUser = val('acc-username');
        const p1 = document.getElementById('acc-password').value;
        const p2 = document.getElementById('acc-password-confirm').value;
        const newQuestion = val('acc-question');
        const newAnswer = val('acc-answer');
        if (!newUser) { errBox.textContent = 'Username cannot be empty.'; return; }
        if (p1 && p1 !== p2) { errBox.textContent = 'New passwords do not match.'; return; }
        if (p1 && p1.length < 6) { errBox.textContent = 'Password must be at least 6 characters.'; return; }
        const creds = CMS.getCredentials();
        creds.username = newUser;
        creds.securityQuestion = newQuestion || creds.securityQuestion;
        if (p1) creds.passwordHash = await CMS.sha256(p1);
        if (newAnswer) creds.securityAnswerHash = await CMS.sha256(newAnswer.trim().toLowerCase());
        ok = CMS.setCredentials(creds);
        document.getElementById('acc-password').value = '';
        document.getElementById('acc-password-confirm').value = '';
        document.getElementById('acc-answer').value = '';
        toast(ok ? 'Account & security settings saved' : 'Save failed — see note below');
      }
      if (!ok) {
        console.error('A1 CMS: a localStorage write failed. This usually means the browser is blocking storage (private/incognito mode, storage disabled in settings, or the site opened directly from a file:// path instead of a local server). Try serving the folder via a local server and allowing site data.');
      }
    });
  });

  function val(id) { return document.getElementById(id).value.trim(); }
  function numVal(id) { return parseInt(document.getElementById(id).value, 10) || 0; }
  function escapeAttr(s) { return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;'); }
  function escapeHtml(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
});
