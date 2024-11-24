import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import { ExpenseList } from '../components/ExpenseList';
import { BudgetProgress } from '../components/BudgetProgress';
import { AddExpenseModal } from '../components/AddExpenseModal';
import { useExpenses } from '../hooks/useExpenses';
import { useBudgets } from '../hooks/useBudgets';

export function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { expenses, isLoading: expensesLoading, addExpense } = useExpenses();
  const { budgets, isLoading: budgetsLoading } = useBudgets();
  
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.limit, 0);
  const savings = totalBudget - totalExpenses;

  if (expensesLoading || budgetsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-end mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          <span>Add Expense</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <DashboardCard title="Total Expenses">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ${totalExpenses.toFixed(2)}
          </p>
        </DashboardCard>
        <DashboardCard title="Monthly Budget">
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            ${totalBudget.toFixed(2)}
          </p>
        </DashboardCard>
        <DashboardCard title="Savings">
          <p className={`text-3xl font-bold ${savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ${savings.toFixed(2)}
          </p>
        </DashboardCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardCard title="Recent Expenses">
          <ExpenseList expenses={expenses.slice(0, 5)} />
        </DashboardCard>
        <DashboardCard title="Budget Overview">
          <BudgetProgress budgets={budgets} />
        </DashboardCard>
      </div>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addExpense}
      />
    </>
  );
}