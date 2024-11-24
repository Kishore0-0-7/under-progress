import mongoose from 'mongoose';
import type { Expense } from '@/types/expense.js';

const expenseSchema = new mongoose.Schema<Expense>({
  id: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true, default: 'USD' },
  category: { 
    type: String, 
    required: true,
    enum: ['food', 'transport', 'utilities', 'entertainment', 'shopping', 'health', 'housing', 'other']
  },
  description: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  recurring: { type: Boolean, default: false },
  receipt: { type: String }
});

export const ExpenseModel = mongoose.model<Expense>('Expense', expenseSchema);