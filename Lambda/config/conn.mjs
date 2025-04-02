import dotenv from 'dotenv';
import path from 'path';
import mysql from 'mysql2/promise';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const createDbConnection = async () => {
    const db = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    return db;
};