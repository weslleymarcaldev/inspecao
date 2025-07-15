import { useState } from 'react';
import { inspectionService } from '../services/api';

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState({ loaded: 0, total: 0, percentage: 0 });
  const [error, setError] = useState(null);

  const uploadFile = async (inspectionId, file) => {
    try {
      setIsUploading(true);
      setError(null);
      setProgress({ loaded: 0, total: file.size, percentage: 0 });

      const response = await inspectionService.uploadFile(inspectionId, file);
      
      setProgress({ loaded: file.size, total: file.size, percentage: 100 });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Erro no upload');
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpload = () => {
    setProgress({ loaded: 0, total: 0, percentage: 0 });
    setError(null);
    setIsUploading(false);
  };

  return {
    uploadFile,
    isUploading,
    progress,
    error,
    resetUpload,
  };
};