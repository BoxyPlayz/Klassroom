import { fromNodeHeaders } from 'better-auth/node';
import { Router } from 'express';
import { auth } from '../lib/auth.js';
import { db } from '../lib/db.js';

const Stories = Router();

Stories.get('/test', async (_req, res) => {
	await db
		.insertInto('stories')
		.values({ story: 'The Quick Brown Fox Jumps Over The Lazy Dog', author: 0 })
		.executeTakeFirst();
	return res.send('Generated');
});

Stories.post('/create', async (req, res) => {
	const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
	if (!session?.user) {
		return res.status(401).json({ error: 'not logged in' });
	}
	return res.json({ id: session.user.id, story: req.body.story });
});

Stories.get('/:id', async (req, res) => {
	const storyId = parseInt(req.params.id, 10);
	if (isNaN(storyId)) {
		return res.status(400).json({ error: 'Invalid story ID' });
	}
	try {
		const story = await db
			.selectFrom('stories')
			.selectAll()
			.where('id', '=', storyId)
			.executeTakeFirst();

		if (!story) {
			return res.status(404).json({ error: 'Story not found' });
		}

		return res.json(story);
	} catch (err) {
		console.error('Error fetching story:', err);
		return res.status(500).json({ error: 'Internal server error' });
	}
});

export default Stories;
