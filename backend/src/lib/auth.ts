import { betterAuth, type Auth } from "better-auth";
import { organization } from "better-auth/plugins/organization";
import { passkey } from "@better-auth/passkey";
import { Pool } from "pg";
import "dotenv/config";

export const auth: Auth = betterAuth({
  session: { cookieCache: { enabled: true, maxAge: 3 * 60 } },
  database: new Pool({
    connectionString:
      process.env["DATABASE_URL"] ||
      "postgres://admin:1234@localhost:5432/database",
  }),

  plugins: [passkey({ rpName: "Klassroom" }), organization()],
  socialProviders: {
    google: {
      prompt: "select_account consent",
      clientId: process.env["GOOGLE_CLIENT_ID"] as string,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"] as string,
    },
  },
  trustedOrigins: ["http://localhost:3000", "http://localhost:8000"],
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google" /* , 'microsoft', 'apple'*/],
    },
  },
  experimental: {
    joins: true,
  },
});
