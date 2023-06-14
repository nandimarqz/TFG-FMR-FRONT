import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://tfg-fmr.alwaysdata.net',
 
});

export default axiosInstance