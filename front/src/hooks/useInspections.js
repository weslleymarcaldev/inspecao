import { useState, useEffect } from 'react';
import { inspectionService } from '../services/api';
import { useInspectionStore } from '../store/inspectionStore';

export const useInspections = () => {
  const {
    inspections,
    setInspections,
    isLoading,
    setIsLoading,
    filters,
  } = useInspectionStore();

  const [error, setError] = useState(null);

  const fetchInspections = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const params = {
        ...(filters.status && { status: filters.status }),
        ...(filters.plate && { plate: filters.plate }),
        ...(filters.dateFrom && { date_from: filters.dateFrom }),
        ...(filters.dateTo && { date_to: filters.dateTo }),
      };

      const response = await inspectionService.getInspections(params);
      setInspections(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao carregar inspeções');
    } finally {
      setIsLoading(false);
    }
  };

  const createInspection = async (data) => {
    try {
      setIsLoading(true);
      const response = await inspectionService.createInspection(data);
      await fetchInspections(); // Recarrega a lista
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao criar inspeção');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateInspection = async (id, data) => {
    try {
      setIsLoading(true);
      const response = await inspectionService.updateInspection(id, data);
      await fetchInspections(); // Recarrega a lista
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao atualizar inspeção');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteInspection = async (id) => {
    try {
      setIsLoading(true);
      await inspectionService.deleteInspection(id);
      await fetchInspections(); // Recarrega a lista
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao excluir inspeção');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInspections();
  }, [filters]);

  return {
    inspections,
    isLoading,
    error,
    fetchInspections,
    createInspection,
    updateInspection,
    deleteInspection,
  };
};