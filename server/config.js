import dotenv from 'dotenv';
dotenv.config();

// Export individual configuration values
export const PORT = process.env.PORT || 8000;

export const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Shubham-Dhas_910:Jw9qsxMoxbDCoeq1@cluster0.5yyaoqt.mongodb.net/';

export const JWT_SECRET = process.env.JWT_SECRET || 'Shubham_Dhasmana';


