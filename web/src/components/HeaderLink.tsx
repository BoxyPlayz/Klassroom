import { useLocalStorage } from '@reactuses/core';
import { type ComponentChildren } from 'preact';
import { useLocation } from 'preact-iso';
import { useSession } from '@/lib/auth-client';
import theme from '@/lib/theme';

export interface LinkProps {
	href: string;
	children?: ComponentChildren;
	requireSession?: boolean;
	fallback?: ComponentChildren;
	text?: string;
}

export default function HeaderLink(props: LinkProps) {
	const [themeColor] = useLocalStorage('theme', 'light');
	const location = useLocation();
	const session = useSession();
	if (props.requireSession) {
		if (!session.data?.user) {
			return props.fallback ?? null;
		}
	}
	return (
		<a
			href={props.href}
			class={location.url === props.href ? 'active' : null}
			style={{
				color: theme.colors[themeColor].text,
				backgroundColor:
					location.url === props.href ?
						theme.colors[themeColor].linkSelect
					:	theme.colors[themeColor].link,
			}}>
			{props.text}
			{props.children}
		</a>
	);
}
