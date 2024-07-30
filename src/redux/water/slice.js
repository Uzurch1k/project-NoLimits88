import { createSlice, current } from '@reduxjs/toolkit';
import { WATER_INITIAL_STATE } from './initialState';
import {
  fetchAllWaterRecordsOfDay,
  fetchAllWaterRecordsOfMonth,
  addWaterRecord,
  deleteWaterRecord,
  editWaterRecord,
} from './operations';
import { TODAY } from '../../constants/time';

const isWaterRejected = action =>
  typeof action.type === 'string' &&
  action.type.startsWith('water') &&
  action.type.endsWith('rejected');

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
        const amountOfWaterDrunkPerDay =
          action.payload.waterRecordsOfDay.reduce(
            (totalAmount, record) => totalAmount + record.amount,
            0
          );

        state.waterDrunkPerDay = amountOfWaterDrunkPerDay;
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
        const amountOfWaterDrunkPerDay = state.waterDaily.records.reduce(
          (totalAmount, record) => totalAmount + record.amount,
          0
        );
        state.waterDrunkPerDay = amountOfWaterDrunkPerDay;

        state.waterMonthly.records = action.payload;
        state.waterMonthly.isLoading = false;
        state.error = null;
      })

      .addCase(addWaterRecord.pending, state => {
        state.waterDaily.isLoading = true;
      })
      .addCase(addWaterRecord.fulfilled, (state, action) => {
        const isRecordToday = action.payload.date.startsWith(TODAY.slice(0, 9));
        const isRecordInCurrentMonth = action.payload.date.startsWith(
          state.selectedMonth.slice(0, 7)
        );
        if (isRecordToday && isRecordInCurrentMonth) {
          console.log('current day, and current month');

          const amountOfWaterDrunkPerDay = state.waterDaily.records.reduce(
            (totalAmount, record) => {
              console.log(record.amount + totalAmount);
              totalAmount + record.amount;
            },
            0
          );
          console.log(amountOfWaterDrunkPerDay);
          state.waterDrunkPerDay = amountOfWaterDrunkPerDay;

          state.waterDaily.records = [
            ...state.waterDaily.records,
            action.payload,
          ];
          state.waterMonthly.records = [
            ...state.waterMonthly.records,
            action.payload,
          ];
          state.waterDaily.isLoading = false;
          state.error = null;
          return;
        }
        if (!isRecordToday && isRecordInCurrentMonth) {
          console.log('not current day, and current month');

          const amountOfWaterDrunkPerDay = state.waterDaily.records.reduce(
            (totalAmount, record) => totalAmount + record.amount,
            0
          );
          state.waterDrunkPerDay = amountOfWaterDrunkPerDay;

          state.waterDaily.records = [
            ...state.waterDaily.records,
            action.payload,
          ];
          state.waterMonthly.records = [
            ...state.waterMonthly.records,
            action.payload,
          ];
          state.waterDaily.isLoading = false;
          state.error = null;
          return;
        }
        if (isRecordToday && !isRecordInCurrentMonth) {
          console.log('current day, not current month');

          const amountOfWaterDrunkPerDay = state.waterDaily.records.reduce(
            (totalAmount, record) => totalAmount + record.amount,
            0
          );
          state.waterDrunkPerDay = amountOfWaterDrunkPerDay;

          state.waterDaily.records = [
            ...state.waterDaily.records,
            action.payload,
          ];
          state.waterDaily.isLoading = false;
          state.error = null;
          return;
        }
        if (!isRecordToday && !isRecordInCurrentMonth) {
          console.log('not current day, record not in current month');

          const amountOfWaterDrunkPerDay = state.waterDaily.records.reduce(
            (totalAmount, record) => totalAmount + record.amount,
            0
          );
          state.waterDrunkPerDay = amountOfWaterDrunkPerDay;

          state.waterDaily.records = [
            ...state.waterDaily.records,
            action.payload,
          ];
          state.waterDaily.isLoading = false;
          state.error = null;
          return;
        }
      })

      .addCase(deleteWaterRecord.pending, state => {
        state.waterDaily.isLoading = true;
      })
      .addCase(deleteWaterRecord.fulfilled, (state, action) => {
        const recordDate = state.waterDaily.records.find(
          record => record._id === action.payload
        );

        const isRecordToday = recordDate.date.startsWith(TODAY.slice(0, 9));
        const isRecordInCurrentMonth = recordDate.date.startsWith(
          state.selectedMonth.slice(0, 7)
        );
        if (isRecordToday && isRecordInCurrentMonth) {
          console.log('current day, and current month');

          const amountOfWaterDrunkPerDay = state.waterDaily.records.reduce(
            (totalAmount, record) => totalAmount + record.amount,
            0
          );
          state.waterDrunkPerDay = amountOfWaterDrunkPerDay;

          state.waterDaily.records = state.waterDaily.records.filter(
            record => record._id !== action.payload
          );
          state.waterMonthly.records = state.waterMonthly.records.filter(
            record => record._id !== action.payload
          );
          state.waterDaily.isLoading = false;
          state.error = null;
          return;
        }
        if (!isRecordToday && isRecordInCurrentMonth) {
          console.log('not current day, and current month');

          const amountOfWaterDrunkPerDay = state.waterDaily.records.reduce(
            (totalAmount, record) => totalAmount + record.amount,
            0
          );
          state.waterDrunkPerDay = amountOfWaterDrunkPerDay;

          state.waterDaily.records = state.waterDaily.records.filter(
            record => record._id !== action.payload
          );
          state.waterMonthly.records = state.waterMonthly.records.filter(
            record => record._id !== action.payload
          );
          state.waterDaily.isLoading = false;
          state.error = null;
          return;
        }
        if (isRecordToday && !isRecordInCurrentMonth) {
          console.log('current day, and not current month');

          const amountOfWaterDrunkPerDay = state.waterDaily.records.reduce(
            (totalAmount, record) => totalAmount + record.amount,
            0
          );
          state.waterDrunkPerDay = amountOfWaterDrunkPerDay;

          state.waterDaily.records = state.waterDaily.records.filter(
            record => record._id !== action.payload
          );
          state.waterDaily.isLoading = false;
          state.error = null;
          return;
        }
        if (!isRecordToday && !isRecordInCurrentMonth) {
          console.log('not current day, and not current month');

          const amountOfWaterDrunkPerDay = state.waterDaily.records.reduce(
            (totalAmount, record) => totalAmount + record.amount,
            0
          );
          state.waterDrunkPerDay = amountOfWaterDrunkPerDay;

          state.waterDaily.records = state.waterDaily.records.filter(
            record => record._id !== action.payload
          );
          state.waterDaily.isLoading = false;
          state.error = null;
          return;
        }
      })

      // .addCase(editWaterRecord.pending, state => {
      //   state.waterDaily.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(editWaterRecord.fulfilled, (state, action) => {
      //   const isRecordToday = action.payload[0].date.startsWith(
      //     TODAY.slice(0, 9)
      //   );
      //   const isRecordInCurrentMonth = action.payload[0].date.startsWith(
      //     state.selectedMonth.slice(0, 6)
      //   );
      //   if (isRecordToday && isRecordInCurrentMonth) {
      //     state.waterDaily.records = [
      //       ...state.waterDaily.records,
      //       action.payload,
      //     ];
      //     state.waterMonthly.records = [
      //       ...state.waterDaily.records,
      //       action.payload,
      //     ];
      //     state.waterDaily.isLoading = false;
      //     state.error = null;
      //     return;
      //   }
      //   if (!isRecordToday && isRecordInCurrentMonth) {
      //     state.waterDaily.records = state.waterDaily.records.filter(
      //       record => record._id !== action.payload
      //     );
      //     state.waterMonthly.records = state.waterMonthly.records.filter(
      //       record => record._id !== action.payload
      //     );
      //     state.waterDaily.isLoading = false;
      //     state.error = null;
      //     return;
      //   }
      //   if (!isRecordToday && !isRecordInCurrentMonth) {
      //     state.waterDaily.records = state.waterDaily.records.filter(
      //       record => record._id !== action.payload
      //     );
      //     // state.waterMonthly.records = [...state.waterMonthly.records];
      //     state.waterDaily.isLoading = false;
      //     state.error = null;
      //     return;
      //   }
      //   state.records = action.payload;
      //   state.loading = false;
      //   state.error = null;
      // })
      .addMatcher(isWaterRejected, waterRejected);
  },
});

export const waterReducer = waterSlice.reducer;
export const { setMonth } = waterSlice.actions;
