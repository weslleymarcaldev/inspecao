import { create } from 'zustand';

export const useInspectionStore = create((set) => ({
  inspections: [],
  selectedInspection: null,
  isLoading: false,
  filters: {
    status: '',
    plate: '',
    dateFrom: '',
    dateTo: '',
  },
  setInspections: (inspections) => set({ inspections }),
  setSelectedInspection: (inspection) => set({ selectedInspection: inspection }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  clearFilters: () =>
    set({
      filters: {
        status: '',
        plate: '',
        dateFrom: '',
        dateTo: '',
      },
    }),
}));