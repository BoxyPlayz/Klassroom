import { passkeyClient } from '@better-auth/passkey/client';
import {
	inferAdditionalFields,
	magicLinkClient,
	organizationClient,
} from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { apiUrl } from './utils';

export const authClient = createAuthClient({
	baseURL: apiUrl,
	plugins: [
		passkeyClient(),
		organizationClient(),
		inferAdditionalFields({}),
		magicLinkClient(),
	],
});

export const { signIn, signUp, useSession, signOut } = authClient;
export type Session = typeof authClient.$Infer.Session;
