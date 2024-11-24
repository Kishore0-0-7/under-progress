import mongoose from 'mongoose';
const expenseSchema = new mongoose.Schema({
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
export const ExpenseModel = mongoose.model('Expense', expenseSchema);
