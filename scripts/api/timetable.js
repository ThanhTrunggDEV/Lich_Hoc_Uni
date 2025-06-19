import { transformTimetableData } from '../utils/transform.js';
import { formatVietnameseDay } from '../utils/date.js';
import { createEmptyDayCard, createClassCard } from '../utils/card.js';
import { isWeekInPast } from '../utils/date.js';
import { showError } from '../ui/error.js';

const today = new Date();
const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

export async function renderFullTimetable() {
  const scheduleContainer = document.getElementById('schedule-container');
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

    showError("Không thể tải lịch học", error.message);
  }
}
