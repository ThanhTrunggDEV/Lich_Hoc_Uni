import { renderFullTimetable, renderTimeTableFromCache } from '../api/timetable.js';
import { renderExamSchedule, renderExamScheduleFromCache } from '../api/exam.js';

export let isShowingExamSchedule = false;

export function setupTabs() {
  const tabTimetable = document.getElementById('tab-timetable');
  const tabExam = document.getElementById('tab-exam');

  function activateTab(tab) {
    tabTimetable.classList.remove('active');
    tabExam.classList.remove('active');
    tab.classList.add('active');
  }

  if (tabTimetable && tabExam) {
    tabTimetable.addEventListener('click', function () {
      if (isShowingExamSchedule) {
        isShowingExamSchedule = false;
        activateTab(tabTimetable);
        const headerTitle = document.querySelector('.header h1');
        const headerSubtitle = document.querySelector('.header-subtitle');
        const studentName = localStorage.getItem('studentName');
        headerTitle.textContent = 'Lịch Học Cá Nhân';
        headerSubtitle.innerHTML = (studentName && studentName.length >= 6)
          ? `Xin Chào <strong>${studentName}</strong> !!!<br> Ngày Hôm Nay Của Bạn Thế Nào?`
          : 'Vui Lòng Đăng Nhập Lại';
        const loadingElement = document.getElementById('loading');
        const scheduleContainer = document.getElementById('schedule-container');
        if (loadingElement && scheduleContainer) {
          loadingElement.style.display = 'flex';
          scheduleContainer.innerHTML = '';
          const autoLoad = localStorage.getItem('autolichhoc');
          if(autoLoad && autoLoad == 'off')
            renderTimeTableFromCache();
          else
           renderFullTimetable();
        }
      }
    });

    tabExam.addEventListener('click', function () {
      if (!isShowingExamSchedule) {
        isShowingExamSchedule = true;
        activateTab(tabExam);
        const autoLoadLichthi = localStorage.getItem('autolichthi');
        if(autoLoadLichthi && autoLoadLichthi == 'off')
          renderExamScheduleFromCache();
        else
          renderExamSchedule();
      }
    });
  }
}
