import axios from 'axios';

// axios.defaults.baseURL = 'https://aquatrack-backend-bmxm.onrender.com';
// axios.defaults.baseURL = 'https://nodejs-hw-mongodb-s4ss.onrender.com';

const axiosInstance = axios.create({
  baseURL: 'https://aquatrack-backend-bmxm.onrender.com',
  withCredentials: true,
});

export default axiosInstance;

// export default axios;
