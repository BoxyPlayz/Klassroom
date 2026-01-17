import useTitle from "@/hooks/title";

export default function NotFound() {
	useTitle()[1]('Error 404');
	return (
		<section>
			<h1>404: Not Found</h1>
			<span style={{ color: 'red', background: 'black' }} className='undertale'>
				Probably never there.
			</span>
		</section>
	);
}
