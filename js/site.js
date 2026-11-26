/* Shared behaviour: light/dark switch, mobile menu, social links, copy buttons, work filter. No animation. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;

  /* Social profiles: paste the full profile addresses here and every icon on every page starts working.
     Until a link is set, the icons are inert. Example: instagram: 'https://www.instagram.com/yourhandle' */
  const SOCIAL = {
    instagram: '',
    facebook: 'https://www.facebook.com/profile.php?id=61597100485563',
  };
  $$('[data-social]').forEach((a) => {
    const url = SOCIAL[a.dataset.social];
    if (url) { a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; }
    else { a.title = 'Link coming soon'; a.addEventListener('click', (e) => e.preventDefault()); }
  });

  /* Light / dark: follows the system setting until the visitor uses the switch, then remembers the choice. */
  const effective = () => root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const labelSwitch = () => $$('[data-theme-toggle]').forEach((b) => b.setAttribute('aria-label', effective() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'));
  $$('[data-theme-toggle]').forEach((b) => b.addEventListener('click', () => {
    const next = effective() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('afx-theme', next); } catch {}
    labelSwitch();
  }));
  matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', labelSwitch);
  labelSwitch();

  const yr = $('#yr');
  if (yr) yr.textContent = new Date().getFullYear();

  const menu = $('#menuBtn');
  const setMenu = (open) => {
    root.classList.toggle('menu-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  if (menu) {
    menu.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  }

  // copy buttons: <button data-copy="elementId">
  $$('[data-copy]').forEach((btn) => btn.addEventListener('click', () => {
    const el = document.getElementById(btn.dataset.copy);
    const old = btn.textContent;
    const done = (msg) => { btn.textContent = msg; setTimeout(() => { btn.textContent = old; }, 1500); };
    const select = () => {
      const r = document.createRange(); r.selectNodeContents(el);
      const s = getSelection(); s.removeAllRanges(); s.addRange(r); done('Selected');
    };
    try { navigator.clipboard.writeText(el.textContent.trim()).then(() => done('Copied'), select); } catch { select(); }
  }));

  // work page: filter the project cards by category
  const chips = $$('[data-cat]');
  if (chips.length) {
    chips.forEach((chip) => chip.addEventListener('click', () => {
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      $$('.proj').forEach((p) => { p.hidden = chip.dataset.cat !== 'all' && p.dataset.cat !== chip.dataset.cat; });
    }));
  }
})();
