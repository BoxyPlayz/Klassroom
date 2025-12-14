import { Pool } from 'pg';
import 'dotenv/config';

export const db = new Pool({
    connectionString:
        process.env['DATABASE_URL'] || 'postgres://admin:1234@localhost:5432/database',
});