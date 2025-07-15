// Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, CheckCircle } from 'lucide-react';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import Button from '../components/UI/Button';
import { inspectionService } from '../services/api';


const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [inspections, setInspections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await inspectionService.getInspections({ per_page: 10 });
        setInspections(response.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <LoadingSpinner size="lg" text={t('common.loading')} className="h-64" />;

  const totalInspections = inspections.length;
  const pendingInspections = inspections.filter(i => i.status === 'pending').length;
  const completedInspections = inspections.filter(i => i.status === 'completed').length;

  const stats = [
    { title: t('dashboard.totalInspections'), value: totalInspections, icon: FileText, color: 'bg-blue-500' },
    { title: t('dashboard.pendingInspections'), value: pendingInspections, icon: Clock, color: 'bg-yellow-500' },
    { title: t('dashboard.completedInspections'), value: completedInspections, icon: CheckCircle, color: 'bg-green-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
        <Button onClick={() => navigate('/inspections/new')} icon={FileText}>
          {t('inspections.newInspection')}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
