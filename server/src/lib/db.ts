import 'dotenv/config';
import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

if (!process.env["DATABASE_URL"]) {
  throw new Error('DATABASE_URL is not set');
}

interface Story {
  id?: number;
  story: string;
  author: number;
}

interface Database {
  stories: Story;
}


export const rawDb = new Pool({
	connectionString:
		process.env['DATABASE_URL'],
});

rawDb.query('select current_database()').then(r => {
  console.log('CONNECTED TO DB:', r.rows[0].current_database);
});

export const db = new Kysely<Database>({ dialect: new PostgresDialect({ pool: rawDb }) });
