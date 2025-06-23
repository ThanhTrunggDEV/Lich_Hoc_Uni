import { parsePeriodRange, periodTimes_ICTU, periodTimes_TUMP, periodTimes_TNUS, periodTimes_TUEBA } from './period.js';

export function transformTimetableData(data) {
  const schedule = {};
  const dayMap = { '8': 'Chủ Nhật', '2': 'Thứ 2', '3': 'Thứ 3', '4': 'Thứ 4', '5': 'Thứ 5', '6': 'Thứ 6', '7': 'Thứ 7' };
  const studentID = localStorage.getItem('studentID');
  let periodTimes = periodTimes_ICTU;
  if (studentID.toUpperCase().startsWith('DTY')){
    periodTimes = periodTimes_TUMP;
  }
  if(studentID.toUpperCase().startsWith('DTZ')){
    periodTimes = periodTimes_TNUS;
  }
  if(studentID.toUpperCase().startsWith('DTE')){
    periodTimes = periodTimes_TUEBA;
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
