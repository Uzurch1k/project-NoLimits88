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
  axios.interceptors.request.use(
    async config => {
      const { token } = store.getState().auth;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      console.log('Request Interceptor', config);
      return config;
    },
    error => Promise.reject(error)
  );

  axios.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest = error.config;
      console.log('Response Error Interceptor', error.response.status);

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const { refreshToken, sessionId } = store.getState().auth;

        if (!refreshToken || !sessionId) {
          store.dispatch(logOut());
          return Promise.reject('Refresh token or session ID is missing');
        }

        try {
          console.log('Attempting to refresh token');
          const { data } = await axios.post('/users/refresh', {
            refreshToken,
            sessionId,
          });

          console.log('New tokens:', data);

          setAuthHeader(data.accessToken);
          store.dispatch(
            setToken({
              accessToken: data.accessToken,
              refreshToken: refreshToken, // Якщо refreshToken не змінюється
            })
          );

          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
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
      console.log('Register response:', res.data);
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
      console.log(credentials);
      setAuthHeader(res.data.data.accessToken);
      console.log('Login response:', res.data.data);
      return res.data.data; // { user, accessToken }
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
    // console.log(state.auth);
    // console.log(persistedToken);

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      setAuthHeader(persistedToken);
      const res = await axios.get('/users/current');
      // console.log(res);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
