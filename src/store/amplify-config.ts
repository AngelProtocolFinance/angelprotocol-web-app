import type { OAuthConfig } from "@aws-amplify/core";
import type { ResourcesConfig } from "aws-amplify";
import { IS_TEST } from "constants/env";
import { appRoutes } from "constants/routes";

const common = IS_TEST
  ? {
      OAuthDomain: "gc8hpcg5cpes-dev.auth.us-east-1.amazoncognito.com",
      clientID: "14qre65ehhsh5f6899ikdhk2qj",
      userPoolID: "us-east-1_WO32hDPz3",
    }
  : {
      OAuthDomain: "gc8hpcg5cpes-prod.auth.us-east-1.amazoncognito.com",
      clientID: "405vqjgbmjj9kkghbomvj0vr39",
      userPoolID: "us-east-1_ukOlQeQIM",
    };

const oauth: OAuthConfig = {
  domain: common.OAuthDomain,
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
      userPoolClientId: common.clientID,
      userPoolId: common.userPoolID,
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
