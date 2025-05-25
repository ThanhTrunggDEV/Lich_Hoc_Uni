document.addEventListener('DOMContentLoaded', function() {

  const donateButton = document.getElementById('donate-button');
  const donateModal = document.getElementById('donate-modal');
  const modalClose = document.getElementById('modal-close');
  donateButton.addEventListener('click', () => donateModal.classList.add('active'));
  modalClose.addEventListener('click', () => donateModal.classList.remove('active'));
  donateModal.addEventListener('click', e => {
    if (e.target === donateModal) donateModal.classList.remove('active');
  });


  const sayhiText = document.getElementById('say-hi');
  const studentName = localStorage.getItem('studentName');
  if (studentName && studentName.length >= 6) {
    sayhiText.innerHTML = `Xin Chào <strong>${studentName}</strong> !!!<br> Ngày Hôm Nay Của Bạn Thế Nào?`;
  }


  const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
  function formatVietnameseDay(dayNumber) { return days[dayNumber]; }
  function vietnameseDayToNumber(vietDay) {
    const dayMap = {'Chủ Nhật': 0, 'Thứ 2': 1, 'Thứ 3': 2, 'Thứ 4': 3, 'Thứ 5': 4, 'Thứ 6': 5, 'Thứ 7': 6};
    return dayMap[vietDay] || 0;
  }
  const today = new Date();

  function formatTimeRange(start, end) { return `${start} - ${end}`; }
  const periodTimes = {
    1: { start: '6:45', end: '7:35' }, 2: { start: '7:40', end: '8:30' }, 3: { start: '8:40', end: '9:30' },
    4: { start: '9:40', end: '10:30' }, 5: { start: '10:35', end: '11:25' }, 6: { start: '13:00', end: '13:50' },
    7: { start: '13:55', end: '14:45' }, 8: { start: '14:55', end: '15:45' }, 9: { start: '15:55', end: '16:45' },
    10: { start: '16:50', end: '17:40' }, 11: { start: '18:15', end: '19:05' }, 12: { start: '19:10', end: '20:00' },
    13: { start: '20:05', end: '20:55' }, 14: { start: '20:20', end: '21:10' }, 15: { start: '21:20', end: '22:10' }
  };


  function transformTimetableData(data) {
    const schedule = {};
    const dayMap = { '1': 'Chủ Nhật', '2': 'Thứ 2', '3': 'Thứ 3', '4': 'Thứ 4', '5': 'Thứ 5', '6': 'Thứ 6', '7': 'Thứ 7' };
    function parsePeriodRange(periodStr) {
      if (periodStr.includes('-->')) {
        const [start, end] = periodStr.split('-->').map(p => parseInt(p.trim()));
        return { firstPeriod: start, lastPeriod: end };
      }
      if (periodStr.includes(',')) {
        const parts = periodStr.split(',').map(p => parseInt(p.trim()));
        return { firstPeriod: parts[0], lastPeriod: parts[parts.length - 1] };
      }
      const period = parseInt(periodStr.trim());
      return { firstPeriod: period, lastPeriod: period };
    }
    Object.keys(data).forEach(week => {
      schedule[week] = { 'Thứ 2': [], 'Thứ 3': [], 'Thứ 4': [], 'Thứ 5': [], 'Thứ 6': [], 'Thứ 7': [], 'Chủ Nhật': [] };
      data[week].forEach(session => {
        const vietDay = dayMap[session.day] || session.day;
        const { firstPeriod, lastPeriod } = parsePeriodRange(session.period);
        schedule[week][vietDay].push({
          ...session,
          day: vietDay,
          startTime: periodTimes[firstPeriod]?.start || '',
          endTime: periodTimes[lastPeriod]?.end || ''
        });
      });
      Object.keys(schedule[week]).forEach(day => {
        schedule[week][day].sort((a, b) => {
          const { firstPeriod: aFirst } = parsePeriodRange(a.period);
          const { firstPeriod: bFirst } = parsePeriodRange(b.period);
          return aFirst - bFirst;
        });
      });
    });
    return schedule;
  }

  function isLower(char) { return char === char.toLowerCase() && char !== char.toUpperCase(); }

  function createClassCard(classItem) {
    const classDiv = document.createElement('div');
    classDiv.className = 'schedule-item class';

    const timeDiv = document.createElement('div');
    timeDiv.className = 'class-time';
    const timeText = document.createElement('div');
    timeText.className = 'time-text';
    timeText.innerHTML = `<i class="far fa-clock"></i> ${formatTimeRange(classItem.startTime, classItem.endTime)}`;
    const classStatus = document.createElement('div');
    classStatus.className = 'class-status';
    classStatus.innerHTML = (classItem.endTime < '13:00')
      ? 'Lịch sáng <i class="fas fa-sun"></i>' : 'Lịch chiều <i class="fas fa-cloud-sun"></i>';
    timeDiv.append(timeText, classStatus);
    classDiv.appendChild(timeDiv);
    
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'class-details';
    const titleDiv = document.createElement('div');
    titleDiv.className = 'class-title';
    titleDiv.textContent = classItem.subject;
    detailsDiv.appendChild(titleDiv);
    
    let teacherName = classItem.teacher;
    for (let i = 0; i < teacherName.length - 1; i++) {
      if (teacherName[i] == '\n' && isLower(teacherName[i + 1])) {
        teacherName = teacherName.slice(0, i + 1);
        break;
      }
    }
    detailsDiv.innerHTML += `
      <div class="class-info"><div class="info-icon"><i class="fas fa-user"></i></div> Giảng viên: ${teacherName}</div>
      <div class="class-info"><div class="info-icon"><i class="fas fa-list-ol"></i></div> Tiết: ${classItem.period}</div>
      <div class="class-info"><div class="info-icon"><i class="fas fa-door-open"></i></div> Phòng: ${classItem.room}</div>
    `;
    classDiv.appendChild(detailsDiv);
    return classDiv;
  }

  function createEmptyDayCard() {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'no-class-card';
    emptyDiv.innerHTML = '<i class="fas fa-coffee"></i> Không Phải Đi Học !!!';
    return emptyDiv;
  }

  function showError(message, details) {
    const scheduleContainer = document.getElementById('schedule-container');
    const loadingElement = document.getElementById('loading');
    if (loadingElement) loadingElement.style.display = 'none';
    if (scheduleContainer) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i><div>${message}</div>`;
      if (details) {
        const detailsElement = document.createElement('div');
        detailsElement.style.marginTop = '10px';
        detailsElement.style.fontSize = '0.8rem';
        detailsElement.textContent = `Chi tiết lỗi: ${details}`;
        errorDiv.appendChild(detailsElement);
      }
      scheduleContainer.appendChild(errorDiv);
    }
  }

  function isWeekInPast(weekText) {
    const endDateMatch = weekText.match(/đến (\d{2})\/(\d{2})\/(\d{4})/);
    if (!endDateMatch) return false;
    const [ , endDay, endMonth, endYear ] = endDateMatch.map(Number);
    const weekEndDate = new Date(endYear, endMonth - 1, endDay);
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return weekEndDate < now;
  }

  async function renderFullTimetable() {
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
      loadingElement.style.display = 'none';
      const currentAndFutureWeeks = {};
      Object.keys(data).forEach(week => { if (!isWeekInPast(week)) currentAndFutureWeeks[week] = data[week]; });
      if (Object.keys(currentAndFutureWeeks).length === 0) return showError("Không có lịch học cho thời gian sắp tới");
      const schedule = transformTimetableData(currentAndFutureWeeks);
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
    } catch (error) {
      showError("Không thể tải lịch học", error.message);
    }
  }


  try {
    renderFullTimetable();
    const refreshButton = document.getElementById('refresh-button');
    if (refreshButton) {
      refreshButton.addEventListener('click', () => {
        const loadingElement = document.getElementById('loading');
        const scheduleContainer = document.getElementById('schedule-container');
        if (loadingElement && scheduleContainer) {
          loadingElement.style.display = 'flex';
          scheduleContainer.innerHTML = '';
          renderFullTimetable();
        }
      });
    }
  } catch (initError) {
    showError("Lỗi khởi tạo ứng dụng", initError.message);
  }

  const changeModeButton = document.getElementById('change-mode-button');
  let isDarkMode = false;

  (function autoDarkModeByTime() {
    const now = new Date();
    const hour = now.getHours();
    if (hour >= 19 || hour < 5) {
      document.body.classList.add('dark-mode');
      isDarkMode = true;
      changeModeButton.innerHTML = '<i class="fas fa-moon"></i>';
      const newDiv = document.createElement('div');
      newDiv.className = 'stars';
      for (let i = 0; i < 30; i++) {
        const tempDiv = document.createElement('div');
        tempDiv.className = 'star';
        newDiv.appendChild(tempDiv);
      }
      document.body.appendChild(newDiv);
    }
  })();

  changeModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    isDarkMode = !isDarkMode;
    changeModeButton.innerHTML = isDarkMode
      ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    if (isDarkMode) {
      const newDiv = document.createElement('div');
      newDiv.className = 'stars';
      for (let i = 0; i < 30; i++) {
        const tempDiv = document.createElement('div');
        tempDiv.className = 'star';
        newDiv.appendChild(tempDiv);
      }
      document.body.appendChild(newDiv);
    } else {
      document.querySelectorAll('.stars').forEach(element => element.remove());
    }
  });

  let isShowingExamSchedule = false;
  function createExamCard(examItem) {
    const examDiv = document.createElement('div');
    examDiv.className = 'schedule-item exam';
    const timeDiv = document.createElement('div');
    timeDiv.className = 'exam-time';
    timeDiv.innerHTML = `
      <div class="exam-date"><i class="far fa-calendar-check"></i> ${examItem.ngay_thi}</div>
      <div class="exam-time-detail"><i class="far fa-clock"></i> ${examItem.thoi_gian_thi.replace('\n', ' ')}</div>
    `;
    examDiv.appendChild(timeDiv);
    const detailsDiv = document.createElement('div');
    detailsDiv.className = 'exam-details';
    detailsDiv.innerHTML = `
      <div class="exam-title">${examItem.ten_hoc_phan}</div>
      <div class="exam-info"><div class="info-icon"><i class="fas fa-code"></i></div> Mã HP: ${examItem.ma_hoc_phan} (${examItem.tin_chi} tín chỉ)</div>
      <div class="exam-info"><div class="info-icon"><i class="fas fa-edit"></i></div> Hình thức: ${examItem.hinh_thuc_thi}</div>
      <div class="exam-info"><div class="info-icon"><i class="fas fa-door-open"></i></div> Phòng thi: ${examItem.phong_thi}</div>
      <div class="exam-info"><div class="info-icon"><i class="fas fa-user-check"></i></div> Số báo danh: ${examItem.so_bao_danh}</div>
    `;
    examDiv.appendChild(detailsDiv);
    return examDiv;
  }
  function createNoExamCard() {
    const emptyDiv = document.createElement('div');
    emptyDiv.className = 'no-class-card';
    emptyDiv.innerHTML = '<i class="fas fa-coffee"></i> Không có lịch thi nào!';
    return emptyDiv;
  }
  async function renderExamSchedule() {
    const scheduleContainer = document.getElementById('schedule-container');
    const loadingElement = document.getElementById('loading');
    const headerTitle = document.querySelector('.header h1');
    if (!scheduleContainer || !loadingElement) return;
    headerTitle.textContent = 'Lịch Thi Cá Nhân';
    scheduleContainer.innerHTML = '';
    loadingElement.style.display = 'flex';
    try {
      const studentID = localStorage.getItem('studentID');
      const password = localStorage.getItem('password');
      const response = await fetch(`https://api.nguyenthanhtrung.online/download_lichthi`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: studentID, password: password })
      });
      if (!response.ok) throw new Error(`Status: ${response.status}, Message: ${await response.text()}`);
      const examData = await response.json();
      loadingElement.style.display = 'none';
      if (!examData || examData.length === 0) {
        scheduleContainer.appendChild(createNoExamCard());
        return;
      }
      const sortedExams = examData.slice().sort((a, b) => {
        const [da, ma, ya] = a.ngay_thi.split('/').map(Number);
        const [db, mb, yb] = b.ngay_thi.split('/').map(Number);
        return new Date(ya, ma - 1, da) - new Date(yb, mb - 1, db);
      });
      const examHeader = document.createElement('div');
      examHeader.className = 'week-header exam-header';
      examHeader.innerHTML = `<i class="fas fa-graduation-cap"></i> Lịch Thi`;
      scheduleContainer.appendChild(examHeader);
      sortedExams.forEach(exam => {
        const examContainer = document.createElement('div');
        examContainer.className = 'exam-container';
        examContainer.appendChild(createExamCard(exam));
        scheduleContainer.appendChild(examContainer);
      });
    } catch (error) {
      loadingElement.style.display = 'none';
      showError("Không thể tải lịch thi", error.message);
    }
  }


  const toggleButton = document.getElementById('toggle-view-button');
  if (toggleButton) toggleButton.addEventListener('click', toggleScheduleView);
  function toggleScheduleView() {
    const headerTitle = document.querySelector('.header h1');
    const headerSubtitle = document.querySelector('.header-subtitle');
    const studentName = localStorage.getItem('studentName');
    if (isShowingExamSchedule) {
      isShowingExamSchedule = false;
      if (toggleButton) {
        toggleButton.innerHTML = '<i class="fas fa-graduation-cap"></i>';
        toggleButton.title = 'Xem lịch thi';
      }
      headerTitle.textContent = 'Lịch Học Cá Nhân';
      headerSubtitle.innerHTML = (studentName && studentName.length >= 6)
        ? `Xin Chào <strong>${studentName}</strong> !!!<br> Ngày Hôm Nay Của Bạn Thế Nào?`
        : 'Vui Lòng Đăng Nhập Lại';
      const loadingElement = document.getElementById('loading');
      const scheduleContainer = document.getElementById('schedule-container');
      if (loadingElement && scheduleContainer) {
        loadingElement.style.display = 'flex';
        scheduleContainer.innerHTML = '';
        renderFullTimetable();
      }
    } else {
      isShowingExamSchedule = true;
      if (toggleButton) {
        toggleButton.innerHTML = '<i class="fas fa-calendar-alt"></i>';
        toggleButton.title = 'Xem lịch học';
      }
      renderExamSchedule();
    }
  }
});
