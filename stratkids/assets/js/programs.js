/**
 * STRATKIDS - Programs Filtering System
 * Handles filtering by Age Group (5-7, 8-10, 11-13, 14-16), Skill Level, and Search Bar
 * Supports en-dash/hyphen normalization, multi-token search, and smart filter fallbacks.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const filterButtons = document.querySelectorAll('.program-filter-btn');
  const skillSelect = document.getElementById('skillLevelSelect');
  const searchInput = document.getElementById('programSearchInput');
  const emptyNotice = document.getElementById('noProgramsFound');

  function normalizeText(str) {
    if (!str) return '';
    return str
      .toLowerCase()
      .replace(/[\u2010\u2012\u2013\u2014\u2015\u2212]/g, '-') // Normalize en-dash, em-dash, minus to hyphen
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Pre-cache full text for all cards using textContent so display:none never destroys searchable text
  const programCards = document.querySelectorAll('.program-item-col');
  programCards.forEach(card => {
    const rawContent = card.textContent || '';
    const cardAge = card.getAttribute('data-age-group') || '';
    const cardSkill = card.getAttribute('data-skill-level') || '';
    card._cachedSearchText = normalizeText(rawContent + ' ' + cardAge + ' ' + cardSkill);
  });

  function filterPrograms() {
    const cards = document.querySelectorAll('.program-item-col');
    const activeBtn = document.querySelector('.program-filter-btn.active');
    const selectedAge = activeBtn ? (activeBtn.getAttribute('data-filter') || 'all') : 'all';
    const selectedSkill = skillSelect ? skillSelect.value : 'all';
    const rawSearch = searchInput ? searchInput.value : '';
    const normalizedSearch = normalizeText(rawSearch);
    const searchTokens = normalizedSearch.split(' ').filter(t => t.length > 0);

    let visibleCount = 0;

    cards.forEach(card => {
      const cardAge = card.getAttribute('data-age-group') || '';
      const cardSkill = card.getAttribute('data-skill-level') || '';
      const cardText = card._cachedSearchText || normalizeText((card.textContent || '') + ' ' + cardAge + ' ' + cardSkill);

      // Age check: matches 'all' or matches specific age group
      const matchesAge = (
        selectedAge === 'all' ||
        cardAge === selectedAge ||
        cardAge.split(' ').includes(selectedAge) ||
        cardAge.includes(selectedAge)
      );

      // Skill check: matches 'all' or matches specific skill level
      const matchesSkill = (
        selectedSkill === 'all' ||
        cardSkill === selectedSkill ||
        cardSkill.split(' ').includes(selectedSkill) ||
        cardSkill.includes(selectedSkill)
      );

      // Search check: every token in search must be found in card text
      let matchesSearch = true;
      if (searchTokens.length > 0) {
        matchesSearch = searchTokens.every(token => cardText.includes(token));
      }

      if (matchesAge && matchesSkill && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyNotice) {
      emptyNotice.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  // Age group filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetAge = btn.getAttribute('data-filter');

      // Check if current skill filter would produce zero results for this age group
      if (skillSelect && skillSelect.value !== 'all' && targetAge !== 'all') {
        const programCards = document.querySelectorAll('.program-item-col');
        let potentialMatches = 0;
        programCards.forEach(card => {
          const cardAge = card.getAttribute('data-age-group') || '';
          const cardSkill = card.getAttribute('data-skill-level') || '';
          if (cardAge === targetAge && (cardSkill === skillSelect.value || cardSkill.includes(skillSelect.value))) {
            potentialMatches++;
          }
        });
        // If zero matches, reset skill to 'all' so the user sees programs for that age
        if (potentialMatches === 0) {
          skillSelect.value = 'all';
        }
      }

      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterPrograms();
    });
  });

  // Skill level select
  if (skillSelect) {
    skillSelect.addEventListener('change', () => {
      const selectedSkill = skillSelect.value;
      const activeBtn = document.querySelector('.program-filter-btn.active');
      const selectedAge = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';

      // If a specific age is selected, check if it has any programs with this skill
      if (selectedSkill !== 'all' && selectedAge !== 'all') {
        const programCards = document.querySelectorAll('.program-item-col');
        let potentialMatches = 0;
        programCards.forEach(card => {
          const cardAge = card.getAttribute('data-age-group') || '';
          const cardSkill = card.getAttribute('data-skill-level') || '';
          if (cardAge === selectedAge && (cardSkill === selectedSkill || cardSkill.includes(selectedSkill))) {
            potentialMatches++;
          }
        });
        // If no programs in this age group have this skill, switch to 'all' age groups to show all matching programs
        if (potentialMatches === 0) {
          filterButtons.forEach(b => {
            if (b.getAttribute('data-filter') === 'all') {
              b.classList.add('active');
            } else {
              b.classList.remove('active');
            }
          });
        }
      }

      filterPrograms();
    });
  }

  // Search input with instant filtering
  if (searchInput) {
    searchInput.addEventListener('input', filterPrograms);
    searchInput.addEventListener('keyup', filterPrograms);
    searchInput.addEventListener('search', filterPrograms);
  }

  // Global reset handler
  function resetAllFilters() {
    if (searchInput) searchInput.value = '';
    if (skillSelect) skillSelect.value = 'all';
    filterButtons.forEach(b => {
      if (b.getAttribute('data-filter') === 'all') {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });
    filterPrograms();
  }

  const resetBtn = document.getElementById('resetProgramsFilterBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetAllFilters();
    });
  }

  // Expose globally
  window.stratkidsResetFilters = resetAllFilters;
  window.stratkidsFilterPrograms = filterPrograms;

  // Run initial filter on page load
  filterPrograms();
});
