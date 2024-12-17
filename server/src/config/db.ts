import { registerAs } from '@nestjs/config';

export const connectDB = registerAs('mongoDB', () => ({
  MONGO_URI: process.env.MONGO_URI,
}));
