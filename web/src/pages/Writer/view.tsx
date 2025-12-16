import { useClipboard, usePermission } from '@reactuses/core';
import { useRoute } from 'preact-iso';
import { useEffect, useState } from 'preact/hooks';
import { CgShare } from 'react-icons/cg';
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
	const [title, setTitle] = useState('Loading...');
	const [message, setMessage] = useState(<></>);
	const permissionWrite = usePermission('clipboard-write');
	const [, copy] = useClipboard();
	if (isNaN(storyId)) {
		return writerNoFound();
	}
	useEffect(() => {
		fetch(`${apiUrl}/story/${storyId}`)
			.then((val) => val.json())
			.then((val: { error?: string; title?: string; story?: string }) => {
				if (val.error) {
					console.error(val.error);
					return;
				}
				setStory(val.story);
				setTitle(val.title);
			});
	}, []);
	return (
		<>
			<h1>
				{title}{' '}
				{permissionWrite ?
					<CgShare
						style={{ cursor: 'pointer' }}
						onClick={() => {
							copy(window.location.toString())
								.then(() => {
									setMessage(
										<>
											Copied to
											clipboard{' '}
											<br />
										</>
									);
								})
								.catch((err) => {
									console.error(err);
								});
						}}
					/>
				:	null}
			</h1>
			{message}
			<Markdown>{story}</Markdown>
		</>
	);
}
