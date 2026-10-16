/**
 * STRATKIDS - Programs Filtering System
 * Handles filtering by Age Group (5-7, 8-10, 11-13, 14-16) and Skill Level
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const filterButtons = document.querySelectorAll('.program-filter-btn');
  const programCards = document.querySelectorAll('.program-item-col');
  const skillSelect = document.getElementById('skillLevelSelect');
  const searchInput = document.getElementById('programSearchInput');

  function filterPrograms() {
    const activeBtn = document.querySelector('.program-filter-btn.active');
    const selectedAge = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';
    const selectedSkill = skillSelect ? skillSelect.value : 'all';
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';

    let visibleCount = 0;

    programCards.forEach(card => {
      const cardAge = card.getAttribute('data-age-group');
      const cardSkill = card.getAttribute('data-skill-level');
      const cardText = card.innerText.toLowerCase();

      const matchesAge = (selectedAge === 'all' || cardAge === selectedAge);
      const matchesSkill = (selectedSkill === 'all' || cardSkill === selectedSkill);
      const matchesSearch = (!searchTerm || cardText.includes(searchTerm));

      if (matchesAge && matchesSkill && matchesSearch) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const emptyNotice = document.getElementById('noProgramsFound');
    if (emptyNotice) {
      emptyNotice.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterPrograms();
    });
  });

  if (skillSelect) {
    skillSelect.addEventListener('change', filterPrograms);
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterPrograms);
  }
});
