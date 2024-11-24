import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import type { Budget } from '../types/expense';

const API_URL = 'http://localhost:5000/api';

export function useBudgets() {
  const queryClient = useQueryClient();

  const { data: budgets = [], isLoading, error } = useQuery<Budget[], Error>(
    'budgets',
    async () => {
      try {
        const { data } = await axios.get(`${API_URL}/budgets`);
        return data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data?.error || 'Failed to fetch budgets');
        }
        throw err;
      }
    },
    {
      initialData: [],
      staleTime: 30000,
    }
  );

  const updateBudget = useMutation<Budget, Error, Budget>(
    async (budget) => {
      try {
        const { data } = await axios.post(`${API_URL}/budgets`, budget);
        return data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data?.error || 'Failed to update budget');
        }
        throw err;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('budgets');
      },
    }
  );

  return {
    budgets,
    isLoading,
    error,
    updateBudget: updateBudget.mutate,
    isUpdatingBudget: updateBudget.isLoading,
    updateBudgetError: updateBudget.error,
  };
}