import { useState } from 'react';
import { inspectionService } from '../services/api';

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState({ percentage: 0 });
  const [error, setError] = useState(null);

  const uploadFile = async (inspectionId, file) => {
    setIsUploading(true);
    setError(null);

    try {
      const result = await inspectionService.uploadFile(inspectionId, file, (event) => {
        const percentage = Math.round((event.loaded * 100) / event.total);
        setProgress({ percentage });
      });
      return result;
    } catch (err) {
      setError(err.message || 'Erro no upload.');
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpload = () => {
    setIsUploading(false);
    setProgress({ percentage: 0 });
    setError(null);
  };

  return { uploadFile, isUploading, progress, error, resetUpload };
};