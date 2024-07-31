import { createSlice } from '@reduxjs/toolkit';
import { WATER_INITIAL_STATE } from './initialState';
import {
  fetchAllWaterRecordsOfDay,
  fetchAllWaterRecordsOfMonth,
  addWaterRecord,
  deleteWaterRecord,
  editWaterRecord,
} from './operations';
import { TODAY } from '../../constants/time';
import { calculateWaterDrunkPerDay } from '../../helpers/calculateWaterDrunkPerDay';

const storedSelectedDay = localStorage.getItem('selectedDay') || TODAY;

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
  initialState: {
    ...WATER_INITIAL_STATE,
    selectedDay: storedSelectedDay,
  },
  reducers: {
    setMonth(state, action) {
      state.selectedMonth = action.payload;
    },
    setSelectedDay(state) {
      state.selectedDay = TODAY;
      localStorage.setItem('selectedDay', TODAY);
    },
    clearSelectedDay: state => {
      state.selectedDay = null;
      localStorage.removeItem('selectedDay');
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
        const amountOfWaterDrunkPerDay = calculateWaterDrunkPerDay(
          action.payload.waterRecordsOfDay
        );

        state.waterDrunkPerDay = amountOfWaterDrunkPerDay;

        state.waterDaily.records = action.payload.waterRecordsOfDay.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );

        state.selectedDay = action.payload.selectedDate;
        localStorage.setItem('selectedDay', action.payload.selectedDate);
        state.waterDaily.isLoading = false;
        state.error = null;
      })

      .addCase(fetchAllWaterRecordsOfMonth.pending, state => {
        state.waterMonthly.records = [];
        state.waterMonthly.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAllWaterRecordsOfMonth.fulfilled, (state, action) => {
        const amountOfWaterDrunkPerDay = calculateWaterDrunkPerDay(
          state.waterDaily.records
        );

        state.waterDrunkPerDay = amountOfWaterDrunkPerDay;

        state.waterMonthly.records = action.payload.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
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

        const insertRecord = (records, record) => {
          const index = records.findIndex(
            r => new Date(r.date) > new Date(record.date)
          );
          if (index === -1) {
            records.push(record);
          } else {
            records.splice(index, 0, record);
          }
        };

        insertRecord(state.waterDaily.records, action.payload);

        if (isRecordInCurrentMonth) {
          insertRecord(state.waterMonthly.records, action.payload);
        }

        state.waterDrunkPerDay = calculateWaterDrunkPerDay(
          state.waterDaily.records
        );

        state.waterDaily.isLoading = false;
        state.error = null;
      })

      .addCase(deleteWaterRecord.pending, state => {
        state.waterDaily.isLoading = true;
      })
      .addCase(deleteWaterRecord.fulfilled, (state, action) => {
        const recordToDelete = state.waterDaily.records.find(
          record => record._id === action.payload
        );

        const isRecordToday = recordToDelete.date.startsWith(TODAY.slice(0, 9));
        const isRecordInCurrentMonth = recordToDelete.date.startsWith(
          state.selectedMonth.slice(0, 7)
        );

        state.waterDaily.records = state.waterDaily.records.filter(
          record => record._id !== action.payload
        );

        if (isRecordInCurrentMonth) {
          state.waterMonthly.records = state.waterMonthly.records.filter(
            record => record._id !== action.payload
          );
        }

        state.waterDrunkPerDay = calculateWaterDrunkPerDay(
          state.waterDaily.records
        );

        state.waterDaily.isLoading = false;
        state.error = null;
      })

      .addCase(editWaterRecord.pending, state => {
        state.waterDaily.isLoading = true;
        state.error = null;
      })
      .addCase(editWaterRecord.fulfilled, (state, action) => {
        const isRecordToday = action.payload.date.startsWith(TODAY.slice(0, 9));
        const isRecordInCurrentMonth = action.payload.date.startsWith(
          state.selectedMonth.slice(0, 7)
        );

        const filterRecords = records =>
          records.filter(record => record._id !== action.payload._id);

        if (isRecordToday || !isRecordInCurrentMonth) {
          state.waterDaily.records = filterRecords(state.waterDaily.records);
        }

        if (isRecordInCurrentMonth) {
          state.waterMonthly.records = filterRecords(
            state.waterMonthly.records
          );
        }

        if (isRecordToday) {
          const index = state.waterDaily.records.findIndex(
            record => new Date(record.date) > new Date(action.payload.date)
          );

          if (index === -1) {
            state.waterDaily.records.push(action.payload);
          } else {
            state.waterDaily.records.splice(index, 0, action.payload);
          }
        }

        if (isRecordInCurrentMonth) {
          const index = state.waterMonthly.records.findIndex(
            record => new Date(record.date) > new Date(action.payload.date)
          );

          if (index === -1) {
            state.waterMonthly.records.push(action.payload);
          } else {
            state.waterMonthly.records.splice(index, 0, action.payload);
          }
        }

        state.waterDrunkPerDay = calculateWaterDrunkPerDay(
          state.waterDaily.records
        );

        state.waterDaily.isLoading = false;
        state.error = null;
      })

      .addMatcher(isWaterRejected, waterRejected);
  },
});

export const { setMonth, setSelectedDay, clearSelectedDay } =
  waterSlice.actions;

export const waterReducer = waterSlice.reducer;
