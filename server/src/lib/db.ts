import { Pool } from 'pg';
import 'dotenv/config';
import { Kysely, PostgresDialect } from 'kysely';

export const rawDb = new Pool({
    connectionString:
        process.env['DATABASE_URL'] || 'postgres://admin:1234@localhost:5432/database',
});

export const db = new Kysely({
  dialect: new PostgresDialect({
    pool: rawDb
  }),
});