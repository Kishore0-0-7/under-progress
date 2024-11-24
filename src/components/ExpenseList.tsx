import React from 'react';
import { format } from 'date-fns';
import { Receipt, Calendar, DollarSign } from 'lucide-react';
import type { Expense } from '../types/expense';

interface ExpenseListProps {
  expenses: Expense[];
}

export function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <DollarSign className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {expense.description}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                <span>{format(expense.date, 'MMM d, yyyy')}</span>
                {expense.receipt && (
                  <Receipt className="w-4 h-4 text-green-500" />
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {expense.currency} {expense.amount.toFixed(2)}
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {expense.category}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}