import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/user/',
  withCredentials: true,
});

export default instance;