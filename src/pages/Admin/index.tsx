import { useAuthenticator } from "@aws-amplify/ui-react";
import type { CognitoUserSession } from "amazon-cognito-identity-js";
import { useState } from "react";
import ModalContext from "contexts/ModalContext";
import Charity from "./Charity";
import { Context } from "./Context";

type Session = CognitoUserSession | "loading" | "error";

export default function Admin() {
  const { user } = useAuthenticator((context) => [context.user]);
  const [session, setSession] = useState<Session>("loading");
  user.getSession((error: Error | null, session: CognitoUserSession | null) => {
    if (error) setSession("error");
    if (session) setSession(session);
  });

  if (session === "loading") {
    return <div>Loading user credential</div>;
  }

  if (session === "error") {
    return <div>Failed to load user credentials</div>;
  }

  console.log(session);

  return (
    <Context>
      <ModalContext>
        <Charity />
      </ModalContext>
    </Context>
  );
}
