export const calculateWaterProgress = (currentAmount, dailyNorma) => {
  if (dailyNorma === undefined) {
    return 0;
  }
  const progress = Math.round((currentAmount / dailyNorma) * 100);
  return progress;
};
