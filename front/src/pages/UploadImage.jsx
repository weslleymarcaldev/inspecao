import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useInspections } from '../hooks/useInspections';
import { useUpload } from '../hooks/useUpload';
import Button from '../components/UI/Button';
import Select from '../components/UI/Select';
import FileUpload from '../components/UI/FileUpload';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const UploadImage = () => {
  const navigate = useNavigate();
  const { inspections, isLoading } = useInspections();
  const { uploadFile, isUploading, progress, error, resetUpload } = useUpload();
  
  const [selectedInspectionId, setSelectedInspectionId] = useState(null);
  const [uploadResults, setUploadResults] = useState([]);
  const [analysisResults, setAnalysisResults] = useState(null);

  const inspectionOptions = inspections.map(inspection => ({
    value: inspection.id,
    label: `${inspection.plate} - ${inspection.company?.name || 'N/A'}`,
  }));

  const handleFileSelect = async (files) => {
    if (!selectedInspectionId) {
      alert('Selecione uma inspeção primeiro');
      return;
    }

    resetUpload();
    const results = [];

    for (const file of files) {
      try {
        const result = await uploadFile(selectedInspectionId, file);
        results.push({ file: file.name, success: true, data: result });

        const analysisRes = await fetch(`/api/analyze/${selectedInspectionId}`, {
          method: 'POST',
        });
        const analysisJson = await analysisRes.json();

        setAnalysisResults({
          plateRecognized: analysisJson.data.plate,
          confidence: analysisJson.data.confidence,
          angle: analysisJson.data.car_angle,
          damageDetected: analysisJson.data.damage_detected,
          vehiclePosition: analysisJson.data.car_condition,
        });

      } catch (err) {
        results.push({ file: file.name, success: false, error: err });
      }
    }

    setUploadResults(results);
  };

  // eslint-disable-next-line react/prop-types
  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  if (isLoading) {
    return <LoadingSpinner size="lg" text="Carregando..." className="h-64" />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/inspections')}
          icon={ArrowLeft}
        >
          Voltar
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Upload de Imagens</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Upload de Imagens</h2>
          <div className="space-y-4">
            <Select
              label="Selecione uma inspeção"
              options={inspectionOptions}
              placeholder="Selecione uma inspeção"
              value={selectedInspectionId || ''}
              onChange={(e) => setSelectedInspectionId(Number(e.target.value))}
              required
            />
            <FileUpload
              onFileSelect={handleFileSelect}
              accept="image/*"
              multiple
              maxSize={10}
            />

            {isUploading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progresso do Upload</span>
                  <span>{progress.percentage.toFixed(0)}%</span>
                </div>
                <ProgressBar progress={progress.percentage} />
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Resultados</h2>

          {uploadResults.length > 0 && (
            <div className="space-y-3 mb-6">
              <h3 className="font-medium text-gray-700">Status do Upload:</h3>
              {uploadResults.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 p-3 rounded-lg ${
                    result.success
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  {result.success ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  <span className={result.success ? 'text-green-700' : 'text-red-700'}>
                    {result.file} - {result.success ? 'Sucesso' : 'Erro'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {analysisResults && (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-700">Análise da Imagem:</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm font-medium text-blue-700">Placa Reconhecida</p>
                  <p className="text-blue-900">
                    {analysisResults.plateRecognized} ({analysisResults.confidence}% confiança)
                  </p>
                </div>
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm font-medium text-green-700">Ângulo Detectado</p>
                  <p className="text-green-900">{analysisResults.angle}</p>
                </div>
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <p className="text-sm font-medium text-purple-700">Posição do Veículo</p>
                  <p className="text-purple-900">{analysisResults.vehiclePosition}</p>
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    analysisResults.damageDetected ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
                  }`}
                >
                  <p className={`text-sm font-medium ${
                    analysisResults.damageDetected ? 'text-red-700' : 'text-green-700'
                  }`}>
                    Danos Detectados
                  </p>
                  <p className={`text-sm font-medium ${
                    analysisResults.damageDetected ? 'text-red-900' : 'text-green-900'
                  }`}>
                    {analysisResults.damageDetected ? 'Danos encontrados' : 'Nenhum dano detectado'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {isUploading && !analysisResults && uploadResults.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <LoadingSpinner size="sm" />
              <p className="text-yellow-700">Analisando...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
