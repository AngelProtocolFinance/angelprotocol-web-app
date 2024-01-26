import { Authenticator } from "@aws-amplify/ui-react";
import ExtLink from "components/ExtLink";
import LoaderRing from "components/LoaderRing";
import { OAUTH_PATH_STORAGE_KEY } from "constants/auth";
import { BASE_URL } from "constants/env";
import { appRoutes, regRoutes } from "constants/routes";
import { PRIVACY_POLICY, TERMS_OF_USE_NPO } from "constants/urls";
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetter } from "store/accessors";
import { SignInRouteState } from "types/routeStates";

export default function Signin() {
  const { state } = useLocation();
  const [isSigningUp, setSigningUp] = useState(false);

  const to = determineTo(state as SignInRouteState | undefined, isSigningUp);

  const currUser = useGetter((state) => state.auth.user);
  useEffect(() => {
    localStorage.setItem(OAUTH_PATH_STORAGE_KEY, to.pathname);
  }, [to.pathname]);

  if (currUser === "loading" || currUser?.isSigningOut) {
    return (
      <div className="grid content-start place-items-center py-14">
        <LoaderRing thickness={12} classes="w-32 mt-8" />
      </div>
    );
  }

  if (currUser) {
    return <Navigate to={to} replace />;
  }

  return (
    <div className="grid place-items-center py-14 empty:after:content-['Loading_credentials..']">
      <h3 className="text-3xl text-center p-5">
        Welcome! Sign in or create your new personal user account
      </h3>
      <Authenticator
        components={{
          ConfirmSignUp: {
            Header() {
              useEffect(() => {
                const subtitle = document.querySelector(
                  ".amplify-text.amplify-authenticator__subtitle",
                );
                if (!subtitle) return;
                subtitle.innerHTML = `<p>To continue, enter the code we emailed to you. It may take a couple of minutes to arrive.</p>`;
              }, []);
              return (
                <h4 className="-mb-2">We emailed you a confirmation code.</h4>
              );
            },
          },
          SignIn: {
            Footer() {
              // if the SignIn Footer is displayed, we're
              // in the SignIn form
              useEffect(() => setSigningUp(false), []);
              return <Authenticator.SignIn.Footer />;
            },
          },
          SignUp: {
            FormFields() {
              useEffect(() => setSigningUp(true), []);
              return (
                <>
                  <Authenticator.SignUp.FormFields />
                  <p className="text-sm">
                    By signing up, you agree to our{" "}
                    <ExtLink
                      href={PRIVACY_POLICY}
                      className="text-blue hover:text-blue-l2"
                    >
                      Privacy Policy
                    </ExtLink>
                    ,{" "}
                    <ExtLink
                      href={`${BASE_URL}/cookie-policy/`}
                      className="text-blue hover:text-blue-l2"
                    >
                      Cookie Policy
                    </ExtLink>
                    , and{" "}
                    <ExtLink
                      href={TERMS_OF_USE_NPO}
                      className="text-blue hover:text-blue-l2"
                    >
                      Terms of Use
                    </ExtLink>
                  </p>
                </>
              );
            },
          },
        }}
        formFields={{
          signIn: {
            username: { placeholder: "e.g. john.doe@email.com" },
            password: { placeholder: "********" },
          },
          signUp: {
            email: { placeholder: "e.g. john.doe@email.com" },
            password: { placeholder: "********" },
            confirm_password: { placeholder: "********" },
            given_name: {
              order: 1,
              isRequired: true,
              type: "text",
              label: "First Name",
              placeholder: "e.g. John",
            },
            family_name: {
              order: 2,
              isRequired: true,
              type: "text",
              label: "Last name",
              placeholder: "e.g. Doe",
            },
          },
        }}
      />
    </div>
  );
}

function determineTo(
  signInRouteState: SignInRouteState | undefined,
  isSigningUp: boolean,
): { pathname: string; search: string } {
  const search = signInRouteState?.search || "";
  const pathname =
    isSigningUp && signInRouteState?.from === appRoutes.register
      ? `${appRoutes.register}/${regRoutes.welcome}`
      : signInRouteState?.from || "/";
  return { pathname, search };
}
