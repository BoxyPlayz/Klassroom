import { useRoute } from 'preact-iso';

export default function WriterView() {
	const route = useRoute();
	return <>{route.params.id}</>;
}
