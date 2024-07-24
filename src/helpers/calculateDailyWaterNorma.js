const calculateDailyWaterNorma = (gender, userWeight, activityTime) => {
    if (gender === 'woman') {
      return (userWeight * 0.03 + (activityTime * 0.4) / 60).toFixed(1);
    }
    return (userWeight * 0.04 + (activityTime * 0.6) / 60).toFixed(1);
  };
  
  export default calculateDailyWaterNorma;
  