import axios from 'axios';

const baseURL = 'http://34.201.92.117/';
const api = axios.create({
  baseURL,
});

export default api;
