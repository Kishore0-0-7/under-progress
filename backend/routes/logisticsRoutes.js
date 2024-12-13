import express from 'express';
import { getShipments, getShipmentById, createShipment, updateShipment, deleteShipment, optimizeRoute } from '../controllers/logisticsController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getShipments);
router.get('/:id', authenticateToken, getShipmentById);
router.post('/', authenticateToken, createShipment);
router.put('/:id', authenticateToken, updateShipment);
router.delete('/:id', authenticateToken, deleteShipment);
router.post('/optimize', authenticateToken, optimizeRoute);

export default router;

