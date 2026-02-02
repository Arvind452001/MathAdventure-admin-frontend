import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://node.aitechnotech.in/maryland/api/v1', // 👈 apna backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor → token auto attach
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // console.log("token",token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
