function isLower(char) {
  return char === char.toLowerCase() && char !== char.toUpperCase();
}

export function createClassCard(classItem) {
  const classDiv = document.createElement('div');
  classDiv.className = 'schedule-item class';

  const timeDiv = document.createElement('div');
  timeDiv.className = 'class-time';
  const timeText = document.createElement('div');
  timeText.className = 'time-text';
  timeText.innerHTML = `<i class="far fa-clock"></i> ${classItem.startTime} - ${classItem.endTime}`;
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

export function createEmptyDayCard() {
  const emptyDiv = document.createElement('div');
  emptyDiv.className = 'no-class-card';
  emptyDiv.innerHTML = '<i class="fas fa-coffee"></i> Không Phải Đi Học !!!';
  return emptyDiv;
}
