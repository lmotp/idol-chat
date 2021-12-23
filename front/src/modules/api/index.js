import axios from 'axios';

const loginCheck = () => {
  return axios.get('/api/auth/auth-check');
};

const test = () => {
  return axios.get('/api/auth/test');
};

const api = {
  loginCheck,
  test,
};

export default api;
