import { TODAY } from '../../constants/time';

export const WATER_INITIAL_STATE = {
  waterDaily: {
    records: [],
    isLoading: false,
    error: null,
  },
  waterMonthly: {
    records: [],
    isLoading: false,
    error: null,
  },
  selectedDate: TODAY,
};
