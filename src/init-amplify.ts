import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";
import { store } from "store/store";
import { loadSession, reset } from "slices/auth";
import { appRoutes } from "constants/routes";
// import { appRoutes } from "constants/routes";
import config from "./aws-exports";

export function initAmplify() {
  config.oauth.redirectSignIn =
    window.location.origin + `${appRoutes.auth_redirector}/`;
  config.oauth.redirectSignOut = window.location.origin + "/";
  Amplify.configure(config);

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
