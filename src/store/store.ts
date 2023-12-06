import { configureStore } from "@reduxjs/toolkit";
import { Hub } from "aws-amplify/utils";
import { apes } from "services/apes";
import { aws } from "services/aws/aws";
import auth, { loadSession, reset } from "slices/auth";
import { componentReducer } from "slices/components";
import { donation } from "slices/donation";
import gift from "slices/gift";
import widget from "slices/widget";

export const store = configureStore({
  reducer: {
    donation,
    gift,
    auth,
    component: componentReducer,
    widget,
    [aws.reducerPath]: aws.reducer,
    [apes.reducerPath]: apes.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([aws.middleware, apes.middleware]),
});

store.dispatch(loadSession());
Hub.listen("auth", async ({ payload }) => {
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
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
