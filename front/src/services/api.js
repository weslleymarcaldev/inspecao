import axios from 'axios';

// Instância base do Axios
const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor de requisição: adiciona o token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de resposta: redireciona se não autorizado
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Serviços de inspeção
export const inspectionService = {
  // Listar inspeções
  getInspections: async (params = {}) => {
    const response = await api.get('/inspections', { params });
    return response.data;
  },

  // Obter uma inspeção por ID
  getInspection: async (id) => {
    const response = await api.get(`/inspections/${id}`);
    return response.data;
  },

  // Criar nova inspeção
  createInspection: async (data) => {
    const response = await api.post('/inspections', data);
    return response.data;
  },

  // Atualizar inspeção existente
  updateInspection: async (id, data) => {
    const response = await api.put(`/inspections/${id}`, data);
    return response.data;
  },

  // Deletar inspeção
  deleteInspection: async (id) => {
    const response = await api.delete(`/inspections/${id}`);
    return response.data;
  },

  // Upload de imagem para uma inspeção
  uploadFile: async (inspectionId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('inspection_id', inspectionId);

    const response = await api.post('/inspections/upload-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },
};

export const companyService = {
  getCompanies: async () => {
    const response = await api.get('/companies');
    return response.data;
  },
};

export const vehicleService = {
  getVehicleTypes: async () => {
    const response = await api.get('/vehicles-types');
    return response.data;
  },
  getVehicleCategories: async (vehicleTypeId) => {
    const params = vehicleTypeId ? { vehicle_type_id: vehicleTypeId } : {};
    const response = await api.get('/vehicles-categories', { params });
    return response.data;
  },
};

export default api;
