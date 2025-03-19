import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import createServer from 'http';
import dotenv from 'dotenv';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true
    }
});


app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());


app.use('/api/notifications', notificationRoutes);


io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('join', (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined their room`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


app.set('io', io);


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/task_management')
    .then(() => {
        console.log('Connected to MongoDB');
        httpServer.listen(process.env.PORT || 8800, () => {
            console.log(`Server running on port ${process.env.PORT || 8800}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });