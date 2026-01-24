import { useState } from 'preact/hooks';

const useTitle = (): [string, (val: string) => void] => {
	const [value, setValue] = useState<string>('Klassroom');
	const setTitle = (val: string) => {
		if (typeof document === 'undefined') {
			return;
		}
		if (val.length < 1) {
			return;
		}
		document.title = val;
		setValue(val);
	};
	return [value, setTitle];
};

export default useTitle;
