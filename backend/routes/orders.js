import express from 'express';
import {
    createPaymentIntent,
    confirmOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus,
    getOrderStats,
} from '../controllers/orderController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

// Protected routes
router.post('/payment-intent', authMiddleware, createPaymentIntent);
router.post('/confirm', authMiddleware, confirmOrder);
router.get('/my-orders', authMiddleware, getMyOrders);
router.get('/:id', authMiddleware, getOrderById);

// Admin routes
router.get('/all/list', authMiddleware, adminMiddleware, getAllOrders);
router.put('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);
router.get('/stats/analytics', authMiddleware, adminMiddleware, getOrderStats);

export default router;
