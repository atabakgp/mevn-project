import axios from 'axios'
import {
  showSnackbar
} from '../globalActions';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/user/',
  withCredentials: true,
});


// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  const method = response.config.method;
  const message = response.data.message
  if (response.status = 200 && method == 'put') {
    showSnackbar(message);
  }
  return response;
}, function (error) {

  return Promise.reject(error);
});

// user authentication
const login = req => axiosInstance.post('login', req);
const signup = req => axiosInstance.post('register', req);
const checkToken = () => axiosInstance.get('checkToken');
const logout = () => axiosInstance.get('logout');

// user profile
export const getProfile = () => axiosInstance.get('profile')
export const updateProfile = req => axiosInstance.put('profile', req)

export default {
  login,
  signup,
  checkToken,
  logout,
};