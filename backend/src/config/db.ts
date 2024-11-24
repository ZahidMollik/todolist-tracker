import mongoose from 'mongoose';
import {env} from './envVariable'

const MONGODB_URL =env.MONGODB_URL || '';

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};
