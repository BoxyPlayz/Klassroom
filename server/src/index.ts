import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import express from 'express';
import { auth } from './lib/auth.js';

const app = express();
const port = 3000;

app.use(
	cors({
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		credentials: true,
		origin: ['http://localhost:3000', 'http://localhost:8000'],
	})
);

app.all('/api/auth/*splat', toNodeHandler(auth));
app.use(express.json());
app.get('/ping', (_req, res) => {
	res.send('pong');
});
app.listen(port, () => {
	console.log(`API listening on http://localhost:${port}`);
});
