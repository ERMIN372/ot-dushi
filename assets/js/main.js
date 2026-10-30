(function () {
  'use strict';

  /* ---------- Menu tabs ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  var panels = tabs.map(function (tab) {
    return document.getElementById(tab.getAttribute('aria-controls'));
  });

  function selectTab(index, focus) {
    tabs.forEach(function (tab, i) {
      var active = i === index;
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.tabIndex = active ? 0 : -1;
      panels[i].classList.toggle('is-active', active);
    });
    if (focus) tabs[index].focus();
    tabs[index].scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { selectTab(i, false); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = tabs.length - 1;
      if (next !== null) {
        e.preventDefault();
        selectTab(next, true);
      }
    });
  });

  /* ---------- Phone mask: +7 (XXX) XXX-XX-XX ---------- */
  var phone = document.getElementById('f-phone');

  // Local 10 digits: "+7 916…" and "8 916…" both drop the leading code
  function phoneDigits(value) {
    var digits = value.replace(/\D/g, '');
    if (/^\s*\+7/.test(value) || /^[78]/.test(digits)) digits = digits.slice(1);
    return digits.slice(0, 10);
  }

  function formatPhone(value) {
    var digits = phoneDigits(value);
    if (!digits.length) return '';
    var out = '+7 (' + digits.slice(0, 3);
    if (digits.length >= 3) out += ')';
    if (digits.length > 3) out += ' ' + digits.slice(3, 6);
    if (digits.length > 6) out += '-' + digits.slice(6, 8);
    if (digits.length > 8) out += '-' + digits.slice(8, 10);
    return out;
  }

  phone.addEventListener('input', function (e) {
    // Reformatting on Backspace would put ")" or "-" right back, so only tidy up on blur
    if (e.inputType && e.inputType.indexOf('delete') === 0) return;
    if (/^[78]$/.test(phone.value.trim())) {
      phone.value = '+7';
      return;
    }
    phone.value = formatPhone(phone.value) || phone.value.replace(/[^\d+]/g, '');
  });
  phone.addEventListener('blur', function () {
    phone.value = formatPhone(phone.value);
  });

  /* ---------- Booking form (demo, no sending) ---------- */
  var form = document.getElementById('booking-form');
  var date = document.getElementById('f-date');

  var now = new Date();
  var today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')
  ].join('-');
  date.min = today;
  date.value = today;

  form.addEventListener('input', function (e) {
    if (e.target.classList.contains('is-invalid') && e.target.checkValidity()) {
      e.target.classList.remove('is-invalid');
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    phone.value = formatPhone(phone.value);

    var invalid = Array.prototype.filter.call(form.elements, function (el) {
      var bad = el.willValidate && !el.checkValidity();
      el.classList && el.classList.toggle('is-invalid', bad);
      return bad;
    });
    if (invalid.length) {
      invalid[0].focus();
      alert('Проверьте поля: имя, телефон в формате +7 (999) 123-45-67 и дату.');
      return;
    }

    var data = new FormData(form);
    var when = new Date(data.get('date') + 'T00:00').toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

    alert(
      'Спасибо, ' + data.get('name').trim() + '!\n\n' +
      data.get('type') + ' на ' + when + (data.get('time') ? ', ' + data.get('time') : '') +
      ', гостей: ' + (data.get('guests') || '—') + '.\n\n' +
      'Это демо: заявка никуда не отправлена. В рабочей версии она сразу придёт администратору в Telegram или на почту.'
    );
    form.reset();
    date.value = today;
  });

  /* ---------- Sticky call bar on mobile ---------- */
  var callbar = document.getElementById('callbar');
  var hero = document.querySelector('.hero');

  if ('IntersectionObserver' in window && callbar && hero) {
    document.body.classList.add('has-callbar');
    var links = callbar.querySelectorAll('a');
    new IntersectionObserver(function (entries) {
      var show = !entries[0].isIntersecting;
      callbar.classList.toggle('is-visible', show);
      callbar.setAttribute('aria-hidden', show ? 'false' : 'true');
      Array.prototype.forEach.call(links, function (a) { a.tabIndex = show ? 0 : -1; });
    }, { threshold: 0 }).observe(hero);
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(now.getFullYear());
})();
