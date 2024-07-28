import {
  createSlice,
  isPending,
  isFulfilled,
  isRejected,
} from '@reduxjs/toolkit';

export const WATER_INITIAL_STATE = {
  records: [],
  loading: false,
  error: null,
};

const waterPending = state => {
  state.records = [];
  state.loading = true;
  state.error = null;
};
const waterFulfilled = (state, action) => {
  state.records = action.payload;
  state.loading = false;
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
      .addMatcher(isPending, waterPending)
      .addMatcher(isFulfilled, waterFulfilled)
      .addMatcher(isRejected, waterRejected);
  },
});

export const waterReducer = waterSlice.reducer;
