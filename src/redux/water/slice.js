import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllWaterRecordsOfToday,
  addWaterRecord,
  deleteWaterRecord,
} from './operations';

export const WATER_INITIAL_STATE = {
  records: [],
  loading: false,
  error: null,
};

const isPending = action =>
  typeof action.type === 'string' && action.type.endsWith('/pending');
const isRejected = action =>
  typeof action.type === 'string' && action.type.endsWith('/rejected');

const waterPending = state => {
  state.records = [];
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
      .addCase(fetchAllWaterRecordsOfToday.fulfilled, (state, action) => {
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
      .addMatcher(isPending, waterPending)
      .addMatcher(isRejected, waterRejected);
  },
});

export const waterReducer = waterSlice.reducer;
