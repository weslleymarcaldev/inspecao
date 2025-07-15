import { useEffect, useState } from 'react';
import { inspectionService } from '../services/inspectionService';

export const useInspections = () => {
  const [inspections, setInspections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInspections = async () => {
      try {
        const data = await inspectionService.getInspections();
        setInspections(data);
      } catch (err) {
        setError(err.message || 'Erro ao carregar inspeções.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchInspections();
  }, []);

  const deleteInspection = async (id) => {
    await inspectionService.deleteInspection(id);
    setInspections((prev) => prev.filter((item) => item.id !== id));
  };

  return { inspections, isLoading, error, deleteInspection };
};