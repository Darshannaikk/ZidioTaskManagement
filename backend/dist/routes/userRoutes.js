"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userController_1 = __importDefault(require("../controllers/userController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const adminMiddleware_1 = __importDefault(require("../middleware/adminMiddleware"));
// Use RouteHandler and ProtectedRouteHandler types for route handlers
router.post('/register', (req, res, next) => {
    userController_1.default.registerUser(req, res, next);
});
router.post('/login', (req, res, next) => {
    userController_1.default.loginUser(req, res, next);
});
router.get('/me', authMiddleware_1.default.protect, (req, res, next) => {
    userController_1.default.getMe(req, res, next);
});
router.get('/admin/dashboard', authMiddleware_1.default.protect, adminMiddleware_1.default.adminProtect, (req, res, next) => {
    res.status(200).json({ message: 'Admin dashboard access granted' });
});
exports.default = router;
