export const periodTimes_ICTU = {
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

export const periodTimes_TUMP = {
  1: { start: '7:30', end: '8:20' },
  2: { start: '8:25', end: '9:15' },
  3: { start: '9:25', end: '10:15' },
  4: { start: '10:20', end: '11:10' },
  5: { start: '11:20', end: '11:30' },
  
  7: { start: '13:00', end: '13:50' },
  8: { start: '13:55', end: '14:45' },
  9: { start: '14:55', end: '16:45' },
  10: { start: '15:50', end: '16:40' },
  11: { start: '16:50', end: '17:00' },

  13: { start: '18:00', end: '18:50' },
  14: { start: '18:55', end: '19:45' }
}

export function parsePeriodRange(periodStr) {
  if (periodStr.includes('-->')) {
    const [start, end] = periodStr.split('-->').map(p => parseInt(p.trim()));
    return { firstPeriod: start, lastPeriod: end };
  }
  if (periodStr.includes('-')) {
    const [start, end] = periodStr.split('-').map(p => parseInt(p.trim()));
    return { firstPeriod: start, lastPeriod: end };
  }
  if (periodStr.includes(',')) {
    const parts = periodStr.split(',').map(p => parseInt(p.trim()));
    return { firstPeriod: parts[0], lastPeriod: parts[parts.length - 1] };
  }
  const period = parseInt(periodStr.trim());
  return { firstPeriod: period, lastPeriod: period };
}
