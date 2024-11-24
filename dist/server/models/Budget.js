import mongoose from 'mongoose';
const budgetSchema = new mongoose.Schema({
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
export const BudgetModel = mongoose.model('Budget', budgetSchema);
