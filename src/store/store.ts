import { configureStore } from "@reduxjs/toolkit";
import { apes } from "services/apes";
import { aws } from "services/aws/aws";
import auth from "slices/auth";

export const store = configureStore({
  reducer: {
    auth,
    [aws.reducerPath]: aws.reducer,
    [apes.reducerPath]: apes.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([aws.middleware, apes.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
