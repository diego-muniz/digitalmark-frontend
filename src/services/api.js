import axios from 'axios';

const baseURL = 'http://18.229.148.11/';
const api = axios.create({
  baseURL,
});

export default api;
