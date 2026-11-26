/* Estimate form. Nothing is sent to a server: the buttons open the visitor's own
   text-message or email app with the message already written. */
(() => {
  'use strict';
  const PHONE = '+14164359967', EMAIL = 'afxdevelopments@gmail.com';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const form = $('#qf');
  const val = (id) => $('#' + id).value.trim();

  function message() {
    const picked = $$('input[name="trade"]:checked', form).map((c) => c.dataset.label);
    const L = ['Hi AFX Island Developments, I’d like a free estimate.', ''];
    if (val('name')) L.push('Name: ' + val('name'));
    if (val('phone')) L.push('Phone: ' + val('phone'));
    if (val('email')) L.push('Email: ' + val('email'));
    if (val('area')) L.push('Location: ' + val('area'));
    if (picked.length) L.push('Project: ' + picked.join(', '));
    if (val('when')) L.push('Timing: ' + val('when'));
    L.push('', 'Details:', val('desc'), '', 'I can send photos if that helps.');
    return {
      text: L.join('\n'),
      subject: 'Estimate request' + (picked.length ? ' – ' + picked.join(', ') : '') + (val('name') ? ' – ' + val('name') : ''),
    };
  }

  const preview = $('#preview');
  const render = () => { preview.textContent = message().text; };

  function fail(id, msg) {
    $('#' + id).setAttribute('aria-invalid', 'true');
    $('#er-' + id).textContent = msg;
  }
  function validate() {
    ['desc', 'name', 'email'].forEach((id) => { $('#' + id).removeAttribute('aria-invalid'); $('#er-' + id).textContent = ''; });
    const bad = [];
    if (!val('desc')) { fail('desc', 'Please add a short description so we know what the job is.'); bad.push('desc'); }
    if (!val('name')) { fail('name', 'Please tell us your name.'); bad.push('name'); }
    if (val('email') && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val('email'))) { fail('email', 'That email doesn’t look right.'); bad.push('email'); }
    if (bad.length) { $('#' + bad[0]).focus(); return false; }
    return true;
  }

  form.addEventListener('input', (e) => {
    if (e.target.id && $('#er-' + e.target.id)) { e.target.removeAttribute('aria-invalid'); $('#er-' + e.target.id).textContent = ''; }
    render();
  });
  form.addEventListener('submit', (e) => e.preventDefault());
  $$('[data-send]').forEach((btn) => btn.addEventListener('click', () => {
    if (!validate()) return;
    const m = message();
    window.location.href = btn.dataset.send === 'sms'
      ? `sms:${PHONE}?&body=${encodeURIComponent(m.text)}`
      : `mailto:${EMAIL}?subject=${encodeURIComponent(m.subject)}&body=${encodeURIComponent(m.text)}`;
  }));

  // links from the services and work pages arrive as quote.html?trade=interior,flooring
  const want = (new URLSearchParams(location.search).get('trade') || '').split(',');
  $$('input[name="trade"]', form).forEach((c) => { if (want.includes(c.value)) c.checked = true; });
  render();
})();
