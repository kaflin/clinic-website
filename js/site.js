// Small enhancements only. Every page works with JavaScript switched off.

(function () {
  'use strict';

  // Mobile menu: the button appears on small screens and opens the menu.
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    toggle.hidden = false;
    nav.classList.add('main-nav--collapsible');
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('main-nav--open', !open);
    });
  }

  // Appointment form: stop a second click from sending the request twice.
  document.querySelectorAll('form.form').forEach(function (form) {
    form.addEventListener('submit', function () {
      var button = form.querySelector('button[type="submit"]');
      if (button) {
        button.disabled = true;
        button.textContent = 'Sending';
      }
    });
  });
})();
