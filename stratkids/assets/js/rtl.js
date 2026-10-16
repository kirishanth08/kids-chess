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

  // Set initial direction
  applyDirection(getPreferredDirection());

  document.addEventListener('DOMContentLoaded', () => {
    applyDirection(getPreferredDirection());

    document.querySelectorAll('.rtl-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const current = html.getAttribute('dir') || 'ltr';
        const target = current === 'rtl' ? 'ltr' : 'rtl';
        localStorage.setItem(STORAGE_KEY, target);
        applyDirection(target);
      });
    });
  });
})();
