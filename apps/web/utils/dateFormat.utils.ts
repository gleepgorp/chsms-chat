type FirebaseTimestamp = {
  _seconds: number;
  _nanoseconds: number;
}

export function convertTimestamp(timestamp: FirebaseTimestamp | string): { formatted: string; date: Date } {
  const date = typeof timestamp === 'string' 
    ? new Date(timestamp)
    : new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid timestamp format');
  }

  const timeNow = new Date();
  const timeDifference = Math.floor((timeNow.getTime() - date.getTime()) / (60 * 1000));

  const timeUnits = [
    { limit: 60, divisor: 1, unit: 'm' },
    { limit: 24 * 60, divisor: 60, unit: 'h' },
    { limit: 7 * 24 * 60, divisor: 24 * 60, unit: 'd' },
    { limit: 30 * 24 * 60, divisor: 7 * 24 * 60, unit: 'w' },
    { limit: 365 * 24 * 60, divisor: 30 * 24 * 60, unit: 'mo' },
    { limit: 5 * 365 * 24 * 60, divisor: 365 * 24 * 60, unit: 'y' },
    { limit: 10 * 365 * 24 * 60, divisor: 5 * 365 * 24 * 60, unit: 'y' },
  ];

  for (const { limit, divisor, unit } of timeUnits) {
    if (timeDifference < limit) {
      return { 
        formatted: `${Math.floor(timeDifference / divisor)}${unit}`, 
        date 
      };
    }
  }

  return { 
    formatted: date.toLocaleString(), 
    date 
  };
}