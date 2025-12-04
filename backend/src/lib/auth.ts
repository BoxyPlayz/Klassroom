import { betterAuth, type Auth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { organization } from 'better-auth/plugins/organization';
import { passkey } from '@better-auth/passkey';


export const auth: Auth = betterAuth({
	session: { cookieCache: { enabled: true, maxAge: 3 * 60 } },
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  plugins: [passkey({ rpName: 'Klassroom' }), organization()],
	socialProviders: {
		google: {
			clientId: process.env["GOOGLE_CLIENT_ID"] as string,
			clientSecret: process.env["GOOGLE_CLIENT_SECRET"] as string,
		},
	},
	account: {
		accountLinking: {
			enabled: true,
			trustedProviders: ['google', 'microsoft', 'apple'],
		},
	},
	experimental: {
		joins: true
	}
});