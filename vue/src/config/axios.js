import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/user/',
  withCredentials: true,
});

// user authentication
const login = req => axiosInstance.post('login', req);
const signup = req => axiosInstance.post('register', req);
const checkToken = () => axiosInstance.get('checkToken');
const logout = () => axiosInstance.get('logout');

// user profile
export const getProfile = req => axiosInstance.get('profile', req)


export default {
  login,
  signup,
  checkToken,
  logout,
};