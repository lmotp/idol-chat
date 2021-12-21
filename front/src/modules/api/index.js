import axios from 'axios';

const api = {
  loginCheck() {
    return axios.get('/api/auth/auth-check');
  },
};

export default api;
