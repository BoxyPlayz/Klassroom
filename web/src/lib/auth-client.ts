import { passkeyClient } from '@better-auth/passkey/client';
import { organizationClient, inferAdditionalFields, magicLinkClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
	baseURL: 'http://localhost:3000',
	plugins: [passkeyClient(), organizationClient(),
		inferAdditionalFields({

		}),
		magicLinkClient()
	],
});

export const { signIn, signUp, useSession, signOut } = authClient;
export type Session = typeof authClient.$Infer.Session
