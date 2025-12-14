import { useRoute } from 'preact-iso';
import { useEffect, useState } from 'preact/hooks';
import Markdown from 'react-markdown';
import { apiUrl } from '@/lib/utils';

function writerNoFound() {
	return (
		<>
			<h1>Can you repeat that?</h1>
			<p>There is no story there.</p>
		</>
	);
}

export default function WriterView() {
	const route = useRoute();
	const storyId = parseInt(route.params.id, 10);
	const [story, setStory] = useState('# Loading...');
	if (isNaN(storyId)) {
		return writerNoFound();
	}
	useEffect(() => {
		const data = `{
  "story": "Hai! <3"
}`;
		fetch(`${apiUrl}/story/create`, {
			method: 'POST',
			body: data,
			credentials: 'include',
			headers: { 'Content-Type': 'text/json' },
		})
			.then((val) => val.json())
			.then((val: { error?: string; id?: number; story?: string }) => {
				if (val.error) {
					console.error(val.error);
					return;
				}
				setStory(val.story);
			});
	}, []);
	return (
		<>
			<Markdown>{story}</Markdown>
		</>
	);
}
