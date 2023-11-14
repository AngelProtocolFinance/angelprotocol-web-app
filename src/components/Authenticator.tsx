import { Authenticator as AmplifyAuthenticator } from "@aws-amplify/ui-react";
import { BASE_URL } from "constants/env";
import { PRIVACY_POLICY, TERMS_OF_USE_NPO } from "constants/urls";
import ExtLink from "./ExtLink";

export default function Authenticator() {
  return (
    <AmplifyAuthenticator
      components={{
        SignUp: {
          FormFields() {
            return (
              <>
                <AmplifyAuthenticator.SignUp.FormFields />
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
  );
}
