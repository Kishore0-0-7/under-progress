import mongoose from 'mongoose';
import type { Budget } from '@/types/expense.js';

const budgetSchema = new mongoose.Schema<Budget>({
  category: { 
    type: String, 
    required: true, 
    unique: true,
    enum: ['food', 'transport', 'utilities', 'entertainment', 'shopping', 'health', 'housing', 'other']
  },
  limit: { type: Number, required: true },
  spent: { type: Number, required: true, default: 0 },
  currency: { type: String, required: true, default: 'USD' }
});

export const BudgetModel = mongoose.model<Budget>('Budget', budgetSchema);