import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://aquatrack-backend-bmxm.onrender.com',
});

export default axiosInstance;
