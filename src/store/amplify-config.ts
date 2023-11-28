import type { OAuthConfig } from "@aws-amplify/core";
import type { ResourcesConfig } from "aws-amplify";
import { IS_TEST } from "constants/env";
import { appRoutes } from "constants/routes";

const common = IS_TEST ? {} : {};

const oauth: OAuthConfig = {
  domain: "gc8hpcg5cpes-dev.auth.us-east-1.amazoncognito.com",
  scopes: [
    "phone",
    "email",
    "openid",
    "profile",
    "aws.cognito.signin.user.admin",
  ],
  redirectSignIn: [window.location.origin + `${appRoutes.auth_redirector}/`],
  redirectSignOut: [window.location.origin + "/"],
  responseType: "code",
  providers: ["Google"],
};

export const amplifyConfig: ResourcesConfig = {
  Auth: {
    Cognito: {
      userPoolClientId: "14qre65ehhsh5f6899ikdhk2qj",
      userPoolId: "us-east-1_WO32hDPz3",
      signUpVerificationMethod: "code",
      loginWith: {
        oauth,
        email: true,
      },
      userAttributes: {
        email: { required: true },
        given_name: { required: true },
        family_name: { required: true },
      },
      mfa: {
        status: "optional",
      },
      passwordFormat: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireNumbers: true,
        requireSpecialCharacters: true,
      },

      //identity pool
      identityPoolId: "",
    },
  },
};
