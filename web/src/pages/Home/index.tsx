import useTitle from '@/hooks/title';

export default function Home() {
	useTitle()[1]('Klassroom');
	return (
		<>
			<h1>Klassroom</h1>
			<h4>
				Learning, <span className='jetbrains'>REIMAGINED</span>
			</h4>
		</>
	);
}
