/* LMAIL interface layer for Mautic.
 * 1. Regroups the sidebar into a short, task-based menu (nothing is removed: the rest lives under "More").
 * 2. Adds a home header with quick actions to the dashboard.
 * 3. Adds the AI email writer to the email editor.
 * Everything here is progressive: if an element is missing, that part is skipped. */
(function () {
  'use strict';
  var cfg = window.LMAIL || {};

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'text') n.textContent = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  /* ---------- 1. Sidebar ---------- */
  var MENU = [
    { items: [['mautic_dashboard_index', 'Home', 'ri-home-5-line']] },
    { label: 'Audience', items: [
      ['mautic_contact_index', 'Contacts', 'ri-group-line'],
      ['mautic_segment_index', 'Lists & segments', 'ri-pie-chart-2-line']] },
    { label: 'Send', items: [
      ['mautic_email_index', 'Emails', 'ri-mail-send-line'],
      ['mautic_campaign_index', 'Automations', 'ri-flow-chart'],
      ['mautic_form_index', 'Sign-up forms', 'ri-survey-line'],
      ['mautic_page_index', 'Landing pages', 'ri-layout-4-line']] },
    { label: 'Measure', items: [['mautic_report_index', 'Reports', 'ri-bar-chart-box-line']] }
  ];

  function regroupMenu() {
    var nav = document.querySelector('.nav-sidebar > ul.nav');
    if (!nav || nav.getAttribute('data-lmail')) return;
    nav.setAttribute('data-lmail', '1');

    var frag = document.createDocumentFragment();
    MENU.forEach(function (group) {
      var added = false;
      group.items.forEach(function (it) {
        var a = document.getElementById(it[0]);
        if (!a) return;
        var li = a.closest('li');
        if (group.label && !added) frag.appendChild(el('li', { class: 'lmail-nav-label', text: group.label }));
        added = true;
        var name = a.querySelector('.nav-item-name');
        if (name) name.textContent = it[1];
        var icon = a.querySelector('.icon');
        if (!icon) { icon = el('span', {}); a.insertBefore(icon, a.firstChild); }
        icon.className = 'icon pull-left fa ' + it[2];
        li.className = 'nav-group lmail-nav-main';
        frag.appendChild(li);
      });
    });

    // Everything else stays available under a collapsed "More" group.
    var moreList = el('ul', { class: 'nav lmail-nav-more-list' });
    Array.prototype.slice.call(nav.children).forEach(function (li) {
      var a = li.querySelector('a');
      if (a && /mau\.tc/.test(a.getAttribute('href') || '')) { li.remove(); return; }
      if (li.querySelector('ul') && !li.querySelector('ul li')) { li.remove(); return; } // emptied parent
      moreList.appendChild(li);
    });
    var toggle = el('button', { type: 'button', class: 'lmail-nav-more-toggle', 'aria-expanded': 'false' }, [
      el('span', { class: 'icon pull-left fa ri-more-2-line' }), el('span', { text: 'More' })
    ]);
    var more = el('li', { class: 'lmail-nav-more' }, [toggle, moreList]);
    if (moreList.querySelector('li.active, li.open')) { more.classList.add('is-open'); toggle.setAttribute('aria-expanded', 'true'); }
    toggle.addEventListener('click', function () {
      var open = more.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    nav.innerHTML = '';
    nav.appendChild(frag);
    if (moreList.children.length) nav.appendChild(more);
  }

  /* ---------- 2. Home header on the dashboard ---------- */
  function greeting() {
    var h = new Date().getHours();
    var part = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
    return cfg.firstName ? part + ', ' + cfg.firstName : part;
  }

  function homeHeader() {
    var body = document.querySelector('.content-body.s-dashboard, .s-dashboard');
    if (!body || document.querySelector('.lmail-home')) return;
    function card(href, icon, title, text, primary) {
      return el('a', { href: href, 'data-toggle': 'ajax', class: 'lmail-home-card' + (primary ? ' is-primary' : '') }, [
        el('span', { class: 'lmail-home-icon ' + icon }),
        el('span', { class: 'lmail-home-title', text: title }),
        el('span', { class: 'lmail-home-text', text: text })
      ]);
    }
    var home = el('section', { class: 'lmail-home' }, [
      el('div', { class: 'lmail-home-head' }, [
        el('h1', { text: greeting() }),
        el('p', { text: 'What would you like to do today?' })
      ]),
      el('div', { class: 'lmail-home-cards' }, [
        card('/s/emails/new?lmail_ai=1', 'ri-sparkling-2-line', 'Write an email with AI', 'Describe it in a sentence and get a ready draft.', true),
        card('/s/contacts/import/new', 'ri-upload-cloud-2-line', 'Import contacts', 'Bring in a spreadsheet of subscribers.'),
        card('/s/campaigns/new', 'ri-flow-chart', 'Build an automation', 'Welcome series, follow-ups and win-backs.')
      ])
    ]);
    var pageHeader = document.querySelector('#app-content .page-header');
    (pageHeader || body).parentNode.insertBefore(home, pageHeader || body);
    document.body.classList.add('lmail-on-home');
  }

  /* ---------- 3. AI email writer ---------- */
  var TONES = ['Friendly', 'Professional', 'Playful', 'Urgent', 'Warm and personal'];

  var BRAND_KEY = 'lmail.brand';
  function loadBrand() {
    try { return JSON.parse(localStorage.getItem(BRAND_KEY) || '{}') || {}; } catch (e) { return {}; }
  }
  function saveBrand(brand) {
    try { localStorage.setItem(BRAND_KEY, JSON.stringify(brand)); } catch (e) { /* storage is optional */ }
  }

  // Uploads one image through Mautic's own media upload and returns its address.
  function uploadImage(file) {
    var data = new FormData();
    data.append('files[]', file);
    return fetch('/s/grapesjsbuilder/upload', {
      method: 'POST', credentials: 'same-origin', body: data,
      headers: { 'X-Requested-With': 'XMLHttpRequest', 'X-CSRF-Token': window.mauticAjaxCsrf || '' }
    }).then(function (r) {
      if (!r.ok) throw new Error('That image could not be uploaded. Use a JPG or PNG under 2 MB.');
      return r.json();
    }).then(function (res) {
      var url = res && res.data && res.data[0];
      if (!url) throw new Error('That image could not be uploaded. Use a JPG or PNG under 2 MB.');
      return url;
    });
  }

  // A small "choose image" control with a preview and a remove button.
  function imagePicker(id, label, hint, initial, onChange) {
    var url = initial || '';
    var input = el('input', { type: 'file', id: id, accept: 'image/png,image/jpeg,image/gif,image/webp', class: 'lmail-ai-file' });
    var choose = el('label', { for: id, class: 'lmail-ai-choose', text: 'Choose image' });
    var thumb = el('img', { alt: '', class: 'lmail-ai-thumb' });
    var remove = el('button', { type: 'button', class: 'lmail-ai-remove', text: 'Remove' });
    var note = el('small', { text: hint });
    function paint() {
      thumb.hidden = !url; remove.hidden = !url;
      if (url) thumb.src = url;
      choose.textContent = url ? 'Change image' : 'Choose image';
    }
    input.addEventListener('change', function () {
      var file = input.files && input.files[0];
      if (!file) return;
      note.className = ''; note.textContent = 'Uploading...';
      uploadImage(file).then(function (u) { url = u; note.textContent = hint; onChange(url); paint(); })
        .catch(function (err) { note.className = 'is-error'; note.textContent = err.message; })
        .then(function () { input.value = ''; });
    });
    remove.addEventListener('click', function () { url = ''; onChange(''); paint(); });
    paint();
    return {
      node: el('div', { class: 'lmail-ai-field' }, [
        el('span', { class: 'lmail-ai-label', text: label }),
        el('div', { class: 'lmail-ai-picker' }, [thumb, choose, input, remove]),
        note
      ]),
      value: function () { return url; }
    };
  }

  function aiModal() {
    var existing = document.getElementById('lmail-ai');
    if (existing) { existing.classList.add('is-open'); existing.querySelector('textarea').focus(); return; }

    var saved = loadBrand();
    var brief = el('textarea', { id: 'lmail-ai-brief', rows: '4', maxlength: '2000', placeholder: 'e.g. Welcome new subscribers to my bakery and tell them we bake fresh every morning.' });
    var tone = el('select', { id: 'lmail-ai-tone' }, TONES.map(function (t) { return el('option', { value: t, text: t }); }));
    var brand = el('input', { id: 'lmail-ai-brand', type: 'text', maxlength: '120', placeholder: 'Your business name' });
    brand.value = saved.name || '';
    var color = el('input', { id: 'lmail-ai-color', type: 'color', class: 'lmail-ai-color' });
    color.value = /^#[0-9a-fA-F]{6}$/.test(saved.color || '') ? saved.color : '#244697';
    var logo = imagePicker('lmail-ai-logo', 'Logo', 'Shown at the top of every email. Saved for next time.', saved.logo, remember);
    var photo = imagePicker('lmail-ai-photo', 'Photo (optional)', 'A wide picture for the top of this email.', '', function () {});
    var status = el('p', { class: 'lmail-ai-status', role: 'status', 'aria-live': 'polite' });
    var preview = el('div', { class: 'lmail-ai-preview', hidden: 'hidden' });
    var go = el('button', { type: 'button', class: 'btn btn-primary lmail-ai-go', text: 'Write my email' });
    var use = el('button', { type: 'button', class: 'btn btn-primary lmail-ai-use', text: 'Use this draft', hidden: 'hidden' });
    var close = el('button', { type: 'button', class: 'lmail-ai-close', 'aria-label': 'Close', html: '&times;' });
    var draft = null;

    function remember() { saveBrand({ name: brand.value.trim(), color: color.value, logo: logo.value() }); }
    brand.addEventListener('change', remember);
    color.addEventListener('change', remember);

    function field(label, forId, input, hint) {
      return el('div', { class: 'lmail-ai-field' }, [
        el('label', { for: forId, text: label }), input, hint ? el('small', { text: hint }) : null
      ]);
    }

    var dialog = el('div', { class: 'lmail-ai-dialog', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'lmail-ai-title' }, [
      close,
      el('div', { class: 'lmail-ai-form' }, [
        el('p', { class: 'lmail-ai-kicker', html: '<i class="ri-sparkling-2-fill"></i> AI writer' }),
        el('h2', { id: 'lmail-ai-title', text: 'What is this email about?' }),
        field('Describe your email', 'lmail-ai-brief', brief, 'Include any offer, date or detail you want mentioned. The AI will not make facts up.'),
        el('div', { class: 'lmail-ai-row' }, [field('Tone', 'lmail-ai-tone', tone), field('Brand colour', 'lmail-ai-color', color)]),
        el('p', { class: 'lmail-ai-section', text: 'Your brand' }),
        field('Business name', 'lmail-ai-brand', brand),
        el('div', { class: 'lmail-ai-row' }, [logo.node, photo.node]),
        status,
        el('div', { class: 'lmail-ai-actions' }, [go, use])
      ]),
      preview
    ]);
    var wrap = el('div', { id: 'lmail-ai', class: 'lmail-ai is-open' }, [dialog]);
    document.body.appendChild(wrap);

    function hide() { wrap.classList.remove('is-open'); }
    close.addEventListener('click', hide);
    wrap.addEventListener('mousedown', function (e) { if (e.target === wrap) hide(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && wrap.classList.contains('is-open')) hide(); });

    go.addEventListener('click', function () {
      var text = brief.value.trim();
      if (!text) { status.textContent = 'Tell the AI writer what the email is about.'; status.className = 'lmail-ai-status is-error'; brief.focus(); return; }
      remember();
      go.disabled = true; use.hidden = true;
      go.textContent = 'Writing...';
      status.className = 'lmail-ai-status'; status.textContent = 'This usually takes a few seconds.';
      preview.hidden = false; preview.innerHTML = '<div class="lmail-ai-skeleton"><span></span><span></span><span></span><span></span></div>';

      fetch('/s/lmail/ai/draft', {
        method: 'POST', credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest', 'X-CSRF-Token': window.mauticAjaxCsrf || '' },
        body: JSON.stringify({ brief: text, tone: tone.value, brand: brand.value, color: color.value, logo: logo.value(), photo: photo.value() })
      }).then(function (r) {
        return r.json().catch(function () { return { error: 'The AI writer returned an unexpected response.' }; })
          .then(function (data) { return { ok: r.ok, data: data }; });
      }).then(function (res) {
        if (!res.ok || res.data.error || !res.data.html) throw new Error(res.data.error || 'Something went wrong. Refresh the page and try again.');
        draft = res.data;
        preview.innerHTML = '';
        preview.appendChild(el('p', { class: 'lmail-ai-subject-label', text: 'Subject' }));
        preview.appendChild(el('p', { class: 'lmail-ai-subject', text: draft.subject }));
        var frame = el('iframe', { title: 'Email preview', sandbox: '' });
        // In the preview only, show the merge fields the way a subscriber would see them.
        frame.srcdoc = draft.html
          .replace(/\{contactfield=firstname\}/g, cfg.firstName || 'there')
          .replace(/\{unsubscribe_text\}/g, 'Unsubscribe');
        preview.appendChild(frame);
        status.textContent = 'Here is your draft. You can edit everything after you use it.';
        go.textContent = 'Try again';
        use.hidden = false;
      }).catch(function (err) {
        preview.hidden = true; preview.innerHTML = '';
        status.className = 'lmail-ai-status is-error'; status.textContent = err.message;
        go.textContent = 'Write my email';
      }).then(function () { go.disabled = false; });
    });

    use.addEventListener('click', function () {
      if (!draft) return;
      function set(id, value, onlyIfEmpty) {
        var f = document.getElementById(id);
        if (!f || (onlyIfEmpty && f.value)) return;
        f.value = value;
        f.dispatchEvent(new Event('change', { bubbles: true }));
      }
      set('emailform_subject', draft.subject);
      set('emailform_name', draft.subject, true);
      set('emailform_preheaderText', draft.preheader);
      set('emailform_customHtml', draft.html);
      set('emailform_plainText', draft.plainText);
      // Use the code-mode theme so the email is saved exactly as drafted.
      var theme = document.getElementById('emailform_template');
      if (theme && theme.querySelector('option[value="mautic_code_mode"]')) {
        theme.value = 'mautic_code_mode';
        theme.dispatchEvent(new Event('change', { bubbles: true }));
      }
      hide();
      var note = document.getElementById('lmail-ai-applied') || el('div', { id: 'lmail-ai-applied', class: 'lmail-ai-applied', role: 'status' });
      note.textContent = 'AI draft added. Review the subject, then press Save. Open the Builder to edit the design.';
      var tabs = document.querySelector('#app-content .content-body') || document.getElementById('app-content');
      if (tabs && !note.parentNode) tabs.insertBefore(note, tabs.firstChild);
    });

    brief.focus();
  }

  function aiButton() {
    if (!document.getElementById('emailform_subject')) return;
    var bar = document.querySelector('#toolbar .toolbar-form-buttons .toolbar-standard') || document.querySelector('#toolbar .toolbar-form-buttons');
    if (bar && !document.getElementById('lmail-ai-open')) {
      var btn = el('button', { type: 'button', id: 'lmail-ai-open', class: 'btn btn-nospin lmail-ai-open', html: '<i class="ri-sparkling-2-fill"></i> Write with AI' });
      btn.addEventListener('click', aiModal);
      bar.insertBefore(btn, bar.firstChild);
    }
    if (/[?&]lmail_ai=1/.test(location.search) && !document.body.getAttribute('data-lmail-ai-auto')) {
      document.body.setAttribute('data-lmail-ai-auto', '1');
      // Mautic first asks which kind of email to create; pick the newsletter kind, then open the writer.
      if (window.Mautic && typeof Mautic.selectEmailType === 'function') {
        try { Mautic.selectEmailType('list'); } catch (e) { /* the type picker is optional */ }
      }
      setTimeout(aiModal, 350);
    }
  }

  /* ---------- hide Mautic's "ProTip" lines ---------- */
  function hideTips() {
    var marks = document.querySelectorAll('#app-content span.fw-b, #app-content strong');
    for (var i = 0; i < marks.length; i++) {
      if (/^ProTip!?$/.test(marks[i].textContent.trim())) {
        var box = marks[i].closest('.text-muted') || marks[i].parentNode;
        if (box) box.classList.add('lmail-hidden');
      }
    }
  }

  /* ---------- run on load and after Mautic's in-page navigation ---------- */
  function run() {
    regroupMenu();
    hideTips();
    if (!document.querySelector('.s-dashboard')) document.body.classList.remove('lmail-on-home');
    homeHeader();
    aiButton();
  }

  function start() {
    run();
    var target = document.getElementById('app-content');
    if (target && window.MutationObserver) {
      var queued = false;
      new MutationObserver(function () {
        if (queued) return;
        queued = true;
        // same frame as the content change, so the greeting and menu never pop in late
        (window.queueMicrotask || setTimeout)(function () { queued = false; run(); });
      }).observe(target, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
