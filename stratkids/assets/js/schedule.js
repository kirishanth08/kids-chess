/**
 * STRATKIDS - Schedule Filtering System
 * Filter by Week/Day, Age Group, and Activity Category
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const weekButtons = document.querySelectorAll('.schedule-week-btn');
  const ageFilter = document.getElementById('scheduleAgeFilter');
  const typeFilter = document.getElementById('scheduleTypeFilter');
  const scheduleRows = document.querySelectorAll('.schedule-item-row');

  function updateSchedule() {
    const activeWeekBtn = document.querySelector('.schedule-week-btn.active');
    const selectedWeek = activeWeekBtn ? activeWeekBtn.getAttribute('data-week') : 'week-1';
    const selectedAge = ageFilter ? ageFilter.value : 'all';
    const selectedType = typeFilter ? typeFilter.value : 'all';

    let rowCount = 0;

    scheduleRows.forEach(row => {
      const rowWeek = row.getAttribute('data-week');
      const rowAge = row.getAttribute('data-age');
      const rowType = row.getAttribute('data-type');

      const matchesWeek = (rowWeek === selectedWeek || selectedWeek === 'all');
      const matchesAge = (selectedAge === 'all' || rowAge === selectedAge || rowAge === 'all');
      const matchesType = (selectedType === 'all' || rowType === selectedType);

      if (matchesWeek && matchesAge && matchesType) {
        row.style.display = '';
        rowCount++;
      } else {
        row.style.display = 'none';
      }
    });

    const noScheduleMsg = document.getElementById('noScheduleFound');
    if (noScheduleMsg) {
      noScheduleMsg.style.display = rowCount === 0 ? 'block' : 'none';
    }
  }

  weekButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      weekButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateSchedule();
    });
  });

  if (ageFilter) ageFilter.addEventListener('change', updateSchedule);
  if (typeFilter) typeFilter.addEventListener('change', updateSchedule);
});
