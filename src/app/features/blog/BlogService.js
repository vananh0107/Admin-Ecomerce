import axios from 'axios';
import { base_url, config } from '../../utils/base_url';
const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog`);
  if (response.data) {
    return response.data;
  }
};
const getBlogCat = async () => {
  const response = await axios.get(`${base_url}blogcategory`);
  if (response.data) {
    return response.data;
  }
};
const createBlogCat = async (data) => {
  const response = await axios.post(`${base_url}blogcategory`, data, config);
  if (response.data) {
    return response.data;
  }
};
const createBlog = async (data) => {
  const response = await axios.post(`${base_url}blog`, data, config);
  if (response.data) {
    return response.data;
  }
};
const uploadImage = async (data) => {
  const response = await axios.post(`${base_url}upload`, data, config);
  if (response.data) {
    return response.data;
  }
};
const chageCategoryBlog = async (data) => {
  const response = await axios.put(
    `${base_url}blogcategory/${data.id}`,
    data.data,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const deleteCategoryBlog = async (id) => {
  const response = await axios.delete(`${base_url}blogcategory/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const getACategoryBlog = async (id) => {
  const response = await axios.get(`${base_url}blogcategory/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const changeBlog = async (data) => {
  const response = await axios.put(
    `${base_url}blog/${data.id}`,
    data.data,
    config
  );
  if (response.data) {
    return response.data;
  }
};
const deleteBlog = async (id) => {
  const response = await axios.delete(`${base_url}blog/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
const getABlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`, config);
  if (response.data) {
    return response.data;
  }
};
export const blogService = {
  getBlogs,
  getBlogCat,
  createBlogCat,
  createBlog,
  uploadImage,
  chageCategoryBlog,
  getACategoryBlog,
  deleteCategoryBlog,
  getABlog,
  deleteBlog,
  changeBlog,
};
