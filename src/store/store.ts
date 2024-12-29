import { configureStore } from "@reduxjs/toolkit";
import { aws } from "services/aws/aws";

export const store = configureStore({
  reducer: {
    [aws.reducerPath]: aws.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([aws.middleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
