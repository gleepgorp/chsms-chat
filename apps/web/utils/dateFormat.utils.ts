type FirebaseTimestamp = {
  _seconds: number;
  _nanoseconds: number;
}

export function convertTimestamp(timestamp: FirebaseTimestamp | string): Date {
  if (typeof timestamp === 'string') {
    return new Date(timestamp);
  } else if (typeof timestamp === 'object' && '_seconds' in timestamp && '_nanoseconds' in timestamp) {
    const milliseconds = timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000;
    return new Date(milliseconds);
  } else {
    throw new Error('Invalid timestamp format');
  }
}