import axiosInstance from '../../helpers/axiosBase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TODAY } from '../../constants/time';

export const fetchAllWaterRecordsOfToday = createAsyncThunk(
  'water/fetchAll',
  async (today, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/water/day/${today}`);
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
      await axiosInstance.post('/water', recordData);
      const response = await axiosInstance.get(`/water/day/${TODAY}`);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteWaterRecord = createAsyncThunk(
  'water/deleteRecord',
  async (recordId, thunkAPI) => {
    try {
      await axiosInstance.delete(`/water/${recordId}`);
      const response = await axiosInstance.get(`/water/day/${TODAY}`);
      return response.data.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
