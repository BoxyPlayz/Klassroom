import { useLocalStorage } from '@reactuses/core';
import { useEffect, useState } from 'preact/hooks';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import useTitle from '@/hooks/title';
import { useSession } from '@/lib/auth-client';
import theme from '@/lib/theme';
import { apiUrl } from '@/lib/utils';
import grid from '@/styles/grid.module.css';

export default function Writer() {
	const { data: session } = useSession();
	const [themeColor] = useLocalStorage('theme', 'light');
	const [md, setMd] = useState('');
	const [title, setTitle] = useState('');
	const [info, setInfo] = useState(<></>);
	const [, setPageTitle] = useTitle();
	function renderPreview({ target }: Event) {
		const { value } = target as HTMLTextAreaElement;
		setMd(value);
	}
	useEffect(() => {
		setPageTitle(title);
	}, [title]);

	return (
		<div>
			<h1>
				Writer{' '}
				<button
					style={{
						color: theme.colors[themeColor].text,
						backgroundColor:
							theme.colors[themeColor].foreground,
					}}
					onClick={() => {
						if (!session.user) {
							alert('You must be signed in!');
							return;
						}
						const confirmed = confirm(
							`Are you sure you want to publish ${title} by ${session.user.name}`
						);
						if (confirmed) {
							const data = { story: md, title };
							fetch(`${apiUrl}/story/create`, {
								method: 'POST',
								body: JSON.stringify(data),
								credentials: 'include',
								headers: {
									'Content-Type':
										'application/json',
								},
							})
								.then((val) => val.json())
								.then(
									(val: {
										error?: unknown;
										id?: number;
									}) => {
										if (val.error) {
											console.error(
												val.error
											);
											return;
										}
										setInfo(
											<>
												<a
													href={`${window.origin}/writer/${val.id}`}>
													Access
													the
													published
													story
													here
												</a>
											</>
										);
										console.log(val);
									}
								);
						}
					}}>
					Publish
				</button>
			</h1>
			<p>
				Title:{' '}
				<input
					type='text'
					name='Title'
					onInput={(event) => setTitle(event.currentTarget.value)}
				/>
			</p>
			<div className={grid.row}>
				<div className={grid.column}>
					<p>{info}</p>
					<h1>Write</h1>
					<textarea
						name='writeInput'
						style={{
							width: '100%',
							flex: '1',
							resize: 'none',
							minHeight: '0',
						}}
						rows={1}
						value={md}
						onInput={renderPreview}
					/>
				</div>
				<div className={grid.column}>
					<h1>Preview</h1>
					<div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
						<Markdown remarkPlugins={[remarkMath, remarkGfm]}>
							{md}
						</Markdown>
					</div>
				</div>
			</div>
			<h1>Tips & Tricks</h1>
			<p>Use # to make text big</p>
			<h1># Big Text</h1>
			<p>Use - to make a list</p>
			<ul>
				<li>- Item 1</li>
				<li>- Item 2</li>
			</ul>
		</div>
	);
}
