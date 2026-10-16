/**
 * STRATKIDS - Theme Management (Twilight Chess Club)
 * Handles Light/Dark mode with localStorage and system preference detection
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'stratkids_theme';
  const html = document.documentElement;

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    html.setAttribute('data-bs-theme', theme);
    const meta = document.querySelector('meta[name="color-scheme"]');
    if (meta) {
      meta.content = theme;
    }

    // Update all theme toggle buttons across the page
    const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
    toggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'bi bi-sun-fill text-warning';
          btn.setAttribute('aria-label', 'Switch to light mode');
          btn.title = 'Switch to light mode';
        } else {
          icon.className = 'bi bi-moon-stars-fill';
          btn.setAttribute('aria-label', 'Switch to Twilight Chess Club dark mode');
          btn.title = 'Switch to dark mode';
        }
      }
    });
  }

  // Set initial theme as early as possible
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getPreferredTheme());

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const current = html.getAttribute('data-bs-theme') || 'light';
        const target = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem(STORAGE_KEY, target);
        applyTheme(target);
      });
    });
  });

  // Listen for OS changes if user hasn't explicitly set preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
