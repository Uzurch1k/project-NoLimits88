export const formatTime = dateString => {
  const date = new Date(dateString);
  const options = { hour: '2-digit', minute: '2-digit', hour12: true };
  return date.toLocaleTimeString([], options);
};
