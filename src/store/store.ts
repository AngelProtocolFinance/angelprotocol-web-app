import { configureStore } from "@reduxjs/toolkit";
import { Amplify } from "aws-amplify";
import { apes } from "services/apes";
import { aws } from "services/aws/aws";
import auth, { getUser } from "slices/auth";
import { componentReducer } from "slices/components";
import { donation } from "slices/donation";
import gift from "slices/gift";
import widget from "slices/widget";
import { appRoutes } from "constants/routes";
import config from "../aws-exports";

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

config.oauth.redirectSignIn =
  window.location.origin + `${appRoutes.auth_redirector}/`;
config.oauth.redirectSignOut = window.location.origin + "/";
Amplify.configure(config);

store.dispatch(getUser());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
