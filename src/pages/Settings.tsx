import React from 'react';
import { DashboardCard } from '../components/DashboardCard';
import { useBudgets } from '../hooks/useBudgets';
import type { Category } from '../types/expense';

interface SettingsProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export function Settings({ darkMode, setDarkMode }: SettingsProps) {
  const { budgets, updateBudget } = useBudgets();

  const categories: Category[] = [
    'food',
    'transport',
    'utilities',
    'entertainment',
    'shopping',
    'health',
    'housing',
    'other',
  ];

  const handleBudgetChange = (category: Category, limit: number) => {
    const budget = budgets.find((b) => b.category === category);
    if (budget) {
      updateBudget({ ...budget, limit });
    } else {
      updateBudget({
        category,
        limit,
        spent: 0,
        currency: 'USD',
      });
    }
  };

  return (
    <div className="grid gap-6">
      <DashboardCard title="Appearance">
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Dark Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </DashboardCard>

      <DashboardCard title="Budget Settings">
        <div className="space-y-4">
          {categories.map((category) => {
            const budget = budgets.find((b) => b.category === category);
            return (
              <div
                key={category}
                className="flex items-center justify-between gap-4"
              >
                <span className="text-gray-700 dark:text-gray-300 capitalize">
                  {category}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">$</span>
                  <input
                    type="number"
                    value={budget?.limit || 0}
                    onChange={(e) =>
                      handleBudgetChange(category, Number(e.target.value))
                    }
                    className="w-32 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </DashboardCard>
    </div>
  );
}