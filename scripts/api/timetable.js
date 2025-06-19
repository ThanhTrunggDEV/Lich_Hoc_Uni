import { transformTimetableData } from '../utils/transform.js';
import { formatVietnameseDay } from '../utils/date.js';
import { createEmptyDayCard, createClassCard } from '../utils/card.js';
import { isWeekInPast } from '../utils/date.js';
import { showError } from '../ui/error.js';



export async function renderFullTimetable() {
  const scheduleContainer = document.getElementById('schedule-container');
  const today = new Date();
  const loadingElement = document.getElementById('loading');
  if (!scheduleContainer || !loadingElement) return;
  scheduleContainer.innerHTML = '';
  try {
    const studentID = localStorage.getItem('studentID');
    const password = localStorage.getItem('password');
    const response = await fetch(`https://api.nguyenthanhtrung.online/download`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: studentID, password: password })
    });
    if (!response.ok) throw new Error(`Status: ${response.status}, Message: ${await response.text()}`);
    const data = await response.json();
    localStorage.setItem('timetableData', JSON.stringify(data));
    loadingElement.style.display = 'none';

    const currentAndFutureWeeks = {};
    Object.keys(data).forEach(week => {
      if (!isWeekInPast(week)) currentAndFutureWeeks[week] = data[week];
    });

    if (Object.keys(currentAndFutureWeeks).length === 0)
      return showError("Không có lịch học cho thời gian sắp tới");

    const schedule = transformTimetableData(currentAndFutureWeeks);
    renderSchedule(schedule, scheduleContainer, today);
  } catch (error) {
    const cached = localStorage.getItem('timetableData');
    if (cached) {
      loadingElement.style.display = 'none';
      try {
        const data = JSON.parse(cached);
        const currentAndFutureWeeks = {};
        Object.keys(data).forEach(week => {
          if (!isWeekInPast(week)) currentAndFutureWeeks[week] = data[week];
        });
        if (Object.keys(currentAndFutureWeeks).length === 0)
          return showError("Không có lịch học cho thời gian sắp tới (offline)");
        const schedule = transformTimetableData(currentAndFutureWeeks);
        renderSchedule(schedule, scheduleContainer, today);
        return;
      } catch (e) {
        
      }
    }
    showError("Không thể tải lịch học", error.message);
  }
}

  function renderSchedule(schedule, scheduleContainer, today) {
  const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  const sortedWeeks = Object.keys(schedule).sort((a, b) => {
    const weekNumberA = parseInt((a.match(/Tuần (\d+):/) || [])[1]) || 0;
    const weekNumberB = parseInt((b.match(/Tuần (\d+):/) || [])[1]) || 0;
    return weekNumberA - weekNumberB;
  });

  sortedWeeks.forEach(week => {
    const weekHeader = document.createElement('div');
    weekHeader.className = 'week-header';
    weekHeader.innerHTML = `<i class="far fa-calendar-alt"></i> ${week}`;
    scheduleContainer.appendChild(weekHeader);

    const dateRangeMatch = week.match(/(\d{2})\/(\d{2})\/(\d{4}) đến (\d{2})\/(\d{2})\/(\d{4})/);
    const allNumbers = dateRangeMatch.slice(1).map(Number);
    const startDate = new Date(allNumbers[2], allNumbers[1] - 1, allNumbers[0]);
    const endDate = new Date(allNumbers[5], allNumbers[4] - 1, allNumbers[3]);
    endDate.setHours(23, 59, 59, 999);
    let tempDate = new Date(startDate);
    const daysOfWeek = [], daysOfWeekToCompare = [];

    while (tempDate <= endDate) {
      daysOfWeekToCompare.push(tempDate.toDateString());
      daysOfWeek.push(tempDate.getDate().toString().padStart(2, '0') + " Tháng " + (tempDate.getMonth() + 1));
      tempDate.setDate(tempDate.getDate() + 1);
    }

    const isCurrentWeek = today >= startDate && today <= endDate;
    const todayVietDay = formatVietnameseDay(today.getDay());
    const orderedDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];
    let countDay = 0, countDay2 = 0;

    orderedDays.forEach(day => {
      const dayClasses = schedule[week][day];
      if (new Date(daysOfWeekToCompare[countDay2++]) >= new Date(today.toDateString())) {
        const dayContainer = document.createElement('div');
        dayContainer.className = 'day-container';
        const dayTitle = document.createElement('div');
        dayTitle.className = 'day-title';

        if (isCurrentWeek && todayVietDay === day) dayTitle.classList.add('today');
        if (isCurrentWeek && days[(days.indexOf(todayVietDay) + 1) % 7] === day) dayTitle.classList.add('tomorrow');

        dayTitle.innerHTML = `<span>${day} Ngày ${daysOfWeek[countDay]}</span>`;
        if (isCurrentWeek && todayVietDay === day) dayTitle.innerHTML += `<span>Hôm nay</span>`;
        if (isCurrentWeek && days[(days.indexOf(todayVietDay) + 1) % 7] === day) dayTitle.innerHTML += `<span>Ngày mai</span>`;

        dayContainer.appendChild(dayTitle);
        if (dayClasses.length === 0) {
          dayContainer.appendChild(createEmptyDayCard());
        } else {
          dayClasses.forEach(classItem => dayContainer.appendChild(createClassCard(classItem)));
        }

        scheduleContainer.appendChild(dayContainer);
      }
      countDay++;
    });
  });
}

