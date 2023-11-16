import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import ExtLink from "components/ExtLink";
import LoaderRing from "components/LoaderRing";
import { BASE_URL } from "constants/env";
import { PRIVACY_POLICY, TERMS_OF_USE_NPO } from "constants/urls";

const OAUTH_PATH_STORAGE_KEY = "OATH_ORIGIN";

export default function Signin() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const _state = state as { from?: Location } | undefined;

  const { route, authStatus } = useAuthenticator((context) => [
    context.route,
    context.authStatus,
  ]);

  const from = _state?.from?.pathname || "/";
  const search = _state?.from?.search || "";

  useEffect(() => {
    localStorage.setItem(OAUTH_PATH_STORAGE_KEY, from);
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (route === "authenticated") {
      navigate({ pathname: from, search }, { replace: true });
    }
  }, [route, navigate, from, search]);

  return (
    <div className="grid place-items-center py-14">
      {authStatus === "configuring" || authStatus === "authenticated" ? (
        //while user is still authenticated, use loader in place of authenticator while navigating
        <LoaderRing thickness={12} classes="w-32" />
      ) : (
        <Authenticator
          components={{
            SignUp: {
              FormFields() {
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
      )}
    </div>
  );
}
