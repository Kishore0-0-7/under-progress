import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { StatusCodes } from 'http-status-codes';
import asyncHandler from 'express-async-handler';
import { connectDB } from './db.js';
import { ExpenseModel } from './models/Expense.js';
import { BudgetModel } from './models/Budget.js';
import { errorHandler } from './middleware/errorHandler.js';
// Load environment variables
config();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());
// Connect to MongoDB
connectDB().catch(console.error);
// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(StatusCodes.OK).json({ status: 'healthy' });
});
// Expenses API
app.get('/api/expenses', asyncHandler(async (req, res) => {
    const expenses = await ExpenseModel.find().sort({ date: -1 });
    res.json(expenses);
}));
app.post('/api/expenses', asyncHandler(async (req, res) => {
    const expense = new ExpenseModel(req.body);
    await expense.save();
    res.status(StatusCodes.CREATED).json(expense);
}));
// Budgets API
app.get('/api/budgets', asyncHandler(async (req, res) => {
    const budgets = await BudgetModel.find();
    res.json(budgets);
}));
app.post('/api/budgets', asyncHandler(async (req, res) => {
    const budget = await BudgetModel.findOneAndUpdate({ category: req.body.category }, req.body, { new: true, upsert: true });
    res.status(StatusCodes.CREATED).json(budget);
}));
// Error handling middleware
app.use(errorHandler);
// Handle 404
app.use((req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ error: 'Not found' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
