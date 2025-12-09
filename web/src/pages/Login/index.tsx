"use client";

import { useLocation } from "preact-iso";
import { authClient } from "@/lib/auth-client";

export default function Login() {
  const { data: session, refetch } = authClient.useSession();
  const location = useLocation();
  return (
    <>
      {session ? (
        <p>You&apos;re already logged in :)</p>
      ) : (
        <>
          <button
            onClick={async () => {
              const { data, error } = await authClient.signIn.social({
                provider: "google",
              });
              if (error) {
                console.error({ data, error });
                return;
              }
            }}
          >
            Sign In With Google
          </button>
          <button
            onClick={async () => {
              const { data, error } = await authClient.signIn.passkey();
              if (error) {
                console.error(error);
              }
              if (data?.session) {
                refetch();
                location.route("/dashboard");
              }
            }}
          >
            Sign In With Passkey
          </button>
        </>
      )}
    </>
  );
}
