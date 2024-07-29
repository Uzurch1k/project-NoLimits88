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
  action.type.endsWith('pending');

const waterPending = state => {
  state.recordsOfDay = [];
  state.recordsOfMonth = [];
  state.loading = true;
  state.error = null;
};

const waterRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: 'water',
  initialState: WATER_INITIAL_STATE,
  extraReducers: builder => {
    builder
      .addCase(fetchAllWaterRecordsOfDay.fulfilled, (state, action) => {
        state.waterDaily.records = action.payload;
        state.waterDaily.isLoading = false;
        state.waterDaily.error = null;
      })
      .addCase(fetchAllWaterRecordsOfMonth.fulfilled, (state, action) => {
        state.waterMonthly.records = action.payload;
        state.waterMonthly.isLoading = false;
        state.waterMonthly.error = null;
      })
      .addCase(addWaterRecord.fulfilled, (state, action) => {
        state.waterDaily.records = [
          ...state.waterMonthly.records,
          action.payload,
        ];
        state.waterMonthly.records = [
          ...state.waterMonthly.records,
          action.payload,
        ];
        state.waterDaily.isLoading = false;
        state.waterDaily.error = null;
        state.waterMonthly.isLoading = false;
        state.waterMonthly.error = null;
      })
      .addCase(deleteWaterRecord.fulfilled, (state, action) => {
        state.waterDaily.records = state.waterDaily.records.filter(
          record => record._id !== action.payload
        );
        state.waterMonthly.records = state.waterMonthly.records.filter(
          record => record._id !== action.payload
        );
        state.loading = false;
        state.error = null;
      })
      // .addCase(editWaterRecord.fulfilled, (state, action) => {
      //   state.records = action.payload;
      //   state.loading = false;
      //   state.error = null;
      // })
      .addMatcher(isWaterPending, waterPending)
      .addMatcher(isWaterRejected, waterRejected);
  },
});

export const waterReducer = waterSlice.reducer;
