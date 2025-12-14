import { useState } from 'preact/hooks';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import grid from '@/styles/grid.module.css';
import utils from '@/styles/utils.module.css';

export default function Writer() {
	const [md, setMd] = useState('');
	function renderPreview({ target }: Event) {
		const { value } = target as HTMLTextAreaElement;
		setMd(value);
	}

	return (
		<div>
			<h1 className={utils.center}>Writer</h1>
			<div className={grid.row}>
				<div className={grid.column}>
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
						onInput={renderPreview}></textarea>
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
			<p>
				Use # to make text <code>big</code>
			</p>
			<h1># Big Text</h1>
		</div>
	);
}
