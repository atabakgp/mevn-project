import axios from 'axios'
import {
  showSnackbar
} from '../globalActions';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
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
const login = req => axiosInstance.post('user/login', req);
const signup = req => axiosInstance.post('user/register', req);
const checkToken = () => axiosInstance.get('user/checkToken');
const logout = () => axiosInstance.get('user/logout');

// user profile
export const getProfile = () => axiosInstance.get('user/profile')
export const updateProfile = req => axiosInstance.put('user/profile', req)

// Orders
export const getProducts = () => axiosInstance.get('products');
export const getProductDetails = (id) => axiosInstance.get('product-details/' + id);

export default {
  login,
  signup,
  checkToken,
  logout,
  getProducts,
  getProductDetails
};