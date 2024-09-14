import { configureStore } from "@reduxjs/toolkit";
import { apes } from "services/apes";
import { aws } from "services/aws/aws";
import { wordpress } from "services/wordpress";
import auth from "slices/auth";

export const store = configureStore({
  reducer: {
    auth,
    [aws.reducerPath]: aws.reducer,
    [apes.reducerPath]: apes.reducer,
    [wordpress.reducerPath]: wordpress.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      aws.middleware,
      apes.middleware,
      wordpress.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
