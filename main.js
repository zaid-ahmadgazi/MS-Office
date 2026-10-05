/*
  Deskwise — main.js
  No framework, no build step. Two independent, small behaviours:
  1. Mobile navigation panel toggle (used on every page).
  2. Percentage calculator (only runs if that tool's markup is present).
*/

(function mobileNav() {
  var toggle = document.querySelector('[data-nav-toggle]');
  var panel = document.querySelector('[data-nav-panel]');
  if (!toggle || !panel) return;

  toggle.addEventListener('click', function () {
    var isOpen = panel.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
})();

(function percentageCalculator() {
  var form = document.querySelector('[data-tool="percentage-calculator"]');
  if (!form) return;

  var partInput = form.querySelector('#calc-part');
  var wholeInput = form.querySelector('#calc-whole');
  var result = form.querySelector('[data-result]');
  var resultValue = form.querySelector('[data-result-value]');
  var resultFormula = form.querySelector('[data-result-formula]');
  var resetBtn = form.querySelector('[data-reset]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var part = parseFloat(partInput.value);
    var whole = parseFloat(wholeInput.value);

    if (Number.isNaN(part) || Number.isNaN(whole)) {
      resultValue.textContent = 'Enter both numbers to calculate.';
      resultFormula.textContent = '';
      result.hidden = false;
      return;
    }
    if (whole === 0) {
      resultValue.textContent = 'The whole (total) can\u2019t be zero.';
      resultFormula.textContent = '';
      result.hidden = false;
      return;
    }

    var percentage = (part / whole) * 100;
    var rounded = Math.round(percentage * 100) / 100;

    resultValue.textContent = rounded + '%';
    resultFormula.textContent =
      '(' + part + ' \u00F7 ' + whole + ') \u00D7 100 = ' + rounded + '%';
    result.hidden = false;
  });

  resetBtn.addEventListener('click', function () {
    form.reset();
    result.hidden = true;
  });
})();
