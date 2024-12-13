import express from 'express';
import { getSuppliers, getSupplierById, addSupplier, updateSupplier, deleteSupplier, getSupplierInventory } from '../controllers/supplierController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getSuppliers);
router.get('/:id', authenticateToken, getSupplierById);
router.post('/', authenticateToken, addSupplier);
router.put('/:id', authenticateToken, updateSupplier);
router.delete('/:id', authenticateToken, deleteSupplier);
router.get('/:id/inventory', authenticateToken, getSupplierInventory);

export default router;

