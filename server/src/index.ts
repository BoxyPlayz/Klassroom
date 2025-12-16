import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { auth } from './lib/auth.js';
import { db } from './lib/db.js';
import Stories from './routes/stories.js';

await db.schema
	.createTable('stories')
	.ifNotExists()
	.addColumn('id', 'integer', (col) => col.generatedByDefaultAsIdentity().primaryKey())
	.addColumn('story', 'text', (col) => col.notNull())
	.addColumn('author', 'text', (col) => col.notNull())
	.addColumn('title', 'text', (col) => col.notNull())
	.execute();

const app = express();
const port = 3000;

app.use(
	cors({
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
		origin: ['http://localhost:3000', 'http://localhost:8000', '*'],
	})
);

app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json());
app.use('/story', Stories);
app.get('/ping', (_req, res) => {
	res.send('pong');
});
app.listen(port, () => {
	console.log(`API listening on http://localhost:${port}`);
});
