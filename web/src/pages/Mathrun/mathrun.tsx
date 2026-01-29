import { useEffect, useRef, useState } from 'preact/hooks';
import useTitle from '@/hooks/title';

export default function MathRun() {
	useTitle()[1]('Mathruns!');
	const mathRunDialog = useRef<HTMLDialogElement>();
	const [timer, setTimer] = useState(0);
	useEffect(() => {
		const id = setInterval(() => {
			setTimer((time) => time - 1);
		}, 1000);

		return () => {
			clearInterval(id);
		};
	}, []);
	return (
		<>
			<dialog ref={mathRunDialog}>
				<div style={{ width: '90vw', height: '80vh' }}>
					{timer > 0 ? <h1>Begin in {timer}</h1>: <>
					{/* Quiz goes here */}
					</>}
				</div>
			</dialog>
			<h1>Ready?</h1>
			<button
				onClick={() => {
					mathRunDialog.current.showModal();
					setTimer(5);
				}}>
				Start
			</button>
			{/* Leaderboard will go here later */}
		</>
	);
}
