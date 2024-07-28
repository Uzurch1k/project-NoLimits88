import { createAsyncThunk } from '@reduxjs/toolkit';
import { setToken } from './slice';

import axiosInstance from '../../helpers/axiosBase';

export const setAuthHeader = token => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axiosInstance.defaults.headers.common.Authorization = '';
};

export const setupInterceptors = store => {
  axiosInstance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const { refreshToken } = store.getState().auth;

          if (refreshToken) {
            const { data } = await axiosInstance.post('/users/refresh', {
              refreshToken,
            });

            setAuthHeader(data.data.accessToken);
            store.dispatch(setToken(data.data));
            originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;

            return axiosInstance.request(originalRequest);
          }
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    }
  );
};

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axiosInstance.post('/users/signin', credentials);
      const { user, accessToken, refreshToken } = res.data.data;

      setAuthHeader(accessToken);

      return { user, accessToken, refreshToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axiosInstance.post('/users/signup', credentials);
      const data = res.data.data;

      const loginResponse = await thunkAPI
        .dispatch(
          logIn({
            email: credentials.email,
            password: credentials.password,
          })
        )
        .unwrap();

      return { ...data, ...loginResponse };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axiosInstance.post('/users/logout');
    clearAuthHeader();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axiosInstance.get('/users/current');

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/update',
  async (userData, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      const res = await axiosInstance.patch('/users/update', userData);
      return res.data.data; // { _id, name, email, createdAt, updatedAt }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserCount = createAsyncThunk('auth/count', async (_, thunkAPI) => {
  try {
    const res = await axiosInstance.get('/users/count');
    return res.data.count;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
