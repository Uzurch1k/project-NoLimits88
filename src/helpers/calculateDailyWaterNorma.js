const calculateDailyWaterNorma = (gender, userWeight, activityTime) => {
  if (gender === 'woman') {
    return (userWeight * 0.03 + activityTime * 0.4).toFixed(1); // Врахування часу активності в годинах
  }
  return (userWeight * 0.04 + activityTime * 0.6).toFixed(1); // Врахування часу активності в годинах
};

export default calculateDailyWaterNorma;
