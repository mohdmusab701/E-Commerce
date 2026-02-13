import express from 'express';
import {
    register,
    login,
    refresh,
    logout,
    getProfile,
    updateProfile,
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { registerValidation, loginValidation } from '../utils/validators.js';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

export default router;
