import { betterAuth, type Auth } from "better-auth";
import { organization } from "better-auth/plugins/organization";
import { passkey } from "@better-auth/passkey";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import "dotenv/config"

const client = new MongoClient(
  process.env["DATABASE_URL"] || "mongodb://localhost:27017/database",
);
const db = client.db();

export const auth: Auth = betterAuth({
  session: { cookieCache: { enabled: true, maxAge: 3 * 60 } },
  database: mongodbAdapter(db, {
    client,
  }),
  plugins: [passkey({ rpName: "Klassroom" }), organization()],
  socialProviders: {
    google: {
      clientId: process.env["GOOGLE_CLIENT_ID"] as string,
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"] as string,
    },
  },
  trustedOrigins: [
	"http://localhost:3000",
	"http://localhost:8000"
  ],
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
