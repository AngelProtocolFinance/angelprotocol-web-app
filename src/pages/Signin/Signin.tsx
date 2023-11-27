import { Authenticator } from "@aws-amplify/ui-react";
import { useEffect } from "react";
import { Location, Navigate, useLocation } from "react-router-dom";
import ExtLink from "components/ExtLink";
import LoaderRing from "components/LoaderRing";
import { useGetter } from "store/accessors";
import { BASE_URL } from "constant/env";
import { PRIVACY_POLICY, TERMS_OF_USE_NPO } from "constant/urls";

const OAUTH_PATH_STORAGE_KEY = "OATH_ORIGIN";

export default function Signin() {
  const { state } = useLocation();

  const _state = state as { from?: Location } | undefined;
  const from = _state?.from?.pathname || "/";
  const search = _state?.from?.search || "";

  const currUser = useGetter((state) => state.auth.user);
  useEffect(() => {
    localStorage.setItem(OAUTH_PATH_STORAGE_KEY, from);
  }, [from]);

  if (currUser === "loading" || currUser?.isSigningOut) {
    return (
      <div className="grid content-start place-items-center py-14">
        <LoaderRing thickness={12} classes="w-32 mt-8" />
      </div>
    );
  }

  if (currUser) {
    return <Navigate to={{ pathname: from, search }} replace />;
  }

  return (
    <div className="grid place-items-center py-14 empty:after:content-['Loading_credentials..']">
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
    </div>
  );
}
