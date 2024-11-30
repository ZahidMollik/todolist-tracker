import dotenv from 'dotenv';

dotenv.config();

export const Env = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  SECRET_KEY:process.env.SECRET_KEY
};