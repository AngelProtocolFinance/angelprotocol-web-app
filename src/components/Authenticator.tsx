import {
  Authenticator as AmplifyAuthenticator,
  CheckboxField,
  useAuthenticator,
} from "@aws-amplify/ui-react";

export default function Authenticator() {
  return (
    <AmplifyAuthenticator
      components={{
        SignUp: {
          FormFields() {
            const { validationErrors } = useAuthenticator();
            return (
              <>
                <AmplifyAuthenticator.SignUp.FormFields />
                <CheckboxField
                  errorMessage={validationErrors.acknowledgement as string}
                  hasError={!!validationErrors.acknowledgement}
                  name="acknowledgement"
                  value="yes"
                  label={<p>I agree to terms and conditions</p>}
                />
              </>
            );
          },
        },
      }}
      formFields={{ signUp: { name: { order: 1 } } }}
    />
  );
}
