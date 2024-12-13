import express from 'express';
import { getFinancialReports, getFinancialReportById, createFinancialReport, updateFinancialReport, deleteFinancialReport, createInvoice, updateInvoice, getInvoices, getInvoiceById, deleteInvoice } from '../controllers/financialController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/reports', authenticateToken, getFinancialReports);
router.get('/reports/:id', authenticateToken, getFinancialReportById);
router.post('/reports', authenticateToken, createFinancialReport);
router.put('/reports/:id', authenticateToken, updateFinancialReport);
router.delete('/reports/:id', authenticateToken, deleteFinancialReport);

router.get('/invoices', authenticateToken, getInvoices);
router.get('/invoices/:id', authenticateToken, getInvoiceById);
router.post('/invoices', authenticateToken, createInvoice);
router.put('/invoices/:id', authenticateToken, updateInvoice);
router.delete('/invoices/:id', authenticateToken, deleteInvoice);

export default router;

