import axios from 'axios';
import { base_url, config } from '../../utils/base_url';
const getProducts = async () => {
  const response = await axios.get(`${base_url}product`);
  if (response.data) {
    return response.data;
  }
};
const getProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data;
  }
};
const getBrands = async () => {
  const response = await axios.get(`${base_url}brand`);
  if (response.data) {
    return response.data;
  }
};
const deleteBrand = async (id) => {
  const response = await axios.delete(`${base_url}brand/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const getBrand = async (id) => {
  const response = await axios.get(`${base_url}brand/${id}`);
  if (response.data) {
    return response.data;
  }
};
const getColors = async () => {
  const response = await axios.get(`${base_url}product/color`);
  if (response.data) {
    return response.data;
  }
};
const getCategories = async () => {
  const response = await axios.get(`${base_url}prodcategory`);
  if (response.data) {
    return response.data;
  }
};
const addProduct = async (data) => {
  const response = await axios.post(`${base_url}product`, data, config);
  if (response.data) {
    return response.data;
  }
};
const updateProduct = async (data) => {
  const response = await axios.put(
    `${base_url}product/${data.id}`,
    data.data,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const createBrand = async (data) => {
  const response = await axios.post(`${base_url}brand`, data, config);
  if (response.data) {
    return response.data;
  }
};
const createCategory = async (data) => {
  const response = await axios.post(`${base_url}prodcategory`, data, config);
  if (response.data) {
    return response.data;
  }
};
const createColor = async (data) => {
  const response = await axios.post(`${base_url}product/color`, data, config);
  if (response.data) {
    return response.data;
  }
};
const changeBrand = async (data) => {
  const response = await axios.put(
    `${base_url}brand/${data.id}`,
    data.data,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const changeCategory = async (data) => {
  const response = await axios.put(
    `${base_url}prodcategory/${data.id}`,
    data.data,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const getCategory = async (id) => {
  const response = await axios.get(`${base_url}prodcategory/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const deleteCategory = async (id) => {
  const response = await axios.delete(`${base_url}prodcategory/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const changeColor = async (data) => {
  const response = await axios.put(
    `${base_url}product/color/${data.id}`,
    data.data,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const getColor = async (id) => {
  const response = await axios.get(`${base_url}product/color/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const deleteColor = async (id) => {
  const response = await axios.delete(`${base_url}product/color/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const deleteProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
export const productService = {
  getProducts,
  getBrands,
  getColors,
  getCategories,
  addProduct,
  createBrand,
  createCategory,
  createColor,
  changeCategory,
  changeBrand,
  getBrand,
  deleteBrand,
  deleteCategory,
  getCategory,
  changeColor,
  getColor,
  deleteColor,
  getProduct,
  updateProduct,
  deleteProduct,
};
