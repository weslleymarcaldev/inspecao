import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { useInspections } from '../hooks/useInspections';
import { useInspectionStore } from '../store/inspectionStore';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const InspectionsList = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { inspections, isLoading, error, deleteInspection } = useInspections();
  const { filters, setFilters, clearFilters } = useInspectionStore();

  const statusOptions = [
    { value: '', label: t('common.filter') },
    { value: 'pending', label: t('inspections.statusPending') },
    { value: 'in_progress', label: t('inspections.statusInProgress') },
    { value: 'completed', label: t('inspections.statusCompleted') },
  ];

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta inspeção?')) {
      try {
        await deleteInspection(id);
      } catch (error) {
        console.error('Erro ao excluir inspeção:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'bg-gray-100 text-gray-800',
      in_progress: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
    };

    const statusPascalCase = status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusClasses[status] || ''}`}>
        {t(`inspections.status${statusPascalCase}`)}
      </span>
    );
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" text={t('common.loading')} className="h-64" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{t('inspections.title')}</h1>
        <Button onClick={() => navigate('/inspections/new')} icon={Plus}>
          {t('inspections.newInspection')}
        </Button>
      </div>

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder={t('inspections.filterByPlate')}
            value={filters.plate}
            onChange={(e) => setFilters({ plate: e.target.value })}
            icon={Search}
          />
          <Select
            options={statusOptions}
            value={filters.status}
            onChange={(e) => setFilters({ status: e.target.value })}
            placeholder={t('inspections.filterByStatus')}
          />
          <Input
            type="date"
            placeholder={t('inspections.filterByDate')}
            value={filters.dateFrom}
            onChange={(e) => setFilters({ dateFrom: e.target.value })}
          />
          <div className="flex gap-2">
            <Button variant="outline" onClick={clearFilters} icon={Filter} className="flex-1">
              {t('common.clear')}
            </Button>
          </div>
        </div>
      </div>

      {/* Lista de Inspeções */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3">
            {error}
          </div>
        )}

        {inspections.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('inspections.plate')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('inspections.company')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('inspections.vehicleType')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('inspections.status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('inspections.createdAt')}
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {t('common.actions')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inspections.map((inspection) => (
                  <tr key={inspection.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {inspection.plate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {inspection.company?.name || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {inspection.vehicle_type?.name || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(inspection.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(inspection.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/inspections/${inspection.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => navigate(`/inspections/${inspection.id}/edit`)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(inspection.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">{t('inspections.noInspections')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InspectionsList;
