import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { DashboardCard } from '../components/DashboardCard';
import { useExpenses } from '../hooks/useExpenses';
import { useBudgets } from '../hooks/useBudgets';
import type { Category } from '../types/expense';

const COLORS = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#8884D8',
  '#82CA9D',
  '#FFC658',
  '#FF6B6B',
];

export function Analytics() {
  const { expenses } = useExpenses();
  const { budgets } = useBudgets();

  const categoryData = React.useMemo(() => {
    const data: Record<Category, number> = {
      food: 0,
      transport: 0,
      utilities: 0,
      entertainment: 0,
      shopping: 0,
      health: 0,
      housing: 0,
      other: 0,
    };

    expenses.forEach((expense) => {
      data[expense.category] += expense.amount;
    });

    return Object.entries(data).map(([name, value]) => ({
      name,
      value,
    }));
  }, [expenses]);

  const monthlyData = React.useMemo(() => {
    const data: Record<string, number> = {};
    
    expenses.forEach((expense) => {
      const month = new Date(expense.date).toLocaleString('default', {
        month: 'short',
      });
      data[month] = (data[month] || 0) + expense.amount;
    });

    return Object.entries(data).map(([month, amount]) => ({
      month,
      amount,
    }));
  }, [expenses]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <DashboardCard title="Expenses by Category">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {categoryData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>

      <DashboardCard title="Monthly Spending">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#0088FE" name="Amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>

      <DashboardCard title="Budget vs Actual" className="lg:col-span-2">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={budgets}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="limit" fill="#82ca9d" name="Budget" />
              <Bar dataKey="spent" fill="#8884d8" name="Spent" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </DashboardCard>
    </div>
  );
}