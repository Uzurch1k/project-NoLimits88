export const formatChooseDate = (dateString, t) => {
  const date = new Date(dateString);
  const today = new Date();

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return t('waterMainInfo.today');
  }

  const day = date.getDate();
  const month = date.toLocaleString('en-US', { month: 'long' });

  return `${day}, ${month}`;
};
