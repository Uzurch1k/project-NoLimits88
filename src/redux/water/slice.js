import { createSlice } from '@reduxjs/toolkit';
import { WATER_INITIAL_STATE } from './initialState';
import {
  fetchAllWaterRecordsOfDay,
  fetchAllWaterRecordsOfMonth,
  addWaterRecord,
  deleteWaterRecord,
  editWaterRecord,
} from './operations';

const isWaterPending = action =>
  typeof action.type === 'string' &&
  action.type.startsWith('water') &&
  action.type.endsWith('pending');

const isWaterRejected = action =>
  typeof action.type === 'string' &&
  action.type.startsWith('water') &&
  action.type.endsWith('rejected');

// const waterPending = state => {
//   state.waterDaily.records = [];
//   state.waterMonthly.records = [];
//   state.waterDaily.isLoading = true;
//   state.waterMonthly.isLoading = true;
//   state.error = null;
// };

const waterRejected = (state, action) => {
  state.waterDaily.isLoading = false;
  state.waterMonthly.isLoading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: 'water',
  initialState: WATER_INITIAL_STATE,
  reducers: {
    setMonth(state, action) {
      state.selectedMonth = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllWaterRecordsOfDay.pending, state => {
        state.waterDaily.records = [];
        state.waterDaily.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllWaterRecordsOfDay.fulfilled, (state, action) => {
        state.waterDaily.records = action.payload.waterRecordsOfDay;
        state.selectedDay = action.payload.selectedDate;
        state.waterDaily.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAllWaterRecordsOfMonth.pending, state => {
        state.waterMonthly.records = [];
        state.waterMonthly.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAllWaterRecordsOfMonth.fulfilled, (state, action) => {
        state.waterMonthly.records = action.payload;
        state.waterMonthly.isLoading = false;
        state.error = null;
      })
      // .addCase(addWaterRecord.fulfilled, (state, action) => {
      //   state.waterDaily.records = [
      //     ...state.waterMonthly.records,
      //     action.payload,
      //   ];
      //   state.waterMonthly.records = [
      //     ...state.waterMonthly.records,
      //     action.payload,
      //   ];
      //   state.waterDaily.isLoading = false;
      //   state.error = null;
      //   state.waterMonthly.isLoading = false;
      // })
      // .addCase(deleteWaterRecord.fulfilled, (state, action) => {
      //   state.waterDaily.records = state.waterDaily.records.filter(
      //     record => record._id !== action.payload
      //   );
      //   state.waterMonthly.records = state.waterMonthly.records.filter(
      //     record => record._id !== action.payload
      //   );
      //   state.loading = false;
      //   state.error = null;
      // })
      // .addCase(editWaterRecord.fulfilled, (state, action) => {
      //   state.records = action.payload;
      //   state.loading = false;
      //   state.error = null;
      // })
      // .addMatcher(isWaterPending, waterPending)
      .addMatcher(isWaterRejected, waterRejected);
  },
});

export const waterReducer = waterSlice.reducer;
export const { setMonth } = waterSlice.actions;
