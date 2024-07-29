export const selectWaterRecordsOfDay = state => state.water.waterDaily.records;
export const selectDailyWaterLoading = state =>
  state.water.waterDaily.isLoading;

export const selectWaterRecordsOfMonth = state =>
  state.water.waterMonthly.records;
export const selectMonthlyWaterLoading = state =>
  state.water.waterMonthly.isLoading;

export const selectWaterError = state => state.water.error;
export const selectSelectedDay = state => state.water.selectedDay;
export const selectSelectedMonth = state => state.water.selectedMonth;
