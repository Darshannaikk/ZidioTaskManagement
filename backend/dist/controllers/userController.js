"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validator_1 = __importDefault(require("validator"));
// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    // Validate inputs
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }
    if (!validator_1.default.isEmail(email)) {
        return res.status(400).json({ message: 'Please enter a valid email' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    // Check if user exists
    const userExists = yield User_1.default.findOne({ email });
    if (userExists) {
        return res.status(409).json({ message: 'Email already in use' });
    }
    const usernameExists = yield User_1.default.findOne({ username });
    if (usernameExists) {
        return res.status(409).json({ message: 'Username already taken' });
    }
    try {
        // Hash password
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Create user
        const user = yield User_1.default.create({
            username,
            email,
            password: hashedPassword,
        });
        if (user) {
            return res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        }
        else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    }
    catch (error) {
        next(error); // Pass error to next error handling middleware
    }
});
// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter email and password' });
    }
    try {
        // Check user email
        const user = yield User_1.default.findOne({ email });
        if (user && (yield bcryptjs_1.default.compare(password, user.password))) {
            return res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        }
        else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    }
    catch (error) {
        next(error); // Pass error to next error handling middleware
    }
});
// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json(req.user);
});
// Generate JWT
const generateToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};
exports.default = {
    registerUser,
    loginUser,
    getMe,
};
