import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import userController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';

// Define route handler types explicitly
type RouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
type ProtectedRouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;

// Use RouteHandler and ProtectedRouteHandler types for route handlers
router.post('/register', (req: Request, res: Response, next: NextFunction) => {
    userController.registerUser(req, res, next);
});
router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    userController.loginUser(req, res, next);
});
router.get('/me', authMiddleware.protect, (req: Request, res: Response, next: NextFunction) => {
    userController.getMe(req, res, next);
});
router.get('/admin/dashboard', authMiddleware.protect, adminMiddleware.adminProtect, (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({ message: 'Admin dashboard access granted' });
});

export default router;