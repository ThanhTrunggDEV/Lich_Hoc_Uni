const days = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

export function formatVietnameseDay(dayNumber) {
  return days[dayNumber];
}

export function vietnameseDayToNumber(vietDay) {
  const dayMap = {
    'Chủ Nhật': 0, 'Thứ 2': 1, 'Thứ 3': 2,
    'Thứ 4': 3, 'Thứ 5': 4, 'Thứ 6': 5, 'Thứ 7': 6
  };
  return dayMap[vietDay] || 0;
}

export function isWeekInPast(weekText) {
  const endDateMatch = weekText.match(/đến (\d{2})\/(\d{2})\/(\d{4})/);
  if (!endDateMatch) return false;
  const [ , endDay, endMonth, endYear ] = endDateMatch.map(Number);
  const weekEndDate = new Date(endYear, endMonth - 1, endDay);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return weekEndDate < now;
}
