"use client";

import { useLocation } from "preact-iso";
import { authClient } from "@/lib/auth-client";
import { useState } from "preact/hooks";

export default function Login() {
  const { data: session, refetch } = authClient.useSession();
  const [err, setErr] = useState("")
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
                callbackURL: document.location.toString()
              });
              if (error) {
                console.error({ data, error });
                setErr(error.message)
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
                location.route("/");
              }
            }}
          >
            Sign In With Passkey
          </button>
          <p>{err}</p>
        </>
      )}
    </>
  );
}
