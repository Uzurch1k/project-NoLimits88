import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllWaterRecordsOfDay,
  fetchAllWaterRecordsOfMonth,
  addWaterRecord,
  deleteWaterRecord,
  editWaterRecord,
} from './operations';

export const WATER_INITIAL_STATE = {
  records: [],
  loading: false,
  error: null,
};

const isWaterPending = action =>
  typeof action.type === 'string' &&
  action.type.startsWith('water') &&
  action.type.endWith('pending');

const isWaterRejected = action =>
  typeof action.type === 'string' &&
  action.type.startsWith('water') &&
  action.type.endWith('pending');

const waterPending = state => {
  console.log('here');
  state.records = [];
  state.loading = true;
  state.error = null;
};

const waterRejected = (state, action) => {
  console.log('here2');
  state.loading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: 'water',
  initialState: WATER_INITIAL_STATE,
  extraReducers: builder => {
    builder
      .addCase(fetchAllWaterRecordsOfDay.fulfilled, (state, action) => {
        state.records = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchAllWaterRecordsOfMonth.fulfilled, (state, action) => {
        state.records = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(addWaterRecord.fulfilled, (state, action) => {
        state.records = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteWaterRecord.fulfilled, (state, action) => {
        state.records = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(editWaterRecord.fulfilled, (state, action) => {
        state.records = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addMatcher(isWaterPending, waterPending)
      .addMatcher(isWaterRejected, waterRejected);
  },
});

export const waterReducer = waterSlice.reducer;
