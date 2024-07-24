import axios from '../../helpers/axiosBase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setToken } from './slice';

export const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const setupInterceptors = store => {
  axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const { refreshToken, sessionId } = store.getState().auth;
          if (!refreshToken || !sessionId) {
            return Promise.reject('Refresh token or session ID is missing');
          }
          const { data } = await axios.post('/users/refresh', {
            refreshToken,
            sessionId,
          });

          setAuthHeader(data.token);
          store.dispatch(
            setToken({ token: data.token, refreshToken: data.refreshToken })
          );
          originalRequest.headers.Authorization = `Bearer ${data.token}`;
          return axios(originalRequest);
        } catch (err) {
          clearAuthHeader();
          store.dispatch(logOut());
          return Promise.reject(err);
        }
      }
      return Promise.reject(error);
    }
  );
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signup', credentials);
      setAuthHeader(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signin', credentials);
      setAuthHeader(res.data.token);

      // Отримання поточного користувача
      const profileRes = await axios.get('/users/current');
      console.log(profileRes.data);
      return { ...res.data, user: profileRes.data };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
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
      const res = await axios.get('/users/current');
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
