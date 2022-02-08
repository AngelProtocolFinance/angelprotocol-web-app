import { configureStore } from "@reduxjs/toolkit";
import { aws } from "services/aws/aws";
import { terra } from "services/terra/terra";
import { apes } from "services/apes/apes";
import rootReducer from "./reducers";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([aws.middleware, terra.middleware, apes.middleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
