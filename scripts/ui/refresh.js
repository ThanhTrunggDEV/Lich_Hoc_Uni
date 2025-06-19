import { renderFullTimetable } from '../api/timetable.js';
import { renderExamSchedule } from '../api/exam.js';

export function setupRefresh(isShowingExamSchedule) {
  const refreshButton = document.getElementById('refresh-button');
  if (refreshButton) {
    refreshButton.addEventListener('click', () => {
      const loadingElement = document.getElementById('loading');
      const scheduleContainer = document.getElementById('schedule-container');
      if (loadingElement && scheduleContainer) {
        loadingElement.style.display = 'flex';
        scheduleContainer.innerHTML = '';
        if (isShowingExamSchedule) {
          renderExamSchedule();
        } else {
          renderFullTimetable();
        }
      }
    });
  }
}
