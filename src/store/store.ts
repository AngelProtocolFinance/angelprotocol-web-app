import { configureStore } from "@reduxjs/toolkit";
import { apes } from "services/apes";
import { aws } from "services/aws/aws";
import { terra } from "services/terra";
import { wordpress } from "services/wordpress";
import auth from "slices/auth";
import gift from "slices/gift";

export const store = configureStore({
  reducer: {
    gift,
    auth,
    [aws.reducerPath]: aws.reducer,
    [apes.reducerPath]: apes.reducer,
    [wordpress.reducerPath]: wordpress.reducer,
    [terra.reducerPath]: terra.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      aws.middleware,
      apes.middleware,
      wordpress.middleware,
      terra.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
