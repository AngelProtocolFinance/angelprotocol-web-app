import type { OAuthConfig } from "@aws-amplify/core";
import type { ResourcesConfig } from "aws-amplify";
import { IS_TEST } from "./env";
import { appRoutes } from "./routes";

const common = IS_TEST
  ? {
      OAuthDomain: "j71l2yzyj3cb-dev.auth.us-east-1.amazoncognito.com",
      clientID: "7bl9gfckbneg0udsmkvsu48ssg",
      userPoolID: "us-east-1_CPBng2GjE",
    }
  : {
      OAuthDomain: "bettergiving.auth.us-east-1.amazoncognito.com",
      clientID: "207sfl8bl2m2cghbr86vg4je2o",
      userPoolID: "us-east-1_ukOlQeQIM",
    };

const oauth: OAuthConfig = {
  domain: common.OAuthDomain,
  scopes: ["email", "openid", "profile", "aws.cognito.signin.user.admin"],
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
