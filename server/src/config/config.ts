import * as dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const TMDB_API_KEY = process.env.TMDB_API_KEY;
