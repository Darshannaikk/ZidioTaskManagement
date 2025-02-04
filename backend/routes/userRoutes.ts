import express from 'express';
const router = express.Router();
import userController from '../controllers/userController';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';
import { Request, Response, NextFunction } from 'express'; // Import types for route handlers

// Define route handler types explicitly
type RouteHandler = (req: Request, res: Response, next: NextFunction) => Promise<Response | void>;
type ProtectedRouteHandler = (req: CustomRequest, res: Response, next: NextFunction) => Promise<Response | void>;

// Use RouteHandler and ProtectedRouteHandler types for route handlers
router.post('/register', userController.registerUser as RouteHandler); // Type assertion
router.post('/login', userController.loginUser as RouteHandler);     // Type assertion
router.get('/me', authMiddleware.protect as ProtectedRouteHandler, userController.getMe as ProtectedRouteHandler); // Type assertion with middleware
router.get('/admin/dashboard', authMiddleware.protect as ProtectedRouteHandler, adminMiddleware.adminProtect as ProtectedRouteHandler, (req: Request, res: Response, next: NextFunction) => { // Inline handler with types
    res.status(200).json({ message: 'Admin dashboard access granted' });
});


export default router;