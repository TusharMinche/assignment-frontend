import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const uploadReport = async (file) => {
  const formData = new FormData();
  formData.append('xmlFile', file);

  const response = await api.post('/reports/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const getAllReports = async (page = 1, limit = 10) => {
  const response = await api.get(`/reports?page=${page}&limit=${limit}`);
  return response.data;
};

export const getReportById = async (id) => {
  const response = await api.get(`/reports/${id}`);
  return response.data;
};

export const deleteReport = async (id) => {
  const response = await api.delete(`/reports/${id}`);
  return response.data;
};

export const searchByPAN = async (pan) => {
  const response = await api.get(`/reports/search/pan/${pan}`);
  return response.data;
};