import axios from 'axios';

// axiosInstance.defaults.baseURL = 'https://aquatrack-backend-bmxm.onrender.com';
// axios.defaults.baseURL = 'https://nodejs-hw-mongodb-s4ss.onrender.com';

const axiosInstance = axios.create({
  baseURL: 'https://aquatrack-backend-bmxm.onrender.com',
});

export default axiosInstance;

// export default axios;
