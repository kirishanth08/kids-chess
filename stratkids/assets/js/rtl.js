/**
 * STRATKIDS - Bidirectional LTR / RTL Management
 * Allows live switching between LTR and RTL with localStorage persistence
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'stratkids_direction';
  const html = document.documentElement;

  function getPreferredDirection() {
    return localStorage.getItem(STORAGE_KEY) || 'ltr';
  }

  function applyDirection(dir) {
    html.setAttribute('dir', dir);
    if (dir === 'rtl') {
      html.classList.add('rtl-mode');
    } else {
      html.classList.remove('rtl-mode');
    }

    // Update text/badges on RTL toggle buttons
    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      const label = btn.querySelector('.dir-label');
      if (label) {
        label.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
      btn.setAttribute('aria-label', dir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout');
    });
  }

  function toggleRtlAction() {
    const current = html.getAttribute('dir') || 'ltr';
    const target = current === 'rtl' ? 'ltr' : 'rtl';
    localStorage.setItem(STORAGE_KEY, target);
    applyDirection(target);
  }

  // Set initial direction
  applyDirection(getPreferredDirection());

  // Global delegated click handler for RTL toggle buttons (works across all pages & dynamically loaded elements)
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.rtl-toggle-btn');
    if (btn) {
      e.preventDefault();
      toggleRtlAction();
    }
  });

  function init() {
    applyDirection(getPreferredDirection());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
