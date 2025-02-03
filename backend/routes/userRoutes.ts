import express from 'express';
const router = express.Router();
import userController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/authMiddleware';

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/me', authMiddleware.protect, userController.getMe);

router.get('/admin/dashboard', authMiddleware.protect, admin)