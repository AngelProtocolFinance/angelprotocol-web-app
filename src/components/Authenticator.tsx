import { Authenticator as AmplifyAuthenticator } from "@aws-amplify/ui-react";
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
                    href="https://angelgiving.io/privacy-policy/"
                    className="text-blue hover:text-blue-l2"
                  >
                    Privacy Policy
                  </ExtLink>
                  ,{" "}
                  <ExtLink
                    href="https://angelgiving.io/cookie-policy/"
                    className="text-blue hover:text-blue-l2"
                  >
                    Cookie Policy
                  </ExtLink>
                  , and Terms of Use (
                  <ExtLink
                    href="https://angelgiving.io/terms-of-use/"
                    className="text-blue hover:text-blue-l2"
                  >
                    Donors
                  </ExtLink>{" "}
                  &{" "}
                  <ExtLink
                    href="https://angelgiving.io/terms-of-use-npo/"
                    className="text-blue hover:text-blue-l2"
                  >
                    NPOs
                  </ExtLink>
                  ) .
                </p>
              </>
            );
          },
        },
      }}
      formFields={{ signUp: { name: { order: 1 } } }}
    />
  );
}
