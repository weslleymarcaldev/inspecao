import api from './api';

export const inspectionService = {
  getInspections: async (params = {}) => {
    const response = await api.get('/inspections', { params });
    return response.data;
  },

  getInspection: async (id) => {
    const response = await api.get(`/inspections/${id}`);
    return response.data;
  },

  createInspection: async (data) => {
    const response = await api.post('/inspections', data);
    return response.data;
  },

  updateInspection: async (id, data) => {
    const response = await api.put(`/inspections/${id}`, data);
    return response.data;
  },

  deleteInspection: async (id) => {
    const response = await api.delete(`/inspections/${id}`);
    return response.data;
  },

  uploadFile: async (inspectionId, file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('inspection_id', inspectionId.toString());

    const response = await api.post('/inspections/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress,
    });
    return response.data;
  },
};