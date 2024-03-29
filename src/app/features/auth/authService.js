import axios from 'axios';
import { base_url, config } from '../../utils/base_url';
const login = async (userData) => {
  const getUserFromLocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;
  if (getUserFromLocalStorage) return getUserFromLocalStorage;
  const response = await axios.post(`${base_url}user/admin-login`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};
const logout = async () => {
  const response = await axios.post(`${base_url}user/logout`);
  if (response.data) {
    return response.data;
  }
};
const getUsers = async () => {
  const response = await axios.get(`${base_url}user/all-users`, config);
  if (response.data) {
    return response.data;
  }
};
const getMonthOrder = async () => {
  const response = await axios.get(`${base_url}user/month-order`, config);
  if (response.data) {
    return response.data;
  }
};
const getYearOrder = async () => {
  const response = await axios.get(`${base_url}user/year-order`, config);
  if (response.data) {
    return response.data;
  }
};
export const authService = {
  login,
  getUsers,
  getMonthOrder,
  getYearOrder,
  logout,
};
