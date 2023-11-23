import { configureStore } from "@reduxjs/toolkit";
import { Amplify } from "aws-amplify";
import { Hub } from "aws-amplify/utils";
import { apes } from "services/apes";
import { aws } from "services/aws/aws";
import auth, { loadSession, reset } from "slices/auth";
import { componentReducer } from "slices/components";
import { donation } from "slices/donation";
import gift from "slices/gift";
import widget from "slices/widget";
import { config } from "../amplify-config";

export const store = configureStore({
  reducer: {
    donation,
    gift,
    component: componentReducer,
    widget,
    [aws.reducerPath]: aws.reducer,
    [apes.reducerPath]: apes.reducer,
    auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([aws.middleware, apes.middleware]),
});

Amplify.configure(config);

window.addEventListener("DOMContentLoaded", () => {
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
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
