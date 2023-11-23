import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";
import { store } from "store/store";
import { loadSession, reset } from "slices/auth";
import { appRoutes } from "constants/routes";

export function initAmplify() {
  Amplify.configure({
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
  });

  //load persisted session
  store.dispatch(loadSession());

  Hub.listen("auth", async ({ payload }) => {
    console.log({ payload });
    switch (payload.event) {
      case "signedIn":
        store.dispatch(loadSession(payload.data));
        break;
      case "signedOut":
        store.dispatch(reset());
        break;
      case "tokenRefresh":
        store.dispatch(loadSession());
        break;
      case "tokenRefresh_failure":
        store.dispatch(reset());
        break;
      case "signInWithRedirect":
        console.log("signInWithRedirect API has successfully been resolved.");
        break;
      case "signInWithRedirect_failure":
        console.log("failure while trying to resolve signInWithRedirect API.");
        break;
      case "customOAuthState":
        console.info("custom state returned from CognitoHosted UI");
        break;
    }
  });
}
