import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User'; 
import { Request, Response, NextFunction } from 'express'; 

interface CustomRequest extends Request {
    user?: IUser; 
}


const protect = async (req: CustomRequest, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | void> => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            
            token = req.headers.authorization.split(' ')[1];
       
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string); 
           
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