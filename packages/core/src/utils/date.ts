export const differenceInMinutes = (oldDate: Date, newDate: Date) => {
  // difference in milliseconds
  const diff = newDate.getTime() - oldDate.getTime();
  return Math.round(Math.abs(diff / 1000 / 60));
};

export const elapsedDuration = (oldDate: Date, newDate: Date) => {
  const minutes = differenceInMinutes(oldDate, newDate);

  if (minutes < 2) {
    return 'just now';
  }
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.round(minutes / 60);

  if (minutes < 90) {
    return `about ${hours}h ago`;
  }
  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.round(hours / 24);

  if (days < 7) {
    return `${days}d ago`;
  }

  const weeks = Math.round(days / 7);

  return `${weeks}w ago`;
};

export const formatDateTime = (date: Date) => {
  return date.toDateString() + ' ' + date.toLocaleTimeString();
};
