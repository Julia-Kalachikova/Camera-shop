import axios from 'axios';

const BACKEND_URL =
  'https://camera-shop.accelerator.htmlacademy.pro';
const REQUEST_TIMEOUT = 5000;


export const createAPI = axios.create({
  baseURL: BACKEND_URL,
  timeout: REQUEST_TIMEOUT,
});

