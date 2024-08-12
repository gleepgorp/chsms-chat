type FirebaseTimestamp = {
  _seconds: number;
  _nanoseconds: number;
}

export function convertTimestamp(timestamp: FirebaseTimestamp | string): { formatted: string; date: Date } {
  const date = typeof timestamp === 'string' 
    ? new Date(timestamp)
    : new Date(timestamp?._seconds * 1000 + timestamp?._nanoseconds / 1000000);

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

export function dateAndTime(timestamp: FirebaseTimestamp | string): { formatted: string } {
  const date = typeof timestamp === 'string' 
    ? new Date(timestamp)
    : new Date(timestamp?._seconds * 1000 + timestamp?._nanoseconds / 1000000);

  const timeNow = new Date();
  const timeDifference = timeNow.getTime() - date.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 16));

  const formatTime = (date: Date) => {
    return date.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDayTime = (date: Date) => {
    return date.toLocaleString('en-US', { weekday: 'short', hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const formatDateMonthTime = (date: Date) => {
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true });
  };

  let formatted: string;

  if (daysDifference < 1) {
    formatted = formatTime(date);
  } else if (daysDifference < 7) {
    formatted = formatDayTime(date);
  } else {
    formatted = formatDateMonthTime(date);
  }

  return { formatted };
}

import { Timestamp } from 'firebase/firestore';

export function isVisibleTimestamp(currentMessage: any, previousMessage: any | undefined): boolean {
  if (!previousMessage) {
    return true;
  }

  const currentTime = currentMessage.timestamp instanceof Timestamp 
    ? currentMessage.timestamp.toMillis()
    : currentMessage.timestamp._seconds * 1000 + currentMessage.timestamp._nanoseconds / 1000000;

  const previousTime = previousMessage.timestamp instanceof Timestamp
    ? previousMessage.timestamp.toMillis()
    : previousMessage.timestamp._seconds * 1000 + previousMessage.timestamp._nanoseconds / 1000000;

  const timeDifference = currentTime - previousTime;
  const thirtyMinutesInMs = 30 * 60 * 1000;

  return timeDifference >= thirtyMinutesInMs;
}