import axiosInstance from '../../helpers/axiosBase';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import { TODAY } from '../../constants/time';

export const fetchAllWaterRecordsOfDay = createAsyncThunk(
  'water/fetchAllForADay',
  async (day, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/water/day/${day}`);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchAllWaterRecordsOfMonth = createAsyncThunk(
  'water/fetchAllForAMonth',
  async (month, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/water/month/${month}`);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addWaterRecord = createAsyncThunk(
  'water/addRecord',
  async (recordData, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/water', recordData);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteWaterRecord = createAsyncThunk(
  'water/deleteRecord',
  async (recordData, thunkAPI) => {
    try {
      await axiosInstance.delete(`/water/${recordData.id}`);
      // const response = await axiosInstance.get(`/water/day/${recordData.date}`);
      return recordData.id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const editWaterRecord = createAsyncThunk(
  'water/editRecord',
  async (recordData, thunkAPI) => {
    const entry = { amount: recordData.amount, date: recordData.date };
    try {
      await axiosInstance.put(`/water/${recordData.id}`, entry);
      const response = await axiosInstance.get(`/water/day/${recordData.date}`);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
