import { showError } from '../ui/error.js';

export async function renderExamSchedule() {
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
