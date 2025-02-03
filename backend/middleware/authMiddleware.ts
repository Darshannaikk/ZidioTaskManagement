import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/User';

interface CustomRequest extends Request {
    user?: IUser;
}

const adminProtect = (req: CustomRequest, res: Response, next: NextFunction): Response<any, Record<string, any>> | void => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({message: 'Not authorized as an admin'})
    }
};

export default { adminProtect };