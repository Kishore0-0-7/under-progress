import mongoose from 'mongoose';
import type { Budget } from '@/types/expense.js';
export declare const BudgetModel: mongoose.Model<Budget, {}, {}, {}, mongoose.Document<unknown, {}, Budget> & Budget & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
