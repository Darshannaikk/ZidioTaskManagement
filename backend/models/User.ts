import mongoose, { Schema, Document } from 'mongoose';

// Define User interface for TypeScript
interface IUser extends Document {
    username: string;
    email: string;
    password?: string; // Password can be optional in some cases (e.g., return types)
    role: 'user' | 'admin';
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        }
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const User = mongoose.model<IUser>('User', userSchema); // Use IUser interface

export default User;