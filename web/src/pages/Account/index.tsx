import { Passkey } from '@better-auth/passkey';
import { useLocation } from 'preact-iso';
import { useCallback, useEffect, useRef, useState } from 'react';
import { authClient, signOut, useSession } from '@/lib/auth-client';

export default function Account() {
	const passkeyRef = useRef<HTMLInputElement>(null);
	const { data: session } = useSession();
	const location = useLocation();
	const [passkeys, setPasskeys] = useState<Passkey[]>();
	const getPasskeys = useCallback(async () => {
		const { data, error } = await authClient.passkey.listUserPasskeys();
		if (error) {
			return console.error(error);
		}
		setPasskeys(data);
	}, []);
	const [hasError, setHasError] = useState(false);

	useEffect(() => {
		getPasskeys();
	}, [getPasskeys]);

	return (
		<>
			<h1>Hello, {session?.user.name}</h1>
			<p>Email: {session?.user.email}</p>
			{session?.user.image ?
				<img
					src={
						hasError ?
							'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg'
						:	session?.user.image
					}
					height={40}
					width={40}
					onError={() => setHasError(true)}
					alt="It's You!"
				/>
			:	null}
			{passkeys ? 'Passkeys:' : null}
			{passkeys?.map((passkey) => (
				<p key={passkey.id}>
					{passkey.name || 'Untitled'}
					<button
						onClick={async () => {
							const { data, error } =
								await authClient.passkey.deletePasskey(
									{ id: passkey.id }
								);
							if (error) {
								console.error({ data, error });
								return;
							}
							getPasskeys();
						}}>
						Delete
					</button>
				</p>
			))}
			<form
				onSubmit={async (event) => {
					event.preventDefault();
					const { data, error } =
						await authClient.passkey.addPasskey({
							name: (
								passkeyRef.current || {
									value: 'getttttdduuunnkkkeedddooonn',
								}
							).value,
							authenticatorAttachment: 'platform',
						});
					if (error) {
						console.error(error);
					}
					getPasskeys();
					console.log(data);
				}}>
				<input
					required
					type='text'
					ref={passkeyRef}
				/>
				<button type='submit'>Add A Passkey</button>
			</form>

			{session?.session ?
				<button
					onClick={() => {
						signOut();
						location.route('/login');
					}}>
					Sign Out
				</button>
			:	null}
		</>
	);
}
