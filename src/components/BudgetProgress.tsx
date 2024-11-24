import React from 'react';
import type { Budget } from '../types/expense';

interface BudgetProgressProps {
  budgets: Budget[];
}

export function BudgetProgress({ budgets }: BudgetProgressProps) {
  return (
    <div className="space-y-4">
      {budgets.map((budget) => {
        const percentage = (budget.spent / budget.limit) * 100;
        const isOverBudget = percentage > 100;
        
        return (
          <div key={budget.category} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium capitalize text-gray-700 dark:text-gray-300">
                {budget.category}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {budget.currency} {budget.spent.toFixed(2)} / {budget.limit.toFixed(2)}
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  isOverBudget ? 'bg-red-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}