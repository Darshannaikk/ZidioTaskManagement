import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes'; 

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); 

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string); // MONGO_URI is expected to be a string
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) { // Explicitly type error as any or Error
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

app.use('/api/users', userRoutes); 

app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});