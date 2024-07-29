import { TODAY } from '../../constants/time';

export const WATER_INITIAL_STATE = {
  waterDaily: {
    records: [],
    isLoading: false,
  },
  waterMonthly: {
    records: [],
    isLoading: false,
  },
  error: null,
  selectedDay: TODAY,
  selectedMonth: TODAY,
};
