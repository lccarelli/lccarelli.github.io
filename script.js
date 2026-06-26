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
})();
