import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import mongoose from 'mongoose';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    user?: IUser;
}

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => { // Added NextFunction
    const { username, email, password } = req.body;

    // Validate inputs
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Please enter a valid email' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(409).json({ message: 'Email already in use' });
    }
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
        return res.status(409).json({ message: 'Username already taken' });
    }

    try {
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
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
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error: any) {
        next(error); // Pass error to next error handling middleware
    }
};

// @desc    Login user
// @route   POST /api/users/login
// @access  Public
const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => { // Added NextFunction
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter email and password' });
    }

    try {
        // Check user email
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            return res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error: any) {
        next(error); // Pass error to next error handling middleware
    }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => { // Added NextFunction and CustomRequest
    return res.status(200).json(req.user);
};

// Generate JWT
const generateToken = (id: mongoose.Types.ObjectId): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: '30d',
    });
};

export default {
    registerUser,
    loginUser,
    getMe,
};