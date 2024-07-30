import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://aquatrack-backend-bmxm.onrender.com',
});

export const setAuthHeader = token => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axiosInstance.defaults.headers.common.Authorization = '';
};

export default axiosInstance;
