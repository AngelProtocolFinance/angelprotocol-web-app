import { ResourcesConfig } from "aws-amplify";
import { appRoutes } from "constants/routes";

export const config: ResourcesConfig = {
  Auth: {
    Cognito: {
      identityPoolId: "us-east-1:8574d806-30d5-4de4-8165-96e72b41cd0e",
      userPoolClientId: "14qre65ehhsh5f6899ikdhk2qj",
      userPoolId: "us-east-1_WO32hDPz3",
      userPoolEndpoint: `https://cognito-idp.us-east-1.amazonaws.com/14qre65ehhsh5f6899ikdhk2qj`,
      signUpVerificationMethod: "code",
      loginWith: {
        email: true,
        oauth: {
          domain: "gc8hpcg5cpes-dev.auth.us-east-1.amazoncognito.com",
          scopes: [
            "phone",
            "email",
            "openid",
            "profile",
            "aws.cognito.signin.user.admin",
          ],
          redirectSignIn: [
            window.location.origin + `${appRoutes.auth_redirector}/`,
          ],
          redirectSignOut: [window.location.origin + "/"],
          responseType: "code",
          providers: ["Google"],
        },
      },
      userAttributes: {
        given_name: { required: true },
        family_name: { required: true },
        email: { required: true },
      },
      mfa: {
        status: "optional",
        totpEnabled: true,
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },
    },
  },
};
