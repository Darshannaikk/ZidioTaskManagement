import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { Request, Response } from 'express';

interface CustomRequest extends Request {
    user?: IUser;
}
 