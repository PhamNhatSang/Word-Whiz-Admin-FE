// src/api/axios.js
import axios from 'axios';
import qs from 'qs';
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Replace with your API base URL
});
const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
});
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken'); // Get token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;

export async function getUsers(params) {
  const { data } = await axiosInstance.get(`/api/admin/users?${qs.stringify(getRandomuserParams(params))}`);
  return data;
}

export async function getPosts(params) {
  const { data } = await axiosInstance.get(`/api/admin/posts?${qs.stringify(getRandomuserParams(params))}`
  );
  return data;
}

export async function updateUser(params){
  const { data } = await axiosInstance.put(`/api/admin/user`, params,{ headers: { "Content-Type": "multipart/form-data" } });
  return data;
}

export async function deleteUser(id){
  const { data } = await axiosInstance.delete(`/api/admin/user/${id}`);
  return data;
}

export async function deletePost(id){
  const { data } = await axiosInstance.delete(`/api/admin/post/${id}`);
  return data;
}

