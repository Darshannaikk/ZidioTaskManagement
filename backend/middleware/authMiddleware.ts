import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
    user?: IUser;
}

const protect = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response | void> => { // Corrected function signature
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string }; // Explicitly type decoded

            // Get user from the token (excluding password)
            req.user = await User.findById(decoded.id).select('-password') as IUser;

            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export default { protect };