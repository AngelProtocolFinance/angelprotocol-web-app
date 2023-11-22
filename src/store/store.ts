import { configureStore } from "@reduxjs/toolkit";
import { apes } from "services/apes";
import { aws } from "services/aws/aws";
import auth from "slices/auth";
import { componentReducer } from "slices/components";
import { donation } from "slices/donation";
import gift from "slices/gift";
import widget from "slices/widget";

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

// store.dispatch(getUser());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
