import { useLocalStorage } from '@reactuses/core';
import { type ComponentChildren } from 'preact';
import theme from '@/lib/theme';

export default function ThemedButton({
	onClick,
	children,
}: {
	onClick: () => void;
	children?: ComponentChildren;
}) {
	const [themeColor] = useLocalStorage('theme', 'light');
	return (
		<button
			onClick={onClick}
			style={{
				color: theme.colors[themeColor].textContrast,
				backgroundColor: theme.colors[themeColor].foreground,
			}}>
			{children}
		</button>
	);
}
