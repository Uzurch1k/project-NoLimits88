export const selectWaterRecordsOfDay = state => state.water.waterDaily.records;
export const selectDailyWaterLoading = state =>
  state.water.waterDaily.isLoading;
export const selectDailyWaterError = state => state.water.waterDaily.error;

export const selectWaterRecordsOfMonth = state =>
  state.water.waterMonthly.records;
export const selectMonthlyWaterLoading = state =>
  state.water.waterMonthly.isLoading;
export const selectMonthlyWaterError = state => state.water.waterMonthly.error;

export const selectSelectedDate = state => state.water.selectedDate;
