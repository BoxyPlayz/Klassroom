import { useEffect, useState } from 'preact/hooks';
import useTitle from '@/hooks/title';
import { apiUrl } from '@/lib/utils';
import Styles from './styles.module.css';

interface storyEntry {
	id: number;
	title: string;
	authorName: string;
	authorId: string;
}

export default function WriterNew() {
	const [storyEntries, setStoryEntries] = useState<storyEntry[]>([]);
	const [loading, setLoading] = useState(true);
	const minStories = 0;

	useEffect(() => {
		fetch(`${apiUrl}/story/list/50`)
			.then((val) => val.json())
			.then((val) => {
				setStoryEntries(val.stories);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <p>Loading…</p>;
	}
	if (storyEntries.length === minStories) {
		return (
			<p>
				No stories yet.{' '}
				<a href={`${window.location.origin}/writer/edit`}>
					Make the first one
				</a>
			</p>
		);
	}
	useTitle()[1]('New Stories');

	return (
		<>
			<h1>
				<a href='/writer/edit'>Create New Story</a>
			</h1>
			{storyEntries.map((val) => (
				<a
					key={val.id}
					href={`${window.location.origin}/writer/${val.id}`}>
					<span className={Styles.story}>
						{val.title} by {val.authorName}
					</span>
				</a>
			))}
		</>
	);
}
