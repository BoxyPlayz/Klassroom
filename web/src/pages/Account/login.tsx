import { validate } from 'email-validator';
import { useLocation } from 'preact-iso';
import { useRef, useState } from 'preact/hooks';
import ThemedButton from '@/components/ThemedButton';
import { signIn, useSession } from '@/lib/auth-client';

export default function Login() {
	const { data: session } = useSession();
	const [err, setErr] = useState('');
	const emailInput = useRef<HTMLInputElement>(null);
	const location = useLocation();
	return (
		<>
			{session ?
				<>
					<p>You&apos;re already logged in :)</p>
					<a href='/'>Where you probably meant to go</a>
				</>
			:	<>
					<ThemedButton
						onClick={async () => {
							const { data, error } = await signIn.social(
								{
									provider: 'google',
									callbackURL:
										document.location
											.href,
								}
							);
							if (error) {
								console.error({ data, error });
								setErr(error.message);
							}
						}}>
						Sign In With Google
					</ThemedButton>
					<ThemedButton
						onClick={async () => {
							const { data, error } =
								await signIn.passkey();
							if (error) {
								console.error(error);
							}
							if (data?.session) {
								location.route('/');
							}
						}}>
						Sign In With Passkey
					</ThemedButton>
					<input
						type='email'
						name='emailInput'
						id='emailInput'
						ref={emailInput}
					/>
					<ThemedButton
						onClick={async () => {
							if (!emailInput.current) {
								return alert(
									'You IDIOT. You could have a working page. But noooo, you wanted to see what would happen if you goofed off. FREAK.'
								);
							}
							const email =
								emailInput.current.value.trim();
							if (!validate(email)) {
								return alert(
									"You didn't put in an email! >_<"
								);
							}
							const magicSignIn = await signIn.magicLink({
								email,
								callbackURL: window.location.origin,
							});
							if (magicSignIn.error) {
								console.error(magicSignIn.error);
								return;
							}
							if (magicSignIn.data.status) {
								alert(
									'Link sent, check your inbox!'
								);
							}
						}}>
						Sign in with Email
					</ThemedButton>
					<p>{err}</p>
				</>
			}
		</>
	);
}
