import { useLocation } from 'preact-iso';
import { useState } from 'preact/hooks';
import { authClient } from '@/lib/auth-client';

export default function Login() {
	const { data: session } = authClient.useSession();
	const [err, setErr] = useState('');
	const location = useLocation();
	return (
		<>
			{session ?
				<>
					<p>You&apos;re already logged in :)</p>
					<a href='/'>Where you probably meant to go</a>
				</>
			:	<>
					<button
						onClick={async () => {
							const { data, error } =
								await authClient.signIn.social({
									provider: 'google',
									callbackURL:
										document.location.toString(),
								});
							if (error) {
								console.error({ data, error });
								setErr(error.message);
							}
						}}>
						Sign In With Google
					</button>
					<button
						onClick={async () => {
							const { data, error } =
								await authClient.signIn.passkey();
							if (error) {
								console.error(error);
							}
							if (data?.session) {
								location.route('/');
							}
						}}>
						Sign In With Passkey
					</button>
					<p>{err}</p>
				</>
			}
		</>
	);
}
