import express from 'express';
import { getInventory, getInventoryItem, addInventoryItem, updateInventoryItem, deleteInventoryItem, adjustInventoryQuantity } from '../controllers/inventoryController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getInventory);
router.get('/:id', authenticateToken, getInventoryItem);
router.post('/', authenticateToken, addInventoryItem);
router.put('/:id', authenticateToken, updateInventoryItem);
router.delete('/:id', authenticateToken, deleteInventoryItem);
router.patch('/:id/quantity', authenticateToken, adjustInventoryQuantity);

export default router;

