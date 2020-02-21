import axios from 'axios';

const baseURL = 'http://localhost:5000/v1';
const api = axios.create({
  baseURL,
});

export default api;
