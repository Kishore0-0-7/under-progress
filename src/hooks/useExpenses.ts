import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import type { Expense } from '../types/expense';

const API_URL = 'http://localhost:5000/api';

export function useExpenses() {
  const queryClient = useQueryClient();

  const { data: expenses = [], isLoading, error } = useQuery<Expense[], Error>(
    'expenses',
    async () => {
      try {
        const { data } = await axios.get(`${API_URL}/expenses`);
        return data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data?.error || 'Failed to fetch expenses');
        }
        throw err;
      }
    },
    {
      initialData: [],
      staleTime: 30000,
    }
  );

  const addExpense = useMutation<Expense, Error, Omit<Expense, 'id'>>(
    async (newExpense) => {
      try {
        const { data } = await axios.post(`${API_URL}/expenses`, {
          ...newExpense,
          id: crypto.randomUUID(),
        });
        return data;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          throw new Error(err.response?.data?.error || 'Failed to add expense');
        }
        throw err;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('expenses');
      },
    }
  );

  return {
    expenses,
    isLoading,
    error,
    addExpense: addExpense.mutate,
    isAddingExpense: addExpense.isLoading,
    addExpenseError: addExpense.error,
  };
}