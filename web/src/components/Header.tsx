import { useLocalStorage } from '@reactuses/core';
import theme from '@/lib/theme';
import HeaderLink from './HeaderLink';

export default function Header() {
	const [themeColor] = useLocalStorage('theme', 'light');
	return (
		<header
			style={{
				backgroundColor: theme.colors[themeColor].foreground,
				display: 'flex',
				justifyContent: 'flex-start',
			}}>
			<nav style={{ display: 'flex' }}>
				<HeaderLink href='/'>Home</HeaderLink>
				<HeaderLink
					href='/account'
					requireSession={true}
					fallback={
						<HeaderLink
							href='/login'
							text='Sign In'
						/>
					}
					text='Account'
				/>
			</nav>
		</header>
	);
}
