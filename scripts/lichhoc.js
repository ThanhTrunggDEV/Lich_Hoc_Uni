document.addEventListener('DOMContentLoaded', function() {
      

      const donateButton = document.getElementById('donate-button');
      const donateModal = document.getElementById('donate-modal');
      const modalClose = document.getElementById('modal-close');
      
      donateButton.addEventListener('click', function() {
        donateModal.classList.add('active');
        
      });
      
      modalClose.addEventListener('click', function() {
        donateModal.classList.remove('active');
      });
      
      
      donateModal.addEventListener('click', function(e) {
        if (e.target === donateModal) {
          donateModal.classList.remove('active');
        }
      });

      const sayhiText = document.getElementById('say-hi');
      const studentName = localStorage.getItem('studentName');
      if(studentName && studentName.length >= 6){
         sayhiText.innerHTML = `Xin Chào <strong>${studentName}</strong> !!!<br> Ngày Hôm Nay Của Bạn Thế Nào?`
      }
      function formatVietnameseDay(dayNumber) {
        const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        return days[dayNumber];
      }

      function vietnameseDayToNumber(vietDay) {
        const dayMap = {'Chủ Nhật': 0, 'Thứ 2': 1, 'Thứ 3': 2, 'Thứ 4': 3, 'Thứ 5': 4, 'Thứ 6': 5, 'Thứ 7': 6};
        return dayMap[vietDay] || 0;
      }

      const today = new Date();
      const currentDay = today.getDay(); 

      function formatTimeRange(start, end) {
        return `${start} - ${end}`;
      }

      const periodTimes = {
        1: { start: '6:45', end: '7:35' },
        2: { start: '7:40', end: '8:30' },
        3: { start: '8:40', end: '9:30' },
        4: { start: '9:40', end: '10:30' },
        5: { start: '10:35', end: '11:25' },
        6: { start: '13:00', end: '13:50' },
        7: { start: '13:55', end: '14:45' },
        8: { start: '14:55', end: '15:45' },
        9: { start: '15:55', end: '16:45' },
        10: { start: '16:50', end: '17:40' },
        11: { start: '18:15', end: '19:05' },
        12: { start: '19:10', end: '20:00' },
        13: { start: '20:05', end: '20:55' },
        14: { start: '20:20', end: '21:10' },
        15: { start: '21:20', end: '22:10' }
      };

      function transformTimetableData(data) {
        const schedule = {};
        function numericDayToVietnameseDay(numDay) {
          const dayMap = {
            '1': 'Chủ Nhật', '2': 'Thứ 2', '3': 'Thứ 3', '4': 'Thứ 4', 
            '5': 'Thứ 5', '6': 'Thứ 6', '7': 'Thứ 7'
          };
          return dayMap[numDay] || numDay; 
        }
        
        function parsePeriodRange(periodStr) {
          if (periodStr.includes('-->')) {
            const parts = periodStr.split('-->').map(p => p.trim());
            return {
              firstPeriod: parseInt(parts[0]),
              lastPeriod: parseInt(parts[1])
            };
          } else if (periodStr.includes(',')) {
            const parts = periodStr.split(',').map(p => p.trim());
            return {
              firstPeriod: parseInt(parts[0]),
              lastPeriod: parseInt(parts[parts.length - 1])
            };
          } else {
            const period = parseInt(periodStr.trim());
            return {
              firstPeriod: period,
              lastPeriod: period
            };
          }
        }
        
        Object.keys(data).forEach(week => {
          if (!schedule[week]) {
            schedule[week] = {
              'Thứ 2': [], 'Thứ 3': [], 'Thứ 4': [], 'Thứ 5': [], 'Thứ 6': [], 'Thứ 7': [], 'Chủ Nhật': []
            };
          }
          
          data[week].forEach(session => {

            const vietDay = numericDayToVietnameseDay(session.day);
            
            let startTime = '';
            let endTime = '';
            
            const { firstPeriod, lastPeriod } = parsePeriodRange(session.period);
            
            startTime = periodTimes[firstPeriod]?.start || '';
            endTime = periodTimes[lastPeriod]?.end || '';
            
            if (!schedule[week][vietDay]) {
              console.warn(`Day ${vietDay} not found in schedule for week ${week}, creating it`);
              schedule[week][vietDay] = [];
            }
            
            schedule[week][vietDay].push({
              ...session,
              day: vietDay, 
              startTime,
              endTime
            });
          });
          
  
          Object.keys(schedule[week]).forEach(day => {
            if (Array.isArray(schedule[week][day])) {
              schedule[week][day].sort((a, b) => {
                const { firstPeriod: aFirstPeriod } = parsePeriodRange(a.period);
                const { firstPeriod: bFirstPeriod } = parsePeriodRange(b.period);
                return aFirstPeriod - bFirstPeriod;
              });
            }
          });
        });
        
        return schedule;
      }

      function isLower(char){
        return char === char.toLowerCase() && char !== char.toUpperCase();
      }

      function createClassCard(classItem) {
        const classDiv = document.createElement('div');
        classDiv.className = 'schedule-item class';
        
        const timeDiv = document.createElement('div');
        timeDiv.className = 'class-time';
        
        const timeText = document.createElement('div');
        timeText.className = 'time-text';
        timeText.innerHTML = `<i class="far fa-clock"></i> ${formatTimeRange(classItem.startTime, classItem.endTime)}`;
        
       // alert(classItem.startTime);

        const classStatus = document.createElement('div');
        classStatus.className = 'class-status';
        if(classItem.endTime < '13:00')
        classStatus.innerHTML = 'Lịch sáng <i class="fas fa-sun"></i>';
        else classStatus.innerHTML = 'Lịch chiều <i class="fas fa-cloud-sun"></i>';
        timeDiv.appendChild(timeText);
        timeDiv.appendChild(classStatus);
        classDiv.appendChild(timeDiv);
        
        const detailsDiv = document.createElement('div');
        detailsDiv.className = 'class-details';
        
        const titleDiv = document.createElement('div');
        titleDiv.className = 'class-title';
        titleDiv.textContent = classItem.subject;
        detailsDiv.appendChild(titleDiv);
        
        const teacherInfo = document.createElement('div');
        teacherInfo.className = 'class-info';
        let teacherName = classItem.teacher;
        for(let i = 0; i < teacherName.length - 1; i++){
            if(teacherName[i] == '\n' && isLower(teacherName[i + 1])){
                teacherName = teacherName.slice(0, i + 1);
                break;
            }
        }
        teacherInfo.innerHTML = `<div class="info-icon"><i class="fas fa-user"></i></div> Giảng viên: ${teacherName}`;
        detailsDiv.appendChild(teacherInfo);
        
        const periodInfo = document.createElement('div');
        periodInfo.className = 'class-info';
        periodInfo.innerHTML = `<div class="info-icon"><i class="fas fa-list-ol"></i></div> Tiết: ${classItem.period}`;
        detailsDiv.appendChild(periodInfo);
        
        const roomInfo = document.createElement('div');
        roomInfo.className = 'class-info';
        roomInfo.innerHTML = `<div class="info-icon"><i class="fas fa-door-open"></i></div> Phòng: ${classItem.room}`;
        detailsDiv.appendChild(roomInfo);
        
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
        
        if (loadingElement) {
          loadingElement.style.display = 'none';
        }
        
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
        
        const endDay = parseInt(endDateMatch[1]);
        const endMonth = parseInt(endDateMatch[2]) - 1; 
        const endYear = parseInt(endDateMatch[3]);
        
        const weekEndDate = new Date(endYear, endMonth, endDay);
        const today = new Date();
        
        today.setHours(0, 0, 0, 0);

        return weekEndDate < today;
      }

      async function renderFullTimetable() {
        const scheduleContainer = document.getElementById('schedule-container');
        const loadingElement = document.getElementById('loading');
        
        if (!scheduleContainer || !loadingElement) {
          console.error('Required DOM elements not found!');
          return;
        }
        
        scheduleContainer.innerHTML = '';
        
        try {
            let data;
            const studentID = localStorage.getItem('studentID');
            const password = localStorage.getItem('password');
            
            const response = await fetch(`https://api.nguyenthanhtrung.online/download`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
              username: studentID,
              password: password
            })
            });
            
            
            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Status: ${response.status}, Message: ${errorText}`);
            }
            
            data = await response.json();
          
          loadingElement.style.display = 'none';
          
          const currentAndFutureWeeks = {};
          Object.keys(data).forEach(week => {
            if (!isWeekInPast(week)) {
              currentAndFutureWeeks[week] = data[week];
            }
          });
          
          if (Object.keys(currentAndFutureWeeks).length === 0) {
            showError("Không có lịch học cho thời gian sắp tới");
            return;
          }
          
          const schedule = transformTimetableData(currentAndFutureWeeks);
          
          const sortedWeeks = Object.keys(schedule).sort((a, b) => {
            const matchA = a.match(/Tuần (\d+):/);
            const matchB = b.match(/Tuần (\d+):/);

            const weekNumberA = matchA ? parseInt(matchA[1]) : 0;
            const weekNumberB = matchB ? parseInt(matchB[1]) : 0;

            return weekNumberA - weekNumberB;
          });
          
          
        
         sortedWeeks.forEach(week => {
            const weekHeader = document.createElement('div');
            weekHeader.className = 'week-header';
            weekHeader.innerHTML = `<i class="far fa-calendar-alt"></i> ${week}`;
            scheduleContainer.appendChild(weekHeader);
            
            let isCurrentWeek = false;
            let daysOfWeek = new Array();
            let daysOfWeekToCompare = new Array();
            let dateRangeMatch = week.match(/(\d{2})\/(\d{2})\/(\d{4}) đến (\d{2})\/(\d{2})\/(\d{4})/);
            const allNumbers = dateRangeMatch.slice(1).map(num => parseInt(num));
            
            const startDay = allNumbers[0];
            const startMonth = allNumbers[1] - 1; 
            const startYear = allNumbers[2];
                
            const endDay = allNumbers[3];
            const endMonth = allNumbers[4] - 1;
            const endYear = allNumbers[5];
                 
            const startDate = new Date(startYear, startMonth, startDay);
            const endDate = new Date(endYear, endMonth, endDay);
            endDate.setHours(23, 59, 59, 999); 

            let tempStartDate = new Date(startDate);
            let tempEndDate = new Date(endDate);

            while(tempStartDate <= tempEndDate){
              daysOfWeekToCompare.push(tempStartDate.toDateString());
              let day = tempStartDate.getDate().toString().padStart(2, '0');
              let month = (tempStartDate.getMonth() + 1).toString();
              daysOfWeek.push(day + " Tháng " + month);
              tempStartDate.setDate(tempStartDate.getDate() + 1);
              
            }

            const today = new Date();
            
            if (today >= startDate && today <= endDate) {
                  isCurrentWeek = true;
                  console.log(`Đã tìm thấy tuần hiện tại: ${week}`);
             }
              
            
            const orderedDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];
            let countDay = 0;
            let countDay2 = 0;
            orderedDays.forEach(day => {
              const dayClasses = schedule[week][day];
              const todayVietDay = formatVietnameseDay(today.getDay());
              
              
              if (new Date(daysOfWeekToCompare[countDay2++]) >= new Date(today.toDateString())) {
                const dayContainer = document.createElement('div');
                dayContainer.className = 'day-container';
                const dayTitle = document.createElement('div');
                dayTitle.className = 'day-title';
                
                if (isCurrentWeek && todayVietDay === day) {
                  dayTitle.classList.add('today');
                }
                
           
                if (
                  isCurrentWeek &&
                  (
                    (todayVietDay == "Thứ 2" && day == "Thứ 3") ||
                    (todayVietDay == "Thứ 3" && day == "Thứ 4") ||
                    (todayVietDay == "Thứ 4" && day == "Thứ 5") ||
                    (todayVietDay == "Thứ 5" && day == "Thứ 6") ||
                    (todayVietDay == "Thứ 6" && day == "Thứ 7") ||
                    (todayVietDay == "Thứ 7" && day == "Chủ Nhật") ||
                    (todayVietDay == "Chủ Nhật" && day == "Thứ 2")
                  )
                ) {
                  dayTitle.classList.add('tomorrow');
                }
                
                dayTitle.innerHTML = `<span>${day} Ngày ${daysOfWeek[countDay]}</span>`;
                
                if (isCurrentWeek && todayVietDay === day) {
                  dayTitle.innerHTML += `<span>Hôm nay</span>`;
                }
                
                if (
                  isCurrentWeek &&
                  (
                    (todayVietDay == "Thứ 2" && day == "Thứ 3") ||
                    (todayVietDay == "Thứ 3" && day == "Thứ 4") ||
                    (todayVietDay == "Thứ 4" && day == "Thứ 5") ||
                    (todayVietDay == "Thứ 5" && day == "Thứ 6") ||
                    (todayVietDay == "Thứ 6" && day == "Thứ 7") ||
                    (todayVietDay == "Thứ 7" && day == "Chủ Nhật") ||
                    (todayVietDay == "Chủ Nhật" && day == "Thứ 2")
                  )
                ) {
                  dayTitle.innerHTML += `<span>Ngày mai</span>`;
                }
                
                dayContainer.appendChild(dayTitle);
                if (dayClasses.length === 0) {
                  dayContainer.appendChild(createEmptyDayCard());
                } else {
                  dayClasses.forEach(classItem => {
                    dayContainer.appendChild(createClassCard(classItem));
                  });
                }
                scheduleContainer.appendChild(dayContainer);
              }
              countDay++;   
            });
          });
          
        } catch (error) {
          console.error("Error fetching timetable:", error);
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
        } else {
          console.error("Refresh button not found!");
        }
      } catch (initError) {
        console.error("Error during initialization:", initError);
        showError("Lỗi khởi tạo ứng dụng", initError.message);
      }
      
      const changeModeButton = document.getElementById('change-mode-button');
      let isDarkMode = false;
      changeModeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if(isDarkMode === false){
          isDarkMode = true;
          changeModeButton.innerHTML = '<i class="fas fa-moon">';
        const newDiv = document.createElement('div');
        newDiv.className = 'stars';
        for(let i = 0; i < 30; i++){
          const tempDiv = document.createElement('div');
          tempDiv.className = 'star';
          newDiv.appendChild(tempDiv);
        }
        document.body.appendChild(newDiv);
      }
      else{
        isDarkMode = false;
        changeModeButton.innerHTML = '<i class="fas fa-sun">';
        const starDiv = document.querySelectorAll('.stars');
        starDiv.forEach(element => {
          element.remove();
        });
      }
      });
      let isShowingExamSchedule = false;


function createExamCard(examItem) {
  const examDiv = document.createElement('div');
  examDiv.className = 'schedule-item exam';
  
  
  const timeDiv = document.createElement('div');
  timeDiv.className = 'exam-time';
  
  const dateText = document.createElement('div');
  dateText.className = 'exam-date';
  dateText.innerHTML = `<i class="far fa-calendar-check"></i> ${examItem.ngay_thi}`;
  
  const timeText = document.createElement('div');
  timeText.className = 'exam-time-detail';
  timeText.innerHTML = `<i class="far fa-clock"></i> ${examItem.thoi_gian_thi.replace('\n', ' ')}`;
  
  timeDiv.appendChild(dateText);
  timeDiv.appendChild(timeText);
  examDiv.appendChild(timeDiv);
  
  
  const detailsDiv = document.createElement('div');
  detailsDiv.className = 'exam-details';
  
  const titleDiv = document.createElement('div');
  titleDiv.className = 'exam-title';
  titleDiv.textContent = examItem.ten_hoc_phan;
  detailsDiv.appendChild(titleDiv);
  
  const codeInfo = document.createElement('div');
  codeInfo.className = 'exam-info';
  codeInfo.innerHTML = `<div class="info-icon"><i class="fas fa-code"></i></div> Mã HP: ${examItem.ma_hoc_phan} (${examItem.tin_chi} tín chỉ)`;
  detailsDiv.appendChild(codeInfo);
  
  const typeInfo = document.createElement('div');
  typeInfo.className = 'exam-info';
  typeInfo.innerHTML = `<div class="info-icon"><i class="fas fa-edit"></i></div> Hình thức: ${examItem.hinh_thuc_thi}`;
  detailsDiv.appendChild(typeInfo);
  
  const roomInfo = document.createElement('div');
  roomInfo.className = 'exam-info';
  roomInfo.innerHTML = `<div class="info-icon"><i class="fas fa-door-open"></i></div> Phòng thi: ${examItem.phong_thi}`;
  detailsDiv.appendChild(roomInfo);
  
  const seatInfo = document.createElement('div');
  seatInfo.className = 'exam-info';
  seatInfo.innerHTML = `<div class="info-icon"><i class="fas fa-user-check"></i></div> Số báo danh: ${examItem.so_bao_danh}`;
  detailsDiv.appendChild(seatInfo);
  
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
  
  if (!scheduleContainer || !loadingElement) {
    console.error('Required DOM elements not found!');
    return;
  }
  

  headerTitle.textContent = 'Lịch Thi Cá Nhân';
 
  
  scheduleContainer.innerHTML = '';
  loadingElement.style.display = 'flex';
  
  try {
    const studentID = localStorage.getItem('studentID');
    const password = localStorage.getItem('password');
    
    const response = await fetch(`https://api.nguyenthanhtrung.online/download_lichthi`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
            username: studentID,
            password: password
            })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Status: ${response.status}, Message: ${errorText}`);
    }
    
    const examData = await response.json();
    loadingElement.style.display = 'none';
    
    if (!examData || examData.length === 0) {
      scheduleContainer.appendChild(createNoExamCard());
      return;
    }
    
    const sortedExams = examData.slice().sort((a, b) => {
      const [da, ma, ya] = a.ngay_thi.split('/').map(Number);
      const [db, mb, yb] = b.ngay_thi.split('/').map(Number);
      const dateA = new Date(ya, ma - 1, da);
      const dateB = new Date(yb, mb - 1, db);
      return dateA - dateB;
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
    console.error("Error fetching exam schedule:", error);
    loadingElement.style.display = 'none';
    showError("Không thể tải lịch thi", error.message);
  }
}

const toggleButton = document.getElementById('toggle-view-button');
if (toggleButton) {
  toggleButton.addEventListener('click', ()=>toggleScheduleView());
}
function toggleScheduleView() {
  const toggleButton = document.getElementById('toggle-view-button');
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
    if(studentName && studentName.length >= 6){
      headerSubtitle.innerHTML = `Xin Chào <strong>${studentName}</strong> !!!<br> Ngày Hôm Nay Của Bạn Thế Nào?`;
    } else {
      headerSubtitle.textContent = 'Vui Lòng Đăng Nhập Lại';
    }

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
