import mongoose from 'mongoose';
import type { Expense } from '@/types/expense.js';
export declare const ExpenseModel: mongoose.Model<Expense, {}, {}, {}, mongoose.Document<unknown, {}, Expense> & Expense & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
