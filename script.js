// Laura Carelli — snack-factory — site interactions

(function () {
  'use strict';

  const LANG_KEY = 'lc-lang';
  const THEME_KEY = 'lc-theme';
  const body = document.body;

  /* ---------- Language ---------- */
  function initialLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === 'es' || saved === 'en') return saved;
    return (navigator.language || 'es').toLowerCase().startsWith('en') ? 'en' : 'es';
  }

  function applyLang(lang) {
    body.setAttribute('data-lang', lang);
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-' + lang + ']').forEach(function (el) {
      const val = el.getAttribute('data-' + lang);
      if (val === null) return;
      if (el.tagName === 'META') el.setAttribute('content', val);
      else el.textContent = val;
    });
    localStorage.setItem(LANG_KEY, lang);
  }

  function toggleLang() {
    applyLang(body.getAttribute('data-lang') === 'es' ? 'en' : 'es');
  }

  /* ---------- Theme ---------- */
  function initialTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    const prefersLight = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  function toggleTheme() {
    applyTheme(body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  }

  /* ---------- Wire up ---------- */
  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.addEventListener('click', toggleLang);

  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  applyTheme(initialTheme());
  applyLang(initialLang());

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Easter egg: Konami code → serve a snack ---------- */
  const SEQUENCE = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  const MESSAGES = {
    es: '🍪 snack servido — encontraste el menú secreto',
    en: '🍪 snack served — you found the secret menu'
  };
  const toast = document.getElementById('snack-toast');
  let pos = 0;
  let hideTimer = null;

  function serveSnack() {
    if (!toast) return;
    const lang = body.getAttribute('data-lang') === 'en' ? 'en' : 'es';
    toast.querySelector('.snack-toast-text').textContent = MESSAGES[lang];
    toast.hidden = false;
    void toast.offsetWidth;            // reflow so the transition runs
    toast.classList.add('show');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.hidden = true; }, 450);
    }, 3200);
  }

  document.addEventListener('keydown', function (e) {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    pos = (key === SEQUENCE[pos]) ? pos + 1 : (key === SEQUENCE[0] ? 1 : 0);
    if (pos === SEQUENCE.length) { pos = 0; serveSnack(); }
  });
})();
