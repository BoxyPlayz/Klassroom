import { useEffect, useState } from 'preact/hooks';
import { Fragment } from 'preact/jsx-runtime';
import { apiUrl } from '@/lib/utils';
import Styles from './styles.module.css';

interface storyEntry {
	id: string;
	title: string;
	authorName: string;
	authorId: string;
}

export default function WriterNew() {
	const [storyEntries, setStoryEntries] = useState<storyEntry[]>([]);
	useEffect(() => {
		fetch(`${apiUrl}/story/list/50`)
			.then((val) => val.json())
			.then((val) => {
				setStoryEntries(val.stories);
			});
	}, []);

	if (storyEntries.length === 0) {
		return <p>Loading…</p>;
	}

	return (
		<>
			{storyEntries.map((val) => {
				return (
					<a href={`${window.location.origin}/writer/${val.id}`}>
						<span key={val.id} className={Styles.story}>
								{val.title} by {val.authorName}
						</span>
					</a>
				);
			})}
		</>
	);
}
