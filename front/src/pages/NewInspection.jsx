import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Save, ArrowLeft } from 'lucide-react';
import { useInspections } from '../hooks/useInspections';
import { companyService, vehicleService } from '../services/api';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import Select from '../components/UI/Select';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const NewInspection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { createInspection, isLoading: isCreating } = useInspections();
  
  const [companies, setCompanies] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [vehicleCategories, setVehicleCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const selectedVehicleType = watch('vehicle_type_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companiesResponse, vehicleTypesResponse] = await Promise.all([
          companyService.getCompanies(),
          vehicleService.getVehicleTypes(),
        ]);

        setCompanies(companiesResponse.data);
        setVehicleTypes(vehicleTypesResponse.data);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      if (selectedVehicleType) {
        try {
          const response = await vehicleService.getVehicleCategories(Number(selectedVehicleType));
          setVehicleCategories(response.data);
        } catch (error) {
          console.error('Erro ao carregar categorias:', error);
        }
      } else {
        setVehicleCategories([]);
      }
    };

    fetchCategories();
  }, [selectedVehicleType]);

  const onSubmit = async (data) => {
    try {
      await createInspection({
        ...data,
        status: 'pending',
      });
      
      navigate('/inspections', {
        state: { message: t('newInspection.success') }
      });
    } catch (error) {
      console.error('Erro ao criar inspeção:', error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner size="lg" text={t('common.loading')} className="h-64" />;
  }

  const companyOptions = companies.map(company => ({
    value: company.id,
    label: company.name,
  }));

  const vehicleTypeOptions = vehicleTypes.map(type => ({
    value: type.id,
    label: type.name,
  }));

  const vehicleCategoryOptions = vehicleCategories.map(category => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/inspections')}
          icon={ArrowLeft}
        >
          {t('common.cancel')}
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">{t('newInspection.title')}</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Select
            label={t('newInspection.selectCompany')}
            options={companyOptions}
            placeholder={t('newInspection.selectCompany')}
            error={errors.company_id?.message}
            required
            {...register('company_id', {
              required: t('validation.required'),
              valueAsNumber: true,
            })}
          />

          <Select
            label={t('newInspection.selectVehicleType')}
            options={vehicleTypeOptions}
            placeholder={t('newInspection.selectVehicleType')}
            error={errors.vehicle_type_id?.message}
            required
            {...register('vehicle_type_id', {
              required: t('validation.required'),
              valueAsNumber: true,
            })}
          />

          <Select
            label={t('newInspection.selectCategory')}
            options={vehicleCategoryOptions}
            placeholder={t('newInspection.selectCategory')}
            error={errors.vehicle_category_id?.message}
            required
            disabled={!selectedVehicleType}
            {...register('vehicle_category_id', {
              required: t('validation.required'),
              valueAsNumber: true,
            })}
          />

          <Input
            label={t('newInspection.plateNumber')}
            placeholder="ABC-1234"
            error={errors.plate?.message}
            required
            {...register('plate', {
              required: t('validation.required'),
              pattern: {
                value: /^[A-Z]{3}-\d{4}$/,
                message: t('validation.invalidPlate'),
              },
            })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('newInspection.observations')}
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder={t('newInspection.observations')}
              {...register('observations')}
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              className="flex-1"
            >
              {t('common.clear')}
            </Button>
            <Button
              type="submit"
              loading={isCreating}
              icon={Save}
              className="flex-1"
            >
              {t('newInspection.createInspection')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default NewInspection;