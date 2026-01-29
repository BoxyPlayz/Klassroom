import { useLocalStorage } from '@reactuses/core';
import { LocationProvider, Route, Router, hydrate, lazy, prerender as ssr } from 'preact-iso';
import Header from '@/components/Header';
import theme from '@/lib/theme';
import '@/styles/fonts.css';
import '@/styles/root.css';

const Home = lazy(() => import('./pages/Home/index.js'));
const NotFound = lazy(() => import('./pages/_404.js'));
const Login = lazy(() => import('./pages/Account/login.js'));
const Account = lazy(() => import('./pages/Account/account.js'));
const WriterEditor = lazy(() => import('./pages/Writer/editor.js'));
const WriterView = lazy(() => import('./pages/Writer/view.js'));
const WriterNew = lazy(() => import('./pages/Writer/new.js'));
const MathRun = lazy(() => import('./pages/Mathrun/mathrun.js'));

export function App() {
	const [themeColor] = useLocalStorage('theme', 'light');
	return (
		<LocationProvider>
			<Header />
			<main
				style={{
					backgroundColor: theme.colors[themeColor].background,
					margin: 0,
					padding: 0,
					color: theme.colors[themeColor].textContrast,
					flex: 'auto',
					display: 'flex',
					flexDirection: 'column',
				}}>
				<Router>
					<Route
						path='/'
						component={Home}
					/>
					<Route
						path='/login'
						component={Login}
					/>
					<Route
						path='/account'
						component={Account}
					/>
					<Route
						path='/writer'
						component={WriterNew}
					/>
					<Route
						path='/writer/edit'
						component={WriterEditor}
					/>
					<Route
						path='/writer/:id'
						component={WriterView}
					/>
					<Route
						path='/mathruns'
						component={MathRun}
					/>
					<Route
						default
						component={NotFound}
					/>
				</Router>
			</main>
		</LocationProvider>
	);
}

if (typeof window !== 'undefined') {
	hydrate(<App />, document.getElementById('app'));
}

export async function prerender(data) {
	return await ssr(<App {...data} />);
}
