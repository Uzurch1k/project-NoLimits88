export const formatTime = dateString => {
  const date = new Date(dateString);
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  }; // Убедитесь, что timeZone установлен
  return date.toLocaleTimeString([], options);
};
